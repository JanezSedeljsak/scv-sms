<template>
  <div class="ui padded grid">
    <div style="width:100%; border-bottom: 1px solid #666" class="ui">
      <h1 style="padding: 5px" class="ui header">
        <i class="graduation cap icon"></i>Dijaki
      </h1>
    </div>
    <div class="row">
      <table style="border-radius: 0" class="ui single line striped selectable unstackable table">
        <thead id="studentFilters" class="ui inverted blue table">
          <tr>
            <th>
              <i class="filter icon"></i>
            </th>
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
            <th class="sort hover-head" data-sort="name">Ime</th>
            <th class="sort hover-head" data-sort="surname">Priimek</th>
          </tr>
        </thead>
        <tbody class="list">
          <tr
            class="studentRow"
            v-bind:key="index"
            v-for="(student, index) in students"
            v-on:click="changeLocation(index)"
          >
            <td>{{ index + 1}}</td>
            <td class="name">{{ student.name }}</td>
            <td class="surname">{{ student.surname }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import List from "list.js";
var options = {
  valueNames: ["name", "surname"]
};

var userList = new List("studentFilters", options);
export default {
  data() {
    return {
      students: [],
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
    changeLocation: function(student) {
      window.location = `/students/${student}/`;
    }
  }
};
</script>