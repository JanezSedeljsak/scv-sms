<template>
  <div class="ui padded grid">
    <szr-header title="<i class='sticky note icon'></i>Zahtevki" />
    <div style="padding-top: 9vh !important; width: 100% !important" class="ui padded grid">
      <div class="row">
        <div style="width: 100%" class="ui relaxed divided list">
          <div class="item">
            <div class="content" style="float: left; width: 10%">
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
                  <input type="text" placeholder="filtriraj nazive..." />
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
          <div class="item" v-for="index in 10" v-bind:key="index">
            <div class="content" style="float: left; width: 10%">
              <i v-if="!active" class="search plus large alternate icon middle aligned icon"></i>
              <i v-else class="search minus large alternate icon middle aligned icon"></i>
            </div>
            <div class="content" style="float: left; width: 25%">
              <a class="header">Janez Sedeljsak</a>
              <div class="description date">{{ new Date() | dateFormat }}</div>
            </div>
            <div class="content" style="float: left; width: 25%">
              <a class="header">Naziv</a>
              <div class="description">Odobritev ocen za leto 2018/19</div>
            </div>
            <div class="content" style="float: left; width: 25%">
              <a class="header">Stanje</a>
              <div class="description date">{{ 'odobreno' }}</div>
            </div>
            <div v-if="active" class="content" style="float: left; width: 99%">
              <a class="header">Daljši opis</a>
              <div
                class="description date"
              >{{ 'Donec sagittis viverra lorem, quis vestibulum augue rhoncus sed. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc volutpat lectus ac tristique egestas. Donec id lectus nec mi pulvinar aliquam sed sed eros. Phasellus a leo quam. Aliquam feugiat rutrum dui, eget mollis quam posuere nec. Proin rutrum feugiat elit quis vulputate. Proin ac nulla ultricies, pellentesque purus nec, vehicula nisl. Pellentesque in elementum turpis, eu molestie dolor. Nulla eu nisi a nunc fringilla aliquet eu vitae turpis. Suspendisse et tellus ac tortor tempus pretium. Donec vitae lectus eget magna eleifend faucibus non in justo. Sed feugiat vitae velit vel interdum. Sed blandit cursus dui, quis euismod tortor varius a.' }}</div>
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
      selectedClass: null,
      pickedClass: null,
      subjects: [],
      classes: [],
      classesForDisplay: [],
      filterValue: null,
      tabOpen: "recived"
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      fetch("http://localhost:3000/api/get/classes", { method: "GET" })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.classes = data.result;
          this.classesForDisplay = data.result;
        });
    },
    setTab(tab) {
      this.tabOpen = tab;
    },
    filterClasses: function() {
      if (window.event.keyCode != 13) return;
      this.filterValue = this.filterValue.toLowerCase();
      this.classesForDisplay = this.classes.filter(
        row =>
          row.class.toLowerCase().includes(this.filterValue) ||
          row.school.toLowerCase().includes(this.filterValue)
      );
    },
    toggleView: function(index) {
      this.classes[index].tView = !this.classes[index].tView;
      alert("size big");
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
