<template>
  <div class="container">
    <div class="row">
      <div class="pannel col-xs-12 q-py-lg">
        <q-input 
          type="textarea" 
          inverted 
          color="primary" 
          float-label="What are you thinking about?" 
          v-model="postBody"
          :after="[{icon: 'arrow_forward', content: true, handler: () => {
            this.submit();
          }}]"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Draft',
  data: function() {
    return {
      postBody: ""
    }
  },
  computed: {
    user () {
      return this.$store.state.user;
    }
  },
  methods: {
    submit: function(){
      fetch("http://localhost:3000/post", {
        method: "POST",
        cache: "no-cache",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          body: this.postBody,
          password: this.password
        })
      })
      .then((response) => {
        if(response.status !== 200){
          console.log("Error occured: " + response.status);
          return
        }

        response.json().then((data) => {
          this.postBody = "";
          this.$store.dispatch('storeUser', data);
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
    margin: 0 auto;
  }
</style>
