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
        {{ username ? username : "Ni Uporabnika" }}
      </h2>
      <div v-if="username" class="ui vertical borderless fluid text menu">
        <a v-on:click="moveUrl('/admin/students')" class="item">
          <i class="graduation cap icon"></i>Dijaki
        </a>
        <a v-on:click="moveUrl('/admin/competitions')" class="item">
          <i class="sort numeric up icon"></i>Tekmovanja
        </a>
        <a v-on:click="moveUrl('/admin/classes')" class="item">
          <i class="users icon"></i>Razredi
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
        <a v-on:click="moveUrl('/admin/requests')" class="item">
          <i class="sticky note icon"></i>
          <span>Zahtevki</span>
          <a class="ui teal tag label">&nbsp;{{ msgCount }}</a>
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
      username: "",
      msgCount: 0
    };
  },
  methods: {
    moveUrl: link =>
      window.location.pathname != link ? (window.location = link) : null
  },
  created: function() {
    fetch("http://localhost:3000/api/auth/get-username", {
      method: "POST",
      body: JSON.stringify({ tokenString: sessionStorage.getItem("szr_auth") }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(response => {
        let user = Object.values(response.result[0]).map(x =>
          x.substr(0, 1).toUpperCase() + x.substr(1, x.length - 1).toLowerCase()
        ).join(" ");
        this.username = `${user}`;
      });
    fetch("http://localhost:3000/api/get/message-count")
      .then(res => res.json())
      .then(response => {
        this.msgCount = response.result;
      });
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