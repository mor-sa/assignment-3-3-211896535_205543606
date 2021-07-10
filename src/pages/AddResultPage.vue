<template>
  <div class="container">
    <h1 class="title">Add Result</h1>
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
            <b-form-invalid-feedback>
            matchId is required
            </b-form-invalid-feedback>
        </b-form-group>
       
      <b-form-group
        id="input-group-matchResult"
        label-cols-sm="3"
        label="Match Result:"
        label-for="matchResult"
      >
        <b-form-input
          id="matchResult"
          type="text"
          v-model="$v.form.matchResult.$model"
          :state="validateState('matchResult')"
        ></b-form-input>
        <b-form-invalid-feedback>
          match result is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Add Result</b-button
      >
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Add Result Failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "AddResult",
  data() {
    return {
      form: {
        matchId: "",
        matchResult: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      matchId: {
        required, 
      },
      matchResult: {
        required
      },
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async addEvent() {
      try {
        const response = await this.axios.post(
          this.$root.store.serverDomain+"/matches/addResult",
          {
            match_id: parseInt(this.form.matchId),
            match_result: this.form.matchResult,
          },{withCredentials: true}
        );
        this.$root.toast("Add Result", "Result Added Successfully", "success");
      } catch (err) {
        try{
          this.form.submitError = err.response.data.message;
          this.$root.toast("Add Result", err.response.data.message, "danger");
        }
        catch{
          this.$root.toast("Add Result", "NO CONNECTION", "danger");
        }
      }
    },
    onSubmit() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.addEvent();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
