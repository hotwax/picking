<template>
  <ion-item v-bind:key="picklist.productId" v-for="picklist in picklists"  @click="picklist.isChecked = !picklist.isChecked" lines="none" >
    <ion-thumbnail slot="start">
      <Image :src="getProduct(picklist.productId).mainImageUrl" />
    </ion-thumbnail>  
    <ion-label>
      <p class="caption">{{ getProduct(picklist.productId).parentProductName}}</p>
      <h2>{{ getProduct(picklist.productId).productName}}</h2>
      <h2>{{ picklist.productId }}</h2>
      <p>{{ $t("Color") }} : {{ $filters.getFeatures(getProduct(picklist.productId).featureHierarchy, '1/COLOR/') }}</p>
      <p>{{ $t("Size") }} : {{ $filters.getFeatures(getProduct(picklist.productId).featureHierarchy, '1/SIZE/') }}</p>
    </ion-label>
    <ion-checkbox :modelValue="picklist.isChecked" slot="end" />
  </ion-item>
</template>

<script lang="ts">
import { IonCheckbox, IonItem, IonLabel, IonThumbnail } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapGetters, useStore } from 'vuex';
import Image from '@/components/Image.vue'

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
    selectProduct: function(event: any, list: any) {
      const existingItemIndex = this.selectedProducts.findIndex((element: any) => element.orderId === list.orderId && element.orderItemSeqId === list.orderItemSeqId)
      if (event.target.checked && existingItemIndex === -1) {
        this.store.dispatch("picklist/addToSelectedProducts", { list });
      } else if(!event.target.checked && existingItemIndex > -1) {
        this.store.dispatch("picklist/removeFromSelectedProducts", { index: existingItemIndex });
      }
    },
  },
  props: ['picklists'],
  computed: {
    ...mapGetters({
      selectedProducts: 'picklist/getSelectedProducts',
      products: 'picklist/getCurrent',
      getProduct: 'picklist/getProduct',      
    }),
  },
  setup() {
    const store = useStore(); 
    return {
      store
    }
  }
});
</script>

