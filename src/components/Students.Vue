<template>
  <div class="ui padded grid">
    <szr-header title="<i class='graduation cap icon'></i>Dijaki" />
    <div style="padding-top: 9vh !important; width: 100% !important" class="ui padded grid">
      <div class="row">
        <div style="min-width: 33%" class="ui action left icon input">
          <i class="search icon"></i>
          <select
            @change="onYearChange($event)"
            style="width: 100%;"
            class="ui dropdown"
            v-model="pickedYear"
          >
            <option
              :value="year.id"
              v-bind:key="index"
              v-for="(year, index) in years"
            >{{ year.name }}</option>
          </select>
          <div class="ui black disabled button">Izberi leto</div>
        </div>
      </div>
      <div class="row">
        <div style="width: 100%" class="ui relaxed divided list">
          <div class="item">
            <div class="content" style="float: left; width: 5%">
              <i class="large filter middle aligned icon"></i>
            </div>
            <div class="content" style="float: left; width: 25%">
              <a class="header">Ime<i class="sort icon"></i></a>
              <div class="description">
                <div class="ui corner labeled input">
                  <input type="text" placeholder="naziv..." />
                  <div class="ui corner label">
                    <i class="asterisk icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="content" style="float: left; width: 25%">
              <a class="header">Priimek<i class="sort icon"></i></a>
              <div class="description">
                <div class="ui corner labeled input">
                  <input type="text" placeholder="naziv..." />
                  <div class="ui corner label">
                    <i class="asterisk icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="content" style="float: left; width: 25%">
              <a class="header">Razred<i class="sort icon"></i></a>
              <div class="description">
                <div class="ui corner labeled input">
                  <input type="text" placeholder="naziv..." />
                  <div class="ui corner label">
                    <i class="asterisk icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="content" style="float: left; width: 20%">
              <a class="header">Potrjene ocene<i class="sort icon"></i></a>
              <div class="description">
                <div class="ui corner labeled input">
                  <input type="text" placeholder="naziv..." />
                  <div class="ui corner label">
                    <i class="asterisk icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="student_display" class="item" v-for="(student, index) in students" v-bind:key="index">
            <div class="content" style="float: left; width: 5%">
              <i v-on:click="openEdit(student.id)" class="large edit middle aligned icon"></i>
            </div>
            <div class="content" style="float: left; width: 25%">
              <div class="header">{{ student.name }}</div>
            </div>
            <div class="content" style="float: left; width: 25%">
              <div class="header">{{ student.surname }}</div>
            </div>
            <div class="content" style="float: left; width: 25%">
              <div class="header">{{ student.class }}</div>
            </div>
            <div class="content" style="float: left; width: 20%">
              <div class="header">
                <i v-if="student.confirmed_grades" class="check green square outline icon"></i>
                <i v-else class="window red close outline icon"></i>
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
      students: [],
      years: [],
      pickedYear: null,
      years: []
    };
  },
  created: async function() {
    this.pickedYear = await this.getCurrentYear();
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
    onYearChange: function(event) {
      this.pickedYear = event.target.value;
      this.fetchStudents();
    },
    fetchStudents: async function() {
      fetch("http://localhost:3000/api/get/students-by-year", {
        method: "POST",
        body: JSON.stringify({ year: this.pickedYear }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.students = data["result"];
        });
    },
    fetchData: async function() {
      this.fetchStudents();
      fetch("http://localhost:3000/api/get/years")
        .then(response => response.json())
        .then(data => {
          this.years = data["result"];
        });
    },
    openEdit: function(student) {
      window.location = `/admin/students/${student}/`;
    }
  }
};
</script>