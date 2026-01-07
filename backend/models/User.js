// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   // ... (name, email, password, role, contactPhone - existing fields) ...

//   // --- सिर्फ़ Job Seeker के लिए फ़ील्ड्स ---
//   bio: {
//     type: String, // "I am a skilled React developer..."
//     default: "",
//   },
//   resumeLink: {
//     type: String, // "https://google-drive.com/my-resume"
//     default: "",
//   },
  
//   // --- NAYE EDUCATION FIELDS YAHAN SHURU ---
//   highestEducation: {
//     type: String, // e.g., MCA, B.Tech, M.Sc
//     default: "",
//   },
//   major: {
//     type: String, // e.g., Computer Applications, Mechanical Engineering
//     default: "",
//   },
//   graduationYear: {
//     type: Number, // e.g., 2024
//     default: null,
//   },
//   // --- NAYE EDUCATION FIELDS YAHAN KHATM ---
  
//   // --- सिर्फ़ Employer के लिए फ़ील्ड्स (companyName, companyDescription) ---
//   companyName: {
//     type: String,
//     default: "",
//   },
//   // ... (companyDescription and timestamps) ...
// }, { timestamps: true });

// const User = mongoose.model("User", userSchema);
// export default User;

import mongoose from "mongoose";



const userSchema = new mongoose.Schema(

  {

    // REQUIRED FIELDS (must be here)

    name: {

      type: String,

      required: true,

    },



    email: {

      type: String,

      required: true,

      unique: true,

    },



    password: {

      type: String,

      required: true,

    },



    role: {

      type: String,

      enum: ["jobseeker", "employer"],

      required: true,

    },



    contactPhone: {

      type: String,

      default: "",

    },



    // -------- Job Seeker Fields --------

    bio: {

      type: String,

      default: "",

    },



    resumeLink: {

      type: String,

      default: "",

    },



    highestEducation: {

      type: String,

      default: "",

    },



    major: {

      type: String,

      default: "",

    },



    graduationYear: {

      type: Number,

      default: null,

    },



    // -------- Employer Fields --------

    companyName: {

      type: String,

      default: "",

    },



    companyDescription: {

      type: String,

      default: "",

    },

  },

  { timestamps: true }

);



const User = mongoose.model("User", userSchema);

export default User;