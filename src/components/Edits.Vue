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
              <div class="content" style="float: left; width: 10%">
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
            <div class="item" v-for="(level, index) in levels" v-bind:key="index">
              <div class="content" style="float: left; width: 10%">
                <i class="large edit middle aligned icon"></i>
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
          </div>
        </div>
        <div v-if="tabOpen === 'types'" class="ui bottom attached tab active segment">
          <div class="ui relaxed divided list">
            <div class="item">
              <div class="content" style="float: left; width: 10%">
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
            </div>
            <div class="item" v-for="(type, index) in types" v-bind:key="index">
              <div class="content" style="float: left; width: 10%">
                <i class="large edit middle aligned icon"></i>
              </div>
              <div class="content" style="float: left; width: 35%">
                <a class="header">Naziv</a>
                <div class="description">{{ type.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tabOpen === 'subjects'" class="ui bottom attached active tab segment">
          <div class="ui relaxed divided list">
            <div class="item">
              <div class="content" style="float: left; width: 10%">
                <i class="large add middle aligned icon"></i>
              </div>
              <div class="content" style="float: left; width: 35%">
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
            </div>
            <div class="item" v-for="(subject, index) in subjects" v-bind:key="index">
              <div class="content" style="float: left; width: 10%">
                <i class="large edit middle aligned icon"></i>
              </div>
              <div class="content" style="float: left; width: 35%">
                <a class="header">Kratica</a>
                <div class="description">{{ subject.shortname }}</div>
              </div>
              <div class="content" style="float: left; width: 35%">
                <a class="header">Naziv</a>
                <div class="description">{{ subject.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tabOpen === 'years'" class="ui bottom attached active tab segment">
          <div class="ui relaxed divided list">
            <div class="item">
              <div class="content" style="float: left; width: 10%">
                <i class="large add middle aligned icon"></i>
              </div>
              <div class="content" style="float: left; width: 35%">
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
            <div class="item" v-for="(year, index) in years" v-bind:key="index">
              <div class="content" style="float: left; width: 10%">
                <i class="large edit middle aligned icon"></i>
              </div>
              <div class="content" style="float: left; width: 35%">
                <a class="header">Leto</a>
                <div class="description">{{ year.name }}</div>
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
export default {
  data() {
    return {
      types: [],
      levels: [],
      subjects: [],
      years: [],
      filterValue: null,
      tabOpen: "subjects"
    };
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
    },
    moveUrl: function(params) {
      let onClickRoutes = [
        `/admin/type-edits/1/create`,
        `/admin/level-edits/2/create`,
        `/admin/type-edits/3/${params[1]}`,
        `/admin/level-edits/4/${params[1]}`
      ];
      window.location = onClickRoutes[params[0]];
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



