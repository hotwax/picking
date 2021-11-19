<template>
  <ion-app>
    <ion-menu side="end" type="overlay" menu-id="filter" content-id="main">
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ $t("Filters") }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item> {{ $t("Only show my picklists") }}
            <ion-toggle slot="end"></ion-toggle>
          </ion-item>
          <ion-item>{{ $t("Hide completed picklists") }}
            <ion-toggle slot="end"></ion-toggle>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-router-outlet id="main" />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonContent, IonHeader, IonItem, IonList, IonMenu, IonRouterOutlet, IonTitle, IonToggle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { loadingController } from '@ionic/vue';
import emitter from "@/event-bus"


export default defineComponent({
  name: 'App',
  components: {
    IonApp, 
    IonContent, 
    IonHeader, 
    IonItem, 
    IonList, 
    IonMenu, 
    IonRouterOutlet,
    IonTitle, 
    IonToggle, 
    IonToolbar
  },
  data() {
    return {
      loader: null as any
    }
  },
  methods: {
    async presentLoader() {
      this.loader = await loadingController
        .create({
          message: this.$t("Click the backdrop to dismiss."),
          translucent: true,
          backdropDismiss: true
        });
      await this.loader.present();
    },
    dismissLoader() {
      if (this.loader) {
        this.loader.dismiss();
      }
    }
  },
  mounted() {
    emitter.on('presentLoader', this.presentLoader);
    emitter.on('dismissLoader', this.dismissLoader);
  },
  unmounted() {
    emitter.off('presentLoader', this.presentLoader);
    emitter.off('dismissLoader', this.dismissLoader);
  },
});
</script>