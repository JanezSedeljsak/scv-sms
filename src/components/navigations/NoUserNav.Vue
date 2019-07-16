<template id="AdminNav">
    <div class="three wide tablet only three wide computer only column" id="sidebar">
      <img src="./assets/logo.svg" alt="/" style="width:110%" />
      <h1 style="text-align: center; font-size: 2em; color:white">Razvrščevalni sistem ŠCV</h1>
      <div class="ui vertical borderless fluid text menu">
        <a v-on:click="displayLogin()" class="item">
          <i class="address card icon"></i>Prijava
        </a>
      </div>
    </div>
</template>

<script>
export default {
    methods: {
        displayLogin: () => alert("login")
    }
};
</script>