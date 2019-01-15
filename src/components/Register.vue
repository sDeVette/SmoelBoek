<template>
  <div class="container">
    <div class="row">
      <div class="pannel col-xs-12 col-md-6 offset-md-3">
        <h1 class="q-display-1">I wanna be a real boy!</h1>
        <q-stepper ref="stepper" class="white" vertical>
          <q-step default title="Name" subtitle="What's your name little fella">
            <q-input
              v-model="user.name.first"
              type="text"
              float-label="First name"
            />
            <q-input
              v-model="user.name.last"
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
              v-model="user.email"
              type="text"
              float-label="Email"
            />
            <q-input
              v-model="user.cell"
              type="text"
              float-label="Cellphone"
            />
            <q-input
              v-model="user.phone"
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
          <q-step title="Location" subtitle="Your place or mine?">
            <q-search v-model="search.country" placeholder="Start typing a country name">
              <q-autocomplete @search="searchCountry" @selected="selected" />
            </q-search>
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
          <q-step title="Picture" subtitle="Let me get a good look at you">
            <input v-if="!user.pictureBase" type="file" @change="onFileChanged"/>
            <img :src="user.pictureBase"/>
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
            <q-field
              helper="Pick one, just one"
            >
              <q-option-group
                color="primary"
                v-model="user.gender"
                :options="[
                  {label: 'Male', value: 'male'},
                  {label: 'Female', value: 'fenake'}
                ]"
              />
            </q-field>
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
          <q-step title="Password" subtitle="00110001001100100011001100110100">
            <q-input
              v-model="user.login.username"
              type="text"
              float-label="Username"
            />
            <q-field
              helper="Needs to be all kind of stuff, don't fuck it up"
            >
              <q-input
                v-model="user.login.password"
                type="password"
                float-label="Password"
              />
            </q-field>
            <q-stepper-navigation class="q-mt-md">
              <q-btn
                flat
                @click="$refs.stepper.previous()"
                label="Back"
              />
              <q-btn
                @click="register"
                color="primary"
                label="Lets 'a' go!"
              />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </div>
    </div>
  </div>
</template>

<script>
import { uid, filter } from 'quasar'
import countries from '../assets/countries.json'
function parseCountries () {
  return countries.map(country => {
    return {
      label: country,
      value: country
    }
  })
}

function classifyChar (char) {
  let code = char.charCodeAt(0);
  if(code >= 32 && code <= 47){
    return "symbol";
  } else if(code >= 48 && code <= 57){
    return "digit";
  } else if(code >= 58 && code <= 64){
    return "symbol";
  } else if(code >= 65 && code <= 90){
    return "uppercase";
  } else if(code >= 91 && code <= 96){
    return "symbol";
  } else if(code >= 97 && code <= 122){
    return "lowercase";
  } else if(code > 122){
    return "symbol";
  }
}

export default {
  name: 'Register',
  data: () => ({
    search: {
      country: "",
    },
    user: {
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
      pictureBase: "",
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
      login: {
        username: "",
        password: "",
      }
    },
    loading: false,
    countries: parseCountries()
  }),
  mounted() {
    this.calculatePasswordStrength("'/192aX!ba§");
  },
  methods: {
    calculatePasswordStrength (password){
      let string = password;

      let incremented = 0;
      let differentSymbol = 0;
      let duplicate = 0;
      for(let c = 0; c < string.length; c++){
        let current = {
          value: string[c],
          type: classifyChar(string[c]),
          code: string[c].charCodeAt(0)
        }
        console.log(c * c);

        if(string[c+1]){
          let next = {
            value: string[c+1],
            type: classifyChar(string[c+1]),
            code: string[c+1].charCodeAt(0)
          }
          // Checks to see if the next character is just an increment of the current one
          // This scores passwords like "1234" verry poorly, like it should
          if(Math.abs(current.code - next.code) === 1){
            incremented++;
          }
          // Checks to see is the next character is of a different type 
          // upper/lowercase, digits or symbols. Encouraging passwords like "aX!1+HiA"
          if(current.type !== next.type){
            differentSymbol++;
          }
          // Repeating the same character is like the worst thing ever
          // Don't do it!
          if(current.code === next.code){
            duplicate + 3;
          }
        }
      }

      let score = incremented + differentSymbol + duplicate;
      console.log("Tested against: ", password, " with score: ", score);
    },
    searchCountry (terms, done) {
      done(filter(terms, {field: 'value', list: parseCountries()}))
    },
    selected (item){
      this.user.nat = item.value
    },
    onFileChanged (event){
      if(event.target.files){
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          this.user.pictureBase = reader.result;
        };
      }
    },
    register: function(){
      fetch("http://localhost:3000/user", {
        method: "POST",
        cache: "no-cache",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: this.user
        })
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
  .white {
    background-color: white;
  }
</style>
