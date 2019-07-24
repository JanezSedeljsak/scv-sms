<template>
  <div class="ui padded grid">
    <div class="ui szrheader">
      <h1 style="padding: 5px" class="ui header">
        <i class="sort numeric up icon"></i>Tekmovanja
      </h1>
    </div>
    <div class="row">
      <button v-on:click="openEdit('create')" class="ui primary button w3-right">
        <i class="add icon"></i>Dodaj tekmovanje
      </button>
      <div style="margin-left: 10px" class="ui icon input">
        <input
          v-model="filterValue"
          v-on:keydown="filterCompetitions()"
          class="prompt"
          type="text"
          placeholder="Filtriraj tekmovanja..."
        />
        <i class="search icon"></i>
      </div>
    </div>
    <div class="row">
      <ul style="display:block; width:100%" class="w3-ul w3-card-4">
        <li
          class="w3-bar"
          v-for="(competition, index) in competitionsForDisplay"
          v-bind:key="index"
        >
          <div style="margin-left: 15px; width: 25%; float: left;">
            <span>
              Naslov:
              <b>{{ competition.name }}</b>
            </span>
            <br />
            <span>
              Datum:
              <b>{{ competition.date | dateFormat }}</b>
            </span>
          </div>

          <div style="width: 25%; float: left;">
            <span>
              Naslov:
              <b>{{ competition.name }}</b>
            </span>
            <br />
            <span>
              Datum:
              <b>{{ competition.date | dateFormat }}</b>
            </span>
          </div>

          <div style="width: 25%; float: left;">
            <span>
              Naslov:
              <b>{{ competition.name }}</b>
            </span>
            <br />
            <span>
              Datum:
              <b>{{ competition.date | dateFormat }}</b>
            </span>
          </div>
          <a v-tooltip.top-center="editTooltip" v-on:click="openEdit('edit')" class="ui round-button w3-right">
            <i class="edit icon"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
var moment = require("moment");
export default {
  data() {
    return {
      competitions: [],
      competitionsForDisplay: [],
      filterValue: null,
      editTooltip: "Odpri urejanje tekmovanja"
    };
  },
  filters: {
    dateFormat: date => moment(date).format("DD. MM. YYYY")
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      fetch("http://localhost:3000/api/get/competitions")
        .then(response => response.json())
        .then(data => {
          this.competitions = data["competitions"];
          this.competitionsForDisplay = this.competitions;
        });
    },
    filterCompetitions: function() {
      if (window.event.keyCode != 13) return;
      this.competitionsForDisplay = this.competitions.filter(row => {
        let values = Object.keys(row).map(x =>
          row[x].includes(this.filterValue)
        );
        return values.includes(true) ? true : false;
      });
    },
    openEdit: function(type) {
      window.event.preventDefault();
      window.location = `/admin/competitions/1/${type}/`;
    }
  }
};
</script>