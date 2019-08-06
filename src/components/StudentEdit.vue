<template>
  <div class="ui padded grid">
    <szr-header title='<i class="id badge outline icon"></i>Urejanje dijaka'/>
    <div style="padding-top: 9vh !important; width: 100% !important" class="ui padded grid">
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
                <b>{{ `${student.name} ${student.surname}` | capFirst }}</b>
              </p>
              <p>
                Razred:
                <b>{{ student.class }}</b>
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
              v-on:click="editAchivmentsForStudent(student.id)"
            >Uredi dosezke</button>
            <button
              style="margin-bottom: 10px;  width: 100% !important;"
              class="ui primary button"
              v-on:click="editCompetitionsForStudent(student.id)"
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
                <b>
                  {{ subject.shortname | capitalize }}
                  {{" - "}}
                </b>{{ subject.name }}
              </td>
              <td class="surname">
                <div class="ui icon input">
                  <input type="text" placeholder="Dodaj oceno" maxlength="1"/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      student: [],
      subjects: [],
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: async function() {
      fetch("http://localhost:3000/api/get/get-grades-by-qid", {
        method: "POST",
        body: JSON.stringify({ id: this.$route.params.id }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          this.subjects = data["result"]
        });
    

      fetch("http://localhost:3000/api/get/get-student-by-qid", {
        method: "POST",
        body: JSON.stringify({ id: this.$route.params.id }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.student = data.result[0];
        });
    },
    editAchivmentsForStudent: function(idStudent) {
      window.location = `/admin/students/${idStudent}/achivments`;
    },
    editAchivmentsForStudent: function(idStudent) {
      window.location = `/admin/students/${idStudent}/achivments`;
    }
  }
};
</script>