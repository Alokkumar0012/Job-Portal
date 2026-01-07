

import express from "express";
import {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  applyJob,
  toggleSaveJob,
  getMyJobs,
  updateApplicantStatus
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// --- Public Routes ---
router.get("/", getJobs);                 // Saari jobs dekho

// --- 1. 'myjobs' ko '/:id' se UPAR rakha gaya hai ---
// Yeh "GET /api/jobs/myjobs" ko match karega
router.get("/myjobs", protect, getMyJobs); 

// --- 2. Ab yeh "myjobs" ko ID nahi samjhega ---
// Yeh "GET /api/jobs/12345" (example) ko match karega
router.get("/:id", getJob);               // Ek job dekho

// --- Employer Routes ---
router.post("/", protect, createJob);     // Nayi job post karo
router.put("/:id", protect, updateJob);     // Job update karo
router.delete("/:id", protect, deleteJob);  // Job delete karo
router.put("/:jobId/applicants/:applicantId", protect, updateApplicantStatus); // Status badlo

// --- Jobseeker Routes ---
router.post("/:id/apply", protect, applyJob); // Job ke liye apply karo
router.post("/:id/save", protect, toggleSaveJob); // Job save/unsave karo

export default router;

