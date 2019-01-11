<template>
  <div class="container">
    <div class="row">
      <span class="q-headline block q-mt-sm">Friends</span>
      <div class="col-xs-12 carrousel flex row no-wrap">
        <friend/>
        <friend/>
        <friend/>
        <friend/>
        <friend/>
        <friend/>
        <friend/>
        <friend/>
        <friend/>
        <friend/>
        <friend/>
        <friend/>
        <friend/>
        <friend/>
      </div>
    </div>
  </div>
</template>

<script>
import Friend from "./Friend";
export default {
  name: 'FriendCarousel',
  computed: {
    user () {
      return this.$store.state.user;
    }
  },
  components: {
    Friend
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    width: 1200px;
    margin: 0 auto;
  }

  .carrousel {
    overflow-x: scroll;
    justify-content: center;
  }
</style>
