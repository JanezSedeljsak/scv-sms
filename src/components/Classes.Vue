<template>
  <div class="ui padded grid">
    <szr-header title='<i class="book icon"></i>Predmeti'/>
    <div class="row">
      <select style="width: 40%;" name="predmet" class="ui dropdown" v-model="pickedClass">
        <option v-bind:value="null">Izberi razred</option>
        <option
          v-bind:key="index"
          v-for="(_class, index) in classes"
          v-bind:value="index"
        >{{ _class.name }}</option>
      </select>
    </div>
    <div v-if="pickedClass != null" class="row">
      <ul style="display:block; width:70%" class="w3-ul w3-card-4">
        <li v-bind:key="index" v-for="(subject, index) in subjects" class="w3-bar">
          <a v-tooltip.top-center="'Odstrani predmet iz razreda'" v-on:click="removeSubject(index)" class="ui round-button w3-right">
            <i class="delete icon"></i>
          </a>
          <img src="https://backgroundcheckall.com/wp-content/uploads/2017/12/book-clipart-transparent-background-5.png" class="w3-bar-item w3-circle w3-hide-small" style="width:85px" />
          <div class="w3-bar-item">
            <span class="w3-large"><b>{{ subject.short | capitalize }}</b></span>
            <br />
            <span>{{ subject.long }}</span>
          </div>
        </li>
        <li class="w3-bar">
            <button 
                style="width: 15%"
                v-if="selectedClass != null"
                v-on:click="addSubject(index)"
                class="ui green button w3-right"
            ><i class="add icon"></i>Dodaj</button>
          <img src="https://backgroundcheckall.com/wp-content/uploads/2017/12/book-clipart-transparent-background-5.png" class="w3-bar-item w3-circle w3-hide-small" style="width:85px" />
          <div style="width: 40%;" class="w3-bar-item">
            <select style="width: 90%;" name="predmet" class="ui dropdown" v-model="selectedClass">
              <option v-bind:value="null">Izberi predmet</option>
              <option
                v-bind:key="index"
                v-for="(subject, index) in subjects"
                v-bind:value="index"
              >{{ subject.long }}</option>
            </select>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedClass: null,
      pickedClass: null,
      subjects: [],
      classes: []
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
        fetch("http://localhost:3000/api/get/subjects", { method: "GET" })
            .then(response => response.json())
            .then(data => (this.subjects = data["subjects"]));
        fetch("http://localhost:3000/api/get/classes", { method: "GET" })
            .then(response => response.json())
            .then(data => (this.classes = data["classes"]));
    },
    removeSubject: function() {
        this.$forceUpdate();
    },
    addSubject: function() {
        this.$forceUpdate();
    }
  }
};
</script>
