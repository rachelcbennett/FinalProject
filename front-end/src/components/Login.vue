<template>
<div class="hero">
  <div class="heroBox">
    
     
        <form>
            <fieldset>
             <legend>Register for an account</legend>
            Company Name: <input type="text" v-model="name" placeholder="Company Name">
            <br>
            <br>
            Company Location: <input type="text" v-model="location" placeholder = "Company Location">
            <br>
            <br>
            Number of Employees: <input type="text" v-model="numEmployees" placeholder = "Number of Employees">
            <br>
            <br>
            Average Employee Salary: <input type="text" v-model="avgSalary" placeholder = "Average Salary">
            <br>
            <br>
            User Name: <input placeholder="username" v-model="userName"> 
            Password: <input type="password" placeholder="password" v-model="password">
            <br>
            <br>
            <button type="submit" @click.prevent="register">Submit</button>
            </fieldset>
        </form>
        <br>
      
        

    <p v-if="error" class="error">{{error}}</p>
    <form class="pure-form space-above">
      <fieldset>
        <legend>Login</legend>
        <input placeholder="username" v-model="userNameLogin">
        <br>
        <input type="password" placeholder="password" v-model="passwordLogin">
        <br>
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="login">Login</button>
      </fieldset>
     
    </form>
    <p v-if="errorLogin" class="error">{{errorLogin}}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',
    props: {
        
    },
    data(){
      return {
          name: '',
          userName: '',
          password: '',
          avgSalary: null,
          numEmployees: null,
          location: '',
          //Login stuff
          userNameLogin: '',
          passwordLogin: '',

          error: '',
          errorLogin: '',
          jobs: [],
          user: null
      }
    },
    methods: {
        async register() {
            console.log("Entered register");
            this.error = '';
            this.errorLogin = '';
            if (!this.name || !this.userName || !this.password || !this.avgSalary || !this.numEmployees )
                return;
            try {
                let response = await axios.post('/api/users', {
                    name: this.name,
                    userName: this.userName,
                    password: this.password,
                    avgSalary: this.avgSalary,
                    location: this.location,
                    numEmployees: this.numEmployees,
                });
                this.$root.$data.user = response.data.user;
                } catch (error) {
                    this.error = error.response.data.message;
                    this.$root.$data.user = null;
                }

        },
        async login() {

            this.error = '';
            this.errorLogin = '';
            if (!this.userNameLogin || !this.passwordLogin)
                return;
            try {
                console.log("Attempting Login");
                let response = await axios.post('/api/login', {
                    userName: this.userNameLogin,
                    password: this.passwordLogin,
                });
                this.$root.$data.user = response.data.user;
                this.user = response.data.user;
                this.getJobs();
                this.$root.$data.jobs = this.jobs;
                console.log(this.$root.$data.jobs);
            } catch (error) {
                this.errorLogin = "Error: " + error.response.data.message;
                this.$root.$data.user = null;
                this.$root.$data.jobs = null;
            }
        },
        async getJobs(){
            try {
                const response = await axios.get(`/api/users/${this.user._id}/jobs`);
                this.jobs = response.data;
            } catch (error) {
                console.log(error);
            }
      },
    }
}

</script>


<style scoped >

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}


legend{
    color:#00c2cb;
}
</style>