<template>
  <div class="place-container" v-for="place, index in provider" :key="index">
    <div>{{place.name}}</div>
    <div class="field" v-for="field,index in place.fields" :key="index">
      <div class="field-label">Kenttä {{index + 1}}</div>
      <div class="time" v-for="time, index in field" :key="index">{{time}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface ProviderData {
  [index: number ]: {
    name: string;
    fields: string[][];
  };
}

export default defineComponent({
  name: 'table-component',
  props: {
    provider: Object as PropType<ProviderData>,
  },
});
</script>
