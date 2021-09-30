<template>
<ion-item v-for="picklist in pickingItemList" :key="picklist.picklistId">
    <ion-thumbnail slot="start">
       
     </ion-thumbnail>  
     <ion-label>
       <p class="caption">{{ $t("STYLE") }}</p>
       <h2>{{ picklist.productId }}</h2>
       <p> {{ $t("Color") }} : {{ productColor(picklist.productName) }}</p>
       <p> {{ $t("Size") }} : {{ productSize(picklist.productName) }}</p>
     </ion-label>
     <ion-checkbox slot="end"></ion-checkbox>
    </ion-item>
</template>

<script lang="ts">
import { IonCheckbox, IonItem, IonLabel, IonThumbnail } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapGetters, useStore } from "vuex";

export default defineComponent({
  name: 'PicklistDetailItem',
  components: {
    IonCheckbox, 
    IonItem, 
    IonLabel,
    IonThumbnail
  },
  methods: {
    productColor(productName: any){
      const productColor = productName.split("-")[2];
      return productColor;
    },
    productSize(productName: any){
      const productSize = productName.split("-")[1];
      return productSize;
    }
  },
   props: ['pickingList'],
 computed: {
    ...mapGetters({
      pickingItemList: 'picklist/getCurrent'
    })
  },
  setup(){
     const store = useStore(); 
     return {
       store
     }
  }
});
</script>

