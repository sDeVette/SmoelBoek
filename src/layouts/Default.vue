<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          SmoelBoek
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list no-border link inset-delimiter>
          <q-list-header>Navigation</q-list-header>
          <q-item to="/profile" v-if="user.login.uuid !== ''">
            <q-item-side icon="person" />
            <q-item-main sublabel="View profile">{{user.name.first + " " + user.name.last}}</q-item-main>
          </q-item>
          <q-item to="/" exact>
            <q-item-side icon="home" />
            <q-item-main label="Home" />
          </q-item>
          <q-item to="/feed" exact>
            <q-item-side icon="dashboard" />
            <q-item-main label="Feed" />
          </q-item>
          <q-item to="/about">
            <q-item-side icon="info_outline" />
            <q-item-main label="About" />
          </q-item>

          <q-item-separator />
          <q-list-header>Essential Links</q-list-header>
          <q-item @click.native="openURL('http://quasar-framework.org')">
            <q-item-side icon="school" />
            <q-item-main label="Docs" sublabel="quasar-framework.org"></q-item-main>
          </q-item>
          <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
            <q-item-side icon="chat" />
            <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg"></q-item-main>
          </q-item>
          <q-item @click.native="openURL('http://forum.quasar-framework.org')">
            <q-item-side icon="forum" />
            <q-item-main label="Forum" sublabel="forum.quasar-framework.org"></q-item-main>
          </q-item>
          <q-item @click.native="openURL('https://twitter.com/quasarframework')">
            <q-item-side icon="rss feed" />
            <q-item-main label="Twitter" sublabel="@quasarframework"></q-item-main>
          </q-item>
        </q-list>
      </q-list>
    </q-layout-drawer>
    <q-layout-drawer 
      side="right"
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      :overlay="true"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list no-border link inset-delimiter>
          <q-list-header>Friends</q-list-header>
          <q-item v-for="i in [0,1,2,3]" :key="i">
            <q-item-side>
              <q-item-tile avatar>
                <img v-bind:src="user.picture.large"/>
              </q-item-tile>
            </q-item-side>
            <q-item-main>
              Steve de Vette
            </q-item-main>
          </q-item>
        </q-list>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    user () {
      return this.$store.state.user;
    }
  },
  methods: {
    openURL,
    login: function(){
      fetch("http://localhost:3000/user", {
        method: "GET",
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
          console.log(data);
          this.$store.dispatch('storeUser', data);
        })
      })
    },
  },
  beforeMount(){
    this.login()
  }
}
</script>

<style>
</style>
