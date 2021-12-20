<template>
  <ion-toolbar>
    <ion-buttons slot="end" @click="closeScanner()" >
      <ion-button >
        <ion-icon :icon="closeOutline" />
      </ion-button>
    </ion-buttons>  
  </ion-toolbar>   
  <ion-content class="content">
    <div class="scanner">
      <StreamBarcodeReader
      @decode="onDecode"
      />
    </div> 
    <ion-fab class="scan">
      <ion-fab-button @mousedown="scan" @mouseout="stopScan" >
        <ion-icon :icon="scanOutline" />
      </ion-fab-button>
    </ion-fab>
  </ion-content>
</template>

<script>
import emitter from "@/event-bus"
import { StreamBarcodeReader } from "vue-barcode-reader";
import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonIcon, IonToolbar, modalController } from '@ionic/vue';
import { 
  closeOutline,
  scanOutline
} from 'ionicons/icons';
export default {
  name: 'Scanner',
  components: {
    IonButton, 
    IonButtons,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon, 
    IonToolbar,
    StreamBarcodeReader,
  },  
  data(){
    return{
      flag:false,
    }
  },
  methods: {
    onDecode (result) {
      if(this.flag){
        this.checkedProducts(result)
      }
    },
    checkedProducts(result){
      if(result){
        emitter.emit('checkedProducts', result);
        result = ''
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
      closeOutline,
      scanOutline
    }
  }
}
</script> 
<style scoped>
.scan{
  position: absolute;
  bottom: 15%;
  right: 50%;
}
.content{
  min-height: 100%;
}
.scanner{
  position: absolute;
  bottom: 0%;
  top: 0%;
  max-width: 100%;
}

</style>