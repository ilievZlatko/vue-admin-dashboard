<template>
  <div
    class="container"
    :class="{ 'light-background': !isDarkMode, 'dark-background': isDarkMode }"
  >
    <div class="login">
      <img src="@/assets/DCHQ.svg" alt="" v-show="isDarkMode" />
      <img src="@/assets/DCHQ-dark.svg" alt="" v-show="!isDarkMode" />
      <h4 :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">
        Request Account
      </h4>

      <form @submit.prevent="onSubmit">
        <input
          type="email"
          placeholder="Email"
          v-model="email"
          required
          :class="{ 'light-field': isDarkMode, 'dark-field': !isDarkMode }"
        />
        <button type="submit">Request Account</button>
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
import ThemeSwitch from "@/components/ThemeSwitch";

export default {
  name: "Request",

  components: {
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
        // Slack API Logic
        const slackURL = new URL("https://slack.com/api/chat.postMessage");
        const data = {
          token:
            "xoxp-1446376171120-1415802491654-1435180412705-45577fa356ca91b17d127500756e7932",
          channel: "hq-api",
          text: `${this.email} has requested admin access to HQ. Please go to Netlify to invite them.`
        };

        slackURL.search = new URLSearchParams(data);

        await fetch(slackURL);

        this.$router.push({
          name: "signin",
          params: {
            userRequestedAccount: true,
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
