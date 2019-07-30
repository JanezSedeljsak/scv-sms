<template>
  <div class="ui padded grid">
    <div class="ui szrheader">
      <h1 style="padding: 5px" class="ui header">
        <i class="key icon"></i>Prijava
      </h1>
    </div>
    <div class="row">
      <div
        style="margin-top: 1vw; box-shadow: 0 0 10px #333 !important; margin-left: 30%; width: 40%;"
        class="ui card"
      >
        <div id="topLogin">
          <img style="padding: 10px; margin-left: 35%; width: 30%" src="./../assets/userlogin.png" />
        </div>
        <div>
          <form style=" padding: 15px" class="ui form">
            <div class="field">
              <label>E-pošta</label>
              <input type="text" v-model="form.mail" />
            </div>
            <div class="field">
              <label>Geslo</label>
              <input type="password" v-model="form.pass" />
            </div>
            <div class="field">
              <div class="ui toggle checkbox">
                <input v-model="form.role" type="checkbox" name="public">
                <label>Prijavi se kot:&nbsp;<span v-html="form.role ? 'Mentor' : 'Dijak'"></span></label>
              </div>
            </div>
            <button
              style="min-width: 30%"
              v-on:click="tryLogin()"
              class="ui primary button"
              type="submit"
            >Prijavi se!</button>
          </form>
        </div>
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
        role: false,
        mail: "",
        pass: ""
      }
    };
  },
  created: function() {},
  methods: {
    tryLogin: function() {
      window.event.preventDefault();
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
            window.location = "/admin";
            //$cookies.set('szr_auth', response.result.toString());
            //console.log($cookies.get('szr_auth'))
          }
        });
    }
  }
};
</script>