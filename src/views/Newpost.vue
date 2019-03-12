<template>
  <div class="about">
  	<b-container fluid>
    <h1>New Post</h1>
    <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="exampleInputGroup1"
        label="Title:"
        label-for="exampleInput1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="exampleInput1"
          type="text"
          v-model="form.title"
          required
          placeholder="Enter title" />
      </b-form-group>

      <b-form-group id="exampleInputGroup2" label="Your Name:" label-for="exampleInput2">
        <b-form-textarea
          id="exampleInput2"
          type="text"
          v-model="form.details"
          required
          placeholder="Enter detail" />
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
</div>
</b-container>
  </div>
</template>
<script>
const axios = require('axios');
  export default {
    data() {
      return {
        form: {
          title: '',
          details: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        //alert(JSON.stringify(this.form))
        axios({
            method: 'post',
            url: 'http://localhost:8181/api/post/create',
            data: this.form,
            config: { headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }}
            })
            .then( (response) => {
               window.location.href = '/';
            })
            .catch( (response) =>{
                console.log(response);
            
        });
      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.title = ''
        this.form.details = ''
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>
<style>
.about{
	width:80%;
}
</style>
