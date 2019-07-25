<template>
  <div class="ui padded grid">
    <szr-header title='<i class="trophy icon"></i>Urejanje dosežka'/>
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
            <textarea rows="3"></textarea>
          </div>
        </div>
        <hr style="width: 93.8%; border-bottom: 2px solid #2185d0" />
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
import Datepicker from "vuejs-datepicker";

export default {
  data() {
    return {};
  },
  components: {
    Datepicker
  },
  created: function() {},
  methods: {}
};
</script>