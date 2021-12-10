<template>
<ion-page>
    <div id="PDF">
      <table>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
        </tr>
        <tr v-for="picklist in picklistChecked" :key="picklist.productId">
          <td class="yellow">
            {{ picklist.productId }}
          </td>  
          <td>
            {{ picklist.productName }}
          </td>  
        </tr>
      </table> 
       
    </div>
</ion-page>
</template>
<script>
import { IonPage } from '@ionic/vue'

import { defineComponent } from "vue";

export default defineComponent ({
  props: ['picklistChecked'],
  components: {
    IonPage
  },
})
</script>