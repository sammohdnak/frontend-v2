<script lang="ts" setup>
import IconDiscord from '@/components/icons/IconDiscord.vue';
import IconGithub from '@/components/icons/IconGithub.vue';
import IconLinkedin from '@/components/icons/IconLinkedin.vue';
import IconMail from '@/components/icons/IconMail.vue';
import IconMedium from '@/components/icons/IconMedium.vue';
import IconTwitter from '@/components/icons/IconTwitter.vue';
import IconYoutube from '@/components/icons/IconYoutube.vue';
import { EXTERNAL_LINKS } from '@/constants/links';

import useNetwork from '@/composables/useNetwork';

import AppLogo from '../images/AppLogo.vue';
import { useThirdPartyServices } from '@/composables/useThirdPartyServices';
import { useAppzi } from '@/composables/useAppzi';
import { configService } from '@/services/config/config.service';

const { networkSlug } = useNetwork();
const { handleThirdPartyModalToggle } = useThirdPartyServices();
const { openNpsModal } = useAppzi();

const linkSections= [
   
   {
     title: 'Product',
     links: [
       { label: 'Explore pools', href: '/pools' },
       { label: 'Swap tokens', href: '/swap' },
       { label: 'View portfolio', href: '/portfolio' },
       { label: 'Get veTide', href: 'https://app.balancer.fi/#/veTide', isExternal: true },
       {
         label: 'Create an LBP',
         href: 'https://www.fjordfoundry.com/?utm_source=balancer&utm_medium=website',
         isExternal: true,
       },
       {
         label: 'Create an NFT drop',
         href: 'https://fjordnfts.com/?utm_source=balancer&utm_medium=website',
         isExternal: true,
       },
     ],
   },
   {
     title: 'Resources',
     links: [
       { label: 'Forum', href: 'https://forum.balancer.fi', isExternal: true },
       { label: 'Governance', href: 'https://vote.balancer.fi', isExternal: true },
       {
         label: 'Bug bounties',
         href: 'https://immunefi.com/bug-bounty/balancer',
         isExternal: true,
       },
       { label: 'Dune Analytics', href: 'https://dune.com/balancer', isExternal: true },
       { label: 'Defilytica', href: 'https://balancer.defilytica.com', isExternal: true },
       {
         label: 'Brand assets',
         href: 'https://github.com/balancer/brand-assets',
         isExternal: true,
       },
     ],
   },
]
 
</script>

<template>
  <footer v-once>
    <div class="bg-footer-light dark:bg-footer-dark bg-no-repeat bg-cover">
    <div
      class="xl:container lg:px-4 xl:mx-auto dark:border-t dark:border-gray-800 "
    >
      <div
        class="flex flex-col md:flex-row gap-8 md:justify-between py-12 px-4 lg:px-0 text-primary"
      >
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">

            <a :href="`${configService.env.VITE_APP_MAIN_FE_URL}/pools`" 
         target="_self"
          class="font-medium link"
         >
      
   
         <AppLogo class="mb-4" />
        </a>

         
          <p class="w-full lg:w-2/3"> Tide is a battle-tested toolkit for true AMM experimentation and innovation.</p>
        </div>
      
        </div>

        <div class="flex gap-8">
          <div class="flex flex-col gap-4">
            <p class="font-medium">Product</p>
            <a :href="`${configService.env.VITE_APP_MAIN_FE_URL}/pools`" 
         target="_self"
          class="font-medium link"
         >
        Overview
        </a>
        <a :href="`${configService.env.VITE_APP_MAIN_FE_URL}/pools`" 
         target="_self"
          class="font-medium link"
         >
        Features
        </a>
        <a :href="`${configService.env.VITE_APP_MAIN_FE_URL}/pools`" 
         target="_self"
          class="font-medium link"
         >
        Solutions
        </a>
        <a :href="`${configService.env.VITE_APP_MAIN_FE_URL}/pools`" 
         target="_self"
          class="font-medium link"
         >
        Tutorials
        </a>
        <a :href="`${configService.env.VITE_APP_MAIN_FE_URL}/pools`" 
         target="_self"
          class="font-medium link"
         >
        Pricing
        </a>
        <a :href="`${configService.env.VITE_APP_MAIN_FE_URL}/pools`" 
         target="_self"
          class="font-medium link"
         >
        Releases
        </a>
       
          </div>

          <div class="flex flex-col gap-4">
            <p class="font-medium">Resources</p>
            <a :href="`${configService.env.VITE_APP_MAIN_FE_URL}/pools`" 
         target="_self"
          class="font-medium link"
         >
        Blog
        </a>
        <a :href="`${configService.env.VITE_APP_MAIN_FE_URL}/pools`" 
         target="_self"
          class="font-medium link"
         >
        Newsletter
        </a>
        <a :href="`${configService.env.VITE_APP_MAIN_FE_URL}/pools`" 
         target="_self"
          class="font-medium link"
         >
        Events
        </a>
        <a :href="`${configService.env.VITE_APP_MAIN_FE_URL}/pools`" 
         target="_self"
          class="font-medium link"
         >
        Help Center
        </a>
        <a :href="`${configService.env.VITE_APP_MAIN_FE_URL}/pools`" 
         target="_self"
          class="font-medium link"
         >
        Tutorials
        </a>
        <a :href="`${configService.env.VITE_APP_MAIN_FE_URL}/pools`" 
         target="_self"
          class="font-medium link"
         >
        Support
        </a>
       
          </div>
        </div>
      
        <div class="flex flex-col gap-4">
          <p>Stay upto date</p>
          <div class="flex items-center gap-4">
            <input
            placeholder="Enter your email"
            class="bg-white text-slate-500 text-lg rounded-md px-3.5 py-2.5" type="text">
            <BalBtn
             color="tide"
             
            >
              Subscribe
            </BalBtn>
          </div>
        </div>
      </div>
    </div></div>
  </footer>
</template>

<style scoped>
footer {
  @apply bg-gray-50 dark:bg-gray-900;
}

footer :deep(.logotype) {
  @apply origin-top-left;

  transform: scale(1.5);
}

.link {
  @apply text-black dark:text-white transition-colors flex items-center no-underline hover:text-purple-600;
}

.link--external {
  @apply text-sm;
}

.link:hover,
.link:focus-visible {
  @apply text-purple-600 dark:text-yellow-500 no-underline;
}

.link:focus:not(:focus-visible) {
  outline: none;
}

.policy {
  @apply text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-yellow-500;
}

.arrow {
  @apply text-gray-300 dark:text-gray-600 group-hover:text-purple-600 dark:group-hover:text-yellow-500;
}

.router-link-active {
  @apply text-blue-600 dark:text-blue-400;
}
</style>
