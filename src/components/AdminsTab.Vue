<template>
  <div class="ui padded grid">
    <szr-header title="<i class='address book icon'></i>Administratorji" />
    <div style="padding-top: 9vh !important; width: 100% !important" class="ui padded grid">
      <div class="row">
        <div class="ui top attached tabular menu">
          <div
            v-on:click="setTab('adminlist')"
            v-bind:class="{ active: tabOpen === 'adminlist' }"
            class="item"
          >
            <i class="list icon"></i>Administratorji
          </div>
          <div
            v-on:click="setTab('registeradmin')"
            v-bind:class="{ active: tabOpen === 'registeradmin' }"
            class="item"
          >
            <i class="unlock alternate icon"></i>Registracija
          </div>
          <div
            v-on:click="setTab('profile')"
            v-bind:class="{ active: tabOpen === 'profile' }"
            class="item"
          >
            <i class="user circle outline icon"></i>Profil
          </div>
        </div>
        <div v-if="tabOpen === 'adminlist'" class="ui bottom attached tab active segment">
          <div style="width: 100%" class="ui relaxed divided list">
            <div class="item">
              <div class="content" style="float: left; width: 5%">
                <i class="large filter middle aligned icon"></i>
              </div>
              <div class="content" style="float: left; width: 20%">
                <a class="header">
                  Ime
                  <i class="sort icon"></i>
                </a>
                <div class="description">
                  <div class="ui corner labeled input">
                    <input type="text" placeholder="filtriraj..." />
                    <div class="ui corner label">
                      <i class="asterisk icon"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content" style="float: left; width: 20%">
                <a class="header">
                  Priimek
                  <i class="sort icon"></i>
                </a>
                <div class="description">
                  <div class="ui corner labeled input">
                    <input type="text" placeholder="filtriraj..." />
                    <div class="ui corner label">
                      <i class="asterisk icon"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content" style="float: left; width: 20%">
                <a class="header">
                  E-Naslov
                  <i class="sort icon"></i>
                </a>
                <div class="description">
                  <div class="ui corner labeled input">
                    <input type="text" placeholder="filtriraj..." />
                    <div class="ui corner label">
                      <i class="asterisk icon"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content" style="float: left; width: 20%">
                <a class="header">
                  Šola
                  <i class="sort icon"></i>
                </a>
                <div class="description">
                  <div class="ui corner labeled input">
                    <input type="text" placeholder="filtriraj..." />
                    <div class="ui corner label">
                      <i class="asterisk icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="student_display"
              class="item"
              v-for="(teacher, index) in teachers"
              v-bind:key="index"
            >
              <div class="content" style="margin-left: 5%; float: left; width: 20%">
                <div class="header">{{ teacher.name | capFirst }}</div>
              </div>
              <div class="content" style="float: left; width: 20%">
                <div class="header">{{ teacher.surname | capFirst }}</div>
              </div>
              <div class="content" style="float: left; width: 20%">
                <div class="header">{{ teacher.mail }}</div>
              </div>
              <div class="content" style="float: left; width: 20%">
                <div class="header">{{ teacher.school }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tabOpen === 'registeradmin'" class="ui bottom attached tab active segment">
          <form class="ui form">
            <div class="field">
              <label>Ime</label>
              <input type="text" v-model="form.name" />
            </div>
            <div class="field">
              <label>Priimek</label>
              <input type="text" v-model="form.surname" />
            </div>
            <div class="field">
              <label>Šola</label>
              <div v-on:click="toggleDropDown()" class="ui fluid selection dropdown">
                <input type="hidden" name="school" />
                <span v-html="dropdownPlaceholder"></span>
                <i class="dropdown icon"></i>
                <div v-if="reqDropToggle" style="display: block" class="menu">
                  <div
                    v-for="school in schools"
                    v-on:click="bindSchool(school.id)"
                    v-bind:key="school.id"
                    class="item"
                  >
                    <b>{{ school.short_name | capitalize }}</b>
                    {{ ` [${school.name}]`}}
                  </div>
                </div>
              </div>
            </div>
            <div class="field">
              <label>E-pošta</label>
              <input type="text" v-model="form.mail" />
            </div>
            <div class="field">
              <label>Geslo</label>
              <input type="password" v-model="form.pass" />
            </div>
            <div class="field">
              <label>Ponovi geslo</label>
              <input type="password" v-model="form.pass1" />
            </div>
            <button v-on:click="sendAdminForm()" class="ui primary button" type="submit">
              <i class="add icon"></i>Dodaj administratorja
            </button>
          </form>
        </div>
        <div v-if="tabOpen === 'profile'" class="ui bottom attached active tab segment">
          <form class="ui form">
            <div class="field">
              <label>Ime</label>
              <input type="text" v-model="form.name" />
            </div>
            <div class="field">
              <label>Priimek</label>
              <input type="text" v-model="form.surname" />
            </div>
            <div class="field">
              <label>Šola</label>
              <div v-on:click="toggleDropDown()" class="ui fluid selection dropdown">
                <input type="hidden" name="school" />
                <span v-html="dropdownPlaceholder"></span>
                <i class="dropdown icon"></i>
                <div v-if="reqDropToggle" style="display: block" class="menu">
                  <div
                    v-for="school in schools"
                    v-on:click="bindSchool(school.id)"
                    v-bind:key="school.id"
                    class="item"
                  >
                    <b>{{ school.short_name | capitalize }}</b>
                    {{ ` [${school.name}]`}}
                  </div>
                </div>
              </div>
            </div>
            <div class="field">
              <label>E-pošta</label>
              <input type="text" v-model="form.mail" />
            </div>
            <div class="field">
              <label>Geslo</label>
              <input type="password" v-model="form.pass" />
            </div>
            <button v-on:click="sendAdminForm()" class="ui primary button" type="submit">
              <i class="clipboard check icon"></i>Posodobi podatke
            </button>
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
      tabOpen: "adminlist",
      form: {
        name: "",
        surname: "",
        mail: "",
        pass: "",
        pass1: "",
        school: ""
      },
      schools: [],
      reqDropToggle: false,
      teachers: [],
      dropdownPlaceholder: ""
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    toggleDropDown: function() {
      this.reqDropToggle = !this.reqDropToggle;
    },
    bindSchool: function(idSchool) {
      this.dropdownPlaceholder = window.event.target.innerHTML;
      this.form.school = idSchool;
      console.log(this);
    },
    fetchData: function() {
      fetch("http://localhost:3000/api/get/teachers", { method: "GET" })
        .then(response => response.json())
        .then(data => (this.teachers = data.result));
      fetch("http://localhost:3000/api/get/schools", { method: "GET" })
        .then(response => response.json())
        .then(data => (this.schools = data.result));
      console.log(this);
    },
    setTab(tab) {
      this.tabOpen = tab;
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