<template>
  <div
    class="container"
    :class="{ 'light-background': !isDarkMode, 'dark-background': isDarkMode }"
  >
    <request-account />

    <div class="login">
      <img src="@/assets/DCHQ.svg" alt="" v-show="isDarkMode" />
      <img src="@/assets/DCHQ-dark.svg" alt="" v-show="!isDarkMode" />
      <h4 :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">
        Recover Account
      </h4>

      <form @submit.prevent="onSubmit">
        <input
          type="email"
          placeholder="Email"
          v-model="email"
          required
          :class="{ 'light-field': isDarkMode, 'dark-field': !isDarkMode }"
        />
        <button type="submit">Send Email</button>
      </form>

      <router-link
        to="/signin"
        :class="{ 'light-link': isDarkMode, 'dark-link': !isDarkMode }"
        >Already have an account? Sign in now.</router-link
      >
      <theme-switch />
    </div>
  </div>
</template>

<script>
import RequestAccount from "@/components/RequestAccount";
import ThemeSwitch from "@/components/ThemeSwitch";
import { auth } from "@/main";

export default {
  name: "Recover",

  components: {
    RequestAccount,
    ThemeSwitch
  },

  data() {
    return {
      email: null,
      hasText: false,
      text: ""
    };
  },

  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },

  methods: {
    async onSubmit() {
      try {
        await auth.requestPasswordRecovery(this.email);
        this.$router.push({
          name: "signin",
          params: {
            userRecoveredAccount: true,
            email: this.email
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  },

  mounted() {
    const params = this.$route.params;

    if (params.userLoggedOut) {
      this.hasText = true;
      this.text = "You have logged out!";
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login {
  max-width: 400px;
}
</style>
