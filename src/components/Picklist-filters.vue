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
  setup() {
    const store = useStore();
    return {
      store
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/getUserProfile',
      picklists: 'picklist/getPicklists',
      completedPicklists: 'picklist/getCompletedPicklists',
      hideCompleted: 'picklist/hideCompletedPicklists',
      showMine: 'picklist/showMyPicklists'
    })
  },
  methods: {
    showMyPicklists(event: any) {
      this.store.dispatch('picklist/setFilters', { showMyPicklists: event.detail.checked });
      if(this.showMine) {
        this.picklists.filter((picklist: any) => this.user.partyId === picklist.partyId)
        this.completedPicklists.filter((picklist: any) => this.user.partyId === picklist.partyId)
      }
    },
    hideCompletedPicklists(event: any) {
      this.store.dispatch('picklist/setFilters', { hideCompletedPicklists: event.detail.checked });
    }
  },
});
</script>