<template>
<div class="hero">
  <div class="heroBox">
    
      <fieldset>
        <legend>Register for an account</legend>
        <form @submit.prevent="addUser">
            <input type="text" v-model="userName" placeholder="Company Name">
            <br>
            <br>
            <input type="text" v-model="location" placeholder = "Company Location">
            <br>
            <br>
            <input type="text" v-model="numEmployees" placeholder = "Number of Employees">
            <br>
            <br>
            <input type="text" v-model="avgSalary" placeholder = "Average Salary">
            <br>
            <br>
            <input placeholder="username" v-model="username"> 
            <input type="password" placeholder="password" v-model="password">
            <br>
            <br>
            <button type="submit">Submit</button>
        </form>
        <br>
      </fieldset>
        

    <p v-if="error" class="error">{{error}}</p>
    <form class="pure-form space-above">
      <fieldset>
        <legend>Login</legend>
        <input placeholder="username" v-model="usernameLogin">
        <input type="password" placeholder="password" v-model="passwordLogin">
      </fieldset>
      <fieldset>
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="login">Login</button>
      </fieldset>
    </form>
    <p v-if="errorLogin" class="error">{{errorLogin}}</p>
  </div>
</div>
</template>

<script>

export default {
    name: 'Login',
    props: {
        
    },
    data(){
      return {
          jobs:[],
          job:'',
          userName:'',
          description:'',
          startdate:'',
          title:'',
          jobview: false,
      }
    },

}

</script>


<style scoped >

</style>