<template>
  <div class="friend q-pr-sm">
    <img v-bind:src="user.picture.medium" class="picture"/>
  </div>
</template>

<script>
export default {
  name: 'Friend',
  computed: {
    user () {
      return this.$store.state.user;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .friend {
    flex: 0 0 150px;
    height:auto;
    flex-grow: 0;
  }

  .picture {
    width: 100%;
    height: auto;
  }
</style>
