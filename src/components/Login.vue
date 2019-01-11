<template>
  <div class="container">
    <div class="row">
      <div class="pannel col-xs-12 col-md-6 offset-md-3">
        <q-input
          v-model="email"
          type="text"
          float-label="Email"
          @keyup.enter="login"
        />
        <q-input
          v-model="password"
          type="password"
          float-label="Password"
          @keyup.enter="login"
        />
        <q-btn 
          class="float-right q-mt-md q-ml-sm"
          style="width:150px"
          label="Login"
          color="primary"
          :loading="loading"
          @click="login"
        />
        <q-btn 
          class="float-right q-mt-md"
          label="Register"
          flat
          :loading="loading"
          @click="register"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    email: "",
    password: "",
    loading: false,
  }),
  methods: {
    login: function(){
      fetch("http://localhost:3000/user/auth", {
        method: "POST",
        cache: "no-cache",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
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
      this.loading = !this.loading;
    },
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
    margin: 120px auto 0px auto;
  }
  .pannel {
    border: 1px solid black;
    padding: 16px 48px;
  }
</style>
