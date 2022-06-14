<template>
  <div></div>
</template>

<script>
import { isAuthenticated } from "../../utils/checkAuth";
export default {
  name: "Login",
  data() {
    return {};
  },
  created() {
    if (localStorage.getItem("token")) {
      const authenticated = isAuthenticated();
      if (authenticated) {
        this.$router.push({ path: "/" });
      }
    }
  },
};
</script>
