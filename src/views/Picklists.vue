<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ $t("Picklists") }}</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button>
            <ion-icon :icon="filter" />
          </ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-list-header lines="none">
          <ion-label>{{ $t("Completed") }}</ion-label>
        </ion-list-header>
        <ion-item detail>
          <ion-label>Picker name(s)</ion-label>
          <ion-note slot="end">created time</ion-note>
        </ion-item>
         <ion-item lines="none" detail>
          <ion-label>Picker name(s)</ion-label>
          <ion-note slot="end">created time</ion-note>
        </ion-item>
      </ion-list>
      <ion-list>
        <ion-list-header lines="none">
          <ion-label>{{ $t("In progress") }}</ion-label>
        </ion-list-header>
        <ion-item detail>
          <ion-label>Picker name(s)</ion-label>
          <ion-note slot="end">created time</ion-note>
        </ion-item>
         <ion-item detail>
          <ion-label>Picker name(s)</ion-label>
          <ion-note slot="end">created time</ion-note>
        </ion-item>
         <ion-item detail>
          <ion-label>Picker name(s)</ion-label>
          <ion-note slot="end">created time</ion-note>
        </ion-item>
         <ion-item detail>
          <ion-label>Picker name(s)</ion-label>
          <ion-note slot="end">created time</ion-note>
        </ion-item>
         <ion-item detail>
          <ion-label>Picker name(s)</ion-label>
          <ion-note slot="end">created time</ion-note>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { filter } from 'ionicons/icons';

export default defineComponent({
  name: 'Picklists',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel, 
    IonList, 
    IonListHeader, 
    IonMenuButton,
    IonNote,
    IonPage,
    IonTitle,
    IonToolbar
  },
  setup(){
    return {
      filter
    }
  }
});
</script>

