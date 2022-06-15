<template>
  <v-app>
    <v-app-bar app dark style="margin-bottom: 40px">
      <v-toolbar-title>
        <h2>{{ $route.name }}</h2>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
