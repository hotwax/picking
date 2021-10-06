<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start"></ion-back-button> 
        <ion-title>{{ id }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="selectAll" >{{ $t ("Select all") }}</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item-group v-for="picking in pickingListGroup" :key="picking.alphabet" >
          <ion-item-divider>
            <ion-label> {{ picking.alphabet }}</ion-label>
          </ion-item-divider>
          <PicklistDetailItem :pickingList="picking.record"/>  
        </ion-item-group>
      </ion-list>
     </ion-content>

     <ion-footer>
      <ion-toolbar>
        <ion-buttons class="footer-buttons">
          <ion-button fill="outline" color="secondary">
            <ion-icon slot="start" :icon="barcodeOutline" />{{ $t("Scan") }}
          </ion-button>
          <ion-button  @click="completeProductPicklist" fill="outline" color="success">
            <ion-icon slot="start" :icon="checkmarkDone" />{{ $t("Complete") }}
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
 </ion-page>
</template>

<script lang="ts">
import { IonBackButton, IonButton, IonButtons, IonContent,IonFooter, IonHeader, IonIcon, IonItemDivider, IonItemGroup, IonLabel, IonList, IonPage, IonTitle, IonToolbar, alertController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { barcodeOutline,checkmarkDone } from 'ionicons/icons';
import PicklistDetailItem from '@/components/Picklist-detail-item.vue';
import { mapGetters, useStore } from 'vuex';

export default defineComponent({
  name: 'PicklistDetail',
  components: {
    IonBackButton, 
    IonButton, 
    IonButtons, 
    IonContent,
    IonFooter, 
    IonHeader, 
    IonIcon,
    IonItemDivider,
    IonItemGroup, 
    IonLabel,
    IonList,
    IonPage, 
    IonTitle, 
    IonToolbar,
    PicklistDetailItem
  },
  computed: {
    ...mapGetters({
      pickingList: 'picklist/getPickingList',
      pickingItemList: 'picklist/getCurrent',
      selectedProducts: 'picklist/getSelectedProducts',
      getSelectedProductsToCompletePicklist: 'picklist/getSelectedProductsToCompletePicklist'
    })
  },
  data() {
    return {
      pickingListGroup: []
    }
  },
  props: ['id'],
  mounted () {
    this.pickingItemList.sort((a: any, b: any) => a.productName.localeCompare(b.productName, 'es', { sensitivity: 'base' }));
    const data = this.pickingItemList.reduce((r: any, e: any) => {
      const alphabet = e.productName[0];
      if (!r[alphabet]) r[alphabet] = { alphabet, record: [e] }
      else r[alphabet].record.push(e);
      return r;
    }, {});
     this.pickingListGroup = Object.values(data);
  },
    methods: {
      async completePicklists() {
      const selectedProducts = this.getSelectedProductsToCompletePicklist("_NA_");  
      return this.store.dispatch("picklist/completePicklists", {
          headers: {
              'Content-Type': 'multipart/form-data;'
          }
      }).then(() => {
        this.store.dispatch("picklist/completePicklists", { items: selectedProducts });
      })
    },
      async completeProductPicklist() {
      const alert = await alertController
        .create({
          header: this.$t("Complete picklist"),
          buttons: [
            {
              text: this.$t('Cancel'),
              role: 'cancel',
              handler: blah => {
                console.log('Confirm Cancel:', blah)
              },
            },
            {
              text:this.$t('Complete'),
              handler: () => {
                this.completePicklists();
                
              },
            },
          ],
        });
      return alert.present();
    },
    selectAll() {
      this.pickingItemList.map((picklist: any) => {
          picklist.isChecked = true;
      })
    },
  },
  setup(){
    const store = useStore();
      return{
        barcodeOutline,
        checkmarkDone,
        store
      }
  }
});
</script>

<style scoped>
.footer-buttons {
  justify-content: space-evenly ;
}
</style>

