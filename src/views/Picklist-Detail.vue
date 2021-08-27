<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start"></ion-back-button> 
        <ion-title v-for="picklist in pickingList" :key="picklist.picklistId">{{ picklist.picklistId }}</ion-title>
        <ion-buttons slot="end">
          <ion-button>{{ $t ("Select all") }}</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item-divider>
          <ion-label>A</ion-label>
        </ion-item-divider>
        <PicklistDetailItem :pickingList="pickingList"/>  

      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="presentAlertMultipleButtons">
          <ion-icon :icon="checkmarkDone "/>
        </ion-fab-button>
      </ion-fab>
     </ion-content>
 </ion-page>
</template>

<script lang="ts">
import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItemDivider, IonList, IonLabel, IonPage, IonTitle, IonToolbar, alertController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { checkmarkDone } from 'ionicons/icons';
import PicklistDetailItem from '@/components/Picklist-detail-item.vue';
import { mapGetters, useStore } from 'vuex';

export default defineComponent({
  name: 'PicklistDetail',
  components: {
    IonBackButton, 
    IonButton, 
    IonButtons, 
    IonContent, 
    IonFab, 
    IonFabButton, 
    IonHeader, 
    IonIcon, 
    IonItemDivider, 
    IonList, 
    IonLabel, 
    IonPage, 
    IonTitle, 
    IonToolbar,
    PicklistDetailItem
  },
  computed: {
    ...mapGetters({
      pickingList: 'picklist/getPickingList'
    })
  },
  mounted () {
    this.store.dispatch('picklist/findPickingList');
  },
    methods: {
      async presentAlertMultipleButtons() {
      const alert = await alertController
        .create({
          header: this.$t("Complete picklist"),
          buttons: [this.$t("Cancel"), this.$t("Complete")],
        });
      return alert.present();
    },
  },
  setup(){
    const store = useStore();
      return{
         checkmarkDone,
         store
      }
  }
});
</script>

