<template>
  <ion-menu type="overlay" side="end">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t("Sort by") }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-radio-group :value="picklistItemSortBy" @ionChange="updateSortBy($event)">
          <ion-item v-for="option in sortBy" :key="option.value">
            <ion-radio slot="start" :value="option.value"/>
            <ion-label>{{ $t(option.name) }}</ion-label>
          </ion-item>
        </ion-radio-group>
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
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
  menuController
} from '@ionic/vue'
import { defineComponent } from 'vue';
import { mapGetters, useStore } from 'vuex';
import emitter from '@/event-bus';

export default defineComponent({
  name: 'FilterMenu',
  components: {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonRadio,
    IonRadioGroup,
    IonTitle,
    IonToolbar,
  },
  computed: {
    ...mapGetters({
      picklistItemSortBy: 'user/getPicklistItemSortBy'
    })
  },
  data() {
    return {
      sortBy: [
        {
          name: 'Product name',
          value: 'productName'
        },
        {
          name: 'Location ID',
          value: 'locationSeqId'
        },
        {
          name: 'Bin ID',
          value: 'picklistBinId'
        }
      ]
    }
  },
  methods: {
    async updateSortBy(event: CustomEvent) {
      await this.store.dispatch('user/updateSortBy', event.detail.value)
      emitter.emit('sortPicklists')
      menuController.close()
    }
  },
  setup() {
    const store = useStore();

    return {
      store
    };    
  }
})
</script>