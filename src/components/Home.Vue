<template>
  <h1>Dobrodošli na spletni aplikaciji za razvščanje dijakov ŠCV-ja</h1>
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