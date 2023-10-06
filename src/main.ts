import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './registerServiceWorker'
import { DateTime } from 'luxon';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import '@hotwax/apps-theme';

import i18n from './i18n'
import store from './store'
import { dxpComponents } from '@hotwax/dxp-components'
import { login, logout, loader } from './user-utils';
import { getConfig, initialise } from './adapter';

const app = createApp(App)
  .use(IonicVue, {
    mode: 'md'
  })
  .use(router)
  .use(i18n)
  .use(store)
  .use(dxpComponents, {
    defaultImgUrl: require("@/assets/images/defaultImage.png"),
    login,
    logout,
    loader,
    appLoginUrl: process.env.VUE_APP_LOGIN_URL as string,
    getConfig,
    initialise
  });

// Filters are removed in Vue 3 and global filter introduced https://v3.vuejs.org/guide/migration/filters.html#global-filters
app.config.globalProperties.$filters = {
  formatDate(value: any, inFormat?: string, outFormat?: string) {
    // TODO Make default format configurable and from environment variables
    if(inFormat){
      return DateTime.fromFormat(value, inFormat).toFormat(outFormat ? outFormat : 'MM-dd-yyyy');
    }
    return DateTime.fromISO(value).toFormat(outFormat ? outFormat : 'MM-dd-yyyy');  },
  formatTime(value: any, inFormat?: string, outFormat?: string) {
    // TODO Make default format configurable and from environment variables
    return DateTime.fromISO(value).toFormat(outFormat ? outFormat : 'hh:mm a');
  },
  formatUtcDate(value: any, inFormat?: any, outFormat?: string) {
    // TODO Make default format configurable and from environment variables
    const userProfile = store.getters['user/getUserProfile'];
    // TODO Fix this setDefault should set the default timezone instead of getting it everytiem and setting the tz
    return DateTime.fromISO(value, { zone: 'utc' }).setZone(userProfile.userTimeZone).toFormat(outFormat ? outFormat : 'MM-dd-yyyy')  
  },
  getFeature(featureHierarchy: any, featureKey: string) {
    let featureValue = ''
    if (featureHierarchy) {
      const feature = featureHierarchy.find((featureItem: any) => featureItem.startsWith(featureKey))
      const featureSplit = feature ? feature.split('/') : [];
      featureValue = featureSplit[2] ? featureSplit[2] : '';
    }
    return featureValue;
  },
  getFeatures(featureHierarchy: any, featureKey: string) {
    let featuresValue = ''
    if (featureHierarchy) {
      featureHierarchy.filter((featureItem: any) => featureItem.startsWith(featureKey)).forEach((feature: any) => {
        const featureSplit = feature ? feature.split('/') : [];
        const featureValue = featureSplit[2] ? featureSplit[2] : '';
        featuresValue +=  " " + featureValue;
      })
    }
    // trim removes extra white space from beginning for the first feature
    return featuresValue.trim();
  },
  getFeaturesList(featureHierarchy: any, featureKey: string) {
    let  featuresList = []
    if (featureHierarchy) {
      featuresList = featureHierarchy.filter((featureItem: any) => featureItem.startsWith(featureKey)).map((feature: any) => {
        const featureSplit = feature ? feature.split('/') : [];
        const featureValue = featureSplit[2] ? featureSplit[2] : '';
        return featureValue;
      })
    }
    return featuresList;
  }
}


router.isReady().then(() => {
  app.mount('#app');
});