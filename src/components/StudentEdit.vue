<template>
  <div class="ui padded grid">
    <szr-header title='<i class="id badge outline icon"></i>Urejanje dijaka'/>
    <div class="row">
      <div
        style="height: 27vw; box-shadow: 0 0 10px #333 !important; margin-top: 15px; width: 23%"
        class="ui card"
      >
        <div class="content">
          <img
            src="./../assets/userlogin.png"
            style="margin-bottom: 10px; margin-left: 27%; width: 45%"
          />
        </div>
        <div class="content">
          <h4 style="box-shadow: 0 4px 2px -2px gray;">Osnovni podatki</h4>
          <div class="content">
            <p>
              Ime & Priimek
              <b>{{ student.name }}&nbsp;{{ student.surname }}</b>
            </p>
            <p>
              Razred:
              <b>3.tra</b>
            </p>
            <p>
              Povp. ocena
              <b>4.87</b>
            </p>
          </div>
        </div>
        <div class="extra content">
          <!--<select
            style="margin-bottom: 10px; width: 100% !important;"
            name="predmet"
            class="ui dropdown"
            v-model="pickedYear"
          >
            <option v-bind:value="null">Izberi leto</option>
            <option v-bind:key="index" v-for="(year, index) in years" v-bind:value="year">{{ year }}</option>
          </select>-->
          <button
            style="margin-bottom: 10px;  width: 100% !important;"
            class="ui primary button"
            v-on:click="editAchivmentsForStudent()"
          >Uredi dosezke</button>
          <button
            style="margin-bottom: 10px;  width: 100% !important;"
            class="ui primary button"
            v-on:click="editCompetitionsForStudent()"
          >Uredi tekmovanja</button>
          <button
            style="width: 100% !important;"
            class="ui primary button"
            v-on:click="updateGrades()"
          >Posodobi ocene</button>
        </div>
      </div>
      <table
        class="ui single line striped selectable unstackable table"
        style="margin-left: 15px; width: 75.4%; height: 27vw;"
      >
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
            v-for="(subject, index) in subjects"
            v-on:click="changeLocation(index)"
          >
            <td>{{ index + 1}}</td>
            <td class="name">
              <b>{{ subject.short | capitalize }}</b>
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
      student: {
        "name": "",
        "surname": ""
      },
      subjects: [],
      pickedYear: null,
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
        .then(data => (this.subjects = data["subjects"]));

      fetch("http://localhost:3000/api/get/get-student-by-id", {
        method: "POST",
        body: JSON.stringify({ id: this.$route.params.id }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          this.student = data.result;
          console.log(this.student);
        });
    },
    editAchivmentsForStudent: function() {
      window.location = `/admin/students/${this.$route.params.id}/achivments`;
    }
  }
};
</script>