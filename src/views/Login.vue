<template>
  <b-container fluid>
  <div>
    <br/>
    <h1>Login Form</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="exampleInputGroup1"
        label="Email address:"
        label-for="exampleInput1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="exampleInput1"
          type="email"
          v-model="form.email"
          required
          placeholder="Enter email" />
      </b-form-group>

      <b-form-group id="exampleInputGroup2" label="Your Name:" label-for="exampleInput2">
        <b-form-input
          id="exampleInput2"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter password" />
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</b-container>
</template>

<script>
const axios = require('axios');
  export default {
    data() {
      return {
        form: {
          email: '',
          password: ''
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
            url: 'http://localhost:8181/api/user/user_login',
            data: this.form,
            config: { headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }}
            })
            .then( (response) => {
               console.log(response);
              // window.location.href = '/';
               axios.defaults.headers.common['Authorization'] =response.data.token;
            })
            .catch( (response) =>{
                console.log(response);
            
        });
      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.email = ''
        this.form.password = ''
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>