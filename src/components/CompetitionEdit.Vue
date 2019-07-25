<template>
  <div class="ui padded grid">
    <szr-header title="<i class='trophy icon'></i>Urejanje tekmovanja" />
    <div class="row">
      <form class="ui form">
        <div class="ui grid">
          <div class="five wide column">
            <label>Naslov</label>
            <input type="text" name="first-name" />
          </div>
          <div class="five wide column">
            <label>Vpisni rok</label>
            <datepicker :value="new Date()" name="uniquename"></datepicker>
          </div>
          <div class="five wide column">
            <label>Št. vpisnih mest</label>
            <input type="text" name="first-name" />
          </div>
          <div class="five wide column">
            <label>Mentor</label>
            <br />
            <szr-picker v-bind:data="JSON.stringify(szrPickerOptions.teacher)" />
          </div>
          <div class="ten wide column">
            <label>Opis</label>
            <textarea rows="3"></textarea>
          </div>
        </div>
        <hr style="width: 93.8%; border-bottom: 2px solid #2185d0" />
        <div style="width: 93.8%" class="ui top attached tabular menu">
          <div
            style="width: 13%"
            v-on:click="changeTabs('students')"
            v-bind:class="{ active: tabDisplay === 'students' }"
            class="item"
          >Vključeni dijaki</div>
          <div
            style="width: 13%"
            v-on:click="changeTabs('classes')"
            v-bind:class="{ active: tabDisplay === 'classes' }"
            class="item"
          >Razredi</div>
          <div
            style="width: 13%"
            v-on:click="changeTabs('subjects')"
            v-bind:class="{ active: tabDisplay === 'subjects' }"
            class="item"
          >Predmeti</div>
        </div>
        <div v-if="tabDisplay == 'students'" class="customTab ui bottom attached tab segment">
          <table
            style="box-shadow: none !important; table-layout: fixed !important"
            class="ui celled table"
          >
            <thead class="ui inverted blue table">
              <tr>
                <th>Ime</th>
                <th>Priimek</th>
                <th>Razred</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Name">James</td>
                <td data-label="Age">24</td>
                <td data-label="Job">Engineer</td>
                <td data-label="Job">
                  <button v-on:click="removeSubject(index)" class="ui red button w3-right">
                    <i class="remove icon"></i>Odstrani
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="tabDisplay == 'classes'" class="customTab ui bottom attached tab segment"></div>
        <div v-if="tabDisplay == 'subjects'" class="customTab ui bottom attached tab segment">
          <ul
            style="box-shadow: none !important; outline: 1px solid #aaa; display:block"
            class="w3-ul w3-card-4"
          >
            <li v-bind:key="index" v-for="(subject, index) in subjects" class="w3-bar">
              <button
                style="width: 15%"
                v-on:click="removeSubject(index)"
                class="ui red button w3-right"
              >
                <i class="remove icon"></i>Odstrani
              </button>
              <img
                src="https://backgroundcheckall.com/wp-content/uploads/2017/12/book-clipart-transparent-background-5.png"
                class="w3-bar-item w3-circle w3-hide-small"
                style="width:85px"
              />
              <div class="w3-bar-item">
                <span class="w3-large">
                  <b>{{ subject.short | capitalize }}</b>
                </span>
                <br />
                <span>{{ subject.long }}</span>
              </div>
            </li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
export default {
  data() {
    return {
      szrPickerOptions: {
        teacher: {
          titles: ["Ime", "Priimek"]
        }
      },
      tabOptions: {
        students: "Dodaj dijaka",
        classes: "Dodaj razred",
        subjects: "Dodaj predmet"
      },
      tabDisplay: "students",
      subjects: []
    };
  },
  components: {
    Datepicker
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    changeTabs: function(tabKey) {
      this.tabDisplay = tabKey;
    },
    fetchData: function() {
      fetch("http://localhost:3000/api/get/subjects", { method: "GET" })
        .then(response => response.json())
        .then(data => (this.subjects = data["subjects"]));
    }
  }
};
</script>