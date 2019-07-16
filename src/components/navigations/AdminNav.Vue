<template id="AdminNav">
    <div class="three wide tablet only three wide computer only column" id="sidebar">
      <img src="./assets/logo.svg" alt="/" style="width:110%" />
      <h1 style="text-align: center; font-size: 2em; color:white">Razvrščevalni sistem ŠCV</h1>
      <h2 style="text-align: center; font-size: 1.3em; color:white">
        <i class="user circle icon"></i>
        {{ "mojstr" }}
      </h2>
      <div class="ui vertical borderless fluid text menu">
        <a v-on:click="moveUrl('/students')" class="item">
          <i class="graduation cap icon"></i>Dijaki
        </a>
        <a v-on:click="moveUrl('/competitions')" class="item">
          <i class="sort numeric up icon"></i>Tekmovanja
        </a>
        <a v-on:click="moveUrl('/classes')" class="item">
          <i class="book icon"></i>Predmeti
        </a>
        <a v-on:click="moveUrl('/logout')" class="item">
          <i class="level up alternate icon"></i>Nivoji
        </a>
        <a v-on:click="moveUrl('/achivments')" class="item">
          <i class="trophy icon"></i>Dosezki
        </a>
        <a v-on:click="moveUrl('/admins')" class="item">
          <i class="user plus icon"></i>Administratorji
        </a>
        <div style="height:3vw" class="ui hidden divider"></div>
        <a v-on:click="moveUrl('/')" class="item">
          <i class="sign out alternate icon"></i>Odjava
        </a>
      </div>
    </div>
</template>

<script>
export default {
    methods: {
        moveUrl: link => window.location.pathname != link ? window.location = link : null
    }
};
</script>
