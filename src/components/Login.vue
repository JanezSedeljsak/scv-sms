<template>
  <div class="ui padded grid">
    <div style="width:100%; box-shadow: 0 4px 2px -2px gray;" class="ui">
      <h1 style="padding: 5px" class="ui header">
        <i class="key icon"></i>Prijava
      </h1>
    </div>
    <div class="row">
      <div
        style="box-shadow: 0 0 10px #333 !important; margin-left: 30%; width: 40%; padding: 15px"
        class="ui card"
      >
        <form class="ui form">
          <img style="margin-left: 35%; width: 30%" src="./../assets/userlogin.png" />
          <div class="field">
            <label>E-pošta</label>
            <input type="text" v-model="form.mail" />
          </div>
          <div class="field">
            <label>Geslo</label>
            <input type="text" v-model="form.pass" />
          </div>
          <button v-on:click="tryLogin()" class="ui primary button" type="submit">Prijavi se!</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggleDisplay: true,
      form: {
        mail: "",
        pass: ""
      }
    };
  },
  created: function() {},
  methods: {
    tryLogin: function() {
      window.event.preventDefault();
      console.log(this.form);
      fetch("http://localhost:3000/api/auth/try-login", {
        method: "POST",
        body: JSON.stringify(this.form),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(response => {
            if (!response.ok) {
                console.log(response.result);
            } else {
                sessionStorage.setItem("szr_auth", response.result.toString());
                localStorage.setItem('szr_auth',  response.result.toString());
                window.location = '/admin';
                //$cookies.set('szr_auth', response.result.toString());
                //console.log($cookies.get('szr_auth'))
            }
        });
    }
  }
};
</script>