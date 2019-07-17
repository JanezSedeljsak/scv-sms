<template>
  <div class="ui padded grid">
    <div style="width:100%; border-bottom: 1px solid #666" class="ui">
      <h1 style="padding: 5px" class="ui header">
        <i class="id badge outline icon"></i>Urejanje dijaka
      </h1>
    </div>
    <div class="row">
      <div class="ui large horizontal divided list">
        <div class="item">
          <div class="content">
            <div class="header">Ime & Priimek</div>Janez Sedeljsak
          </div>
        </div>
        <div class="item">
          <div class="content">
            <div class="header">Razred</div>3.tra
          </div>
        </div>
        <div class="item">
          <div class="content">
            <div class="header">Povp. Ocena</div>3.2
          </div>
        </div>
        <div class="item">
          <div class="content">
            <button 
              class="ui secondary button"
              v-on:click="editAchivmentsForStudent()"
            >Urejaj dosezke</button>
          </div>
        </div>

        <div class="item">
          <div class="content">
            <div class="header">Izberi leto</div>
            <select
              style="height: 10px; min-width: 60px;"
              name="predmet"
              class="ui dropdown"
              v-model="pickedYear"
            >
              <option
                v-bind:key="index"
                v-for="(year, index) in years"
                v-bind:value="year"
              >{{ year }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <table class="ui single line striped selectable unstackable table">
        <thead class="ui inverted blue table">
          <tr>
            <th>#</th>
            <th>Predmet</th>
            <th>Ocena</th>
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
            <td class="name">
              <b>{{ student.short | capitalize }}</b>
            </td>
            <td class="surname">
              <div class="ui icon input">
                <input type="text" placeholder="Dodaj oceno" />
              </div>
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
      modal: false,
      pickedYear: "2018/19",
      years: ["2016/17", "2017/18", "2018/19", "2019/20", "2020/21"]
    };
  },
  filters: {
    capitalize: value => value.toUpperCase()
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      fetch("http://localhost:3000/api/get/subjects")
        .then(response => response.json())
        .then(data => (this.students = data["subjects"]));
    },
    editAchivmentsForStudent: function() {
      window.location = `/students/${this.$route.params.id}/achivments`;
    }
  }
};
</script>