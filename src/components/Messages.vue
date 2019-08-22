<template>
  <div class="ui padded grid">
    <szr-header title="<i class='sticky note icon'></i>Zahtevki" />
    <div style="padding-top: 9vh !important; width: 100% !important" class="ui padded grid">
      <div class="row">
        <div style="width: 100%" class="ui relaxed divided list">
          <div class="item">
            <div class="content" style="float: left; width: 15%">
              <i class="large filter icon middle aligned icon"></i>
            </div>
            <div class="content" style="float: left; width: 25%">
              <div class="description">
                <div class="ui corner labeled input">
                  <input type="text" placeholder="filtriraj dijake..." />
                  <div class="ui corner label">
                    <i class="asterisk icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="content" style="float: left; width: 25%">
              <div class="description date">
                <div class="ui corner labeled input">
                  <input type="text" placeholder="filtriraj vsebine..." />
                  <div class="ui corner label">
                    <i class="asterisk icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="content" style="float: left; width: 25%">
              <div class="description date">
                <div class="ui corner labeled input">
                  <input type="text" placeholder="filtriraj stanja..." />
                  <div class="ui corner label">
                    <i class="asterisk icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item" v-for="(item, index) in messages" v-bind:key="index">
            <div class="content" style="float: left; width: 15%">
              <i v-on:click="changeStatus(index)" class="pencil alternate large alternate icon middle aligned icon"></i>
              <i v-on:click="toggleActive(index)" v-show="!item.active" class="search plus large alternate icon middle aligned icon"></i>
              <i v-on:click="toggleActive(index)" v-show="item.active" class="search minus large alternate icon middle aligned icon"></i>
            </div>
            <div class="content" style="float: left; width: 25%">
              <a class="header">{{ item.student }}</a>
              <div class="description date">{{ item.date_sent | dateFormat }}</div>
            </div>
            <div class="content" style="float: left; width: 25%">
              <a class="header">Vsebina</a>
              <div class="description">{{ item.header }}</div>
            </div>
            <div class="content" style="float: left; width: 25%">
              <a class="header">Stanje</a>
              <div class="description date">{{ item.value }}</div>
            </div>
            <div v-if="item.active" class="content" style="margin-left: 15%; margin-top: 2vh; float: left; width: 70%">
              <a class="header">Vsebina</a>
              <div
                class="description date"
              >{{ item.content }}</div>
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
      messages: []
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      fetch("http://localhost:3000/api/get/messages", { method: "GET" })
        .then(response => response.json())
        .then(data => {
          this.messages = data.result.map(msg => Object.assign(msg, {active: false}));
        });
    },
    toggleActive: function(index) {
      this.messages[index].active = !this.messages[index].active;
    }
  }
};
</script>
