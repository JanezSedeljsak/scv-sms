<template>
  <div class="ui padded grid">
      <div class="three wide tablet only three wide computer only column" id="sidebar">
    <img src="./assets/logo.svg" alt="/" style="width:110%" />
    <h1 style="text-align: center; font-size: 2em; color:white">Razvrščevalni sistem ŠCV</h1>
    <div class="ui vertical borderless fluid text menu">
      <a v-on:click="displayLogin()" class="item">
        <i class="address card icon"></i>Prijava
      </a>
      <a v-on:click="displayRegister()" class="item">
        <i class="newspaper outline icon"></i>Registracija
      </a>
    </div>
  </div>
    <div class="sixteen wide mobile thirteen wide tablet thirteen wide computer right floated column" id="app">
      <router-view v-if="user"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
  }
};
</script>