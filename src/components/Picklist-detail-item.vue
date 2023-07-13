<template>
  <ion-item :id="picklistItem.id" :class="picklistItem.id === lastScannedId ? 'scanned-item' : '' " :key="picklistItem.id" v-for="picklistItem in picklistItems"  @click="picklistItem.isChecked = !picklistItem.isChecked" lines="none" >
    <ion-thumbnail slot="start">
      <Image :src="getProduct(picklistItem.productId).mainImageUrl" />
    </ion-thumbnail>  
    <ion-label>
      <p class="caption">{{ getProduct(picklistItem.productId).parentProductName}}</p>
      <h2>{{ getProduct(picklistItem.productId).productName}}</h2>
      <h2>{{ picklistItem.productId }}</h2>
      <p>{{ $t("Color") }} : {{ $filters.getFeatures(getProduct(picklistItem.productId).featureHierarchy, '1/COLOR/') }}</p>
      <p>{{ $t("Size") }} : {{ $filters.getFeatures(getProduct(picklistItem.productId).featureHierarchy, '1/SIZE/') }}</p>
    </ion-label>
    <ion-checkbox v-if="picklistItem.statusId !== 'PICKLIST_COMPLETED'" :modelValue="picklistItem.isChecked" slot="end" />
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
  props: ['picklistItems', 'lastScannedId'],
  computed: {
    ...mapGetters({
      getProduct: 'product/getProduct'
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
<style scoped>
.scanned-item {
  --background: var( --ion-color-medium-tint);
}

</style>

