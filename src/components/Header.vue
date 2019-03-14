<template>
    <div>
       <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="/"><img style="height: 40px;" src="../assets/b-logo.webp"/></b-navbar-brand>
        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
            <b-nav-item href="/newpost">Add Blog Post</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
            <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" />
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-navbar-nav>
            <b-nav-item href="/login" v-if="user">Login</b-nav-item>
             </b-navbar-nav>
                <b-nav-item-dropdown right>
                <template slot="button-content"><em>User</em></template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item @click="logout" href="#">Signout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>
const axios = require('axios');
export default {
    data() {
    return {
      msg: 'Hello World!',
      img: '../assets/blogger-logo.jpg',
      user:true
    };
  },
   beforeCreate: function () {
    if (this.$session.get('jwt')!=null||this.$session.get('jwt')!= undefined) {
        this.user=false;
    }else{
        this.$router.push('/login');
    }
  },
   mounted() {
     if (this.$session.get('jwt')!=null||this.$session.get('jwt')!= undefined) {
        this.user=false;
    }else{
        this.$router.push('/login');
    }
  },
  
   methods: {
    logout: function () {
      this.$session.destroy();
      this.$router.push('/');
      window.location.href = '/';
    }
  }
};
</script>
