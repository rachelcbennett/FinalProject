<template>
<div class="wrapper">
  <div v-if = "jobview" >
      
      <div class="job">
      
        <br>
        <img class="job-pic" :src="this.job.path" />

        <br>
        <h2>{{this.job.title}}</h2>
        <div class='desc'>
         <p>Description: <em>{{this.job.description}}</em> </p> 
         <p> Start Date: {{this.job.startdate}}</p>
        </div>
        <br>
        <a class='unview' @click="unviewJob()" href = "#"> <strong>Back to Listings</strong> </a>
      </div>
  </div>
  <div v-else class= "jobs">
    <div class='masonry'>
        <div class='masonry-item' v-for='job in jobs' :key='job.id'>
            <div @click="viewJob(job)" class="image">
                <a href ="#"><img :src="job.path" /></a>
            </div>
            <div class= "info">
                <a href ="#"><h2 @click="viewJob(job)">{{job.title}}</h2> </a>
                <a href ="#"><p @click="viewJob(job)"> View Job Listing </p></a>
            </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'JobListings',
    props: {
        products: Array
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
    created() {
       this.getJobs();
    },
    methods: {
      async getJobs(){
          try {
              const response = await axios.get('/api/jobs');
              this.jobs = response.data;
          } catch (error ){
              console.log(error);
          }
      },
      async viewJob(job){
          try {
              console.log("HEy");
              console.log(job._id);
              const response = await axios.get(`/api/job/${job._id}`);
              this.job = response.data;
              this.title = job.title;
              this.description = job.description;
              this.startdate = job.startdate;
              this.jobview=true;
          } catch (error ){
              console.log(error);
          }
      },
      unviewJob(){
        this.jobview = false;
      }
    }
}

</script>


<style scoped >
img{
    width:100%;
}


.masonry{
  column-gap: 1.5em;
}

.masonry-item{
    margin: 0 0 1.5em;
    display: inline-block;
    width: 100%;
    background-color:aliceblue;
}




/* RECIPE DISPLAY*/
.job-pic{
    width:40%;
}


/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .masonry {
    column-count: 4;
  }
  .job{
      width:40%;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .masonry {
    column-count: 3;
  }
  .job{
      width:100%;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .masonry {
    column-count: 2;
  }
  .job{
      width:100%;
  }
}

p{
    text-align: center;
}

.masonry-item{
    margin-left:auto;
    margin-right:auto;
    text-align:center;
    border-width: 3px;
    border-color:white;
    border-style:solid;
}

.job{
    margin-left:auto;
    margin-right:auto;
    text-align:center;
}

.masonry-item:hover{
    border-color:rgba(169, 169, 169, 0.342);
    border-style:solid;
    transform: scale(1.05);
    transition-duration:1.5s;
}



a{
    text-decoration: none; 

    border:solid;
    border: 2px;
    color:black;
  
}

.desc{
    border-width:2px;
    border-color:rgba(169, 169, 169, 0.473);
    border-style:solid;
}

.unview{
    color:#00c2cb;
    font-size: larger;

}
</style>