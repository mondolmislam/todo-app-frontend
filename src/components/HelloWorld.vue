<template>
    <b-container class="bv-example-row">
       <div id="blog-home">
            <h1>New Blog Posts</h1>
               <div
                v-for="(post, index) in posts"
                :key="post.id+index" >                
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
                                        <b-row>
                                                      <b-button variant="primary" :id="post.id"  v-on:click="getPostId" v-b-modal="'myModal' + post.id">Add comments</b-button>
                                                        <b-modal :id="'myModal' + post.id" @ok="postNow" title="Large Modal" centered>
                                                          <span :data-id="post.id"></span>
                                                            <input type="text" v-model="comments" name="comments"/>
                                                           
                                                        </b-modal>                                                         
                                                </b-row>
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
                'Content-type': 'application/x-www-form-urlencoded'
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