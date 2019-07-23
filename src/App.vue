<template>
  <div class="ui padded grid">
    <div
      v-if="user == false"
      class="three wide tablet only three wide computer only column"
      id="sidebar"
    >
      <img src="./assets/logo.svg" alt="/" style="width:110%" />
      <h1 style="text-align: center; font-size: 2em; color:white">Razvrščevalni sistem ŠCV</h1>
      <div class="ui vertical borderless fluid text menu">
        <a v-on:click="toggleModal()" class="item">
          <i class="address card icon"></i>Prijava
        </a>
      </div>
    </div>
    <div
      v-else-if="user == true"
      class="three wide tablet only three wide computer only column"
      id="sidebar"
    >
      <img src="./assets/logo.svg" alt="/" style="width:110%" />
      <h1 class="title" style="text-align: center; font-size: 1.7em; color:white">Razvrščevalni sistem ŠCV</h1>
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
      <router-view v-if="user != false"></router-view>
      <h1 v-else-if="user == false">Dobrodošli na spletni aplikaciji za razvščanje dijakov ŠCV-ja</h1>
    </div>
    <div v-if="modal != false" style="display:block" class="w3-modal">
      <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">
        <div class="w3-center">
          <br />
          <span
            v-on:click="toggleModal()"
            class="w3-button w3-xlarge w3-hover-red w3-display-topright"
            title="Close Modal"
          >&times;</span>
          <img
            src="./assets/userlogin.png"
            alt="/"
            style="width:30%"
            class="w3-circle w3-margin-top"
          />
        </div>

        <form class="w3-container">
          <div class="w3-section">
            <label>
              <b>e-pošta</b>
            </label>
            <input
              class="w3-input w3-border w3-margin-bottom"
              type="text"
              placeholder="Vnesi e-pošto"
              name="usrname"
              required
            />
            <label>
              <b>geslo</b>
            </label>
            <input
              class="w3-input w3-border"
              type="password"
              placeholder="Vnesi geslo"
              name="psw"
              required
            />
            <button
              class="w3-button w3-block w3-green w3-section w3-padding"
              v-on:click="toggleModal()"
              type="submit"
            >Login</button>
            <input class="w3-check w3-margin-top" type="checkbox" checked="checked" /> Remember me
          </div>
        </form>

        <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
          <button v-on:click="toggleModal()" type="button" class="w3-button w3-red">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      user: true
    };
  },
  methods: {
    login: function() {
      window.event.preventDefault();
      this.user = true;
      this.modal = !this.modal;
    },
    toggleModal: function() {
      this.modal = !this.modal;
    },
    moveUrl: link => {
      window.event.preventDefault();
      window.location.pathname != link ? (window.location = link) : null;
    }
  },
  head: {
    link: [{ r: "icon", h: "https://cdn0.iconfinder.com/data/icons/new-seo-bussiness-set16-1/512/Algorithm-01-512.png", sz: "128x128", t: "images/x-icon" }]
  }
};
</script>


<style lang="css">
    @import "./assets/overwrite.css";
</style>