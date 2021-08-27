<template>
<ion-item v-for="picklist in pickingList" :key="picklist.picklistId">
    <ion-thumbnail slot="start">
       
     </ion-thumbnail>  
     <ion-label>
       <p class="caption">{{ $t("STYLE") }}</p>
       <h2>{{ picklist.picklistId }}</h2>
       <p> {{ picklist.picklistDate }}</p>
       <p> {{ picklist.noOfOrders }}</p>
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
   props: ['pickingList'],
 computed: {
    ...mapGetters({
      pickingList: 'picklist/getPickingList'
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

