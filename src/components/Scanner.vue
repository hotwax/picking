<template>  
  <ion-content class="content">
    <ion-fab vertical="start" horizontal="end">
     <ion-fab-button @click="closeScanner()" size="small" color="medium">
       <ion-icon :icon="closeOutline" />
     </ion-fab-button>
    </ion-fab> 
    <div class="scanner">
      <StreamBarcodeReader
      @decode="onDecode"
      />
    </div> 
    <ion-fab class="scan" vertical="bottom" horizontal="center">
      <ion-fab-button @mousedown="scan" @mouseout="stopScan" >
        <ion-icon :icon="scanOutline" />
      </ion-fab-button>
    </ion-fab>
  </ion-content>
</template>

<script>

import emitter from "@/event-bus"
import { StreamBarcodeReader } from "vue-barcode-reader";
import { IonContent, IonFab, IonFabButton, IonIcon, modalController } from '@ionic/vue';
import { 
  closeOutline,
  scanOutline
} from 'ionicons/icons';
export default {
  name: 'Scanner',
  components: {
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon, 
    StreamBarcodeReader,
  },  
  data () {
    return {
      flag: false,
    }
  },
  methods: {
    onDecode (result) {
      if (this.flag) {
        this.checkedProducts(result)
      }
    },
    checkedProducts (result) {
      if (result) {
        emitter.emit('checkedProducts', result);
        result = ''
      }
    },
    closeScanner () {
      modalController.dismiss({ dismissed: true });
      emitter.emit("closeScan");
    },
    scan () {
      this.flag = true;
    },
    stopScan () {
      this.flag = false;
    },
  },
  setup () {
    return {
      closeOutline,
      scanOutline
    }
  }
}
</script> 

<style scoped>
.scanner > div > div > video {
  height: 100%;
}

.overlay-element {
  display: none;
}
</style>