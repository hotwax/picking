<template>
  <ion-item detail>
    <ion-label>Picker name(s)</ion-label>
    <ion-note slot="end">created time</ion-note>
  </ion-item>
  <ion-item detail>
    <ion-label>Picker name(s)</ion-label>
    <ion-note slot="end">created time</ion-note>
  </ion-item>
  <ion-item detail>
    <ion-label>Picker name(s)</ion-label>
    <ion-note slot="end">created time</ion-note>
  </ion-item>
  <ion-item detail>
    <ion-label>Picker name(s)</ion-label>
    <ion-note slot="end">created time</ion-note>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonNote } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PicklistItem',
  components: {
    IonItem, 
    IonLabel, 
    IonNote
  }
});
</script>

