<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ $t("Settings") }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="user-profile">
        <ion-card>
          <ion-item lines="full">
            <ion-avatar slot="start" v-if="userProfile?.partyImageUrl">
              <Image :src="userProfile.partyImageUrl"/>
            </ion-avatar>
            <!-- ion-no-padding to remove extra side/horizontal padding as additional padding 
            is added on sides from ion-item and ion-padding-vertical to compensate the removed
            vertical padding -->
            <ion-card-header class="ion-no-padding ion-padding-vertical">
              <ion-card-subtitle>{{ userProfile?.userLoginId }}</ion-card-subtitle>
              <ion-card-title>{{ userProfile?.partyName }}</ion-card-title>
            </ion-card-header>
          </ion-item>
          <ion-button color="danger" @click="logout()">{{ $t("Logout") }}</ion-button>
          <ion-button fill="outline" @click="goToLaunchpad()">
            {{ $t("Go to Launchpad") }}
            <ion-icon slot="end" :icon="openOutline" />
          </ion-button>
          <!-- Commenting this code as we currently do not have reset password functionality -->
          <!-- <ion-button fill="outline" color="medium">{{ $t("Reset password") }}</ion-button> -->
        </ion-card>
      </div>
      <div class="section-header">
        <h1>{{ $t('OMS') }}</h1>
      </div>
      <section>
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>
              {{ $t("OMS instance") }}
            </ion-card-subtitle>
            <ion-card-title>
              {{ baseURL ? baseURL : instanceUrl }}
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            {{ $t('This is the name of the OMS you are connected to right now. Make sure that you are connected to the right instance before proceeding.') }}
          </ion-card-content>
          <ion-button @click="goToOms" fill="clear">
            {{ $t('Go to OMS') }}
            <ion-icon slot="end" :icon="openOutline" />
          </ion-button>
        </ion-card>
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              {{ $t("Facility") }}
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            {{ $t('Specify which facility you want to operate from. Order, inventory and other configuration data will be specific to the facility you select.') }}
          </ion-card-content>
          <ion-item lines="none">
            <ion-label>{{ $t("Select facility") }}</ion-label>
            <ion-select interface="popover" :value="currentFacility.facilityId" @ionChange="setFacility($event)">
              <ion-select-option v-for="facility in (userProfile ? userProfile.facilities : [])" :key="facility.facilityId" :value="facility.facilityId" >{{ facility.name }}</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-card>
      </section>
      <hr />
      <div class="section-header">
        <h1>
          {{ $t('App') }}
          <p class="overline" >{{ "Version: " + appVersion }}</p>
        </h1>
        <p class="overline">{{ "Built: " + getDateTime(appInfo.builtTime) }}</p>
      </div>
      <section>
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              {{ $t('Timezone') }}
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            {{ $t('The timezone you select is used to ensure automations you schedule are always accurate to the time you select.') }}
          </ion-card-content>
          <ion-item lines="none">
            <ion-label> {{ userProfile && userProfile.userTimeZone ? userProfile.userTimeZone : '-' }} </ion-label>
            <ion-button @click="changeTimeZone()" slot="end" fill="outline" color="dark">{{ $t("Change") }}</ion-button>
          </ion-item>
        </ion-card>
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              {{ $t("Sort picklist items") }}
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            {{ $t('Sorting reorders items in a picklist based on inventory location or custom preferences.') }}
          </ion-card-content>
          <ion-item lines="none">
            <ion-label>{{ $t("Sort by") }}</ion-label>
            <ion-select interface="popover" :value="picklistItemSortBy" @ionChange="updateSortBy($event)">
              <ion-select-option v-for="option in sortBy" :key="option.value" :value="option.value" >{{ option.name }}</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-card>

        <!-- Product Identifier -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              {{ $t('Product Identifier') }}
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            {{ $t('Choosing a product identifier allows you to view products with your preferred identifiers.') }}
          </ion-card-content>

          <ion-item>
            <ion-label>{{ $t("Primary Product Identifier") }}</ion-label>
            <ion-select interface="popover" :placeholder="$t('primary identifier')" :value="productIdentificationPref.primaryId" @ionChange.="setProductIdentificationPref($event.detail.value, 'primaryId')">
              <ion-select-option v-for="identification in productIdentificationOptions" :key="identification" :value="identification" >{{ identification }}</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>{{ $t("Secondary Product Identifier") }}</ion-label>
            <ion-select interface="popover" :placeholder="$t('secondary identifier')" :value="productIdentificationPref.secondaryId" @ionChange="setProductIdentificationPref($event.detail.value, 'secondaryId')">
              <ion-select-option v-for="identification in productIdentificationOptions" :key="identification" :value="identification" >{{ identification }}</ion-select-option>
              <ion-select-option value="">{{ $t("None") }}</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-card>
      </section>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, modalController } from '@ionic/vue';
