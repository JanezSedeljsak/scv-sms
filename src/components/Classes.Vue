<template>
  <div class="ui padded grid">   
    <div style="width:100%; border-bottom: 1px solid #666" class="ui">
        <h1 style="padding: 5px" class="ui header"><i class="book icon"></i>Predmeti</h1>
    </div>
    <div class="row">
        <div style="width:55%" class="ui fluid selection dropdown">
        <input type="hidden" name="user">
        <i class="dropdown icon"></i>
        <div class="default text">Izberi razred</div>
        <div class="menu">
            <div class="item">
                Jenny Hess
            </div>
            <div class="item">
                Elliot Fu
            </div>
        </div>
    </div>
    <ul v-if="pickedClass" class="w3-ul w3-card-4" style="width: 50%">
        <li v-bind:key="index" v-for="(item, index) in classes" class="w3-bar">
            <img src="https://cdn.pixabay.com/photo/2017/01/13/14/26/book-1977396_960_720.png" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
            <div class="w3-bar-item">
                <h3 style="display:inline">{{ item.long }}</h3><br>
                <span>{{ item.short }}</span>
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
      pickedClass: null,
      classes: []
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      fetch("http://localhost:3000/api/get/classes")
        .then(response => response.json())
        .then(data => (this.classes = data["classes"]));
    }
  }
};
</script>
