<template>
  <ion-item v-for="picklist in picklists" :key="picklist.picklistId" @click="viewPicklist(picklist)" detail>
    <ion-label>{{ picklist.pickersFullName }}</ion-label>
    <ion-note slot="end">{{ getTime(picklist.picklistDate) }}</ion-note>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonNote } from '@ionic/vue';
import { DateTime } from 'luxon';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { mapGetters, useStore } from 'vuex';

export default defineComponent({
  name: 'PicklistItem',
  components: {
    IonItem, 
    IonLabel, 
    IonNote
  },
  props: ['picklists'],
  computed: {
    ...mapGetters({
      user: 'user/getUserProfile'
    }),
  },
  methods: {
    viewPicklist (picklist: any) {
      this.store.dispatch('picklist/setCurrentPicklist', { id: picklist.picklistId }).then((resp) => {
        if (resp.pickingItemList) {
          this.router.push({ path: `/picklist-details/${picklist.picklistId}` });
        }
      });
    },
    getTime(time: any) {
      return DateTime.fromMillis(time).toLocaleString(DateTime.DATETIME_MED)
    }
  },
  setup () {
    const router = useRouter();
    const store = useStore();

    return {
      router,
      store
    }
  }
});
</script>

