<template>
  <div class="schedule">
    <div class="place-container" v-for="place, index in provider" :key="index">
        {{place.name}}
      <div class="field" v-for="field,index in place.fields" :key="index">
        <div class="time" v-for="time in times" :key="time">
            {{field}}
        </div>
      </div>
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
    time: String,
  },
  methods: {
    field(time: string, field: string[]): boolean {
      return field.indexOf(time) > -1;
    },
  },
  computed: {
    times() {
      const result: string[] = [];
      const date = new Date();
      date.setHours(8);
      date.setMinutes(0);
      for (let i = 0; i < 33; i += 1) {
        result.push(date.toLocaleTimeString('en-GB').slice(0, 5));
        date.setMinutes(date.getMinutes() + 30);
      }
      return result;
    },
  },
});
</script>
