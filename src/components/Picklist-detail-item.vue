<template>
<ion-item v-for="picklist in pickingItemList" :key="picklist.picklistId" >
    <ion-thumbnail slot="start">
       <Image />
     </ion-thumbnail>  
     <ion-label>
       <p class="caption">{{ $t("STYLE") }}</p>
       <h2>{{ picklist.productId }}</h2>
       <p> {{ $t("Color") }} : {{ productColor(picklist.productName) }}</p>
       <p> {{ $t("Size") }} : {{ productSize(picklist.productName) }}</p>
     </ion-label>
     <ion-checkbox   slot="end"></ion-checkbox>
    </ion-item>
</template>

<script lang="ts">
import { IonCheckbox, IonItem, IonLabel, IonThumbnail } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapGetters, useStore } from "vuex";
import  Image  from '@/components/Image.vue'

export default defineComponent({
  name: 'PicklistDetailItem',
  components: {
    Image,
    IonCheckbox, 
    IonItem, 
    IonLabel,
    IonThumbnail
  },
  methods: {
    productColor(productName: any){
      return productName.split("-")[2];
    },
    productSize(productName: any){
      return productName.split("-")[1];
    },
     selectProduct: function(event: any, list: any) {
      const existingItemIndex = this.selectedProducts.findIndex((element: any) => element.orderId === list.orderId && element.orderItemSeqId === list.orderItemSeqId)
      if (event.target.checked && existingItemIndex === -1) {
        this.store.dispatch("picklist/addToSelectedProducts", { list });
      } else if(!event.target.checked && existingItemIndex > -1) {
        this.store.dispatch("picklist/removeFromSelectedProducts", { index: existingItemIndex });
      }
    },
  },
 props: ['pickingList'],
 computed: {
    ...mapGetters({
      pickingItemList: 'picklist/getCurrent',
      selectedProducts: 'picklist/getSelectedProducts'
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

