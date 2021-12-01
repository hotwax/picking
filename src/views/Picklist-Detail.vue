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
          <ion-button fill="outline" color="secondary" @click="scan()">
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

<script>
import { IonBackButton, IonButton, IonButtons, IonContent,IonFooter, IonHeader, IonIcon, IonItemDivider, IonItemGroup, IonLabel, IonList, IonPage, IonTitle, IonToolbar, alertController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { barcodeOutline,checkmarkDone } from 'ionicons/icons';
import PicklistDetailItem from '@/components/Picklist-detail-item.vue';
import { mapGetters, useStore } from 'vuex';
import { Plugins } from '@capacitor/core';
import { translate } from '@/i18n'
import { showToast } from '@/utils';
import { useRouter } from 'vue-router';
import { JsonCSV } from '@/mixins/jsonToCsv'
import emitter from '@/event-bus'

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
      products: 'product/getList',
      getProduct: 'product/getProduct',
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
  mixins: [JsonCSV],
  mounted () {
    this.picklistItem.pickingItemList.sort((a, b) => a.productName.localeCompare(b.productName, 'es', { sensitivity: 'base' }));
    const data = this.picklistItem.pickingItemList.reduce((r, e) => {
      const alphabet = e.productName[0];
      if (!r[alphabet]) r[alphabet] = { alphabet, record: [e] }
      else r[alphabet].record.push(e);
      return r;
    }, {});
     this.picklistGroup = Object.values(data);
    emitter.on("export-finished", this.completePicklists)
  },
    methods: {
         async completePicklists(blob) {
      console.log(this.picklistItem)
     
      const picklistChecked = this.picklistItem.pickingItemList.some((picklist) =>
        picklist.isChecked
      )
      if(picklistChecked) {
        const formData = new FormData();
        const fileName = "CompletePicklist_" + Date.now() +".csv";
        formData.append("uploadedFile", blob, fileName);
        formData.append("configId", "IMP_UPD_PKLST_ITM_ST");

        return this.store.dispatch("picklist/completePicklists", {
          headers: {
            'Content-Type': 'multipart/form-data;'
          },
          data: formData
        }).then(() => {
          this.router.push("/tabs/picklists");
        })
      } else {
        showToast(translate("Something went wrong"));
      }
    },
      async completeProductPicklist() {
      const alert = await alertController
        .create({
          header: this.$t("Complete picklist"),
          buttons: [
            {
              text: this.$t('Cancel'),
              role: 'cancel'
            },
            {
              text:this.$t('Complete'),
              handler: () => {
                if (this.picklistItem.pickingItemList.some((picklist) => picklist.isChecked)) this.generate();
                else showToast(translate("No item has been picked"));
              },
            },
          ],
        });
      return alert.present();
    },
    selectAll() {
      this.picklistItem.pickingItemList.map((picklist) => {
          picklist.isChecked = true;
      })
    },
    async presentAlertConfirm(header, message) {
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
        const item = this.picklistItem.find((product) => {
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
    }
  },
  setup(){
    const store = useStore();
    const router = useRouter();
      return{
        barcodeOutline,
        checkmarkDone,
        store,
        router
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
  justify-content: stretch;
}
</style>

