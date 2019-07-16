<template>
  <div class="ui padded grid">
    <div style="width:100%; border-bottom: 1px solid #666" class="ui">
      <h1 style="padding: 5px" class="ui header">
        <i class="id badge outline icon"></i>Urejanje dijaka
      </h1>
    </div>
    <div class="row">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [],
      modal: false
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      fetch("http://localhost:3000/api/get/students")
        .then(response => response.json())
        .then(data => (this.students = data["students"]));
    },
    editStudent: function(student) {
      this.modal = true;
    }
  }
};
</script>