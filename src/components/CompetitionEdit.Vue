<template>
  <div class="ui padded grid">
    <szr-header title="<i class='trophy icon'></i>Urejanje tekmovanja" />
    <div style="padding-top: 9vh !important; width: 100% !important" class="ui padded grid">
      <div class="row" style="width: 100% !important">
        <form class="ui form">
          <div class="ui grid">
            <div class="five wide column">
              <label>Naslov</label>
              <input type="text" v-model="base.name" />
            </div>
            <div class="five wide column">
              <label>Vpisni rok</label>
              <datepicker v-model="base.deadline"></datepicker>
            </div>
            <div class="five wide column">
              <label>Št. vpisnih mest</label>
              <input type="text" v-model="base.places" />
            </div>
            <div class="five wide column">
              <label>Mentor</label>
              <br />
              <szr-picker v-bind:data="JSON.stringify(szrPickerOptions.teacher)" />
            </div>
            <div class="ten wide column">
              <label>Opis</label>
              <vue-editor v-model="base.description"/>
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
            <div
              style="width: 13%"
              v-on:click="changeTabs('types')"
              v-bind:class="{ active: tabDisplay === 'types' }"
              class="item"
            >Dosezki</div>
          </div>
          <div v-if="tabDisplay == 'students'" class="customTab ui bottom attached tab segment">
            <div style="width: 100%" class="ui relaxed divided list">
              <div class="item">
                <div class="content" style="float: left; width: 10%">
                  <a class="header">#</a>
                </div>
                <div class="content" style="float: left; width: 31%">
                  <a class="header">Ime</a>
                </div>
                <div class="content" style="float: left; width: 31%">
                  <a class="header">Priimek</a>
                </div>
                <div class="content" style="float: left; width: 27%">
                  <i class="w3-right large add icon"></i>
                </div>
              </div>
              <div
                id="list_display"
                class="item"
                v-for="(student, index) in students"
                v-bind:key="index"
              >
                <div class="content" style="float: left; width: 10%">
                  <div class="header">{{ index + 1 }}</div>
                </div>
                <div class="content" style="float: left; width: 31%">
                  <div class="header">{{ student.name | capFirst }}</div>
                </div>
                <div class="content" style="float: left; width: 31%">
                  <div class="header">{{ student.surname | capFirst }}</div>
                </div>
                <div class="content" style="float: left; width: 27%">
                  <i v-on:click="openEdit(student.id)" class="w3-right large remove icon"></i>
                  <i v-on:click="openEdit(student.id)" class="w3-right large edit icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="tabDisplay == 'classes'" class="customTab ui bottom attached tab segment">
            <div style="width: 100%" class="ui relaxed divided list">
              <div class="item">
                <div class="content" style="float: left; width: 10%">
                  <a class="header">#</a>
                </div>
                <div class="content" style="float: left; width: 31%">
                  <a class="header">Razred</a>
                </div>
                <div class="content" style="float: left; width: 31%">
                  <a class="header">Šola</a>
                </div>
                <div class="content" style="float: left; width: 27%">
                  <i class="w3-right large add icon"></i>
                </div>
              </div>
              <div
                id="list_display"
                class="item"
                v-for="(cls, index) in classes"
                v-bind:key="index"
              >
                <div class="content" style="float: left; width: 10%">
                  <div class="header">{{ index + 1 }}</div>
                </div>
                <div class="content" style="float: left; width: 31%">
                  <div class="header">{{ cls.class | capFirst }}</div>
                </div>
                <div class="content" style="float: left; width: 31%">
                  <div class="header">{{ cls.school | capFirst }}</div>
                </div>
                <div class="content" style="float: left; width: 27%">
                  <i v-on:click="openEdit(cls.id)" class="w3-right large remove icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div
            v-else-if="tabDisplay == 'subjects'"
            class="customTab ui bottom attached tab segment"
          >
            <div style="width: 100%" class="ui relaxed divided list">
              <div class="item">
                <div class="content" style="float: left; width: 10%">
                  <a class="header">#</a>
                </div>
                <div class="content" style="float: left; width: 22%">
                  <a class="header">Kratica</a>
                </div>
                <div class="content" style="float: left; width: 39%">
                  <a class="header">Naziv</a>
                </div>
                <div class="content" style="float: left; width: 17%">
                  <a class="header">Vrednost</a>
                </div>
                <div class="content" style="float: left; width: 10%">
                  <i class="w3-right large add icon"></i>
                </div>
              </div>
              <div
                id="list_display"
                class="item"
                v-for="(subject, index) in subjects"
                v-bind:key="index"
              >
                <div class="content" style="float: left; width: 10%">
                  <div class="header">{{ index + 1 }}</div>
                </div>
                <div class="content" style="float: left; width: 22%">
                  <div class="header">
                    <b>{{ subject.short_name | capitalize }}</b>
                  </div>
                </div>
                <div class="content" style="float: left; width: 39%">
                  <div class="header">{{ subject.name }}</div>
                </div>
                <div class="content" style="float: left; width: 17%">
                  <div class="header">{{ subject.value }}</div>
                </div>
                <div class="content" style="float: left; width: 10%">
                  <i v-on:click="openEdit(subject.id)" class="w3-right large remove icon"></i>
                </div>
              </div>
            </div>
          </div>
                    <div
            v-else-if="tabDisplay == 'types'"
            class="customTab ui bottom attached tab segment"
          >
            <div style="width: 100%" class="ui relaxed divided list">
              <div class="item">
                <div class="content" style="float: left; width: 10%">
                  <a class="header">#</a>
                </div>
                <div class="content" style="float: left; width: 50%">
                  <a class="header">Tip</a>
                </div>
                <div class="content" style="float: left; width: 27%">
                  <a class="header">Vrednost</a>
                </div>
                <div class="content" style="float: left; width: 10%">
                  <i class="w3-right large add icon"></i>
                </div>
              </div>
              <div
                id="list_display"
                class="item"
                v-for="(type, index) in types"
                v-bind:key="index"
              >
                <div class="content" style="float: left; width: 10%">
                  <div class="header">{{ index + 1 }}</div>
                </div>
                <div class="content" style="float: left; width: 50%">
                  <div class="header">
                    <b>{{ type.type | capFirst }}</b>
                  </div>
                </div>
                <div class="content" style="float: left; width: 27%">
                  <div class="header">{{ type.value }}</div>
                </div>
                <div class="content" style="float: left; width: 10%">
                  <i v-on:click="openEdit(type.id)" class="w3-right large remove icon"></i>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { VueEditor } from "vue2-editor";

export default {
  data() {
    return {
      szrPickerOptions: {
        teacher: {
          mTitle: "Admin izbirnik",
          apiRoute: "/teachers-for-picker",
          titles: ["Ime", "Priimek"],
          display: ["name", "surname"]
        }
      },
      tabDisplay: "subjects",
      base: {
        name: "",
        teacher: "",
        deadline: "",
        places: "",
        date_created: "",
        description: ""
      },
      students: [],
      subjects: [],
      classes: [],
      types: []
    };
  },
  components: {
    Datepicker,
    VueEditor
  },
  created: function() {
    if(this.$route.params.id) {
      this.fetchData();
    }
  },
  methods: {
    changeTabs: function(tabKey) {
      this.tabDisplay = tabKey;
    },
    fetchData: function() {
     fetch("http://localhost:3000/api/get/competition-by-id", {
        method: "POST",
        body: JSON.stringify({ id: this.$route.params.id }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.result)
          this.classes = data.result.classes;
          this.students = data.result.students;
          this.subjects = data.result.subjects;
          this.base = data.result.base[0];
          this.types = data.result.types;
      });
    }
  }
};
</script>