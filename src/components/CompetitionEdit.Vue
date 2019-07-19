<template>
<div class="ui padded grid">
    <div style="width:100%; box-shadow: 0 4px 2px -2px gray;" class="ui">
        <h1 style="padding: 5px" class="ui header">
         <i class="trophy icon"></i>Urejanje tekmovanja
      </h1>
    </div>
    <div class="row">
        <form class="ui form">
            <div class="ui grid">
                <div class="five wide column">
                    <label>Naslov</label>
                    <input type="text" name="first-name">
                </div>
                <div class="five wide column">
                    <label>Datum</label>
                    <input type="text" name="first-name">
                </div>
                <div class="five wide column">
                    <label>Mesto</label>
                    <input type="text" name="first-name">
                </div>
                <div class="five wide column">
                    <label>Stopnja</label>
                    <input type="text" name="first-name">
                </div>
                <div class="five wide column">
                    <label>Nivo</label>
                    <input type="text" name="first-name">
                </div>
                <div class="five wide column">
                    <label>Tip</label>
                    <input type="text" name="first-name">
                </div>
                <div class="five wide column">
                    <label>Mentor</label>
                    <input type="text" name="first-name">
                </div>
                <div class="ten wide column">
                    <label>Opis</label>
                    <input type="text" name="first-name">
                </div>
            </div>
            <hr style="width: 93.8%; border-bottom: 2px solid #2185d0">
            <h3 style="color: #2185d0">Vključeni dijaki</h3>
            <table style="box-shadow: none !important; width: 93.8%" class="ui celled table">
                <thead class="ui inverted blue table">
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
        </form>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  created: function() {
  },
  methods: {
  }
};
</script>