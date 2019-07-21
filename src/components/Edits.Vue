<template>
  <div class="ui padded grid">
    <div style="width:100%; box-shadow: 0 4px 2px -2px gray;" class="ui">
      <h1 style="padding: 5px" class="ui header">
        <i class="edit icon"></i>Urejanja
      </h1>
    </div>
    <div class="row">
      <div style="display:block; width:49%" class="ui padded grid">
        <div class="row" style="width: 100%">
          <h2 style="width: 49%">Tipi dosežkov</h2>
          <button
            style="margin-left: 25%; width: 25%"
            v-on:click="openEdit('edit')"
            class="ui primary button w3-right"
          >
            <i class="plus icon"></i>Dodaj tip
          </button>
        </div>
        <ul class="w3-ul w3-card-4">
          <li
            class="w3-bar"
            v-for="(type, index) in types"
            v-bind:key="index"
          >
            <div style="margin-left: 15px; width: 60%; float: left;">
              <span>
                Naziv:
                <b>{{ type.name }}</b>
              </span>
              <br />
              <span>
                Vrednost:
                <b>{{ level.points.$numberDecimal }}</b>
              </span>
            </div>

            <button v-on:click="openEdit('edit')" class="ui yellow button w3-right">
              <i class="edit icon"></i>Uredi
            </button>
          </li>
        </ul>
      </div>
      <div style="display:block; width:49%; margin-left: 2% !important" class="ui padded grid">
        <div class="row" style="width: 100%">
          <h2 style="width: 49%">Nivoji dosežkov</h2>
          <button
            style="margin-left: 25%; width: 25%"
            v-on:click="openEdit('edit')"
            class="ui primary button w3-right"
          >
            <i class="plus icon"></i>Dodaj nivo
          </button>
        </div>
        <ul class="w3-ul w3-card-4">
          <li
            class="w3-bar"
            v-for="(level, index) in levels"
            v-bind:key="index"
          >
            <div style="margin-left: 15px; width: 60%; float: left;">
              <span>
                Naziv:
                <b>{{ level.name }}</b>
              </span>
              <br />
              <span>
                Vrednost:
                <b>{{ level.points.$numberDecimal }}</b>
              </span>
            </div>

            <button v-on:click="openEdit('edit')" class="ui yellow button w3-right">
              <i class="edit icon"></i>Uredi
            </button>
          </li>
        </ul>
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
      filterValue: null
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
      fetch("http://localhost:3000/api/get/types")
        .then(response => response.json())
        .then(data => {
          this.types = data["types"];
        });

      fetch("http://localhost:3000/api/get/levels")
        .then(response => response.json())
        .then(data => {
          this.levels = data["levels"];
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
      this.$swal({
        type: "success",
        title: "Akcija uspešno končana",
        showConfirmButton: false
      });
    }
  }
};
</script>