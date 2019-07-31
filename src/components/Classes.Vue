<template>
  <div class="ui padded grid">
    <szr-header title="<i class='users icon'></i>Razredi" />
    <div style="padding-top: 4vw !important; width: 100% !important" class="ui padded grid">
      <div class="row">
        <div style="margin-left: 2%" class="ui icon input">
          <input 
            class="prompt" 
            type="text" 
            placeholder="Filtriraj razrede..."
            v-model="filterValue"
            v-on:keydown="filterClasses()" 
          />
          <i class="search icon"></i>
        </div>
      </div>
      <div class="row">
        <div 
          style="float: left; width: 29.3%; margin: 2% !important" 
          class="ui card" 
          v-for="(_class, index) in classesForDisplay" 
          v-bind:key="index"
        >
          <div class="image">
            <div class="img-container">
              <img style="padding: 10px; margin-left: 35%; width: 30%" src="./../assets/classroom.png" />
            </div>
          </div>
          <div class="content">
            <a class="header">{{ _class.class }}</a>
            <div class="meta">
              <span class="date">{{ _class.school }}</span>
            </div>
          </div>
          <div class="extra content">
            <a>
              <i class="add icon"></i>
              Pregled predmetov
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
      selectedClass: null,
      pickedClass: null,
      subjects: [],
      classes: [],
      classesForDisplay: [],
      filterValue: null,
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
    },
    filterClasses: function() {
      if (window.event.keyCode != 13) return;
      this.filterValue = this.filterValue.toLowerCase()
      this.classesForDisplay = this.classes.filter(row => 
        row.class.toLowerCase().includes(this.filterValue) 
          || row.school.toLowerCase().includes(this.filterValue));
    },
    toggleView: function(index) {
      this.classes[index].tView = !this.classes[index].tView;
      alert("size big");
    },
    removeSubject: function() {
      this.$forceUpdate();
    },
    addSubject: function() {
      this.$forceUpdate();
    }
  }
};
</script>
