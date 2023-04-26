<template>
  <ion-page>
    <PicklistFilters content-id="filter-content" />
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ $t("Picklists") }}</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button>
            <ion-icon :icon="filterOutline" />
          </ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content id="filter-content">
      <ion-refresher slot="fixed" @ionRefresh="refreshPicklists($event)">
        <ion-refresher-content pullingIcon="crescent" refreshingSpinner="crescent" />
      </ion-refresher>
      <ion-list v-if="completedPicklists.length && !hideCompleted">
        <ion-list-header lines="none">
          <ion-note>{{ $t("Completed") }}</ion-note>
        </ion-list-header>
        <PicklistItem :picklists="completedPicklists" />
      </ion-list>
      <ion-list v-if="picklists.length">
        <ion-list-header lines="none">
          <ion-note>{{ $t("In progress") }}</ion-note>
        </ion-list-header>
        <PicklistItem :picklists="picklists" />
      </ion-list>
      <div v-if="!picklists.length && (!completedPicklists.length || hideCompleted)">
        <p class="ion-text-center">{{ $t("There are no picklists available")}}</p>
      </div>
      <ion-infinite-scroll @ionInfinite="loadMorePicklists($event)" threshold="100px" :disabled="!isScrollable">
        <ion-infinite-scroll-content loading-spinner="crescent" :loading-text="$t('Loading')" />
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonRefresher,
  IonRefresherContent,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { filterOutline } from 'ionicons/icons';
import PicklistItem from '@/components/Picklist-item.vue';
import { mapGetters, useStore } from 'vuex';
import PicklistFilters from '@/components/Picklist-filters.vue';

export default defineComponent({
  name: 'Picklists',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList,
    IonListHeader,
    IonMenuButton,
    IonNote,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    PicklistItem,
    PicklistFilters
  },
  computed: {
    ...mapGetters({
      picklists: 'picklist/getPicklists',
      completedPicklists: 'picklist/getCompletedPicklists',
      isScrollable: 'picklist/isScrollable',
      hideCompleted: 'picklist/hideCompletedPicklists'
    })
  },
  methods: {
    async refreshPicklists(event: any) {
      await this.getPickLists();
      await this.getCompletedPickLists();
      if (event) event.target.complete();
    },
    async getPickLists(vSize?: any, vIndex?: any) {
      const viewSize = vSize ? vSize : process.env.VUE_APP_VIEW_SIZE;
      const viewIndex = vIndex ? vIndex : 0;
      await this.store.dispatch('picklist/findPickList', { viewSize, viewIndex })
    },
    async getCompletedPickLists() {
      await this.store.dispatch('picklist/findCompletedPickLists')
    },
    async loadMorePicklists(event: any) {
      this.getPickLists(
        undefined,
        Math.ceil(this.picklists.length / (process.env.VUE_APP_VIEW_SIZE)).toString()
      ).then(() => {
        event.target.complete();
      })
    }
  },
  ionViewDidEnter() {
    this.getCompletedPickLists();
    this.getPickLists();
  },
  setup(){
    const store = useStore();

    return {
      filterOutline,
      store
    }
  }
});
</script>

