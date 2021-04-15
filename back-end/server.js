
const express = require('express');
const bodyParser = require("body-parser");
const argon2 = require("argon2"); //For passwords



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/newestDB', {
  useNewUrlParser: true
});

const multer = require('multer')
const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 100000000
    }
});



const jobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: String,
    description: String,
    startdate:String,
    path: String,
    
});

const Job = mongoose.model('Job', jobSchema);


// Create a scheme for projects
const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    name: String,
    location: String,
    numEmployees: Number,
    avgSalary: Number,
});
  
  
// Create a model for users
const User = mongoose.model('User', userSchema);


/* ------------BEGIN AUTHENTICATION/PASSWORD STUFF-----------*/


// This is a hook that will be called before a user record is saved,
// allowing us to be sure to salt and hash the password first.
userSchema.pre('save', async function(next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password'))
      return next();
    try {
      // generate a hash. argon2 does the salting and hashing for us
      const hash = await argon2.hash(this.password);
      // override the plaintext password with the hashed one
      this.password = hash;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
});

// This is a method that we can call on User objects to compare the hash of the
// password the browser sends with the has of the user's true password stored in
// the database.
userSchema.methods.comparePassword = async function(password) {
    try {
      // note that we supply the hash stored in the database (first argument) and
      // the plaintext password. argon2 will do the hashing and salting and
      // comparison for us.
      const isMatch = await argon2.verify(this.password, password);
      return isMatch;
    } catch (error) {
      return false;
    }
  };
  
  // This is a method that will be called automatically any time we convert a user
  // object to JSON. It deletes the password hash from the object. This ensures
  // that we never send password hashes over our API, to avoid giving away
  // anything to an attacker.
  userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
  }

/* ------------ END PASSWORD STUFF ---------*/



//Edit a Job
app.put('/api/users/:userID/jobs/:jobID', async (req, res) => {
    try {
        console.log("Entered edit mode!!!");
        console.log(req.params.jobID);
        console.log(req.params.userID);
        let job = await Job.findOne({_id:req.params.jobID, user: req.params.userID});
        if (!job) {
            res.send(404);
            return;
        }
        
        job.title = req.body.title;
        job.description = req.body.description;
        job.path = req.body.path;
        job.startdate = req.body.startdate;
        await job.save();
        res.send(job);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


//Post a specific job
app.post('/api/users/:userID/job', async (req, res) => {
    try {
        let user = await User.findOne({_id: req.params.userID});
        if (!user) {
            res.send(404);
            return;
        }
        let job = new Job({
            user: user,
            title: req.body.title,
            description: req.body.description,
            startdate: req.body.startdate,
            path: req.body.path,
        });
        await job.save();
        res.send(job);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

});

//Get all jobs from a user
app.get('/api/users/:userID/jobs', async (req, res) => {
    try {
        let user = await User.findOne({_id: req.params.userID});
        if (!user) {
            res.send(404);
            return;
        }
        let jobs = await Job.find({user:user});
        res.send(jobs);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

 //GET ALL Jobs
app.get('/api/jobs', async (req, res) => {
    try {
        let jobs = await Job.find();
        if (!jobs) {
            res.send(404);
            return;
        }
        res.send(jobs);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//GET A SINGLE JOB BY ID
app.get('/api/job/:jobID', async (req, res) => {
    
    try {
        let job = await Job.findOne({_id: req.params.jobID});
        if (!job) {
            res.send(404);
            return;
        }
        res.send(job);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});



app.post('/api/photos', upload.single('photo'), async (req, res) => {
    // Just a safety check
    if (!req.file) {
      return res.sendStatus(400);
    }
    res.send({
      path: "/images/" + req.file.filename
    });
});



// Create a new User
app.post('/api/users', async (req, res) => {
    const user = new User({
      name: req.body.name,
      location:req.body.location,
      avgSalary: req.body.avgSalary,
      numEmployees: req.body.numEmployees,
    });
    try {
      await user.save();
      res.send(user);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

// Get a list of all projects
app.get('/api/users', async (req, res) => {
    try {
      let users = await User.find();
      res.send(users);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});
app.delete('/api/users/:userID/jobs/:jobID', async (req, res) => {
    try {
        let job = await Job.findOne({_id: req.params.userID, _id: req.params.jobID})
        if (!job){
            console.log("this 404");
            res.send(404);
        }
        await job.delete();
        res.sendStatus(200);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }

});





app.listen(3003, () => console.log('Server listening on port 3003!'));
