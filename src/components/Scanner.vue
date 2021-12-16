<template>
  <ion-toolbar>
    <ion-buttons slot="end" @click="closeScanner()" >
      <ion-button >
        <ion-icon :icon="closeOutline" />
      </ion-button>
    </ion-buttons>  
  </ion-toolbar>   
  <div class="scanner">
    <StreamBarcodeReader
    @decode="onDecode"
    />
  </div> 
  <ion-button @mousedown="scan" @mouseout="stopScan" class="scan">Scan</ion-button>
</template>

<script>
import { mapGetters} from 'vuex';
import { StreamBarcodeReader } from "vue-barcode-reader";
import { translate } from '@/i18n'
import { showToast } from '@/utils';
import { IonButton, IonButtons, IonIcon, IonToolbar, modalController } from '@ionic/vue';
import { 
  closeOutline
} from 'ionicons/icons';
export default {
  name: 'Scanner',
  components: {
    IonButton,
    IonButtons,
    IonIcon, 
    IonToolbar,
    StreamBarcodeReader,
  },  
  computed: {
    ...mapGetters({
      picklists: 'picklist/getPicklists',
      picklistItem: 'picklist/getCurrent',
    })
  },
  data(){
    return{
      flag:false,
    }
  },
  methods: {
   onDecode (result) {
     if(this.flag === true){
       console.log(result);
       this.checkedProducts(result)
      // modalController.dismiss({dismissed: true, value: result});
     }
    },
    checkedProducts(result){
      const item = result && this.picklistItem.pickingItemList.find((product) => !product.isChecked && product.productId === result)
      if (item) {
        item.isChecked = true;
        showToast(translate("Product found"));
        result = ''
      } else {
        showToast(translate("Product not found"))
      }
    },
    closeScanner(){
      modalController.dismiss({dismissed: true});
    },
    scan(){
      this.flag = true;
    },
    stopScan(){
      this.flag = false;
    },
  },
  setup() {
    return {
      closeOutline
    }
  }
}
</script> 
<style scoped>
.scan{
  position: absolute;
  right: 45%;
  bottom: 5%;
}
</style>