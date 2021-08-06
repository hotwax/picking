<template>
  <ion-item v-for="picklist in pickingList" :key="picklist.picklistId" detail>
    <ion-label>{{ user.partyName }}</ion-label>
    <ion-note slot="end">{{ picklist.picklistDate }}</ion-note>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonNote } from '@ionic/vue';
import { defineComponent } from 'vue';
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
  }
});
</script>

