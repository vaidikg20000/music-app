<template>
  <v-app>
    <v-app-bar dark app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar"> </v-toolbar-side-icon>
      </span>
      <v-toolbar-title style="font-size: 24px">
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ $route.name }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          v-if="$route.name !== 'Login' || $route.name !== 'Signup'"
          flat
          to="/"
          >Home</v-btn
        >
        <v-btn v-if="isAuthenticated" flat @click="logoutUsers">
          Log Out
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { isAuthenticated } from "../utils/checkAuth";

export default {
  name: "App",

  data: () => ({
    //
    isAuthenticated: false,
  }),
  methods: {
    logoutUsers() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
  async created() {
    const token = localStorage.getItem("token");
    // let authenticated = false;
    if (token) {
      this.isAuthenticated = await isAuthenticated();
    }
  },
};
</script>
