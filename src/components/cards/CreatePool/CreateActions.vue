<script setup lang="ts">
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { useI18n } from 'vue-i18n';

import BalActionSteps from '@/components/_global/BalActionSteps/BalActionSteps.vue';
import usePoolCreation from '@/composables/pools/usePoolCreation';
import useConfig from '@/composables/useConfig';
import useEthers from '@/composables/useEthers';
import useNetwork from '@/composables/useNetwork';
import useWeb3 from '@/services/web3/useWeb3';
import { TransactionActionInfo } from '@/types/transactions';
import useTokenApprovalActions from '@/composables/approvals/useTokenApprovalActions';
import { ApprovalAction } from '@/composables/approvals/types';
import { configService } from '@/services/config/config.service';

/**
 * TYPES
 */
type Props = {
  tokenAddresses: string[];
  amounts: string[];
  createDisabled: boolean;
};

type CreateState = {
  confirmed: boolean;
  confirmedAt: string;
  receipt?: TransactionReceipt;
  isRestoredTxConfirmed?: boolean;
  isLoadingRestoredTx: boolean;
};

/**
 * PROPS & EMITS
 */
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'success'): void;
}>();

/**
 * STATE
 */
const createState = reactive<CreateState>({
  confirmed: false,
  confirmedAt: '',
  isRestoredTxConfirmed: false,
  isLoadingRestoredTx: false,
});
const isLoading = ref(true);

/*
 * COMPOSABLES
 */
// const route = useRoute();
const { t } = useI18n();
const { explorerLinks } = useWeb3();
const { networkConfig } = useConfig();
const { isTxConfirmed } = useEthers();
const {
  createPool,
  joinPool,
  poolId,
  poolTypeString,
  hasRestoredFromSavedState,
  needsSeeding,
  createPoolTxHash,
} = usePoolCreation();
const { networkSlug } = useNetwork();
const { getTokenApprovalActions } = useTokenApprovalActions();

const actions = ref<TransactionActionInfo[]>([
  {
    label: t('createPool'),
    loadingLabel: t('investment.preview.loadingLabel.create'),
    confirmingLabel: t('confirming'),
    action: createPool,
    stepTooltip: t('createPoolTooltip', [poolTypeString.value]),
  },
  {
    label: t('fundPool'),
    loadingLabel: t('investment.preview.loadingLabel.fund'),
    confirmingLabel: t('confirming'),
    action: joinPool,
    stepTooltip: t('fundPoolTooltip'),
  },
]);

/**
 * COMPUTED
 */
const requiredActions = computed(() => {
  if (
    (hasRestoredFromSavedState.value && needsSeeding.value) ||
    createState.isRestoredTxConfirmed
  ) {
    return actions.value.filter(action => action.label === t('fundPool'));
  }
  return actions.value;
});

const amountsToApprove = props.amounts.map((amount, index) => {
  return {
    address: props.tokenAddresses[index],
    amount,
  };
});

const explorerLink = computed((): string =>
  createState.receipt
    ? explorerLinks.txLink(createState.receipt.transactionHash)
    : ''
);

onBeforeMount(async () => {
  if (createPoolTxHash.value) {
    createState.isLoadingRestoredTx = true;
    const isConfirmed = await isTxConfirmed(createPoolTxHash.value);
    createState.isLoadingRestoredTx = false;
    createState.isRestoredTxConfirmed = isConfirmed;
  }

  const approvalActions = await getTokenApprovalActions({
    amountsToApprove,
    spender: networkConfig.addresses.permit2!,
    actionType: ApprovalAction.AddLiquidity,
  });
  actions.value = [...approvalActions, ...actions.value];

  isLoading.value = false;
});

/**
 * METHODS
 */
function handleSuccess(details: any): void {
  createState.confirmed = true;
  createState.receipt = details.receipt;
  createState.confirmedAt = details.confirmedAt;
  emit('success');
}
</script>

<template>
  <div>
    <BalActionSteps
      :actions="requiredActions"
      primaryActionType="createPool"
      :disabled="props.createDisabled"
      :isLoading="isLoading"
      :loadingLabel="$t('restoring')"
      @success="handleSuccess"
    />
    <template v-if="createState.confirmed">
      <div
        class="flex justify-between items-center mt-4 text-sm text-gray-400 dark:text-gray-600"
      >
        <div class="flex items-center">
          <BalIcon name="clock" />
          <span class="ml-2">
            {{ createState.confirmedAt }}
          </span>
        </div>
        <BalLink
          :href="explorerLink"
          external
          noStyle
          class="group flex items-center"
        >
          {{ networkConfig.explorerName }}
          <BalIcon
            name="arrow-up-right"
            size="sm"
            class="ml-px group-hover:text-pink-500 transition-colors"
          />
        </BalLink>
      </div>
      <BalBtn
          tag="a"
          :href="`${configService.env.VITE_APP_MAIN_FE_URL}/pools/${networkSlug}/v3/${poolId}`"
          color="gray"
        outline
        block
        class="mt-2"
         
        >
        {{ $t('viewPool') }}
        </BalBtn>
      
    </template>
  </div>
</template>
