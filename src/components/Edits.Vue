<template>
  <div class="ui padded grid">
    <szr-header title="<i class='edit icon'></i>Urejanja" />
    <div style="padding-top: 9vh !important; width: 100% !important" class="ui padded grid">
      <div class="row">
        <div class="ui top attached tabular menu">
          <div
            v-on:click="setTab('levels')"
            v-bind:class="{ active: tabOpen === 'levels' }"
            class="item"
          >
            <i class="stack exchange icon"></i>Nivoji
          </div>
          <div
            v-on:click="setTab('types')"
            v-bind:class="{ active: tabOpen === 'types' }"
            class="item"
          >
            <i class="hockey puck icon"></i>Tipi
          </div>
          <div
            v-on:click="setTab('subjects')"
            v-bind:class="{ active: tabOpen === 'subjects' }"
            class="item"
          >
            <i class="book icon"></i>Predmeti
          </div>
          <div
            v-on:click="setTab('years')"
            v-bind:class="{ active: tabOpen === 'years' }"
            class="item"
          >
            <i class="calendar alternate outline icon"></i>Leta
          </div>
        </div>
        <div v-if="tabOpen === 'levels'" class="ui bottom attached tab active segment">
          <div class="ui relaxed divided list">
            <div class="item">
              <div class="content" style="float: left; width: 15%">
                <i class="large add middle aligned icon"></i>
              </div>
              <div class="content" style="float: left; width: 35%">
                <a class="header">Naziv</a>
                <div class="description">
                  <div class="ui corner labeled input">
                    <input type="text" placeholder="naziv..." />
                    <div class="ui corner label">
                      <i class="asterisk icon"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content" style="float: left; width: 35%">
                <a class="header">Vrednost</a>
                <div class="description">
                  <div class="ui corner labeled input">
                    <input type="text" placeholder="vrednost..." />
                    <div class="ui corner label">
                      <i class="asterisk icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-bind:class="{ editRow: editIndex === index }" class="item" v-for="(level, index) in levels" v-bind:key="index">
              <div v-if="index !== editIndex">
                <div class="content" style="float: left; width: 15%">
                  <i v-on:click="openEdit(index)" class="large edit middle aligned icon"></i>
                </div>
                <div class="content" style="float: left; width: 35%">
                  <a class="header">Naziv</a>
                  <div class="description">{{ level.name }}</div>
                </div>
                <div class="content" style="float: left; width: 35%">
                  <a class="header">Vrednost</a>
                  <div class="description">{{ level.value }}</div>
                </div>
              </div>
              <div v-else>
                <div class="content" style="float: left; width: 15%">
                  <i v-on:click="closeEdit()" class="large chevron left middle aligned icon"></i>
                  <i class="large save middle aligned icon"></i>
                </div>
                <div class="content" style="float: left; width: 35%">
                  <a class="header">Naziv</a>
                  <div class="description">
                    <input v-model="level.name" class="w3-input" style="width: 15em" type="text" />
                  </div>
                </div>
                <div class="content" style="float: left; width: 35%">
                  <a class="header">Vrednost</a>
                  <div class="description">
                    <input v-model="level.value" class="w3-input" style="width: 15em" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tabOpen === 'types'" class="ui bottom attached tab active segment">
          <div class="ui relaxed divided list">
            <div class="item">
              <div class="content" style="float: left; width: 15%">
                <i class="large add middle aligned icon"></i>
              </div>
              <div class="content" style="float: left; width: 50%">
                <a class="header">Naziv</a>
                <div class="description">
                  <div class="ui corner labeled input">
                    <input type="text" placeholder="naziv..." />
                    <div class="ui corner label">
                      <i class="asterisk icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-bind:class="{ editRow: editIndex === index }" class="item" v-for="(type, index) in types" v-bind:key="index">
              <div v-if="index !== editIndex">
                <div class="content" style="float: left; width: 15%">
                  <i v-on:click="openEdit(index)" class="large edit middle aligned icon"></i>
                </div>
                <div class="content" style="float: left; width: 50%">
                  <a class="header">Naziv</a>
                  <div class="description">{{ type.name }}</div>
                </div>
              </div>
              <div v-else>
                <div class="content" style="float: left; width: 15%">
                  <i v-on:click="closeEdit()" class="large chevron left middle aligned icon"></i>
                  <i class="large save middle aligned icon"></i>
                </div>
                <div class="content" style="float: left; width: 25%">
                  <a class="header">Naziv</a>
                  <div class="description">
                    <input v-model="type.name" class="w3-input" style="width: 100%" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tabOpen === 'subjects'" class="ui bottom attached active tab segment">
          <div class="ui relaxed divided list">
            <div class="item">
              <div class="content" style="float: left; width: 15%">
                <i class="large add middle aligned icon"></i>
              </div>
              <div class="content" style="float: left; width: 30%">
                <a class="header">Kratica</a>
                <div class="description">
                  <div class="ui corner labeled input">
                    <input type="text" placeholder="kratica..." />
                    <div class="ui corner label">
                      <i class="asterisk icon"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content" style="float: left; width: 50%">
                <a class="header">Naziv</a>
                <div class="description">
                  <div class="ui corner labeled input">
                    <input type="text" placeholder="naziv..." />
                    <div class="ui corner label">
                      <i class="asterisk icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-bind:class="{ editRow: editIndex === index }" class="item" v-for="(subject, index) in subjects" v-bind:key="index">
              <div v-if="editIndex !== index">
                <div class="content" style="float: left; width: 15%">
                  <i v-on:click="openEdit(index)" class="large edit middle aligned icon"></i>
                </div>
                <div class="content" style="float: left; width: 30%">
                  <a class="header">Kratica</a>
                  <div class="description">{{ subject.shortname }}</div>
                </div>
                <div class="content" style="float: left; width: 50%">
                  <a class="header">Naziv</a>
                  <div class="description">{{ subject.name }}</div>
                </div>
              </div>
              <div v-else >
                <div class="content" style="float: left; width: 15%">
                  <i v-on:click="closeEdit()" class="large chevron left middle aligned icon"></i>
                  <i class="large save middle aligned icon"></i>
                </div>
                <div class="content" style="float: left; width: 30%">
                  <a class="header">Kratica</a>
                  <div class="description">
                    <input v-model="subject.shortname" class="w3-input" style="width: 15em" type="text" />
                  </div>
                </div>
                <div class="content" style="float: left; width: 50%">
                  <a class="header">Naziv</a>
                  <div class="description">
                    <input v-model="subject.name" class="w3-input" style="width: 80%" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tabOpen === 'years'" class="ui bottom attached active tab segment">
          <div class="ui relaxed divided list">
            <div class="item">
              <div class="content" style="float: left; width: 15%">
                <i class="large add middle aligned icon"></i>
              </div>
              <div class="content" style="float: left; width: 30%">
                <div class="description">
                  <div class="ui corner labeled input">
                    <input type="text" placeholder="leto..." />
                    <div class="ui corner label">
                      <i class="asterisk icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-bind:class="{ editRow: editIndex === index }" class="item" v-for="(year, index) in years" v-bind:key="index">
              <div v-if="editIndex !== index">
                <div class="content" style="float: left; width: 15%">
                  <i v-on:click="openEdit(index)" class="large edit middle aligned icon"></i>
                </div>
                <div class="content" style="float: left; width: 30%">
                  <a class="header">Leto</a>
                  <div class="description">{{ year.name }}</div>
                </div>
                <div class="content" style="float: left; width: 50%">
                  <a class="header">Začetek/konec</a>
                  <div
                    class="description"
                  >{{ year.start_date | dateFormat }}&nbsp;/&nbsp;{{ year.end_date | dateFormat }}</div>
                </div>
              </div>
              <div v-if="editIndex === index">
                <div class="content" style="float: left; width: 15%">
                  <i v-on:click="closeEdit()" class="large chevron left middle aligned icon"></i>
                  <i class="large save middle aligned icon"></i>
                </div>
                <div class="content" style="float: left; width: 30%">
                  <a class="header">Leto</a>
                  <div class="description">
                    <input v-model="year.name" class="w3-input" style="width: 15em" type="text" />
                  </div>
                </div>
                <div class="content" style="float: left; width: 50%">
                  <a class="header">Začetek/konec</a>
                  <div class="description">
                    <span>
                      <datepicker v-model="year.start_date"></datepicker>
                      <datepicker v-model="year.end_date"></datepicker>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require("moment");
