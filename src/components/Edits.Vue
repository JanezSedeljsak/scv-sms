<template>
  <div class="ui padded grid">
    <szr-header title="<i class='edit icon'></i>Urejanja" />
    <div class="row">
      <div style="display:block; width:49%" class="ui padded grid">
        <div class="row" style="width: 100%">
          <h2>Tipi dosežkov</h2>
        </div>
        <table class="ui single line table">
          <thead>
            <tr class="ui inverted blue table">
              <th>#</th>
              <th>Naziv</th>
              <th>Vrednost</th>
              <th>
                <a
                  v-tooltip.top-center="'Dodaj nov zapis nivoja'"
                  v-on:click="moveUrl([ 0 ])"
                  class="ui round-button w3-right add-btn"
                >
                  <i class="add icon"></i>
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(type, index) in types" v-bind:key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ type.name }}</td>
              <td>{{ type.points.$numberDecimal }}</td>
              <td>
                <a
                  v-tooltip.top-center="'Odpri urejanje nivoja'"
                  v-on:click="moveUrl([ 2, type._id])"
                  class="ui round-button w3-right"
                >
                  <i class="edit icon"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="display:block; width:49%; margin-left: 2% !important" class="ui padded grid">
        <div class="row" style="width: 100%">
          <h2>Nivoji dosežkov</h2>
        </div>
        <table class="ui single line table">
          <thead>
            <tr class="ui inverted blue table">
              <th>#</th>
              <th>Naziv</th>
              <th>Vrednost</th>
              <th>
                <a
                  v-tooltip.top-center="'Dodaj nov zapis nivoja'"
                  v-on:click="moveUrl([ 1 ])"
                  class="ui round-button w3-right add-btn"
                >
                  <i class="add icon"></i>
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(level, index) in levels" v-bind:key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ level.name }}</td>
              <td>{{ level.points.$numberDecimal }}</td>
              <td>
                <a
                  v-tooltip.top-center="'Odpri urejanje nivoja'"
                  v-on:click="moveUrl([ 3, level._id])"
                  class="ui round-button w3-right"
                >
                  <i class="edit icon"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
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



