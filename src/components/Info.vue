<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <div class="row">
          <div class="col-md-3">
            <img class="profile-picture" v-bind:src="user.picture.large"/>
          </div>
          <div class="col-md-6 q-pl-md flex flex-center column">
            <span class="q-display-3 block">{{ fullName }}</span>
            <span class="q-display-1 block">{{ location }}</span>
            <span class="q-subheading block">Joined on - {{readableDate(user.registered.date)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  methods: {
    readableDate (date){
      return new Date(date).toLocaleDateString("nl-NL");
    }
  },
  computed: {
    user () {
      return this.$store.state.user;
    },
    fullName (){
      return this.$store.state.user.name.first + " " + this.$store.state.user.name.last;
    },
    location (){
      return this.$store.state.user.location.city + ", " + this.$store.state.user.location.state;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    width: 1200px;
    margin: 0 auto;
  }

  .profile-picture {
    width: 100%;
    height: auto; 
  }
</style>
