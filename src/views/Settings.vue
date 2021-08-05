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
      <ion-select interface="popover" placeholder="store name">
        <ion-select-option value="store1">Store 1</ion-select-option>
        <ion-select-option value="store2">Store 2</ion-select-option>
        <ion-select-option value="store3">Store 3</ion-select-option>
        <ion-select-option value="store4">Store 4</ion-select-option>
      </ion-select>
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
import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/vue';
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
    IonSelect,
    IonSelectOption,
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
<style scoped>
ion-select {
  --placeholder-opacity: 1;
}
</style>

