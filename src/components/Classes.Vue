<template>
  <div class="ui padded grid">
    <szr-header title="<i class='users icon'></i>Razredi" />
    <div style="padding-top: 9vh !important; width: 100% !important" class="ui padded grid">
      <div v-if="!editClass" class="row">
        <div style="margin-left: 2%; width: 29.3%;" class="ui icon input">
          <input
            class="prompt"
            type="text"
            placeholder="Filtriraj razrede..."
            v-model="filterValue"
            v-on:keydown="filterClasses()"
          />
          <i class="filter icon"></i>
        </div>
      </div>
      <div v-if="!editClass" class="row">
        <div
          style="float: left; width: 29.3%; margin: 2% !important; margin-top: 0 !important"
          class="ui card"
          v-for="(_class, index) in classesForDisplay"
          v-bind:key="index"
        >
          <div class="image">
            <div class="img-container">
              <img
                style="padding: 10px; margin-left: 35%; width: 30%"
                src="./../assets/classroom.png"
              />
            </div>
          </div>
          <div class="content">
            <a class="header">{{ _class.class }}</a>
            <div class="meta">
              <span class="date">{{ _class.school }}</span>
            </div>
          </div>
          <div class="extra content">
            <a v-on:click="toggleView(index)">
              <i class="add icon"></i>
              Pregled predmetov
            </a>
          </div>
        </div>
      </div>
      <div style="width: 100%" v-if="editClass">
        <div class="row">
          <button v-on:click="normalView()" class="ui right red labeled icon button">
            <i class="left arrow icon"></i>
            Nazaj
          </button>
        </div>
        <br />
        <div style="width: 100%" class="row">
          <div style="width: 100%" class="ui relaxed divided list">
            <div class="item">
              <div class="content" style="float: left; width: 10%">
                <i class="large add middle aligned icon"></i>
              </div>
              <div class="content" style="float: left; width: 35%">
                <a class="header">Kratica</a>
              </div>
              <div class="content" style="float: left; width: 35%">
                <a class="header">Naziv</a>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classes: [],
      classesForDisplay: [],
      subjects: [],
      filterValue: null,
      editClass: null
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      fetch("http://localhost:3000/api/get/classes", { method: "GET" })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.classes = data.result;
          this.classesForDisplay = data.result;
        });

      fetch("http://localhost:3000/api/get/subjects", { method: "GET" })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.subjects = data.result;
        });
    },
    filterClasses: function() {
      if (window.event.keyCode != 13) return;
      this.filterValue = this.filterValue.toLowerCase();
      this.classesForDisplay = this.classes.filter(
        row =>
          row.class.toLowerCase().includes(this.filterValue) ||
          row.school.toLowerCase().includes(this.filterValue)
      );
    },
    toggleView: function(index) {
      debugger;
      this.editClass = this.classesForDisplay[index];
    },
    normalView() {
      this.editClass = null;
    }
  }
};
</script>
