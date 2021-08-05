<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start"></ion-back-button> 
        <ion-title>Picklist ID</ion-title>
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
        <PicklistDetailItem />  

        <ion-item-divider>
          <ion-label>B</ion-label>
        </ion-item-divider>
        <PicklistDetailItem />
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

export default defineComponent({
  name: 'Settings',
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
  methods: {
      async presentAlertMultipleButtons() {
      const alert = await alertController
        .create({
          header: 'Complete picklist',
          buttons: ['Cancel', 'Complete'],
        });
      return alert.present();
    },
  },
  setup(){
      return{
          checkmarkDone 
      }
  }
});
</script>

