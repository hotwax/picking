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
        <ion-label>Store</ion-label>
      </ion-item>
      <ion-item>
        <ion-icon :icon="personCircleOutline" slot="start" />
        <ion-label>user name</ion-label>
        <ion-button fill="outline">Logout</ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { businessOutline, personCircleOutline } from 'ionicons/icons';

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
    IonTitle, 
    IonToolbar
  },
  setup(){
    return {
      businessOutline, 
      personCircleOutline
    }
  }
});
</script>