import Datepicker from "vuejs-datepicker";

export default {
  data() {
    return {
      types: [],
      levels: [],
      subjects: [],
      years: [],
      filterValue: null,
      editIndex: null,
      tabOpen: "subjects"
    };
  },
  components: {
    Datepicker
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      fetch("http://localhost:3000/api/get/types")
        .then(response => response.json())
        .then(data => {
          this.types = data["result"];
        });

      fetch("http://localhost:3000/api/get/levels")
        .then(response => response.json())
        .then(data => {
          this.levels = data["result"];
        });
      fetch("http://localhost:3000/api/get/subjects")
        .then(response => response.json())
        .then(data => {
          this.subjects = data["result"];
        });
      fetch("http://localhost:3000/api/get/years")
        .then(response => response.json())
        .then(data => {
          this.years = data["result"];
        });
      console.log(this);
    },
    setTab(tab) {
      this.tabOpen = tab;
      this.editIndex = null;
    },
    moveUrl: function(params) {
      let onClickRoutes = [
        `/admin/type-edits/1/create`,
        `/admin/level-edits/2/create`,
        `/admin/type-edits/3/${params[1]}`,
        `/admin/level-edits/4/${params[1]}`
      ];
      window.location = onClickRoutes[params[0]];
    },
    openEdit(index) {
      this.editIndex = index;
    },
    closeEdit() {
      this.editIndex = null;
    }
    /*openEdit: function(type) {
      this.$swal({
        type: "success",
        title: "Akcija uspešno končana",
        showConfirmButton: false
      });
    }*/
  }
};
</script>



