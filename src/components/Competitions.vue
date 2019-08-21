<template>
  <div class="ui padded grid">
    <szr-header v-cloak title='<i class="sort numeric up icon"></i>Tekmovanja'/>
    <div style="padding-top: 9vh !important; width: 100% !important" class="ui padded grid">
      <div class="row">
        <button style="margin-left: 2%; width: 14%" v-on:click="openCreate()" class="ui primary button w3-right">
          <i class="add icon"></i>Dodaj tekmovanje
        </button>
        <div style="margin-left: 1%; width: 14.3%" class="ui icon input">
          <input
            v-model="filterValue"
            v-on:keydown="filterCompetitions()"
            class="prompt"
            type="text"
            placeholder="Filtriraj..."
          />
          <i class="filter icon"></i>
        </div>
      </div>
      <div class="row">
        <div
          style="float: left; width: 29.3%; margin: 2% !important; margin-top: 0 !important"
          class="ui card"
          v-for="(competition, index) in competitionsForDisplay"
          v-bind:key="index"
        >
          <div class="image">
            <div class="img-container">
              <img
                style="padding: 10px; margin-left: 35%; width: 30%"
                src="./../assets/competition.png"
              />
            </div>
          </div>
          <div class="content">
            <a v-on:click="openPreview(competition.id)" class="header">{{ competition.competition }}</a>
            <div class="meta">
              <span class="date">mentor:&nbsp;<b>{{ competition.teacher | capitalize }}</b></span>
            </div>
            <div class="description">
              rok prijave: <b>{{ competition.deadline | dateFormat }}</b><br>
              zasedenost: <b>{{ competition.places }}/{{ competition.places }}</b>
            </div>
          </div>
          <div class="extra content">       
            <a
              v-tooltip.top-center="'Pdf izvoz razsvrstitev'"
              v-on:click="openEdit(competition.id)"
              class="ui round-button w3-right"
            >
              <i class="file pdf icon"></i>
            </a>
            <a
              v-tooltip.top-center="'Uredi tekmovanje'"
              v-on:click="openEdit(competition.id)"
              class="ui round-button w3-right"
            >
              <i class="edit icon"></i>
            </a>
            <a
              v-tooltip.top-center="'Predogled prijavljenih'"
              v-on:click="openPreview(competition.id)"
              class="ui round-button w3-right add-btn"
            >
              <i class="add icon"></i>
            </a>
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
      competitions: [],
      competitionsForDisplay: [],
      filterValue: null,
      editTooltip: "Odpri urejanje tekmovanja",
      loading: true,
    };
  },
  created: function() {
    this.fetchData();
  },
  mounted: function() {
      this.loading = false
  },
  methods: {
    fetchData: function() {
      fetch("http://localhost:3000/api/get/competitions")
        .then(response => response.json())
        .then(data => {
          this.competitions = data.result;
          this.competitionsForDisplay = data.result;
          console.log(data.result);
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
    openEdit: (id) => {
      window.event.preventDefault();
      window.location = `/admin/competitions/${id}/edit`;
    },
    openPreview: (id) => {
      window.event.preventDefault();
      window.location = `/admin/competitions/${id}/preview`;    
    },
    openCreate: () => {
      window.event.preventDefault();
      window.location = `/admin/competitions/create/`;  
    }
  }
};
</script>