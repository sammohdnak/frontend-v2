<script setup lang="ts">
import Footer from '@/components/footer/Footer.vue';
import AppNav from '@/components/navs/AppNav/AppNav.vue';

import { ref, onMounted } from 'vue';

const showBanner = ref(true);

onMounted(() => {
  // Check last closed timestamp
  const lastClosed = localStorage.getItem('mobile-banner-closed-time');
  
  if (lastClosed) {
    const lastClosedDate = new Date(Number(lastClosed));
    const currentDate = new Date();
    
    // Check if it's been less than 24 hours since last closed
    const hoursDifference = (currentDate.getTime() - lastClosedDate.getTime()) / (1000 * 3600);
    
    if (hoursDifference < 24) {
      showBanner.value = false;
    }
  }
});

const closeBanner = () => {
  showBanner.value = false;
  // Store current timestamp when banner is closed
  localStorage.setItem('mobile-banner-closed-time', Date.now().toString());
};
</script>

<template>
  <div>
    <div class="app-body">
      <AppNav />
      <div
      style="background-image: url('/images/backgrounds/vebal-bg.png');"
        v-if="showBanner"
        class="hidden max-md:flex relative rounded-xl bg-cover    flex-col items-center justify-center py-6 px-2 my-12"
      >
      <button
            @click="closeBanner"
            class="absolute top-5 right-5"
          >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_659_22692)">
<path d="M20.4792 3.51205C19.3657 2.39647 18.0429 1.51177 16.5866 0.908741C15.1304 0.305713 13.5694 -0.00377058 11.9932 -0.0019451C5.36519 -0.0019451 -0.0078125 5.37106 -0.0078125 11.9991C-0.0078125 15.3131 1.33619 18.3141 3.50819 20.4861C4.62165 21.6016 5.94447 22.4863 7.40073 23.0894C8.85699 23.6924 10.418 24.0019 11.9942 24.0001C18.6222 24.0001 23.9952 18.6271 23.9952 11.9991C23.9952 8.68505 22.6512 5.68405 20.4792 3.51205ZM18.9372 18.9391C18.026 19.8517 16.9437 20.5755 15.7523 21.069C14.5609 21.5625 13.2838 21.8161 11.9942 21.8151C6.57119 21.8151 2.17519 17.4191 2.17519 11.9961C2.17417 10.7065 2.42769 9.42935 2.92122 8.23792C3.41474 7.0465 4.13856 5.96419 5.05119 5.05305C5.96221 4.14055 7.04435 3.4168 8.23559 2.92328C9.42683 2.42976 10.7038 2.17617 11.9932 2.17705C17.4152 2.17705 21.8112 6.57306 21.8112 11.9951C21.8121 13.2845 21.5585 14.5614 21.065 15.7527C20.5714 16.9439 19.8477 18.026 18.9352 18.9371L18.9372 18.9391Z" fill="white"/>
<path d="M13.5375 12L17.3925 8.14499C17.5827 7.93772 17.6855 7.66501 17.6794 7.38379C17.6733 7.10257 17.5588 6.83457 17.3598 6.63574C17.1609 6.4369 16.8928 6.3226 16.6116 6.31668C16.3303 6.31077 16.0577 6.4137 15.8505 6.60399L15.8515 6.60299L11.9965 10.458L8.14154 6.60299C7.93427 6.41283 7.66156 6.31008 7.38034 6.31617C7.09912 6.32227 6.83112 6.43675 6.63229 6.63572C6.43345 6.83468 6.31915 7.10275 6.31323 7.38398C6.30732 7.6652 6.41025 7.93784 6.60054 8.14499L6.59954 8.14399L10.4545 11.999L6.59954 15.854C6.49108 15.9535 6.40387 16.0739 6.34318 16.208C6.28248 16.3421 6.24954 16.4871 6.24635 16.6343C6.24316 16.7814 6.26978 16.9277 6.32461 17.0643C6.37944 17.2009 6.46134 17.325 6.56539 17.4291C6.66944 17.5332 6.79348 17.6152 6.93004 17.6701C7.06661 17.7251 7.21287 17.7518 7.36004 17.7487C7.5072 17.7456 7.65221 17.7127 7.78635 17.6521C7.92048 17.5915 8.04096 17.5044 8.14054 17.396L8.14154 17.395L11.9965 13.54L15.8515 17.395C15.951 17.5035 16.0715 17.5907 16.2056 17.6514C16.3397 17.7121 16.4847 17.745 16.6318 17.7482C16.779 17.7514 16.9253 17.7248 17.0619 17.6699C17.1985 17.6151 17.3226 17.5332 17.4267 17.4291C17.5308 17.3251 17.6128 17.2011 17.6677 17.0645C17.7226 16.9279 17.7493 16.7817 17.7462 16.6345C17.7431 16.4873 17.7103 16.3423 17.6497 16.2082C17.5891 16.0741 17.5019 15.9536 17.3935 15.854L17.3925 15.853L13.5375 12Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_659_22692">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>

          </button>
        <div class="px-4 py-3 relative">
          <p class="text-white text-xl font-semibold text-center" >
            For Better Experience <br/>View on Desktop 
          </p>
          
        </div>
      </div>

      <div class="pb-16">
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style>
.VueQueryDevtoolsPanel + button {
  @apply text-black bg-gray-100 p-2 rounded text-sm;
}

.app-body {
  @apply mb-8;

  min-height: calc(100vh - 2rem);
}
</style>
