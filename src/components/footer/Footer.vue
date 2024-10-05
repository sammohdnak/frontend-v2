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
       { label: 'Get veBAL', href: 'https://app.balancer.fi/#/vebal', isExternal: true },
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
    <div
      class="xl:container lg:px-4 xl:mx-auto dark:border-t dark:border-gray-800"
    >
      <div
        class="flex flex-col md:flex-row gap-8 md:justify-between py-12 px-4 lg:px-0 text-primary"
      >
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">

         
          <router-link
            class="font-medium link"
            :to="{ name: 'home', params: { networkSlug } }"
          >
            <AppLogo class="mb-4" />
          </router-link>
          <p> Tide is a battle-tested toolkit for true AMM experimentation and innovation.</p>
        </div>
          <!-- <div class="flex md:hidden flex-col gap-2">
            <p>
              <router-link
                class="text-lg font-medium link"
                :to="{ name: 'home', params: { networkSlug } }"
              >
                {{ $t('pool') }}
              </router-link>
            </p>
            <p>
              <router-link
                class="text-lg font-medium link"
                :to="{ name: 'swap', params: { networkSlug } }"
              >
                {{ $t('swap') }}
              </router-link>
            </p>
            <p>
              <router-link
                class="text-lg font-medium link"
                :to="{ name: 'claim', params: { networkSlug } }"
              >
                {{ $t('claim') }}
              </router-link>
            </p>
            <p>
              <router-link
                class="text-lg font-medium link"
                :to="{ name: 'portfolio', params: { networkSlug } }"
              >
                {{ $t('portfolio') }}
              </router-link>
            </p>
            <p>
              <router-link
                class="text-lg font-medium link"
                :to="{ name: 'vebal', params: { networkSlug } }"
              >
                {{ $t('vebal') }}
              </router-link>
            </p>
          </div> -->

          <div class="flex flex-wrap md:order-3 gap-3 md:gap-4">
            <BalLink
              :href="EXTERNAL_LINKS.Balancer.Home"
              external
              noStyle
              class="group link link--external"
            >
              {{ $t('about') }}
              <BalIcon name="arrow-up-right" size="sm" class="arrow" />
            </BalLink>

            <BalLink
              :href="EXTERNAL_LINKS.Balancer.Docs"
              external
              noStyle
              class="group link link--external"
            >
              {{ $t('docs') }}
              <BalIcon name="arrow-up-right" size="sm" class="arrow" />
            </BalLink>

            <BalLink
              :href="EXTERNAL_LINKS.Balancer.Forum"
              external
              noStyle
              class="group link link--external"
            >
              {{ $t('forum') }}
              <BalIcon name="arrow-up-right" size="sm" class="arrow" />
            </BalLink>

            <BalLink
              :href="EXTERNAL_LINKS.Balancer.Vote"
              external
              noStyle
              class="group link link--external"
            >
              {{ $t('vote') }}
              <BalIcon name="arrow-up-right" size="sm" class="arrow" />
            </BalLink>

            <BalLink
              :href="EXTERNAL_LINKS.Balancer.Grants"
              external
              noStyle
              class="group link link--external"
            >
              {{ $t('grants') }}
              <BalIcon name="arrow-up-right" size="sm" class="arrow" />
            </BalLink>

            <BalLink
              :href="EXTERNAL_LINKS.Balancer.BugBounty"
              external
              noStyle
              class="group link link--external"
            >
              {{ $t('bugBounty') }}
              <BalIcon name="arrow-up-right" size="sm" class="arrow" />
            </BalLink>

            <BalLink
              :href="EXTERNAL_LINKS.Balancer.Analytics"
              external
              noStyle
              class="group link link--external"
            >
              {{ $t('analytics') }}
              <BalIcon name="arrow-up-right" size="sm" class="arrow" />
            </BalLink>
          </div>
        </div>
        <div class="flex flex-col gap-8">
          <div class="md:order-2">
            <div class="flex lg:flex-col md:justify-end">
              <div class="flex gap-3 md:justify-end">
                <BalLink
                  :href="EXTERNAL_LINKS.Balancer.Social.Twitter"
                  external
                  noStyle
                >
                  <IconTwitter />
                </BalLink>
                <BalLink
                  :href="EXTERNAL_LINKS.Balancer.Social.Discord"
                  external
                  noStyle
                >
                  <IconDiscord />
                </BalLink>
                <BalLink
                  :href="EXTERNAL_LINKS.Balancer.Social.Medium"
                  external
                  noStyle
                >
                  <IconMedium />
                </BalLink>
                <BalLink
                  :href="EXTERNAL_LINKS.Balancer.Social.Youtube"
                  external
                  noStyle
                >
                  <IconYoutube />
                </BalLink>
                <BalLink
                  :href="EXTERNAL_LINKS.Balancer.Social.Github"
                  external
                  noStyle
                >
                  <IconGithub />
                </BalLink>
                <BalLink
                  :href="EXTERNAL_LINKS.Balancer.Social.Linkedin"
                  external
                  noStyle
                >
                  <IconLinkedin />
                </BalLink>
                <BalLink
                  :href="EXTERNAL_LINKS.Balancer.Social.Mail"
                  external
                  noStyle
                >
                  <IconMail />
                </BalLink>
              </div>
            </div>
          </div>

          <div
            class="flex flex-wrap md:order-3 gap-x-3 lg:gap-x-4 gap-y-2 md:justify-end"
          >
            <p>
              <button class="policy" @click="openNpsModal">Feedback</button>
            </p>
            <p>
              <router-link class="policy" :to="{ name: 'terms-of-use' }">
                {{ $t('policies.termsOfUse') }}
              </router-link>
            </p>
            <p>
              <router-link class="policy" :to="{ name: 'privacy-policy' }">
                {{ $t('policies.privacyPolicy') }}
              </router-link>
            </p>
            <p>
              <router-link class="policy" :to="{ name: 'cookies-policy' }">
                {{ $t('policies.cookiesPolicy') }}
              </router-link>
            </p>
            <p>
              <router-link class="policy" :to="{ name: 'risks' }">
                {{ $t('policies.risks') }}
              </router-link>
            </p>
            <p>
              <span
                class="cursor-pointer policy"
                @click="handleThirdPartyModalToggle(true)"
              >
                {{ $t('policies.thirdPartyServices') }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
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
