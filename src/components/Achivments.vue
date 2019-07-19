<template>
  <div class="ui padded grid">
    <div style="width:100%; box-shadow: 0 4px 2px -2px gray;" class="ui">
      <h1 style="padding: 5px" class="ui header">
        <i class="trophy icon"></i>Dosezki
      </h1>
    </div>
    <div class="row">
      <button 
            v-on:click="openEdit('create')"
            class="ui primary button w3-right"
      ><i class="add icon"></i>Dodaj dosežek
      </button>
      <div style="margin-left: 10px" class="ui icon input">
        <input 
          v-model="filterValue"
          v-on:keydown="filterAchivments()"
          class="prompt" 
          type="text" 
          placeholder="Filtriraj dosežke...">
        <i class="search icon"></i>
      </div>
    </div>
    <div class="row">
            <ul style="display:block; width:100%" class="w3-ul w3-card-4">
        <li 
            class="w3-bar" 
            v-for="(achivment, index) in achivmentsForDisplay"             
            v-bind:key="index"
          >
            <div style="margin-left: 15px; width: 25%; float: left;">
              <span>Naslov: <b>{{ achivment.name }}</b></span>
              <br>
              <span>Datum: <b>{{ achivment.date | dateFormat }}</b></span>
            </div>

            <div style="width: 25%; float: left;">
              <span>Naslov: <b>{{ achivment.name }}</b></span>
              <br>
              <span>Datum: <b>{{ achivment.date | dateFormat }}</b></span>
            </div>

            <div style="width: 25%; float: left;">
              <span>Naslov: <b>{{ achivment.name }}</b></span>
              <br>
              <span>Datum: <b>{{ achivment.date | dateFormat }}</b></span>
            </div>

          <button 
                style="width: 10%"
                v-on:click="openEdit('edit')"
                class="ui yellow button w3-right"
            ><i class="edit icon"></i>Urejaj</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
var moment = require('moment');
export default {
  data() {
    return {
      achivments: [],
      achivmentsForDisplay: [],
      filterValue: null
    };
  },
  filters: {
    dateFormat: date => moment(date).format('DD. MM. YYYY')
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      fetch("http://localhost:3000/api/get/competitions")
        .then(response => response.json())
        .then(data => {
          this.achivments = data["competitions"];
          this.achivmentsForDisplay = this.achivments;
        });
    },
    filterAchivments: function() {
      if (window.event.keyCode != 13) return;
      this.achivmentsForDisplay = this.achivments.filter(row => {
        let values = Object.keys(row).map(x => row[x].includes(this.filterValue));
        return values.includes(true) ? true : false;
      });
    },
    openEdit: function(type) {
      window.location = `/achivments/1/${type}/`;
    }
  }
};
</script>