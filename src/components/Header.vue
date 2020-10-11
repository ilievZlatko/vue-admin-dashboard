<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/teams">Teams</router-link> |
    <a @click="onClick">Logout</a>
  </div>
</template>

<script>
import { auth } from "@/main";

export default {
  name: "Header",

  methods: {
    async onClick() {
      const user = auth.currentUser();

      try {
        await user.logout();
        this.$router.push({
          name: "signin",
          params: { userLoggedOut: true }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
