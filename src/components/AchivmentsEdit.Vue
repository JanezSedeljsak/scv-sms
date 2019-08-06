<template>
  <div class="ui padded grid">
    <szr-header title="<i class='trophy icon'></i>Urejanje dosežka" />
    <div style="padding-top: 9vh !important; width: 100% !important" class="ui padded grid">
      <div class="row">
        <form class="ui form">
          <div class="ui grid">
            <div class="five wide column">
              <label>Naslov</label>
              <input type="text" name="first-name" />
            </div>
            <div class="five wide column">
              <label>Datum</label>
              <datepicker :value="new Date()" name="uniquename"></datepicker>
            </div>
            <div class="five wide column">
              <label>Mesto</label>
              <input type="text" name="first-name" />
            </div>
            <div class="five wide column">
              <label>Tip</label>
              <br />
              <div style="width:100%" class="ui inverted right icon input">
                <input type="text" />
                <i class="formIcon edit icon"></i>
              </div>
            </div>
            <div class="five wide column">
              <label>Nivo</label>
              <br />
              <div style="width:100%" class="ui inverted right icon input">
                <input type="text" />
                <i class="formIcon edit icon"></i>
              </div>
            </div>
            <div class="five wide column">
              <label>Mentor</label>
              <br />
              <div style="width:100%" class="ui inverted right icon input">
                <input type="text" />
                <i class="formIcon edit icon"></i>
              </div>
            </div>
            <div class="five wide column">
              <label>Šolsko leto</label>
              <br />
              <div style="width:100%" class="ui inverted right icon input">
                <input type="text" />
                <i class="formIcon edit icon"></i>
              </div>
            </div>
            <div class="ten wide column">
              <label>Opis</label>
              <vue-editor/>
            </div>
          </div>
          <hr style="width: 93.8%; border-bottom: 2px solid #2185d0" />
          <h3 style="color: #2185d0">Vključeni dijaki</h3>
          <div style="width: 93.8%" class="ui relaxed divided list">
            <div class="item">
              <div class="content" style="float: left; width: 10%">
                <a class="header">#</a>
              </div>
              <div class="content" style="float: left; width: 31%">
                <a class="header">Ime</a>
              </div>
              <div class="content" style="float: left; width: 31%">
                <a class="header">Priimek</a>
              </div>
              <div class="content" style="float: left; width: 27%">
                <i class="w3-right large add icon"></i>
              </div>
            </div>
            <div
              id="list_display"
              class="item"
              v-for="(student, index) in students"
              v-bind:key="index"
            >
              <div class="content" style="float: left; width: 10%">
                <div class="header">{{ index + 1 }}</div>
              </div>
              <div class="content" style="float: left; width: 31%">
                <div class="header">{{ student.name | capFirst }}</div>
              </div>
              <div class="content" style="float: left; width: 31%">
                <div class="header">{{ student.surname | capFirst }}</div>
              </div>
              <div class="content" style="float: left; width: 27%">
                <i v-on:click="openEdit(student.id)" class="w3-right large remove icon"></i>
                <i v-on:click="openEdit(student.id)" class="w3-right large edit icon"></i>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { VueEditor } from "vue2-editor";

export default {
  data() {
    return {
      students: []
    };
  },
  components: {
    Datepicker,
    VueEditor
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData() {
        fetch("http://localhost:3000/api/get/students")
        .then(response => response.json())
        .then(data => {
          this.students = data["result"];
        });
    }
  }
};
</script>