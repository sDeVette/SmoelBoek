<template>
  <q-page class="flex" :style-fn="myTweak">
    <info/>
    <friend-carousel/>
    <draft/>
    <post :key="index" v-for="(post, index) in orderedPosts" :data="post"/>
    <!-- <post/>
    <post/>
    <post/>
    <post/>
    <post/> -->
  </q-page>
</template>

<style>
</style>

<script>
import Info from "../components/Info";
import FriendCarousel from "../components/FriendCarousel";
import Draft from "../components/Draft";
import Post from "../components/Post";
export default {
  name: 'PageProfile',
  components: {
    Info,
    FriendCarousel,
    Draft,
    Post,
  },
  methods: {
    myTweak (){
      return { minHeight: "0px", flexWrap: "nowrap", flexDirection: "column" }
    }
  },
  computed: {
    user () {
      return this.$store.state.user;
    },
    orderedPosts: function(){
      return this.$store.state.user.posts.sort(function(a,b){
        return new Date(b.postedDate) - new Date(a.postedDate)
      })
    }
  }
}
</script>
