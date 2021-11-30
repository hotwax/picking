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
    <ion-content :fullscreen="true" :style="{'--background': scannerActive ? 'transparent' : '#fff'}">
      <ion-list v-if="!scannerActive">
        <ion-item-group v-for="picklist in picklistGroup" :key="picklist.alphabet" >
          <ion-item-divider>
            <ion-label> {{ picklist.alphabet }}</ion-label>
          </ion-item-divider>
          <PicklistDetailItem :picklists="picklist.record"/>
        </ion-item-group>
      </ion-list>
     </ion-content>

     <ion-footer>
      <ion-toolbar>
        <ion-buttons class="footer-buttons">
          <ion-button fill="outline" color="secondary" @click="scanCode()">
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
import { IonBackButton, IonButton, IonButtons, IonContent,IonFooter, IonHeader, IonIcon, IonItemDivider, IonItemGroup, IonLabel, IonList, IonPage, IonTitle, IonToolbar, alertController, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { barcodeOutline,checkmarkDone } from 'ionicons/icons';
import PicklistDetailItem from '@/components/Picklist-detail-item.vue';
import { mapGetters, useStore } from 'vuex';
import { Plugins } from '@capacitor/core';
import { translate } from '@/i18n'
import { showToast } from '@/utils';
import Scanner from "./Scanner.vue";
const { BarcodeScanner } = Plugins;

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
      picklists: 'picklist/getPicklists',
      picklistItem: 'picklist/getCurrent',
      selectedProducts: 'picklist/getSelectedProducts',
      getSelectedProductsToCompletePicklist: 'picklist/getSelectedProductsToCompletePicklist'
    })
  },
  data() {
    return {
      picklistGroup: [],
      scanResult: '',
      scannerActive: false
    }
  },
  props: ['id'],
  mounted () {
    this.picklistItem.pickingItemList.sort((a: any, b: any) => a.productName.localeCompare(b.productName, 'es', { sensitivity: 'base' }));
    const data = this.picklistItem.pickingItemList.reduce((r: any, e: any) => {
      const alphabet = e.productName[0];
      if (!r[alphabet]) r[alphabet] = { alphabet, record: [e] }
      else r[alphabet].record.push(e);
      return r;
    }, {});
     this.picklistGroup = Object.values(data);
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
      this.picklistItem.pickingItemList.map((picklist: any) => {
          picklist.isChecked = true;
      })
    },
    async presentAlertConfirm(header: string, message: string) {
      const alert = await alertController
      .create({
        header: header,
        message: message,
        buttons: [
          {
            text: this.$t('Okay')
          },
        ],
      });
      return alert.present();
    },
    async checkCameraPermission() {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      } else if (status.denied) {
        // the user has not given permission, showing alert message to enable camera permission in settings
        this.presentAlertConfirm(translate('No permission'), translate('Please allow camera access in your settings'));
      } else {
        // showing alert if there is any other error
        this.presentAlertConfirm(translate('Error'), translate('Unable to start camera, please try again'));
      }
      return false;
    },
    async startScan() {
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      // if the result has content
      if (result.hasContent) {
        BarcodeScanner.startScan({ targetedFormats: ['UPC_A'] })
        this.scannerActive = false;
        this.scanResult = result.content;
        const item = this.picklistItem.pickingItemList.find((product: any) => {
          if (!product.isChecked) {
            return product.productId === this.scanResult
          }
        })

        if (item) {
          item.isChecked= true;
        } else {
          showToast(translate("Product not found"))
        }
      }
    },
    async stopScan() {
      this.scannerActive = false;
      await BarcodeScanner.stopScan();
    },
    async scan() {
      const permissionGranted = await this.checkCameraPermission();
      if(permissionGranted) {
        this.scannerActive = true;
        this.startScan();
      } else {
        this.stopScan();
      }
    },
    async scanCode () {
      const modal = await modalController
        .create({
          component: Scanner,
        });
        modal.onDidDismiss()
      .then((result) => {
        //result : value of the scanned barcode/QRcode
        console.log(result);
         const item = this.pickingItemList.pickingItemList.find((product: any) => {
          if (!product.isChecked) {
            return product.productId === result.role
          }
        })

        result.role ="";

        if (item) {
          item.isChecked= true;       
        } else {
          showToast(translate("Product not found"))
        }
    });
    this.$forceUpdate();
      return modal.present();
    },
  },
  setup(){
    const store = useStore();
      return{
        barcodeOutline,
        checkmarkDone,
        store
      }
  },
  ionViewDidLeave() {
    // added condition to call stopScan method only when the scanner is active and not always
    if (this.scannerActive) {
      this.stopScan();
    }
  }
});
</script>

<style scoped>
.footer-buttons {
  justify-content: space-evenly ;
}
</style>