import { defineComponent, inject } from 'vue';
import { businessOutline, personCircleOutline, codeWorkingOutline, openOutline, timeOutline } from 'ionicons/icons'; 
import { mapGetters, useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Image from '@/components/Image.vue';
import { DateTime } from 'luxon';
import TimeZoneModal from '@/views/TimezoneModal.vue';
import { useProductIdentificationStore } from '@hotwax/dxp-components';
import { showToast } from '@/utils'; 

export default defineComponent({
  name: 'Settings',
  components: {
    IonAvatar,
    IonButton, 
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent, 
    IonHeader, 
    IonIcon, 
    IonItem, 
    IonLabel, 
    IonPage, 
    IonSelect,
    IonSelectOption,
    IonTitle, 
    IonToolbar,
    Image
  },
  data() {
    return {
      baseURL: process.env.VUE_APP_BASE_URL,
      appInfo: (process.env.VUE_APP_VERSION_INFO ? JSON.parse(process.env.VUE_APP_VERSION_INFO) : {}) as any,
      appVersion: "",
      sortBy: [
        {
          name: 'Product name',
          value: 'productName'
        },
        {
          name: 'Location ID',
          value: 'locationSeqId'
        },
        {
          name: 'Bin ID',
          value: 'picklistBinId'
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      userProfile: 'user/getUserProfile',
      currentFacility: 'user/getCurrentFacility',
      uploadProducts: 'product/getUploadProducts',
      instanceUrl: 'user/getInstanceUrl',
      picklistItemSortBy: 'user/getPicklistItemSortBy'
    })
  },
  mounted() {
    this.appVersion = this.appInfo.branch ? (this.appInfo.branch + "-" + this.appInfo.revision) : this.appInfo.tag;
  },
  methods: {
    async changeTimeZone() {
      const timeZoneModal = await modalController.create({
        component: TimeZoneModal,
      });
      return timeZoneModal.present();
    },
    logout () {
      this.store.dispatch('user/logout').then(() => {
        this.store.dispatch('picklist/clearPicklist')
        const redirectUrl = window.location.origin + '/login'
        window.location.href = `${process.env.VUE_APP_LOGIN_URL}?isLoggedOut=true&redirectUrl=${redirectUrl}`
      })
    },
    setFacility (facility: any) {
      if (this.userProfile){
        this.userProfile.facilities.map((fac: any) => {
          if (fac.facilityId == facility['detail'].value) {
            this.store.dispatch('user/setFacility', {'facility': fac});
          }
        })
      }
    },
    goToOms(){
      window.open(this.instanceUrl.startsWith('http') ? this.instanceUrl.replace('api/', "") : `https://${this.instanceUrl}.hotwax.io/`, '_blank', 'noopener, noreferrer');
    },
    goToLaunchpad() {
      window.location.href = `${process.env.VUE_APP_LOGIN_URL}`
    },
    getDateTime(time: any) {
      return DateTime.fromMillis(time).toLocaleString(DateTime.DATETIME_MED);
    },
    updateSortBy(event: any) {
      this.store.dispatch('user/updateSortBy', event.detail.value)
    }
  },
  setup(){
    const store = useStore();
    const router = useRouter();

    /* Start Product Identifier */

    const productIdentificationStore = useProductIdentificationStore();
    const productIdentificationOptions = productIdentificationStore.getProductIdentificationOptions;

    // Injecting identifier preference from app.view
    const productIdentificationPref: any  = inject("productIdentificationPref");

    // Function to set the value of productIdentificationPref using dxp-component
    const setProductIdentificationPref = (value: string, id: string) =>  {
      const eComStore = store.getters['user/getCurrentEComStore'];
      
      // If productPreference value is same as ion change value then not calling the set function as there is no change 
      if(eComStore.productStoreId && (productIdentificationPref.value[id] !== value)){
        productIdentificationStore.setProductIdentificationPref(id, value, eComStore.productStoreId)
          .then(() => {
            showToast("Product identifier preference updated");
          })
          .catch(error => console.error(error)); 
      } 
    }

    /* End Product Identifier */

    return {
      businessOutline,
      codeWorkingOutline, 
      personCircleOutline,
      openOutline,
      store,
      timeOutline,
      router,
      productIdentificationOptions,
      productIdentificationPref,
      setProductIdentificationPref
    }
  }
});
</script>

<style scoped>
  ion-card > ion-button {
    margin: var(--spacer-xs);
  }
  section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    align-items: start;
  }
  .user-profile {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacer-xs) 10px 0px;
  }
</style>
