<template>
  <div class="container">
    <h1 class="title">Add Event</h1>
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
            id="input-group-eventId"
            label-cols-sm="3"
            label="Event Id:"
            label-for="eventId"
        >
        <b-form-input
          id="eventId"
          v-model="$v.form.eventId.$model"
          type="text"
          :state="validateState('eventId')"
        ></b-form-input>
        <b-form-invalid-feedback>
          eventId is required
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="input-group-eventDate"
        label-cols-sm="3"
        label="Event Date:"
        label-for="eventDate"
      >
        <b-form-datepicker
          id="eventDate"
          type="text"
          v-model="$v.form.eventDate.$model"
          :state="validateState('eventDate')"
        ></b-form-datepicker>
        <b-form-invalid-feedback>
          event date is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-eventHour"
        label-cols-sm="3"
        label="Event Hour:"
        label-for="eventHour"
      >
        <b-form-timepicker
          id="eventHour"
          type="text"
          v-model="$v.form.eventHour.$model"
          :state="validateState('eventHour')"
        ></b-form-timepicker>
        <b-form-invalid-feedback>
          event hour is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-eventMinute"
        label-cols-sm="3"
        label="Event Minute:"
        label-for="eventMinute"
      >
        <b-form-input
          id="eventMinute"
          type="text"
          v-model="$v.form.eventMinute.$model"
          :state="validateState('eventMinute')"
        ></b-form-input>
        <b-form-invalid-feedback>
          event minute is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-eventDescription"
        label-cols-sm="3"
        label="Event Description:"
        label-for="eventDescription"
      >
        <b-form-input
          id="eventDescription"
          type="text"
          v-model="$v.form.eventDescription.$model"
          :state="validateState('eventDescription')"
        ></b-form-input>
        <b-form-invalid-feedback>
          event description is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Add Event</b-button
      >
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Add Event Failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "AddEvent",
  data() {
    return {
      form: {
        matchId: "",
        eventId: "",
        eventDate: "",
        eventHour: "",
        eventMinute: "",
        eventDescription: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      matchId: {
        required, 
      },
      eventId: {
        required
      },
      eventDate: {
        required
      },
      eventHour: {
        required
      },
      eventMinute: {
        required
      },
      eventDescription: {
        required
      },
    }
  },
  computed:{
    EventHourFormatted: function(){
      return this.form.eventDate+"T"+this.form.eventHour
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
          this.$root.store.serverDomain+"/matches/addEventCalendar",
          {
            match_id: parseInt(this.form.matchId),
            event_id: parseInt(this.form.eventId),
            event_date: this.form.eventDate,
            event_hour: this.EventHourFormatted,
            event_minute: parseInt(this.form.eventMinute),
            event_description: this.form.eventDescription,
          },{withCredentials: true}
        );
          this.$root.toast("Add Event", "Add Event Successfully", "success");
      } catch (err) {
        try{
          this.form.submitError = err.response.data.message;
        }
        catch{
          this.$root.toast("Add Event", "NO CONNECTION", "danger");
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
