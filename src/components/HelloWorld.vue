<template>
    <b-container class="bv-example-row">
       <div id="blog-home">
            <h1>New Blog Posts</h1>
               <div
                v-for="(post,index) in posts"
                :key="post.id + '_' + index" >
                <router-link :to="'/blog/' + post.id">
                <article class="media">
                    <figure>
                    <!-- Bind results using a `:` -->
                    <!-- Use a `v-if`/`else` if their is a `featured_image` -->
                    <!--<img
                        v-if="post.featured_image"
                        :src="post.featured_image"
                        alt=""
                    >
                    <img
                        v-else
                        src="http://via.placeholder.com/250x250"
                        alt=""
                    > -->
                    </figure>
                    <b-row>
                        <b-col cols="12"><h2>{{ post.title }}</h2></b-col>
                        <b-col cols="12"><p>{{ post.details }}</p></b-col>
                    </b-row>
                </article>
                </router-link>
            </div>
        </div>
    </b-container>
</template>
<script>
const axios = require('axios');

export default {
  data() {
    return {
      posts: null,
      loading: true,
      errored: false,
    };
  },
  filters: {
    currencydecimal(value) {
      return value.toFixed(2);
    },
  },
  mounted() {
    axios
      .get('http://localhost:8181/api/post/getAllPostWithComment')
      .then((response) => {
        console.log(response.data);
        this.posts = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(this.loading = false);
  },
};
</script>
<style>
p{
    color:black;
}
</style>
