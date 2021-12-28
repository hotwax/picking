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
      <ion-list v-if="picklists.length">
        <ion-list-header lines="none">
          <ion-label>{{ $t("In progress") }}</ion-label>
        </ion-list-header>
        <PicklistItem :picklists="picklists"/>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { filter } from 'ionicons/icons';
import PicklistItem from '@/components/Picklist-item.vue';
import { mapGetters, useStore } from 'vuex';

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
  computed: {
    ...mapGetters({
      picklists: 'picklist/getPicklists'
    })
  },
  updated () {
    this.store.dispatch('picklist/findPickList').catch(err =>
      this.store.dispatch('picklist/clearPicklist')
    )
  },
  setup(){
    const store = useStore();

    return {
      filter,
      store
    }
  }
});
</script>

