<template>
   <ion-item>
     <ion-thumbnail slot="start">
       <img src="https://cdn.shopify.com/s/files/1/0018/5434/1235/products/SUPERGA_2790-ACOTW_RED-FABRIC_SIDE.jpg?v=1576513664" />
     </ion-thumbnail>  
     <ion-label>
       <p class="caption">{{ $t("STYLE") }}</p>
       <h2>SK900978</h2>
       <p>{{ $t("Size") }}</p>
       <p>{{ $t("Color") }}</p>
     </ion-label>
     <ion-checkbox slot="end"></ion-checkbox>
    </ion-item>
    <ion-item>
      <ion-thumbnail slot="start">
        <img src="https://cdn.shopify.com/s/files/1/0018/5434/1235/products/SUPERGA_2750-BUTRICH_WHITE-BLACK_SIDE.jpg?v=1576513621" />
      </ion-thumbnail>  
      <ion-label>
        <p class="caption">{{ $t("STYLE") }}</p>
        <h2>DF562398</h2>
        <p>Size</p>
        <p>Color</p>
      </ion-label>
      <ion-checkbox slot="end"></ion-checkbox>
    </ion-item>
    <ion-item>
      <ion-thumbnail slot="start">
        <img src="https://cdn.shopify.com/s/files/1/0018/5434/1235/products/AADaPpBOMgU98hB-x2Rf87zLYuxkkdygPo-8VQsdf_TFLTjnl_O_j3BOmCiCU-_eX6cEy6UPoVPcp1PfS7dpWGW2ct64YoZQvKMSH_BjGZTSwks5tIQ-rpmt-F9ErjgaeZWt1b_1_sQylDsPX2TdwF-744X6QNIFvXCBhNgoCrEpONFpKQFbvFx.jpg?v=1576520649" />
      </ion-thumbnail>  
      <ion-label>
        <p class="caption">{{ $t("STYLE") }}</p>
        <h2>TH716253</h2>
        <p>Size</p>
        <p>Color</p>
      </ion-label>
      <ion-checkbox slot="end"></ion-checkbox>
    </ion-item>
    <ion-item lines="none">
      <ion-thumbnail slot="start">
        <img src="https://cdn.shopify.com/s/files/1/0018/5434/1235/products/SUPERGA_2750-FABRICMESHFLUOJ_YELLOW_SIDE_d3177320-d19e-4624-b9e8-d0dd1bc0d235.jpg?v=1576519973" />
      </ion-thumbnail>  
      <ion-label>
        <p class="caption">{{ $t("STYLE") }}</p>
        <h2>KG807538</h2>
        <p>Size</p>
        <p>Color</p>
      </ion-label>
      <ion-checkbox slot="end"></ion-checkbox>
    </ion-item >
</template>

<script lang="ts">
import { IonCheckbox, IonItem, IonLabel, IonThumbnail } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PicklistDetailItem',
  components: {
    IonCheckbox, 
    IonItem, 
    IonLabel,
    IonThumbnail
  }
});
</script>

