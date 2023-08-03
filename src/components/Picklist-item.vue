<template>
  <ion-item button v-for="(picklist, index) in picklists" :key="index" @click="viewPicklist(picklist)" detail>
    <ion-label>
      <h2>{{ picklist.pickersFullName }}</h2>
      <p>{{ picklist.picklistId }}</p>
    </ion-label>
    <div><ion-note slot="end">{{ getTime(picklist.picklistDate) }}</ion-note></div>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonNote } from '@ionic/vue';
import { DateTime } from 'luxon';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'PicklistItem',
  components: {
    IonItem, 
    IonLabel, 
    IonNote
  },
  props: ['picklists'],
  methods: {
    async viewPicklist (picklist: any) {
      // if current is not set promise.reject returns which will not allow further code execution
      // and hence, router.push will not execute stopping the code from breaking
      await this.store.dispatch('picklist/setCurrentPicklist', { id: picklist.picklistId })
      this.router.push({ path: `/picklist-details/${picklist.picklistId}` });
    },
    getTime(time: number) {
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

