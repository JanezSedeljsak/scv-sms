<template>
  <div class="ui padded grid">
    <szr-header title='<i class="graduation cap icon"></i>Dijaki'/>
    <div class="row">
      <select style="width: 40%;" name="predmet" class="ui dropdown" v-model="pickedYear">
        <option v-bind:key="index" v-for="(year, index) in years" v-bind:value="index">{{ year }}</option>
      </select>
    </div>
    <div class="row">
      <table class="ui single line striped selectable unstackable table">
        <thead>
          <tr>
            <th>
              <i class="filter icon"></i>
            </th>
            <th>
              <div style="border: 1px solid #44444466" class="ui inverted left icon input">
                <input
                  v-model="filtersApplied.name"
                  v-on:keydown="filter()"
                  type="text"
                  placeholder="filtriraj imena..."
                />
                <i class="search icon"></i>
              </div>
            </th>
            <th>
              <div style="border: 1px solid #44444466" class="ui inverted left icon input">
                <input
                  v-model="filtersApplied.surname"
                  v-on:keydown="filter()"
                  type="text"
                  placeholder="filtriraj priimke..."
                />
                <i class="search icon"></i>
              </div>
            </th>
            <th>
              <div style="border: 1px solid #44444466" class="ui inverted left icon input">
                <input
                  v-model="filtersApplied.surname"
                  v-on:keydown="filter()"
                  type="text"
                  placeholder="filtriraj razrede..."
                />
                <i class="search icon"></i>
              </div>
            </th>
            <th>
              <div style="border: 1px solid #44444466" class="ui inverted left icon input">
                <input
                  v-model="filtersApplied.surname"
                  v-on:keydown="filter()"
                  type="text"
                  placeholder="filtriraj ocene..."
                />
                <i class="search icon"></i>
              </div>
            </th>
          </tr>
          <tr class="ui inverted blue table">
            <th>#</th>
            <th class="sort hover-head" v-on:click="sortActionClick('name')">Ime</th>
            <th class="sort hover-head" v-on:click="sortActionClick('surname')">Priimek</th>
            <th class="sort hover-head" v-on:click="sortActionClick('surname')">Razredi</th>
            <th class="sort hover-head" v-on:click="sortActionClick('surname')">Potrjene ocene</th>
            <th class="sort hover-head">Akcije</th>
          </tr>
        </thead>
        <tbody class="list">
          <tr
            class="studentRow"
            v-bind:key="index"
            v-for="(student, index) in studentsForDisplay"
          >
            <td>{{ index + 1}}</td>
            <td class="name">{{ student.name }}</td>
            <td class="surname">{{ student.surname }}</td>
            <td class="surname">{{ "3.tra" }}</td>
            <td class="surname">
              <i style="color: green" v-if="true" class="check icon"></i>
              <i style="color: red" v-else class="close icon"></i>
            </td>
            <td>
              <a
                v-tooltip.top-center="'Uredi podatke dijaka'"
                v-on:click="changeLocation( student.id)"
                class="ui round-button w3-right"
              >
                <i class="edit icon"></i>
              </a>
            </td>
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
      filtersApplied: {
        name: "",
        surname: ""
      },
      sortByKey: "name",
      sortASC: true,
      pickedYear: "2018/19",
      years: ["2016/17", "2017/18", "2018/19", "2019/20", "2020/21"]
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    filter: function() {
      if (window.event.keyCode != 13) return;
      this.studentsForDisplay = this.students.filter(student => {
        return (
          student["name"]
            .toUpperCase()
            .includes(this.filtersApplied["name"].toUpperCase()) &&
          student["surname"]
            .toUpperCase()
            .includes(this.filtersApplied["surname"].toUpperCase())
        );
      });
      if (this.sortByKey) this.tblSort(this.sortByKey);
    },
    sortActionClick: function(key) {
      if (this.sortByKey == key) this.sortASC = !this.sortASC;
      this.tblSort(key);
    },
    tblSort: function(key) {
      this.sortByKey = key;
      this.studentsForDisplay = this.studentsForDisplay.sort((a, b) =>
        this.sortASC
          ? a[this.sortByKey].localeCompare(b[this.sortByKey])
          : b[this.sortByKey].localeCompare(a[this.sortByKey])
      );
    },
    fetchData: function() {
      fetch("http://localhost:3000/api/get/students")
        .then(response => response.json())
        .then(data => {
          this.students = data["result"];
          this.studentsForDisplay = data["result"];
        });
    },
    changeLocation: function(student) {
      window.location = `/admin/students/${student}/`;
    }
  }
};
</script>