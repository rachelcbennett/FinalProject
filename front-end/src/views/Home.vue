<template>
  <div class="home">
    <img class="logo" alt="logo" src="../assets/logo.png">
    <div class= 'welcome'>
    <p> Welcome to Find a Job, where employers can post job listings and you can find them! You can navigate to our Job Listings page, where we have lots of available jobs, along with their start date and job descriptions. Happy Job Hunting! </p>
    </div>
    <br>
    <br>

    <div class='masonry'>
        <div class='masonry-item'>
            <img alt="logo" src="../assets/working1.jpg">
        </div>
        <div class='masonry-item'>
            <img alt="logo" src="../assets/working2.jpg">
        </div>
        <div class='masonry-item'>
            <img alt="logo" src="../assets/working3.jpg">
        </div>
    </div>
    <em> Millions have found happiness with Find a Job. You can too. </em>
    <br>
    <br>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    
  }
}
</script>

<style scoped>
    
    .logo:hover{
        transform: rotate(360deg);
        transition-duration:1.5s;
    }
    .welcome{
        display:block;
        margin-left:auto;
        margin-right:auto;
        
    }
   

.masonry{
  column-gap: 1.5em;
  display:block;
}

.masonry-item{
    margin: 0 0 1.5em;
    display: inline-block;
    width: 100%;
}
img{
    width:100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .masonry {
    column-count: 3;
  }
  .logo{
        width:30%;
    }

    .welcome{
        width:50%;
    }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .masonry {
    column-count: 1;
  }
  .logo{
        width:60%;
    }

    .welcome{
        width:75%;
    }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .masonry {
    column-count: 1;
  }
  .logo{
        width:60%;
    }

    p{
        width:100%;
    }
  
  .welcome{
      width:90%;
  }
}
</style>
