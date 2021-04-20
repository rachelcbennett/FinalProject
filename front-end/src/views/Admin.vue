<template>
  <div class="admin">
    
    <div v-if="userLoggedIn" class='add'>
        <div class="menu">
            <h2>Logged in as <em> {{userLoggedIn.name}}</em><a @click="logout">
                <br> <br><button class="pure-button pure-button-primary" >Logout</button></a></h2>
        </div>
        <br>
          <h2> List and Edit Jobs </h2>
          <h3> Your current jobs:</h3>
          <li v-for="job in jobs" :key="job.id">
            {{job.title}} <button @click="deleteJob(job)"> Delete </button>
            <button @click="editJob(job)"> Edit Job </button>
            </li>
           
             <br>
              <br>

        <div v-if="editJobBool">
            You are now using edit mode. Please enter the information you'd like to edit in the fields below then hit "Upload or Edit Job". 
        </div>
        <br>
        
        <div class='form'>
            
            <input v-model="title" placeholder="Job Title">
            <br>
            
            <br>
            <input type = "text" v-model="startdate" placeholder="Start Date">
            <br>
            <br>
            <textarea v-model="description" placeholder="Description"></textarea>
            <br>
            <br>
           <h3> Add a Company Logo:</h3><br>
            <input type="file" name="photo" @change="fileChanged">
            <br>
            <br>
            <button @click="addJob">Upload or Edit Job</button>
            <br>
            <br>
        </div>
    </div>

    <Login v-else />
  </div>
</template>


<script>
// @ is an alias to /src
import axios from 'axios';
import Login from '@/components/Login.vue';

export default {
  name: 'Admin',
  components: {
      Login
    
  },
  data(){
      return {
          user: '',
          users: [],
          jobs:[],
          userName:'',
          description:'',
          startdate:'',
          title:'',
          location:'',
          editJobBool:false,
          jobID:'',
          avgSalary:null,
          numEmployees:null,
      }
  },
  async created() {
    try {

      let response = await axios.get('/api/user'); //SEE IF LOGGED IN
      this.$root.$data.user = response.data.user;
      this.user = response.data.user;
      this.getJobs();
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed : {
      userLoggedIn() {
          return this.$root.$data.user;
      }
  }, 
  methods: {
      editJob(job){
          this.jobID = job._id;
          this.editJobBool= true;
      },
      async addJob(){
          if (this.editJobBool ===false){
            try {
                
                const formData = new FormData();
                formData.append('photo', this.file,this.file.name)
                let r1 = await axios.post('/api/photos', formData);
                await axios.post(`/api/users/${this.user._id}/job`,{
                    title:this.title,
                    description: this.description,
                    startdate: this.startdate,
                    path: r1.data.path,
                });
                this.getJobs();
            }catch(error){
                console.log(error)
            }
        }
        else{
            try {
                //EDIT RATHER THAN ADD
                const formData = new FormData();
                formData.append('photo', this.file,this.file.name)
                let r1 = await axios.post('/api/photos', formData);
                await axios.put(`/api/users/${this.user._id}/jobs/${this.jobID}`,{
                    title:this.title,
                    description: this.description,
                    startdate: this.startdate,
                    path: r1.data.path,
                });
                this.getJobs();
            }catch(error){
                console.log(error)
            }
        }
      },
      async deleteJob(job){
          try {
              await axios.delete(`/api/users/${this.user._id}/jobs/${job._id}`)
              this.getJobs();
          }
          catch(error){
              console.log(error)
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
      async addUser(){
          
          try{
              await axios.post("/api/users", {
                  name: this.userName,
                  location: this.location,
                  numEmployees:this.numEmployees,
                  avgSalary:this.avgSalary,
              });
              await this.getUsers();
          } catch (error){
              console.log(error);
          }
      },
      async getUsers(){
          try {
              const response = await axios.get('/api/users');
              this.users = response.data;
          }catch (error ){
              console.log(error);
          }
      },
      selectUser(user){
          this.user = user;
          this.getJobs();
      },
      fileChanged(event){
         this.file = event.target.files[0]
      },
      async upload(){
          try{
            const formData = new FormData();
            formData.append('photo', this.file,this.file.name)
            let r1 = await axios.post('/api/photos', formData);
            let r2 = await axios.post('/api/jobs', {
                title: this.title,
                description: this.description,
                startdate: this.startdate,
                path: r1.data.path
            });
            this.addItem=r2.data;
          } catch(error){
            console.log("Error in upload")
          }
      },

      async logout() {
        try {
            await axios.delete("/api/users");
            this.$root.$data.user = null;
        } catch (error) {
            this.$root.$data.user = null;
        }
      },
      

  }
}
</script>

<style scoped>


h1{
    color:#00c2cb;
}
h2{
    color:#00c2cb;
}

input{
    font-size: larger;
}
.pure-button-primary {
  background-color: darkgray;
  font-size: small;
}
</style>