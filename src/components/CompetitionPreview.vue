<template>
  <div class="ui padded grid">
    <szr-header title="<i class='graduation cap icon'></i>Prijavljeni dijaki" />
    <div style="padding-top: 9vh !important; width: 100% !important" class="ui padded grid">
      <div class="row">
                <div style="width: 100%" class="ui relaxed divided list">
          <div class="item">
            <div class="content" style="float: left; width: 10%">
              <a class="header">#</a>
            </div>
            <div class="content" style="float: left; width: 22%">
              <a class="header">Ime</a>
            </div>
            <div class="content" style="float: left; width: 22%">
              <a class="header">Priimek</a>
            </div>
            <div class="content" style="float: left; width: 22%">
              <a class="header">Razred</a>
            </div>
            <div class="content" style="float: left; width: 22%">
              <i class="w3-right large filter icon"></i>
            </div>
          </div>
          <div id="student_display" class="item" v-for="(student, index) in students" v-bind:key="index">
            <div class="content" style="float: left; width: 10%">
              <div class="header">{{ index + 1 }}</div> 
            </div>
            <div class="content" style="float: left; width: 22%">
              <div class="header">{{ student.name | capFirst }}</div>
            </div>
            <div class="content" style="float: left; width: 22%">
              <div class="header">{{ student.surname | capFirst }}</div>
            </div>
            <div class="content" style="float: left; width: 22%">
              <div class="header">{{ student.class | capFirst }}</div>
            </div>
            <div class="content" style="float: left; width: 22%">
              <i v-on:click="openEdit(student.id)" class="w3-right large edit icon"></i>
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
      students: []
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      fetch("http://localhost:3000/api/get/competition-students", {
        method: "POST",
        body: JSON.stringify({ id: this.$route.params.id }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          this.students = data["result"];
        });
    },
    changeLocation: function(student) {
      window.location = `/admin/students/${student}/`;
    }
  }
};
</script>