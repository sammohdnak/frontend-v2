<script lang="ts" setup>
import { useRoute } from 'vue-router';
import DesktopLinkItem from './DesktopLinkItem.vue';
import useNetwork, { isTestnet } from '@/composables/useNetwork';
import { Goals, trackGoal } from '@/composables/useFathom';
import { configService } from '@/services/config/config.service';

/**
 * COMPOSABLES
 */
const route = useRoute();
const { networkSlug } = useNetwork();

/**
 * METHODS
 */
function isActive(page: string): boolean {
  if (route.name === page) return true;
  return false;
}
</script>

<template>
  <div class="desktop-links">
    <DesktopLinkItem
      :to="`${configService.env.VITE_APP_MAIN_FE_URL}/pools`"
      :active="isActive('home2')"
      prefetch
      @click="trackGoal(Goals.ClickNavPools)"
    >
      {{ $t('pools') }}
    </DesktopLinkItem>
    <DesktopLinkItem
    :to="`${configService.env.VITE_APP_MAIN_FE_URL}/swap`"

      :active="isActive('swap')"
      prefetch
      @click="trackGoal(Goals.ClickNavSwap)"
    >
      {{ $t('swap') }}
    </DesktopLinkItem>
    <!-- <DesktopLinkItem
      :to="{ name: 'claim', params: { networkSlug } }"
      :active="isActive('claim')"
      prefetch
      @click="trackGoal(Goals.ClickNavClaim)"
    >
      <div class="flex items-center">
        {{ $t('claim') }}
      </div>
    </DesktopLinkItem> -->
    <DesktopLinkItem
      v-if="isTestnet"
      :to="{ name: 'faucet', params: { networkSlug } }"
      :active="isActive('faucet')"
    >
      Faucet
    </DesktopLinkItem>
    <DesktopLinkItem
    :to="`${configService.env.VITE_APP_MAIN_FE_URL}/portfolio`"

      :active="isActive('portfolio')"
      prefetch
      @click="trackGoal(Goals.ClickNavPortfolio)"
    >
      {{ $t('portfolio') }}
    </DesktopLinkItem>
    <DesktopLinkItem
    :to="`${configService.env.VITE_APP_MAIN_FE_URL}/claim`"

      :active="isActive('claim')"
      prefetch
      @click="trackGoal(Goals.ClickNavPortfolio)"
    >
     Claim
    </DesktopLinkItem>
    <DesktopLinkItem
      :to="{ name: 'veTide', params: { networkSlug } }"
      :active="isActive('veTide')"
      prefetch
      @click="trackGoal(Goals.ClickNavVebal)"
      class="text-tide font-medium"
    >
      veTIDE
    </DesktopLinkItem>
  </div>
</template>

<style scoped>
.desktop-links {
  @apply grid gap-6 grid-flow-col grid-rows-1 h-full content-center;
}
</style>
