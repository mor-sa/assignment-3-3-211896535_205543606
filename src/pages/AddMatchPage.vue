// add match page for league mangement, i made the most should only connect to server!
<template>
  <div class="container">
    <h1 class="title">Add Match</h1>
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-matchId"
        label-cols-sm="3"
        label="Match Id:"
        label-for="matchId"
      >
        <b-form-input
          id="matchId"
          v-model="$v.form.matchId.$model"
          type="text"
          :state="validateState('matchId')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.matchId.$model.required">
          Match Id is required
        </b-form-invalid-feedback>
        <!-- <b-form-invalid-feedback v-else-if="!$v.form.matchId.$model.decimal">
          match id should be a number
        </b-form-invalid-feedback> -->
      </b-form-group>

      <b-form-group
        id="input-group-matchDate"
        label-cols-sm="3"
        label="Match Date:"
        label-for="matchDate"
      >
        <b-form-datepicker
          id="matchDate"
          type="text"
          v-model="$v.form.matchDate.$model"
          :state="validateState('matchDate')"
        ></b-form-datepicker>
        <b-form-invalid-feedback>
          Match date is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-matchHour"
        label-cols-sm="3"
        label="Match Hour:"
        label-for="matchHour"
      >
        <b-form-timepicker
          id="matchHour"
          type="text"
          v-model="$v.form.matchHour.$model"
          :state="validateState('matchHour')"
        ></b-form-timepicker>
        <b-form-invalid-feedback>
          match hour is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-homeTeam"
        label-cols-sm="3"
        label="Home Team Id:"
        label-for="homeTeam"
      >
        <b-form-input
          id="homeTeam"
          type="text"
          v-model="$v.form.homeTeam.$model"
          :state="validateState('homeTeam')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.homeTeam.$model.required">
          home team id is required
        </b-form-invalid-feedback>
        <!-- <b-form-invalid-feedback v-else-if="!$v.form.homeTeam.$model.decimal">
          home team id should be a number
        </b-form-invalid-feedback> -->
      </b-form-group>

      <b-form-group
        id="input-group-awayTeam"
        label-cols-sm="3"
        label="Away Team Id:"
        label-for="awayTeam"
      >
        <b-form-input
          id="awayTeam"
          type="text"
          v-model="$v.form.awayTeam.$model"
          :state="validateState('awayTeam')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.awayTeam.$model.required">
          away team id is required
        </b-form-invalid-feedback>
        <!-- <b-form-invalid-feedback v-else-if="!$v.form.awayTeam.$model.decimal">
          away team id should be a number
        </b-form-invalid-feedback> -->
      </b-form-group>

      <b-form-group
        id="input-group-matchReferee"
        label-cols-sm="3"
        label="Referee Id:"
        label-for="matchReferee"
      >
        <b-form-input
          id="matchReferee"
          type="text"
          v-model="$v.form.matchReferee.$model"
          :state="validateState('matchReferee')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.matchReferee.$model.required">
            Referee id is required
          </b-form-invalid-feedback>
          <!-- <b-form-invalid-feedback v-else-if="!$v.form.matchReferee.$model.decimal">
            Referee id should be a number
          </b-form-invalid-feedback> -->
      </b-form-group>

      <b-form-group
        id="input-group-matchStadium"
        label-cols-sm="3"
        label="Stadium:"
        label-for="matchStadium"
      >
        <b-form-input
          id="matchStadium"
          type="text"
          v-model="$v.form.matchStadium.$model"
          :state="validateState('matchStadium')"
        ></b-form-input>
        <b-form-invalid-feedback>
          match stadium is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >add match</b-button
      >
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      add match failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "AddMatch",
  data() {
    return {
      form: {
        matchId: "",
        matchDate: "",
        matchHour: "",
        homeTeam: "",
        awayTeam: "",
        matchReferee: "",
        matchStadium: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      matchId: {
        required
      },
      matchDate: {
        required
      },
      matchHour: {
        required
      },
      homeTeam: {
        required,
      },
      awayTeam: {
        required,
      },
      matchReferee: {
        required,
      },
      matchStadium: {
        required
      }
    }
  },
  computed:{
    matchHourFormatted: function(){
      return this.form.matchDate+"T"+this.form.matchHour
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async addMatch() {
      try {
        const response = await this.axios.post(
          this.$root.store.serverDomain+"/matches/addMatch",
          {
            match_id: parseInt(this.form.matchId),
            match_date: this.form.matchDate,
            match_hour: this.matchHourFormatted,
            home_team: this.form.homeTeam,
            away_team: this.form.awayTeam,
            referee_id: parseInt(this.form.matchReferee),
            stadium: this.form.matchStadium
          },{withCredentials: true}
        );
          this.$root.toast("Add Match", "Add Match Successfully", "success");
      } catch (err) {
        try{
          this.form.submitError = err.response.data.message;
        }
        catch{
          this.$root.toast("Add Match", "NO CONNECTION", "danger");
        }
      }
    },
    onSubmit() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");
      this.addMatch();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
