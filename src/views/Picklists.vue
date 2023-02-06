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
    
    <ion-content>
      <ion-list v-if="picklists.length">
        <ion-list-header lines="none">
          <ion-label>{{ $t("In progress") }}</ion-label>
        </ion-list-header>
        <PicklistItem :picklists="picklists"/>
      </ion-list>
      <div v-else>
        <p class="ion-text-center">{{ $t("There are no picklists available")}}</p>
      </div>
      <ion-infinite-scroll @ionInfinite="loadMorePicklists($event)" threshold="100px" :disabled="!isScrollable">
        <ion-infinite-scroll-content loading-spinner="crescent" :loading-text="$t('Loading')" />
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButtons, IonContent, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
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
    IonInfiniteScroll,
    IonInfiniteScrollContent,
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
      picklists: 'picklist/getPicklists',
      currentFacilityId: 'user/getCurrentFacility',
      isScrollable: 'picklist/isScrollable'
    })
  },
  methods: {
    async getPickLists(vSize?: any, vIndex?: any) {
      const viewSize = vSize ? vSize : process.env.VUE_APP_VIEW_SIZE;
      const viewIndex = vIndex ? vIndex : 0;

      this.store.dispatch('picklist/findPickList', { viewSize, viewIndex }).catch(err =>
        this.store.dispatch('picklist/clearPicklist')
      )
    },
    async loadMorePicklists(event: any) {
      this.getPickLists(
        undefined,
        Math.ceil(this.picklists.length / process.env.VUE_APP_VIEW_SIZE).toString()
      ).then(() => {
        event.target.complete();
      })
    },
  },
  ionViewDidEnter() {
    this.getPickLists();
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

