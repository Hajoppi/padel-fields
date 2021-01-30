<template>
  <div class="schedule">
    <div class="time" v-for="time in times" :key="time">
      {{time}}
        <div v-for="provider, index in providers" :key="index">
        <div class="place-container" v-for="place, index in provider" :key="index">
          <div class="field" v-for="fieldArr,index in place.fields" :key="index">
            {{field(time, fieldArr)}}
          </div>
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
  name: 'schedule',
  props: {
    providers: Object as PropType<ProviderData[]>,
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
  methods: {
    field(time: string, field: string[]): boolean {
      return field.indexOf(time) > -1;
    },
  },
  components: {
  },
});
</script>
