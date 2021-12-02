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
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item-group v-for="picklist in picklistGroup" :key="picklist.alphabet" >
          <ion-item-divider>
            <ion-label> {{ picklist.alphabet }}</ion-label>
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
import { IonBackButton, IonButton, IonButtons, IonContent,IonFooter, IonHeader, IonIcon, IonItemDivider, IonItemGroup, IonLabel, IonList, IonPage, IonTitle, IonToolbar, alertController, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { barcodeOutline,checkmarkDone } from 'ionicons/icons';
import PicklistDetailItem from '@/components/Picklist-detail-item.vue';
import { mapGetters, useStore } from 'vuex';
import { translate } from '@/i18n'
import { showToast } from '@/utils';
import Scanner from '@/components/Scanner'
import { useRouter } from 'vue-router';
import { JsonCSV } from '@/mixins/jsonToCsv'
import emitter from '@/event-bus'

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
    })
  },
  data() {
    return {
      picklistGroup: []
    }
  },
  props: ['id'],
  mixins: [JsonCSV],
  mounted () {
    this.picklistItem.pickingItemList.sort((a, b) => a.productName.localeCompare(b.productName, 'es', { sensitivity: 'base' }));
    const data = this.picklistItem.pickingItemList.reduce((r, e) => {
      const alphabet = e.productName[0];
      if (!r[alphabet]) r[alphabet] = { alphabet, record: [e] }
      else r[alphabet].record.push(e);
      return r;
    }, {});
    this.picklistGroup = Object.values(data);
    emitter.on("export-finished", this.completePicklists)
  },
  methods: {
    async completePicklist(blob) {
      const picklistChecked = this.picklistItem.pickingItemList.some((picklist) =>
        picklist.isChecked
      )
      if (picklistChecked) {
        const formData = new FormData();
        const fileName = "CompletePicklist_" + Date.now() +".csv";
        formData.append("uploadedFile", blob, fileName);
        formData.append("configId", "IMP_UPD_PKLST_ITM_ST");

        return this.store.dispatch("picklist/completePicklists", {
          headers: {
            'Content-Type': 'multipart/form-data;'
          },
          data: formData
        }).then(() => {
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
                if (this.picklistItem.pickingItemList.some((picklist) => picklist.isChecked)) this.generate();
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
          const item = this.picklistItem.pickingItemList.find((product) => !product.isChecked && product.productId === result.role)
          if (item) {
            item.isChecked = true;
          } else if (result.role && !item) {
            showToast(translate("Product not found"))
          }
          result.role = "";
        });
      return modal.present();
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
