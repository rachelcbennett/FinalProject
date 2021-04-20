<template>
  <div id="app">
      <div class='head'> </div>
    
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/jobs">View Jobs</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div>
    <router-view/>
    <br>
    <br>
    <br>
    <br>
    <footer> <a href = "https://github.com/rachelcbennett/FinalProject"> Github Repo </a>I spent about 8 hours on this project. </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color:black;
}

#nav a.router-link-exact-active {
  color:#00c2cb;
}

footer{
    position:fixed;
    bottom:0;
    opacity:0.85;
    text-align:center;
    width:100%;
    height:20px;
    background-color: darkgray;
}

a{
    text-decoration: none;
}

.head{
    background-color:#00c2cb;
    height: 3px;
}
</style>
