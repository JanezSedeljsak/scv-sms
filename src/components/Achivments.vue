<template>
  <div class="ui padded grid">
    <szr-header title="<i class='trophy icon'></i>Dosežki" />
    <div style="padding-top: 9vh !important; width: 100% !important" class="ui padded grid">
      <div class="row">
        <button style="margin-left: 2%; min-width: 14%" v-on:click="openCreate()" class="ui primary button w3-right">
          <i class="add icon"></i>Dodaj dosežek
        </button>
        <div style="margin-left: 1%; min-width: 14.3%" class="ui icon input">
          <input
            v-model="filterValue"
            v-on:keydown="filterAchivments()"
            class="prompt"
            type="text"
            placeholder="Filtriraj dosežke..."
          />
          <i class="search icon"></i>
        </div>
      </div>
      <div class="row">
        <div
          style="float: left; width: 29.3%; margin: 2% !important; margin-top: 0 !important"
          class="ui card"
          v-for="(achivment, index) in achivmentsForDisplay"
          v-bind:key="index"
        >
          <div class="image">
            <div class="img-container">
              <img
                style="padding: 10px; margin-left: 35%; width: 30%"
                src="./../assets/achievement.png"
              />
            </div>
          </div>
          <div class="content">
            <a class="header">{{ achivment.achivmentname }}</a>
            <div class="meta">
              <span class="date">{{ achivment.date | dateFormat }}</span>
            </div>
            <div class="description">
              tip dosežeka: <b>{{ achivment.type }}</b><br>
              nivo dosežeka: <b>{{ achivment.level }}</b>
            </div>
          </div>
          <div class="extra content">
            <a v-on:click="openEdit(achivment.id)">
              <i class="edit icon"></i>
              Uredi dosežek
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      achivments: [],
      achivmentsForDisplay: [],
      filterValue: null,
      editTooltip: "Odpri urejanje dosežkov"
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      fetch("http://localhost:3000/api/get/achivments")
        .then(response => response.json())
        .then(data => {
          this.achivments = data.result;
          this.achivmentsForDisplay = data.result;
        });
    },
    filterAchivments: function() {
      if (window.event.keyCode != 13) return;
      this.achivmentsForDisplay = this.achivments.filter(row => {
        let values = Object.keys(row).map(x =>
          row[x].includes(this.filterValue)
        );
        return values.includes(true) ? true : false;
      });
    },
    openEdit: function(id) {
      window.location = `/admin/achivments/${id}/edit/`;
    },
    openCreate: function() {
      window.location = `/admin/achivments/create/`;
    }
  }
};
</script>