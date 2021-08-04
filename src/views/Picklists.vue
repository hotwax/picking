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
        <PicklistItem />
      </ion-list>
      <ion-list>
        <ion-list-header lines="none">
          <ion-label>{{ $t("In progress") }}</ion-label>
        </ion-list-header>
        <PicklistItem />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { filter } from 'ionicons/icons';
import PicklistItem from '@/components/Picklist-item.vue';

export default defineComponent({
  name: 'Picklists',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel, 
    IonList, 
    IonListHeader, 
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    PicklistItem
  },
  setup(){
    return {
      filter
    }
  }
});
</script>

