<template>
  <ion-item :id="picklistItem.id" :class="picklistItem.id === lastScannedId ? 'scanned-item' : '' " :key="picklistItem.id" v-for="picklistItem in picklistItems"  @click="picklistItem.isChecked = !picklistItem.isChecked" lines="none" >
    <ion-thumbnail slot="start">
      <Image :src="getProduct(picklistItem.productId).mainImageUrl" />
    </ion-thumbnail>  
    <ion-label>
      <p class="caption">{{ getProduct(picklistItem.productId).parentProductName}}</p>
      <h2>{{ getProductIdentificationValue(productIdentificationPref.primaryId, getProduct(picklistItem.productId)) }}</h2>
      <h2>{{ getProductIdentificationValue(productIdentificationPref.secondaryId, getProduct(picklistItem.productId)) }}</h2>
      <p>{{ $t("Color") }} : {{ $filters.getFeatures(getProduct(picklistItem.productId).featureHierarchy, '1/COLOR/') }}</p>
      <p>{{ $t("Size") }} : {{ $filters.getFeatures(getProduct(picklistItem.productId).featureHierarchy, '1/SIZE/') }}</p>
    </ion-label>
    <ion-checkbox :modelValue="picklistItem.isChecked" slot="end" />
  </ion-item>
</template>

<script lang="ts">
import { IonCheckbox, IonItem, IonLabel, IonThumbnail } from '@ionic/vue';
import { defineComponent, inject } from 'vue';
import { mapGetters, useStore } from 'vuex';
import Image from '@/components/Image.vue'
import { getProductIdentificationValue } from "@/utils";

export default defineComponent({
  name: 'PicklistDetailItem',
  components: {
    Image,
    IonCheckbox, 
    IonItem, 
    IonLabel,
    IonThumbnail
  },
  props: ['picklistItems', 'lastScannedId'],
  computed: {
    ...mapGetters({
      getProduct: 'product/getProduct'
    }),
  },
  setup() {
    const store = useStore(); 
    const productIdentificationPref: any = inject("productIdentificationPref");

    return {
      store,
      productIdentificationPref,
      getProductIdentificationValue
    }
  }
});
</script>
<style scoped>
.scanned-item {
  --background: var( --ion-color-medium-tint);
}

</style>

