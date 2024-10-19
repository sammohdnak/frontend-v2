<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

import AppIcon from '@/components/images/AppIcon.vue';
import AppLogo from '@/components/images/AppLogo.vue';
import useAlerts from '@/composables/useAlerts';
import useBreakpoints from '@/composables/useBreakpoints';
import useFathom from '@/composables/useFathom';
import useNetwork from '@/composables/useNetwork';

import AppNavActions from './AppNavActions.vue';
import AppNavAlert from './AppNavAlert.vue';
import DesktopLinks from './DesktopLinks/DesktopLinks.vue';
import { configService } from '@/services/config/config.service';

/**
 * STATE
 */
const appNav = ref<HTMLDivElement>();

/**
 * COMPOSABLES
 */
const { bp, isDesktop } = useBreakpoints();
const { trackGoal, Goals } = useFathom();
const { currentAlert } = useAlerts();
const { networkSlug } = useNetwork();

/**
 * METHODS
 */
function handleScroll() {
  if (!appNav.value) return;

  if (window.scrollY === 0) {
    appNav.value.classList.remove('shadow-lg');
  } else {
    appNav.value.classList.add('shadow-lg');
  }
}

/**
 * LIFECYCLE
 */
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <!-- <AppNavAlert v-if="currentAlert" :alert="currentAlert" /> -->
  <nav id="app-nav" ref="appNav" class="sticky top-0 lg:px-6 pr-1 pl-4 h-20 border-b !border-b-[rgba(0,0,0,0.1)] dark:!border-b-[rgba(255,255,255,0.1)]">
    <div class="flex justify-between items-center h-full">
      <div class="flex items-center h-full">
        <a :href="`${configService.env.VITE_APP_MAIN_FE_URL}/pools`" 
         target="_self">
      
   
          <AppIcon v-if="['xs', 'sm'].includes(bp)" />
          <AppLogo v-else />
        </a>

        <DesktopLinks v-if="isDesktop" class="ml-8 font-medium" />
      </div>

      <AppNavActions />
    </div>
  </nav>
</template>

<style scoped>
#app-nav {
  @apply w-full z-30;
  @apply bg-white dark:bg-[#0C111D];
  @apply border-b border-transparent;

  transition: all 0.2s ease-in-out;
}
</style>
