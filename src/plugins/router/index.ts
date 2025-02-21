import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import { isTestnet } from '@/composables/useNetwork';
import { applyNavGuards } from './nav-guards';
import { configService } from '@/services/config/config.service';

const ClaimPage = () => import('@/pages/claim/index.vue');
const LegacyClaimPage = () => import('@/pages/claim/legacy.vue');
const CookiesPolicyPage = () => import('@/pages/cookies-policy.vue');
const GetVeBalPage = () => import('@/pages/get-vebal.vue');
const HomePage = () => import('@/pages/index.vue');
const PoolPage = () =>
  import(/* webpackPrefetch: true */ '@/pages/pool/_id.vue');
const CreatePoolPage = () => import('@/pages/pool/create.vue');
const PoolAddLiquidityPage = () => import('@/pages/pool/add-liquidity.vue');
const PoolWithdrawPage = () => import('@/pages/pool/withdraw.vue');
const PrivacyPolicyPage = () => import('@/pages/privacy-policy.vue');
const TermsOfUsePage = () => import('@/pages/terms-of-use.vue');
const RisksPage = () => import('@/pages/risks.vue');
const SwapPage = () => import('@/pages/swap.vue');

export const SwapPagePrefetchLinks = async () =>
  import('@/pages/swap.vue').toString();

const UnlockVeBalPage = () => import('@/pages/unlock-vebal.vue');
const VeBalPage = () => import('@/pages/vebal.vue');
const VeBalVotingPage = () => import('@/pages/vebal-voting.vue');
const FaucetPage = () => import('@/pages/faucet.vue');
const BalancesPage = () => import('@/pages/balances.vue');
const ClaimSubmissionsPage = () => import('@/pages/claim-submissions.vue');

const PortfolioPage = () => import('@/pages/portfolio.vue');
const RecoveryExitPage = () =>
  import('@/pages/recovery-exit/recovery-exit.vue');

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string;
    bgColors?: {
      dark: string;
      light: string;
    };
  }
}

