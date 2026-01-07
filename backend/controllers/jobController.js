
import Job from "../models/Job.js";
import User from "../models/User.js"; 

// Create Job
export const createJob = async (req, res) => {
  try {
    const job = new Job({ ...req.body, employer: req.user.id });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Jobs (Search 'Activated' (एक्टिवेटेड))
export const getJobs = async (req, res) => {
  try {
    const searchQuery = {};

    // 'Check' (चेक) karein ki kya 'URL' (यूआरएल) mein 'search query' (सर्च क्वेरी) hai
    if (req.query.search) {
      const keyword = req.query.search;
      
      searchQuery.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { location: { $regex: keyword, $options: 'i' } },
        { responsibilities: { $regex: keyword, $options: 'i' } },
        { qualifications: { $regex: keyword, $options: 'i' } },
      ];
    }
    
    const jobs = await Job.find(searchQuery)
                          .populate("employer", "name email companyName")
                          .sort({ createdAt: -1 }); // Nayi 'jobs' (जॉब्स) ko 'top' (शीर्ष) par dikhayein

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Job
export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("employer", "name email companyName");
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    // 'Security Check' (सुरक्षा जांच): Kya user iss job ka maalik hai?
    if (job.employer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    // 'Security Check' (सुरक्षा जांच): Kya user iss job ka maalik hai?
    if (job.employer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Apply to Job (FIXED)
export const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });
    const userId = req.user.id;

    // 'Check' (चेक) karein ki 'user' (यूज़र) 'already applied' (पहले ही अप्लाई) kar chuka hai ya nahi
    const alreadyApplied = job.applicants.some(
      (applicant) => applicant.user.toString() === userId
    );
    
    if (alreadyApplied) {
      return res.status(400).json({ msg: "You have already applied for this job" });
    }
    
    // Naya 'applicant' (एप्लीकेंट) 'object' (ऑब्जेक्ट) 'add' (जोड़ें)
    const newApplicant = {
      user: userId,
      status: 'Pending'
    };
    job.applicants.push(newApplicant);
    await job.save();
    res.json({ msg: "Applied successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Toggle Save Job
export const toggleSaveJob = async (req, res) => {
  try {
    const jobId = req.params.id; 
    const userId = req.user.id; 
    const user = await User.findById(userId);
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }
    const isSaved = user.savedJobs.includes(jobId);
    if (isSaved) {
      user.savedJobs.pull(jobId); 
      await user.save();
      res.json({ msg: "Job removed from saved list", savedJobs: user.savedJobs });
    } else {
      user.savedJobs.push(jobId);
      await user.save();
      res.json({ msg: "Job saved successfully", savedJobs: user.savedJobs });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};


// --- Employer Functions ---

// GET /api/jobs/myjobs
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id })
      .sort({ createdAt: -1 }) 
      .populate('applicants.user', 'name email resumeLink bio contactPhone'); // 'Applicant' (एप्लीकेंट) ki 'full details' (पूरी डिटेल्स) 'load' (लोड) karein

    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// PUT /api/jobs/:jobId/applicants/:applicantId
export const updateApplicantStatus = async (req, res) => {
  const { jobId, applicantId } = req.params;
  const { status } = req.body; 

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status value' });
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.employer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to update this job' });
    }

    const applicant = job.applicants.find(
      (app) => app.user.toString() === applicantId
    );
    
    if (!applicant) {
      return res.status(404).json({ msg: 'Applicant not found' });
    }

    applicant.status = status;
    await job.save();
    
    // 'Frontend' (फ्रंटएंड) ko 'updated' (अपडेटेड) 'job' (जॉब) 'data' (डेटा) 'populate' (पॉप्युलेट) karke wapas bhejein
    await job.populate('applicants.user', 'name email resumeLink bio contactPhone');
    
    res.json(job); 

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

