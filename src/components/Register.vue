<template>
  <div class="container">
    <div class="row">
      <div class="pannel col-xs-12 col-md-6 offset-md-3">
        <h1 class="q-display-1">I wanna be a real boy!</h1>
        <q-stepper ref="stepper" vertical>
          <q-step default title="Name" subtitle="What's your name little fella">
            <q-input
              v-model="name.first"
              type="text"
              float-label="First name"
            />
            <q-input
              v-model="name.last"
              type="text"
              float-label="Last name"
            />
            <q-stepper-navigation class="q-mt-md">
              <q-btn
                flat
                @click="$refs.stepper.previous()"
                label="Back"
              />
              <q-btn
                @click="$refs.stepper.next()"
                color="primary"
                label="Next"
              />
            </q-stepper-navigation>
          </q-step>
          <q-step title="Contact" subtitle="How do I reach these kiiiiiids">
            <q-input
              v-model="email"
              type="text"
              float-label="Email"
            />
            <q-input
              v-model="cell"
              type="text"
              float-label="Cellphone"
            />
            <q-input
              v-model="phone"
              type="text"
              float-label="Landline"
            />
            <q-stepper-navigation class="q-mt-md">
              <q-btn
                flat
                @click="$refs.stepper.previous()"
                label="Back"
              />
              <q-btn
                @click="$refs.stepper.next()"
                color="primary"
                label="Next"
              />
            </q-stepper-navigation>
          </q-step>
          <q-step title="Gender" subtitle="Sex? Yes please">
            <q-input
              v-model="gender"
              type="text"
              float-label="Gender"
            />
            <q-stepper-navigation class="q-mt-md">
              <q-btn
                flat
                @click="$refs.stepper.previous()"
                label="Back"
              />
              <q-btn
                @click="$refs.stepper.next()"
                color="primary"
                label="Next"
              />
            </q-stepper-navigation>
          </q-step>
          
          <!-- <q-input
            v-model="password"
            type="password"
            float-label="Password"
            @keyup.enter="login"
          /> -->
        </q-stepper>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    name: {
      first: "",
      last: "",
    },
    email: "",
    cell: "",
    phone: "",
    gender: "",
    picture: {
      thumbnail: "",
      medium: "",
      large: "",
    },
    nat: "",
    location: {
      city: "",
      postcode: "",
      street: "",
      state: "",
      coordinates: {
        latitude: 0.0,
        longitude: 0.0,
      },
    },
    password: "",
    loading: false,
  }),
  methods: {
    register: function(){
      fetch("http://localhost:3000/user", {
        method: "POST",
        cache: "no-cache",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        if(response.status !== 200){
          console.log("Error occured: " + response.status);
          return
        }

        response.json().then((data) => {
          console.log(data);
          this.$store.dispatch('storeUser', data);
          this.$router.push("profile");
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    width: 1200px;
    margin: 0px auto 0px auto;
  }
  .pannel {
    padding: 16px 48px;
    background: #F9f9f9;
  }
</style>
