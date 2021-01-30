<template>
  <div class="home">
    <input @change="update" v-model="date" type="date">
    <div>
      <table-component :provider="club"/>
      <table-component :provider="targa"/>
      <table-component :provider="house"/>
    </div>
  </div>
</template>

<script lang="ts">

import TableComponent from '@/components/TableComponent.vue';
import { defineComponent } from 'vue';
import config from '../config';

interface ProviderData {
  [index: number ]: {
    name: string;
    fields: string[][];
  };
}

interface ComponentData {
  providers: Record<string, ProviderData>;
  date: Date;
}

export default defineComponent({
  name: 'Home',
  data(): ComponentData {
    return {
      providers: {},
      date: new Date(),
    };
  },
  async mounted() {
    await this.update();
  },
  computed: {
    club(): ProviderData {
      return this.providers.club;
    },
    targa(): ProviderData {
      return this.providers.targa;
    },
    house(): ProviderData {
      return this.providers.house;
    },
  },
  methods: {
    async update() {
      const date = new Date(this.date);
      const { apiUrl } = config;
      try {
        const data = await (await fetch(`${apiUrl}/${date.toISOString()}`)).json();
        this.providers = data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  components: {
    TableComponent,
  },
});
</script>
