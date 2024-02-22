<template>
  <ion-menu side="end" content-id="main-content" type="overlay">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t("Filters") }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item lines="none">
          <ion-toggle :checked="showMine" @ionChange="showMyPicklists($event)">{{ $t("Only show my picklists") }}</ion-toggle>
        </ion-item>
        <ion-item lines="none">
          <ion-toggle :checked="hideCompleted" @ionChange="hideCompletedPicklists($event)">{{ $t("Hide completed picklists") }}</ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToggle,
  IonToolbar
} from "@ionic/vue";
import { defineComponent } from "vue";
import { mapGetters, useStore } from 'vuex'

export default defineComponent({
  name: "PicklistFilters",
  components: {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToggle,
    IonToolbar
  },
  computed: {
    ...mapGetters({
      user: 'user/getUserProfile',
      hideCompleted: 'picklist/hideCompletedPicklists',
      showMine: 'picklist/showMyPicklists',
    })
  },
  methods: {
    async showMyPicklists(event: any) {
      //Handled case for programmatic change of value
      if (this.showMine == event.detail.checked) return;
      this.store.dispatch('picklist/setFilters', { showMyPicklists: event.detail.checked });
      await this.store.dispatch('picklist/findPickList', { viewSize: process.env.VUE_APP_VIEW_SIZE, viewIndex: 0 });
      await this.store.dispatch('picklist/findCompletedPickLists');
    },
    hideCompletedPicklists(event: any) {
      this.store.dispatch('picklist/setFilters', { hideCompletedPicklists: event.detail.checked });
    }
  },
  setup() {
    const store = useStore();
    return {
      store
    };
  },
});
</script>
