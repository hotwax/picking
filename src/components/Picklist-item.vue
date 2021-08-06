<template>
  <ion-item v-for="picklist in pickingList" :key="picklist.picklistId" @click="viewPicklist(picklist)" detail>
    <ion-label>{{ user.partyName }}</ion-label>
    <ion-note slot="end">{{ $filters.formatDate(picklist.picklistDate) }}</ion-note>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonNote } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'PicklistItem',
  components: {
    IonItem, 
    IonLabel, 
    IonNote
  },
  props: ['pickingList'],
  computed: {
    ...mapGetters({
      user: 'user/getUserProfile'
    })
  },
  methods: {
    viewPicklist (picklist: any) {
      this.router.push({ path: `/picklist-details/${picklist.picklistId}` });
    }
  },
  setup () {
    const router = useRouter();

    return {
      router
    }
  }
});
</script>

