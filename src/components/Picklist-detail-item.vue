<template>
  <ion-item :id="picklistItem.id" :class="picklistItem.id === lastScannedId ? 'scanned-item' : '' " :key="picklistItem.id" v-for="picklistItem in picklistItems"  @click="picklistItem.isChecked = !picklistItem.isChecked; clearLastScannedId()" lines="none" >
    <ion-thumbnail slot="start">
      <DxpShopifyImg :src="getProduct(picklistItem.productId).mainImageUrl" size="small" />
    </ion-thumbnail>  
    <ion-checkbox v-if="picklistItem.statusId !== 'PICKLIST_COMPLETED' && picklistItem.statusId !== 'PICKLIST_PICKED'" :modelValue="picklistItem.isChecked"/>
      <ion-label>
        <p class="caption">{{ getProduct(picklistItem.productId).parentProductName}}</p>
        <h2>{{ getProductIdentificationValue(productIdentificationPref.primaryId, getProduct(picklistItem.productId)) ? getProductIdentificationValue(productIdentificationPref.primaryId, getProduct(picklistItem.productId)) : getProduct(picklistItem.productId).productName }}</h2>
        <h2>{{ getProductIdentificationValue(productIdentificationPref.secondaryId, getProduct(picklistItem.productId)) }}</h2>
        <p>{{ $t("Color") }} : {{ $filters.getFeatures(getProduct(picklistItem.productId).featureHierarchy, '1/COLOR/') }}</p>
        <p>{{ $t("Size") }} : {{ $filters.getFeatures(getProduct(picklistItem.productId).featureHierarchy, '1/SIZE/') }}</p>
      </ion-label>
  </ion-item>
</template>

<script lang="ts">
import { IonCheckbox, IonItem, IonLabel, IonThumbnail } from '@ionic/vue';
import { computed, defineComponent } from 'vue';
import { mapGetters, useStore } from 'vuex';
import { getProductIdentificationValue, DxpShopifyImg, useProductIdentificationStore } from '@hotwax/dxp-components';

export default defineComponent({
  name: 'PicklistDetailItem',
  components: {
    IonCheckbox, 
    IonItem, 
    IonLabel,
    IonThumbnail,
    DxpShopifyImg
  },
  props: ['picklistItems'],
  computed: {
    ...mapGetters({
      getProduct: 'product/getProduct',
      lastScannedId: 'picklist/getLastScannedId',
    }),
  },
  methods: {
    clearLastScannedId() {
      this.store.dispatch("picklist/updateLastScannedId", "")
    }
  },
  setup() {
    const store = useStore(); 
    const productIdentificationStore = useProductIdentificationStore();
    let productIdentificationPref = computed(() => productIdentificationStore.getProductIdentificationPref)

    return {
      getProductIdentificationValue,
      productIdentificationPref,
      store
    }
  }
});
</script>
<style scoped>
.scanned-item {
  --background: var( --ion-color-medium-tint);
}

</style>

