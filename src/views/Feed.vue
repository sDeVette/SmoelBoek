<template>
  <q-page class="flex" :style-fn="myTweak">
    <draft/>
    <post :key="index" v-for="(post, index) in posts" :data="post"/>
  </q-page>
</template>

<style>
</style>

<script>
import Draft from "../components/Draft";
import Post from "../components/Post";
export default {
  name: 'PageFeed',
  components: {
    Draft,
    Post,
  },
  mounted(){
    
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
    posts: function(){
      return this.$store.state.user.posts.sort(function(a,b){
        return new Date(b.postedDate) - new Date(a.postedDate)
      })
    }
  }
}
</script>
