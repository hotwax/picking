<template>
  <ion-menu side="end" content-id="main-content" type="overlay">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t("Filters") }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <section>
          <ion-item lines="none">
            <ion-label>{{ $t("Only show my picklists") }}</ion-label>
            <ion-toggle :checked="showMine" @ionChange="showMyPicklists($event)" slot="end" />
          </ion-item>
          <ion-item lines="none">
            <ion-label>{{ $t("Hide completed picklists") }}</ion-label>
            <ion-toggle :checked="hideCompleted" @ionChange="hideCompletedPicklists($event)" slot="end" />
          </ion-item>
        </section>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
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
    IonLabel,
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
      showMine: 'picklist/showMyPicklists'
    })
  },
  methods: {
    async showMyPicklists(event: any, viewSize = process.env.VUE_APP_VIEW_SIZE, viewIndex = '0') {
      this.store.dispatch('picklist/setFilters', { showMyPicklists: event.detail.checked });
      if(this.showMine) {
        await this.store.dispatch('picklist/fetchPickLists', { viewSize, viewIndex, partyId: this.user.partyId });
        await this.store.dispatch('picklist/fetchCompletedPickLists', { partyId: this.user.partyId });
      } else {
        await this.store.dispatch('picklist/fetchPickLists', { viewSize, viewIndex });
        await this.store.dispatch('picklist/fetchCompletedPickLists');
      }
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