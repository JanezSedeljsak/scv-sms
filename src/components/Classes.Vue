<template>
  <div class="ui padded grid">
    <div style="width:100%; border-bottom: 1px solid #666" class="ui">
      <h1 style="padding: 5px" class="ui header">
        <i class="book icon"></i>Predmeti
      </h1>
    </div>
    <div class="row">
      <select style="width: 40%;" name="predmet" class="ui dropdown" v-model="pickedClass">
        <option v-bind:value="null">Izberi razred</option>
        <option
          v-bind:key="index"
          v-for="(subject, index) in subjects"
          v-bind:value="index"
        >{{ subject.long }}</option>
      </select>
    </div>
    <div v-if="pickedClass != null" class="row">
      <ul style="display:block; width:90%" class="w3-ul w3-card-4">
        <li v-bind:key="index" v-for="(subject, index) in subjects" class="w3-bar">
            <button 
                style="width: 10%"
                v-on:click="removeSubject(index)"
                class="ui red button w3-right"
            ><i class="remove icon"></i>Odstrani</button>
          <img src="https://backgroundcheckall.com/wp-content/uploads/2017/12/book-clipart-transparent-background-5.png" class="w3-bar-item w3-circle w3-hide-small" style="width:85px" />
          <div class="w3-bar-item">
            <span class="w3-large"><b>{{ subject.short | capitalize }}</b></span>
            <br />
            <span>{{ subject.long }}</span>
          </div>
        </li>
        <li class="w3-bar">
            <button 
                style="width: 10%"
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
