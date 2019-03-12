<template>
    <b-container class="bv-example-row">
       <div id="blog-home">
            <h1>New Blog Posts</h1>
               <div
                v-for="(post) in posts"
                :key="post.id" >                
                <article class="media">
                    <figure>
                    <!-- Bind results using a `:` -->
                    <!-- Use a `v-if`/`else` if their is a `featured_image` -->
                    <!--<img
                        v-if="post.featured_image"
                        :src="post.featured_image"
                        alt=""
                    >
                    <img height="200"
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/450744/adam-krowitz.jpg"
                        alt=""
                    > -->
                    </figure>
                    <b-row>
                        <b-col cols="12"><router-link :to="'/blog/' + post.id"> <h2>{{ post.title }}</h2> </router-link></b-col>
                        <b-col cols="12">
                            <p>{{ post.details }}</p>
                            <b-row>
                                 <div v-if="post.allComments[0]==null">
                                     <div style="margin-left: 50px;">
                                        <h6>comments not found</h6>
                                     </div>
                                 </div>
                                 <div v-else style="width: 100%;">                                    
                                    <b-row>
                                        <div style="margin-left: 50px; width:100%;">
                                            <h6>All comments</h6>
                                            <b-col cols="10">
                                                <router-link :to="'/comments/' + post.id">
                                                <div v-for="(comment,comments_index) in post.allComments"
                                :key="comment.id+'_' + comments_index" >
                                                    <p><span> {{comment.comments}}</span>&nbsp;&nbsp;<span>{{ comment.createdAt | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span></p>
                                                </div>
                                                </router-link>
                                                <b-row>
                                                      <b-button variant="primary" :id="post.id"  v-on:click="getPostId" v-b-modal="'myModal' + post.id">Add comments</b-button>
                                                        <b-modal :id="'myModal' + post.id" @ok="postNow" title="Large Modal" centered>
                                                          <span :data-id="post.id"></span>
                                                            <input type="text" v-model="comments" name="comments"/>
                                                           
                                                        </b-modal>                                                         
                                                </b-row>
                                            </b-col>
                                        </div>
                                    </b-row>
                                 </div>
                               
                            </b-row>
                        </b-col>
                    </b-row>
                </article>               
            </div>
        </div>
      
    </b-container>
</template>

<script>
const axios = require('axios');
(function() {
     axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6Im1vbmRvbG1pc2xhbTFAZ21haWwuY29tIiwidHlwZSI6InVzZXIiLCJpYXQiOjE1NTIzODEzNzcsImV4cCI6MTU1MjQ2Nzc3N30.HTeraAWIWyHIanT5kxJmACC52cISBPKpMDTlSxQe5WO4uO7Rr0ZluNwAFlpG_oQTyOzIO1kcvXxX9GsrV28quovDum5Ix3z2arnWbdID4qCbnGwIMJG_4J1AdiYARI161KPE8s1PCTZqUdIvt54keDUV-DjjltRVOPKRdSsVdjU';
    
})();

export default {
  data() {
    return {
      posts: null,
      loading: true,
      errored: false,
      modalShow: false,
      comments: '',
      posts_id:'',      
    };
  },
 
  mounted() {
      console.log(this.getAllPostData());
  },
  
  methods : {
      getPostId: function (event) {
      this.posts_id= event.currentTarget.id
    },
    getAllPostData:function(){
        axios
            .get('http://localhost:8181/api/post/getAllPostWithComment')
            .then((response) => {
                console.log(response.data);
            this.posts= response.data;
           
            })
            .catch((error) => {
                return error;
            });
    },
    postNow: function() {
        const comments = document.querySelector("input[name=comments]").value
        axios({
            method: 'post',
            url: 'http://localhost:8181/api/comments/create',
            data: {post_id:this.posts_id,comments:comments},
            config: { headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6Im1vbmRvbG1pc2xhbTFAZ21haWwuY29tIiwidHlwZSI6InVzZXIiLCJpYXQiOjE1NTIyOTY1ODUsImV4cCI6MTU1MjM4Mjk4NX0.RZIFKnJybVZCdybZ5LdZJYO9Ku5xJip1QL8kQCs0h9j7rPzfgH4AAlZZpilDIwrYI2J9uVs0b2ZC6lqM1-IiA_Su0vgGFVnuI3TiNcjIXTyYWx76NMONzhKjcoblzyw1jLOM4xckkXFaLfGQO19ai6zVGJQcV-sInq8rvYThr-8'
            }}
            })
            .then( (response) => {
                this.getAllPostData();
            })
            .catch( (response) =>{
                console.log(response);
            this.getAllPostData();
        });
    }
  }

};

</script>
<style>
p{
    color:black;
}
.columns {
margin-left: 100px;
width: 100%;
position: relative;
};
</style>