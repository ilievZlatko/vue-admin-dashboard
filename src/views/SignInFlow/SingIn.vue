<template>
  <div
    class="container"
    :class="{ 'light-background': !isDarkMode, 'dark-background': isDarkMode }"
  >
    <Notification v-if="hasText" :text="text" />
    <request-account />

    <div class="login">
      <img src="@/assets/DCHQ.svg" alt="" v-show="isDarkMode" />
      <img src="@/assets/DCHQ-dark.svg" alt="" v-show="!isDarkMode" />
      <h4 :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">
        Sign into Design+Code HQ
      </h4>

      <form @submit.prevent="onSubmit">
        <input
          type="email"
          placeholder="Email"
          v-model="email"
          required
          :class="{ 'light-field': isDarkMode, 'dark-field': !isDarkMode }"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          required
          :class="{ 'light-field': isDarkMode, 'dark-field': !isDarkMode }"
        />
        <button type="submit">Sign In</button>
      </form>

      <router-link
        to="/recover"
        :class="{ 'light-link': isDarkMode, 'dark-link': !isDarkMode }"
        >Forgot your password?</router-link
      >
      <theme-switch />
    </div>
  </div>
</template>

<script>
import RequestAccount from "@/components/RequestAccount";
import ThemeSwitch from "@/components/ThemeSwitch";
import Notification from "@/components/Notification";
import { auth } from "@/main";

export default {
  name: "SignIn",

  components: {
    RequestAccount,
    ThemeSwitch,
    Notification
  },

  data() {
    return {
      email: null,
      password: null,
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
        await auth.login(this.email, this.password, true);
        this.email = null;
        this.password = null;
        this.$router.replace("/");
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
    } else if (params.userRecoveredAccount) {
      this.hasText = true;
      this.text = `A recovery email has been sent to ${params.email}`;
    } else if (params.userRequestedAccount) {
      this.hasText = true;
      this.text = `Your request has been sent to an administrator for ${params.email}`;
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
