<template>
  <div class="ui padded grid">
    <div class="three wide tablet only three wide computer only column" id="sidebar">
      <img src="./assets/logo.svg" alt="/" style="width:110%" />
      <h1
        class="title"
        style="text-align: center; font-size: 1.7em; color:white"
      >Razvrščevalni sistem ŠCV</h1>
      <h2 style="text-align: center; font-size: 1.2em; color:white">
        <i class="user circle icon"></i>
        {{ "mojstr" }}
      </h2>
      <div class="ui vertical borderless fluid text menu">
        <a v-on:click="moveUrl('/admin/students')" class="item">
          <i class="graduation cap icon"></i>Dijaki
        </a>
        <a v-on:click="moveUrl('/admin/competitions')" class="item">
          <i class="sort numeric up icon"></i>Tekmovanja
        </a>
        <a v-on:click="moveUrl('/admin/classes')" class="item">
          <i class="book icon"></i>Predmeti
        </a>
        <a v-on:click="moveUrl('/admin/edits')" class="item">
          <i class="edit icon"></i>Urejanja
        </a>
        <a v-on:click="moveUrl('/admin/achivments')" class="item">
          <i class="trophy icon"></i>Dosezki
        </a>
        <a v-on:click="moveUrl('/admin/admins-tab')" class="item">
          <i class="address book icon"></i>Administratorji
        </a>
        <div style="height:3vw" class="ui hidden divider"></div>
        <a v-on:click="moveUrl('/login')" class="item">
          <i class="sign out alternate icon"></i>Odjava
        </a>
      </div>
    </div>
    <div
      class="sixteen wide mobile thirteen wide tablet thirteen wide computer right floated column"
      id="app"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: true
    };
  },
  methods: {
    moveUrl: link =>
      window.location.pathname != link ? (window.location = link) : null
  },
  head: {
    link: [
      {
        r: "icon",
        h:
          "https://cdn0.iconfinder.com/data/icons/new-seo-bussiness-set16-1/512/Algorithm-01-512.png",
        sz: "128x128",
        t: "images/x-icon"
      }
    ]
  }
};
</script>


<style lang="css">
@import "./assets/overwrite.css";
</style>