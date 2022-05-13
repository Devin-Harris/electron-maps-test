<template>
  <div class="app-container">
    <nav-bar>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav-bar>
    <div class="router-view-container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "app",
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

.app-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  nav-bar {
    a {
      margin-right: 1em;
    }
  }
  .router-view-container {
    flex-grow: 1;
  }
}
</style>
