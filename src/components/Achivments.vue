<template>
  <div class="ui padded grid">
    <div style="width:100%; border-bottom: 1px solid #666" class="ui">
      <h1 style="padding: 5px" class="ui header">
        <i class="trophy icon"></i>Dosezki
      </h1>
    </div>
    <div class="row">
      <table style="border-radius: 0" class="ui single line striped selectable unstackable table">
        <thead class="ui inverted grey table">
          <tr>
            <th><i class="filter icon"></i></th>
            <th>
              <div class="ui inverted left icon input">
                <input type="text" placeholder="filtriraj..." />
                <i class="search icon"></i>
              </div>
            </th>
            <th>
              <div class="ui inverted left icon input">
                <input type="text" placeholder="filtriraj..." />
                <i class="search icon"></i>
              </div>
            </th>
          </tr>
          <tr>
            <th>#</th>
            <th class="hover-head">Ime</th>
            <th class="hover-head">Priimek</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="studentRow"
            v-bind:key="index"
            v-for="(student, index) in students"
            v-on:click="editStudent(index)"
          >
            <td>{{ index + 1}}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.surname }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="modal" style="display:block" class="ui modal">
      <i class="close icon"></i>
      <div class="header">Profile Picture</div>
      <div class="image content">
        <div class="description">
          <div class="ui header">We've auto-chosen a profile image for you.</div>
          <p>We've grabbed the following image from image associated with your registered e-mail address.</p>
          <p>Is it okay to use this photo?</p>
        </div>
      </div>
      <div class="actions">
        <div class="ui black deny button" v-on:click="modal = false">Nope</div>
        <div class="ui positive right labeled icon button">
          Yep, that's me
          <i class="checkmark icon"></i>
        </div>
      </div>
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