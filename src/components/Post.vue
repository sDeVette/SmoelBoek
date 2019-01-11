<template>
  <div class="container">
    <div class="row">
      <div class="pannel col-xs-12">
        <div class="flex items-center title">
          <div class="q-pr-sm">
            <img class="picture" v-bind:src="user.picture.thumbnail"/>
          </div>
          <div class="q-pr-sm">
            <span class="q-display-1 block">{{ fullName }}</span>
          </div>
          <div>
            <span class="q-pr-sm">&#9679;</span><span class="q-caption">{{timeSince(data.postedDate)}}</span>
          </div>
        </div>
        <div>
          <p class="q-body-1 q-px-sm q-pt-md">{{data.body}}</p>
        </div>
        <div class="flex q-ma-sm">
          <div class="q-mr-lg">
            <q-chip color="primary" pointing="right" v-if="data.diggs > 0">{{data.diggs}}</q-chip>
            <q-btn @click="digg()" label="Digg" icon="thumb_up" color="primary"/>
          </div>
          <div>
            <q-chip pointing="right" v-if="replyCount">{{replyCount}}</q-chip>
            <q-btn @click="showReply()" label="Reply" icon="comment" flat/>
          </div>
        </div>
        <div v-if="reply">
          <q-input 
            type="textarea" 
            inverted 
            value="replyBody"
            color="primary" 
            float-label="Reply to this post..."
            v-model="replyBody"
            autofocus
            :after="[{icon: 'arrow_forward', content: true, handler: () => {
              this.submit();
            }}]"
          />
        </div>
        <div>
          <transition-group
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut" v-for="(reply, index) in orderedReplies" :key="index"
          >
            <div key="user" class="flex items-center q-mx-sm q-mt-md q-mb-xs">
              <q-chip :avatar="reply.user.picture.thumbnail">{{reply.user.name.first}}</q-chip>
              <span class="q-body-1 block q-ml-sm">{{reply.body}}</span>
              <span class="q-mx-sm">&#9679;</span><span class="q-caption">{{timeSince(reply.postedDate)}}</span>
            </div>
            <div class="q-ml-sm" key="actions">
              <q-chip small color="primary" class="q-mr-sm" v-if="reply.diggs > 0">{{reply.diggs}}</q-chip>
              <q-btn round icon="thumb_up" color="primary" size="sm"/>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['data'],
  data: function(){
    return {
      diggs: 0,
      reply: false,
      replyBody: "",
    }
  },
  methods: {
    digg: function(){
      fetch("http://localhost:3000/post/"+this.data._id+"/digg", {
        method: "POST",
        cache: "no-cache",
        mode: "cors",
        credentials: "include",
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
          this.$store.dispatch('storeUser', data);
        })
      })
      // this.diggs++;
    },
    showReply: function(){
      this.reply = true;
    },
    submit: function(){
      fetch("http://localhost:3000/post/"+this.data._id+"/reply", {
        method: "POST",
        cache: "no-cache",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          body: this.replyBody
        })
      })
      .then((response) => {
        if(response.status !== 200){
          console.log("Error occured: " + response.status);
          return
        }

        response.json().then((data) => {
          this.reply = false;
          this.replyBody = "";
          this.$store.dispatch('storeUser', data);
        })
      })
    },
    timeSince(date) {
      let dateObject = new Date(date);
      var seconds = Math.floor((new Date() - dateObject) / 1000);

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return interval + " years ago";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months ago";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days ago";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours ago";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes ago";
      }
      if(seconds < 5){
        return "just now";
      }
      return Math.floor(seconds) + " seconds ago";
    },
  },
  mounted(){
    // console.log(this.data);
  },
  computed: {
    user () {
      return this.$store.state.user;
    },
    fullName (){
      return this.$store.state.user.name.first + " " + this.$store.state.user.name.last;
    },
    replyCount (){
      return this.data.reply.length;
    },
    orderedReplies: function(){
      return this.data.reply.sort(function(a,b){
        return new Date(b.postedDate) - new Date(a.postedDate);
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    width: 1200px;
    margin: 0px auto 8px auto;
  }

  .pannel {
    /* border: 1px solid black; */
    background: #F9f9f9;
  }

  .picture {
    height: 48px;
    width: 48px;
  }

  .title {
    height: 48px;
  }
</style>
