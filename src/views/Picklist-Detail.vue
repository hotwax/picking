<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>{{ id }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="selectAll" >{{ $t ("Select all") }}</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item-group v-for="picklist in picklistGroup" :key="picklist.sortBy" >
          <ion-item-divider>
            <ion-label> {{ picklist.sortBy }}</ion-label>
          </ion-item-divider>
          <PicklistDetailItem :picklists="picklist.record"/>
        </ion-item-group>
      </ion-list>
     </ion-content>

     <ion-footer>
      <ion-toolbar>
        <ion-buttons class="footer-buttons">
          <ion-button class="action-button" fill="outline" color="secondary" @click="scanCode()">
            <ion-icon slot="start" :icon="barcodeOutline" />{{ $t("Scan") }}
          </ion-button>
          <ion-button class="action-button"  @click="completeProductPicklist" fill="outline" color="success">
            <ion-icon slot="start" :icon="checkmarkDone" />{{ $t("Complete") }}
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
 </ion-page>
</template>

<script>
import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItemDivider, IonItemGroup, IonLabel, IonList, IonPage, IonTitle, IonToolbar, alertController, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { barcodeOutline, checkmarkDone } from 'ionicons/icons';
import PicklistDetailItem from '@/components/Picklist-detail-item.vue';
import { mapGetters, useStore } from 'vuex';
import { translate } from '@/i18n'
import { showToast } from '@/utils';
import Scanner from '@/components/Scanner'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PicklistDetail',
  components: {
    IonBackButton, 
    IonButton, 
    IonButtons, 
    IonContent,
    IonFooter, 
    IonHeader, 
    IonIcon,
    IonItemDivider,
    IonItemGroup, 
    IonLabel,
    IonList,
    IonPage, 
    IonTitle, 
    IonToolbar,
    PicklistDetailItem
  },
  computed: {
    ...mapGetters({
      picklists: 'picklist/getPicklists',
      picklistItem: 'picklist/getCurrent',
      picklistItemSortBy: 'user/getPicklistItemSortBy'
    })
  },
  data() {
    return {
      picklistGroup: []
    }
  },
  props: ['id'],
  async mounted () {
    await this.store.dispatch('picklist/setCurrentPicklist', { id: this.id })
    this.sortPickists()
  },
  methods: {
    async completePicklist() {
      const picklistChecked = this.picklistItem.pickingItemList.some((picklist) =>
        picklist.isChecked
      )
      const payload = {
        'picklistId': this.picklistItem.picklist.picklistId,
        'statusId': 'PICKLIST_PICKED'
      }
      if (picklistChecked) {
        return this.store.dispatch("picklist/completePicklist", payload ).then(() => {
          this.router.push("/tabs/picklists");
        })
      } else {
        showToast(translate("Something went wrong"));
      }
    },
    async completeProductPicklist() {
      const alert = await alertController
        .create({
          header: this.$t("Complete picklist"),
          buttons: [
            {
              text: this.$t('Cancel'),
              role: 'cancel'
            },
            {
              text:this.$t('Complete'),
              handler: () => {
                if (this.picklistItem.pickingItemList.some((picklist) => picklist.isChecked)) this.completePicklist();
                else showToast(translate("No item has been picked"));
              },
            },
          ],
        });
      return alert.present();
    },
    selectAll() {
      this.picklistItem.pickingItemList.map((picklist) => {
        picklist.isChecked = true;
      })
    },
    async scanCode() {
      const modal = await modalController
        .create({
          component: Scanner,
        });
      modal.onDidDismiss()
        .then((result) => {
          //result : value of the scanned barcode/QRcode
          const item = result.data.value && this.picklistItem.pickingItemList.find((product) => !product.isChecked && product.productId === result.data.value)
          if (item) {
            item.isChecked = true;
          } else {
            showToast(translate("Product not found"))
          }
        });
      return modal.present();
    },
    sortPickists() {
      // Sort picklist products based on the sorting parameter selected
      this.picklistItem.pickingItemList.sort((a, b) => a[this.picklistItemSortBy].localeCompare(b[this.picklistItemSortBy], { sensitivity: 'base' }));
      const data = this.picklistItem.pickingItemList.reduce((r, e) => {
        // Display the 0th index alphabet if alphabetical/productName sorting is applied
        const sortBy = this.picklistItemSortBy === 'productName' ? e[this.picklistItemSortBy][0] : e[this.picklistItemSortBy];
        if (!r[sortBy]) r[sortBy] = { sortBy, record: [e] }
        else r[sortBy].record.push(e);
        return r;
      }, {});
      this.picklistGroup = Object.values(data);
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();
      
    return {
      barcodeOutline,
      checkmarkDone,
      store,
      router
    }
  }
});
</script>

<style scoped>
.footer-buttons {
  gap: 5px;
  padding: 0 5px;
}

.action-button {
  flex: 1 100%;
}
</style>
