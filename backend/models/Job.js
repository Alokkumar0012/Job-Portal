// import mongoose from "mongoose";

// const jobSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   qualifications: { type: String },
//   responsibilities: { type: String },
//   location: { type: String },
//   salaryRange: { type: String },
//   employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
// }, { timestamps: true });

// const Job = mongoose.model("Job", jobSchema);
// export default Job;
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  qualifications: { type: String },
  responsibilities: { type: String },
  location: { type: String },
  salaryRange: { type: String },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  // --- यह 'applicants' हिस्सा बदल गया है ---
  applicants: [
    {
      user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
      },
      status: {
        type: String,
        // (आप बाद में और भी स्टेटस जोड़ सकते हैं, जैसे 'Interview')
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending', // डिफ़ॉल्ट स्टेटस 'Pending' रहेगा
        required: true
      },
      dateApplied: {
        type: Date,
        default: Date.now
      }
    }
  ]
  // --- बदलाव यहाँ खत्म हुआ ---

}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;