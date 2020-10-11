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
        Sign into Design+Code HQ
      </h4>
      <input
        type="email"
        placeholder="Email"
        :class="{ 'light-field': isDarkMode, 'dark-field': !isDarkMode }"
      />
      <input
        type="password"
        placeholder="Password"
        :class="{ 'light-field': isDarkMode, 'dark-field': !isDarkMode }"
      />
      <button>Sign In</button>
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

export default {
  name: "SignIn",

  components: {
    RequestAccount,
    ThemeSwitch
  },

  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
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
