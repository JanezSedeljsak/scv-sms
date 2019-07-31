<template>
  <div class="ui padded grid">
    <szr-header v-bind:title='"<i class=\"edit icon\"></i>" + this.titles[this.$route.params.titleIndex - 1]'/>
    <div style="padding-top: 9vh !important; width: 100% !important" class="ui padded grid">
      <div class="row" style="width:100%">
        <div
          style="box-shadow: 0 0 10px #333 !important; margin-left: 30%; width: 40%; padding: 15px"
          class="ui card"
        >
          <form class="ui form">
            <div class="field">
              <label>Naslov</label>
              <input type="text" name="first-name" />
            </div>
            <div class="field">
              <label>Vrednost</label>
              <input type="text" name="first-name" />
            </div>
            <button class="ui primary button" type="submit">Shrani zapis</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: ["Dodaj tip", "Dodaj nivo", "Uredi tip", "Uredi nivo"]
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {}
  }
};
</script>