const mainFeURL = `${configService.env.VITE_APP_MAIN_FE_URL}/pools`

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: to => {
      window.location.href = mainFeURL
      return '/redirecting' // not important since redirecting
    },
  },
  {
    path: '/terms-of-use',
    name: 'terms-of-use',
    
    redirect: to => {
      window.location.href = mainFeURL
      return '/redirecting' // not important since redirecting
    },
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    redirect: to => {
      window.location.href = mainFeURL
      return '/redirecting' // not important since redirecting
    },
  },
  {
    path: '/cookies-policy',
    name: 'cookies-policy',
    // component: VeBalPage,
    redirect: to => {
      window.location.href = mainFeURL
      return '/redirecting' // not important since redirecting
    },
    // component: CookiesPolicyPage,
    // meta: { layout: 'ContentLayout' },
  },
  {
    path: '/risks',
    name: 'risks',
    redirect: to => {
      window.location.href = mainFeURL
      return '/redirecting' // not important since redirecting
    },
  },
  {
    path: '/:networkSlug/recovery-exit',
    name: 'recovery-exit',
    redirect: to => {
      window.location.href = mainFeURL
      return '/redirecting' // not important since redirecting
    },
  },
  {
    path: '/:networkSlug/swap/:assetIn?/:assetOut?',
    name: 'swap',
    redirect: to => {
      window.location.href = mainFeURL
      return '/redirecting' // not important since redirecting
    },
  },
  {
    path: '/:networkSlug/pool/create/:tx?',
    name: 'create-pool',
    component: CreatePoolPage,
    meta: { layout: 'FocussedLayout' },
  },
  {
    path: '/:networkSlug/pool/:id',
    name: 'pool',
    redirect: to => {
      window.location.href = mainFeURL
      return '/redirecting' // not important since redirecting
    },
  },
  {
    path: '/:networkSlug/pool/:id/add-liquidity',
    name: 'add-liquidity',
    redirect: to => {
      window.location.href = mainFeURL
      return '/redirecting' // not important since redirecting
    },
  },
  {
    path: '/:networkSlug/pool/:id/invest',
    name: 'invest-redirect',
    redirect: to => {
      window.location.href = mainFeURL
      return '/redirecting' // not important since redirecting
    },
  },
  {
    path: '/:networkSlug/pool/:id/withdraw',
    name: 'withdraw',
    redirect: to => {
      window.location.href = mainFeURL
      return '/redirecting' // not important since redirecting
    },
  },
  {
    path: '/:networkSlug/veTide',
    name: 'veTide',
    component: VeBalPage,
  },
  {
    path: '/:networkSlug/veTide-voting',
    name: 'veTide-voting',
    component: VeBalVotingPage,
    meta: { layout: 'FocussedLayout' },
  },
  {
    path: '/:networkSlug/get-veTide',
    name: 'get-veTide',
    component: GetVeBalPage,
    meta: { layout: 'FocussedLayout' },
  },
  {
    path: '/:networkSlug/unlock',
    name: 'unlock',
    component: UnlockVeBalPage,
    meta: { layout: 'FocussedLayout' },
  },
  {
    path: '/:networkSlug/claim',
    name: 'claim',
    redirect: to => {
      window.location.href = mainFeURL
      return '/redirecting' // not important since redirecting
    },
  },
  {
    path: '/:networkSlug/claim/legacy',
    name: 'legacy-claim',
    redirect: to => {
      window.location.href = mainFeURL
      return '/redirecting' // not important since redirecting
    },
  },
  {
    path: '/:networkSlug/portfolio',
    name: 'portfolio',
    redirect: to => {
      window.location.href = mainFeURL
      return '/redirecting' // not important since redirecting
    },
  },
  {
    path: '/:networkSlug/balances',
    name: 'balances',
    redirect: to => {
      window.location.href = mainFeURL
      return '/redirecting' // not important since redirecting
    },
  },
  {
    path: '/:networkSlug/claim-submission',
    name: 'claim-submission',
    redirect: to => {
      window.location.href = mainFeURL
      return '/redirecting' // not important since redirecting
    },
  },
  {
    path: '/:networkSlug?',
    name: 'home',
    component: VeBalPage,
    beforeEnter: (to, from, next) => {
      /*
        - Correct urls:
        These urls will contain a hash (like app.balancer.fi/# or app.balancer.fi/#/polygon).
        The hash fragments are not included in window.location.pathname but in window.location.hash
        so for those cases window.location.pathname === '/'

        - Incorrect urls
        These urls will not contain the hash (like app.balancer.fi/polygon/).
        Received when the user does not add the hash symbol when manually typing the url in the browser
        or when Vercel building a bad redirect without hash after a deployment).
        In these cases, the window.location.pathname will contain the wrong fragment/s that we won't to discard.
        Example: app.balancer.fi/polygon/ will have window.location.pathname === '/polygon'
      */
      if (window.location.pathname !== '/') {
        // Remove wrong fragments without hash from pathname
        window.location.pathname = '';
      }
      return next();
    },
   
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/',
  },
];

/**
 * TESTNET ONLY ROUTES
 */
if (isTestnet.value) {
  routes.push({
    path: '/:networkSlug/faucet',
    name: 'faucet',
    component: FaucetPage,
  });
}

/**
 * DEV/STAGING ONLY ROUTES
 */
// if (
//   ['development', 'staging'].includes(import.meta.env.VITE_ENV || 'development')
// ) {
//   routes.push();
// }

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      // Delaying the scroll to enforce that the route transition has finished (for example, when clicking a risk hash from the pool risks section)
      // https://router.vuejs.org/guide/advanced/scroll-behavior.html#delaying-the-scroll
      return new Promise(resolve => {
        setTimeout(() => {
          if (fromPoolToRisks(from, to)) {
            // Avoid default smooth scroll
            return resolve({
              el: to.hash,
              behavior: 'instant',
              // https://github.com/microsoft/TypeScript/issues/47441
            } as unknown as ScrollToOptions);
          }
          return resolve({
            el: to.hash,
            behavior: 'smooth',
          });
        }, 300);
      });
    }
    return { x: 0, top: 0 };
  },
});

function fromPoolToRisks(from, to) {
  return from.name === 'pool' && to.name === 'risks';
}

// https://github.com/vitejs/vite/issues/11804#issuecomment-1760951463
// Hard-reload the page when chunk load errors match the navigation error
router.onError((error, to) => {
  const errors = [
    'Failed to fetch dynamically imported module',
    'Unable to preload CSS',
  ];

  if (errors.some(e => error.message.includes(e))) {
    window.location.href = to.fullPath;
  }
});

export default applyNavGuards(router);
