<template>
  <ion-item v-bind:key="picklist.productId" v-for="picklist in picklists"  @click="picklist.isChecked = !picklist.isChecked" lines="none" >
    <ion-thumbnail slot="start">
      <Image :src="getProduct(picklist.productId).images?.mainImageUrl" />
    </ion-thumbnail>  
    <ion-label>
      <p class="caption">{{ getProduct(picklist.productId).assocs?.toProduct?.productName}}</p>
      <h2>{{ getProduct(picklist.productId).productName}}</h2>
      <h2>{{ picklist.productId }}</h2>
      <p v-if="getFeature(getProduct(picklist.productId).features, 'Color')">{{ $t("Color") }} : {{ getFeature(getProduct(picklist.productId).features, 'Color') }}</p>
      <p v-if="getFeature(getProduct(picklist.productId).features, 'Size')">{{ $t("Size") }} : {{ getFeature(getProduct(picklist.productId).features, 'Size') }}</p>
    </ion-label>
    <ion-checkbox :modelValue="picklist.isChecked" slot="end" />
  </ion-item>
</template>

<script lang="ts">
import { IonCheckbox, IonItem, IonLabel, IonThumbnail } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapGetters, useStore } from 'vuex';
import Image from '@/components/Image.vue'
import { getFeature } from '@/utils'

export default defineComponent({
  name: 'PicklistDetailItem',
  components: {
    Image,
    IonCheckbox, 
    IonItem, 
    IonLabel,
    IonThumbnail
  },
  props: ['picklists'],
  computed: {
    ...mapGetters({
      products: 'picklist/getCurrent',
      getProduct: 'product/getProduct',      
    }),
  },
  setup() {
    const store = useStore(); 
    return {
      getFeature,
      store
    }
  }
});
</script>

