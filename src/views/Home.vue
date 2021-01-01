<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import client from '@/lib/client';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
  async created() {
    try {
      await client.reAuthenticate();
    } catch (err) {
      console.log(err.name);
    }
  },
})
export default class Home extends Vue {}
</script>
