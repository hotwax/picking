<template>
  <ion-item v-for="picklist in picklists" :key="picklist.picklistId" @click="viewPicklist(picklist)" detail>
    <ion-label>{{ user.partyName }}</ion-label>
    <ion-note slot="end">{{ $filters.formatDate(picklist.picklistDate) }}</ion-note>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonNote } from '@ionic/vue';
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
    })
  },
  methods: {
    viewPicklist (picklist: any) {
      this.store.dispatch('picklist/setCurrentPicklist', { id: picklist.picklistId }).then((resp) => {
        if (resp.pickingItemList) {
          this.router.push({ path: `/picklist-details/${picklist.picklistId}` });
        }
      });
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

