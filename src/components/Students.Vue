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
            v-for="(student, index) in studentsForDisplay"
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
export default {
  data() {
    return {
      students: [],
      studentsForDisplay: [],
      filtersApplied: [
        {key: "name", value: "janez"}
      ],
      sortByKey: "name",
      sortASC: true
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    filter: function(key, value) {
      keys = filtersApplied.map(x => x.key);
      key in keys ? 
        filtersApplied[keys.indexOf(key)] = value
        : filtersApplied.push({"key": key, "value": value});

      filtersApplied.forEach(item => {
          this.studentsForDisplay = this.students.filter(student => student[item.key].includes(item.value));
      });

      if(this.sortByKey) this.tblSort(this.sortByKey);
    },
    tblSort: function(key) {
        this.sortByKey = key;
        this.studentsForDisplay = this.studentsForDisplay.sort((a, b) => 
          this.sortASC ?
            a[this.sortByKey].localeCompare(b[this.sortByKey])
            : b[this.sortByKey].localeCompare(a[this.sortByKey])
        );
    },
    fetchData: function() {
      fetch("http://localhost:3000/api/get/students")
        .then(response => response.json())
        .then(data => (this.students = data["students"]));

      console.log(this.students);
    },
    changeLocation: function(student) {
      window.location = `/students/${student}/`;
    }
  }
};
</script>