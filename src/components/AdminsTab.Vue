<template>
  <div class="ui padded grid">
    <div style="width:100%; box-shadow: 0 4px 2px -2px gray;" class="ui">
      <h1 style="padding: 5px" class="ui header">
        <i class="graduation cap icon"></i>Administratorji
      </h1>
    </div>
    <div class="row">
      <button 
            v-on:click="toggle()"
            class="ui primary button w3-right"
      >
      <span v-if="toggleDisplay"><i class="add icon"></i>Dodaj administratorja</span>
      <span v-if="!toggleDisplay"><i class="th list icon"></i>Pregled administratorjev</span>
      </button>
    </div>
    <div v-if="!toggleDisplay" class="row">
        <div style="box-shadow: 0 0 10px #333 !important; margin-left: 30%; width: 40%; padding: 15px" class="ui card">
            <form class="ui form">
            <h1>Ustvari administratorja</h1>
            <div class="field">
                <label>Ime</label>
                <input type="text" name="first-name">
            </div>
            <div class="field">
                <label>Priimek</label>
                <input type="text" name="first-name">
            </div>
            <div class="field">
                <label>E-pošta</label>
                <input type="text" name="first-name">
            </div>
            <div class="field">
                <label>Geslo</label>
                <input type="text" name="first-name">
            </div>
            <div class="field">
                <label>Ponovi geslo</label>
                <input type="text" name="last-name">
            </div>
            <button class="ui primary button" type="submit">Dodaj administratorja</button>
            </form>
        </div>
    </div>
    <div v-else class="row">
        <table class="ui celled table">
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Priimek</th>
                    <th>E-Pošta</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-label="Name">James</td>
                    <td data-label="Age">24</td>
                    <td data-label="Job">Engineer</td>
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
        toggleDisplay: true
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
      toggle: function() { this.toggleDisplay = !this.toggleDisplay }
  }
};
</script>