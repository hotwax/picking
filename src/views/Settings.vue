<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ $t("Settings") }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-icon :icon="businessOutline" slot="start" />
        <ion-label>{{$t("Store")}}</ion-label>
        <ion-select interface="popover" :placeholder="$t('store name')" :value="currentFacility.facilityId" @ionChange="setFacility($event)">
          <ion-select-option v-for="facility in (userProfile ? userProfile.facilities : [])" :key="facility.facilityId" :value="facility.facilityId" >{{ facility.name }}</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-icon :icon="codeWorkingOutline" slot="start"/>
        <ion-label>{{ $t("OMS") }}</ion-label>
        <ion-note slot="end">{{ instanceUrl }}</ion-note>
      </ion-item>
      <ion-item>
        <ion-icon :icon="personCircleOutline" slot="start" />
        <ion-label>{{ userProfile !== null ? userProfile.partyName : '' }}</ion-label>
        <ion-button slot="end" fill="outline" color="dark" @click="logout()">{{ $t("Logout") }}</ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { businessOutline, personCircleOutline, codeWorkingOutline } from 'ionicons/icons';
import { mapGetters, useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Settings',
  components: {
    IonButton, 
    IonContent, 
    IonHeader, 
    IonIcon, 
    IonItem, 
    IonLabel, 
    IonPage, 
    IonSelect,
    IonSelectOption,
    IonTitle, 
    IonToolbar
  },
  computed: {
    ...mapGetters({
      userProfile: 'user/getUserProfile',
      currentFacility: 'user/getCurrentFacility',
      uploadProducts: 'product/getUploadProducts',
      instanceUrl: 'user/getInstanceUrl'
    })
  },
  methods: {
    logout () {
      this.store.dispatch('user/logout').then(() => {
        this.store.dispatch('picklist/clearPicklist')
        this.router.push('/login');
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
    }
  },
  setup(){
    const store = useStore();
    const router = useRouter();

    return {
      businessOutline,
      codeWorkingOutline, 
      personCircleOutline,
      store,
      router
    }
  }
});
</script>
<style scoped>
ion-select {
  --placeholder-opacity: 1;
}
</style>

