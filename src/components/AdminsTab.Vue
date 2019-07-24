<template>
  <div class="ui padded grid">
    <div class="ui szrheader">
      <h1 style="padding: 5px" class="ui header">
        <i class="address book icon"></i>Administratorji
      </h1>
    </div>
    <div class="row">
      <button v-on:click="toggle()" class="ui primary button w3-right">
        <span v-if="toggleDisplay">
          <i class="add icon"></i>Dodaj administratorja
        </span>
        <span v-if="!toggleDisplay">
          <i class="th list icon"></i>Pregled administratorjev
        </span>
      </button>
    </div>
    <div v-if="!toggleDisplay" class="row">
      <div
        style="box-shadow: 0 0 10px #333 !important; margin-left: 30%; width: 40%; padding: 15px"
        class="ui card"
      >
        <form class="ui form">
          <h2>Ustvari administratorja</h2>
          <div class="field">
            <label>Ime</label>
            <input type="text" v-model="form.name" />
          </div>
          <div class="field">
            <label>Priimek</label>
            <input type="text" v-model="form.surname" />
          </div>
          <div class="field">
            <label>E-pošta</label>
            <input type="text" v-model="form.mail" />
          </div>
          <div class="field">
            <label>Geslo</label>
            <input type="text" v-model="form.pass" />
          </div>
          <div class="field">
            <label>Ponovi geslo</label>
            <input type="text" v-model="form.pass1" />
          </div>
          <button
            v-on:click="sendAdminForm()"
            class="ui primary button"
            type="submit"
          >Dodaj administratorja</button>
        </form>
      </div>
    </div>
    <div v-else class="row">
      <h2>Pregled administratorjev</h2>
      <table class="ui celled table">
        <thead>
          <tr class="ui inverted blue table">
            <th>Ime</th>
            <th>Priimek</th>
            <th>E-Pošta</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(teacher, index) in teachers"
            v-bind:key="index"
        >
            <td>{{ teacher.name }}</td>
            <td>{{ teacher.surname }}</td>
            <td>{{ teacher.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggleDisplay: true,
      form: {
        name: "",
        surname: "",
        mail: "",
        pass: "",
        pass1: ""
      },
      teachers: []
    };
  },
  created: function() {
      this.fetchData();
  },
  methods: {
    toggle: function() {
      this.toggleDisplay = !this.toggleDisplay;
    },
    fetchData: function() {
      fetch("http://localhost:3000/api/get/teachers", { method: "GET" })
        .then(response => response.json())
        .then(data => (this.teachers = data["teachers"]));
    },
    sendAdminForm: function() {
      window.event.preventDefault();
      console.log(this.form);
      fetch("http://localhost:3000/api/auth/create-admin", {
        method: "POST",
        body: JSON.stringify(this.form),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(response => console.log("Success:", JSON.stringify(response)));
    }
  }
};
</script>