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
          <ion-item>
            <ion-radio slot="start" value="productName"/>
            <ion-label>{{ $t("Product name") }}</ion-label>
          </ion-item>
          <ion-item>
            <ion-radio slot="start" value="locationSeqId"/>
            <ion-label>{{ $t("Location ID") }}</ion-label>
          </ion-item>
          <ion-item>
            <ion-radio slot="start" value="picklistBinId"/>
            <ion-label>{{ $t("Bin ID") }}</ion-label>
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
import { idCardOutline, toggleOutline } from 'ionicons/icons'
import { defineComponent } from 'vue';
import { mapGetters, useStore } from 'vuex';
import { translate } from '@hotwax/dxp-components'
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
  methods: {
    closeMenu() {
      menuController.close()
    },
    async updateSortBy(event: CustomEvent) {
      await this.store.dispatch('user/updateSortBy', event.detail.value)
      emitter.emit('sortPicklists')
      menuController.close()
    }
  },
  setup() {
    const store = useStore();

    return {
      idCardOutline,
      store,
      toggleOutline,
      translate
    };    
  }
})
</script>