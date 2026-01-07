🚀 NaukriConnect - Online Job Portal

NaukriConnect is a comprehensive full-stack web application designed to bridge the gap between job seekers and employers. Built with the powerful MERN Stack (MongoDB, Express.js, React.js, Node.js), it simplifies the recruitment process with a clean UI, secure authentication, and real-time application tracking.

🌟 Key Features

👤 For Job Seekers

Secure Authentication: Register and login securely using JWT & Bcrypt.

Advanced Job Search: Search jobs by keywords, job title, or location.

Detailed Job View: View full job descriptions, requirements, and salary in a modal.

One-Click Apply: Easily apply to jobs with a single click.

Application Tracking: View your applied jobs list and their current status (Pending/Approved/Rejected).

Save Jobs: Bookmark jobs to apply later.

Profile Management: Update personal details, bio, resume link, and education history.

Withdraw Application: Option to withdraw an application if needed.

🏢 For Employers

Company Profile: Manage company details and description.

Post Jobs: Create detailed job listings with requirements and salary range.

Manage Listings: View and delete posted jobs.

Applicant Management: View a list of all applicants for a specific job.

Review Candidates: See applicant details (Name, Email, Resume Link).

Status Control: Approve or Reject applications with instant status updates.

Note: Please replace the placeholder image links above with actual screenshots of your project for a better presentation.

🛠️ Tech Stack

Layer

Technology

Description

Frontend

React.js

Component-based UI library for a dynamic single-page application.

Styling

Tailwind CSS

Utility-first CSS framework for rapid and responsive design.

Backend

Node.js & Express.js

Robust runtime and framework for building RESTful APIs.

Database

MongoDB (Atlas)

NoSQL database for flexible data storage (Users, Jobs, Applications).

Auth

JWT & Bcrypt

For stateless authentication and secure password hashing.

Icons

Lucide React

Beautiful and consistent icons throughout the app.

⚙️ Installation & Setup

Follow these steps to run the project locally on your machine.

1️⃣ Clone the Repository

git clone [https://github.com/YOUR_USERNAME/Job-Portal-MERN.git](https://github.com/YOUR_USERNAME/Job-Portal-MERN.git)
cd Job-Portal-MERN


2️⃣ Install Backend Dependencies

Navigate to the backend folder and install the required packages.

cd backend
npm install


3️⃣ Install Frontend Dependencies

Navigate to the frontend folder and install the required packages.

cd ../frontend
npm install


4️⃣ Environment Configuration

Create a .env file in the backend folder and add your credentials:

PORT=5000
MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster0.mongodb.net/jobPortalDB
JWT_SECRET=your_super_secret_key_12345


5️⃣ Run the Application

Start the Backend Server:

# In the backend terminal
npm run dev
# OR
node server.js


Server will start on http://localhost:5000

Start the Frontend:

# In the frontend terminal
npm start


Client will start on http://localhost:3000

🔗 API Endpoints

Here are the main API routes used in the application:

Authentication

POST /api/auth/register - Register a new user (Job Seeker/Employer)

POST /api/auth/login - Login user and get Token

Jobs (Public/Job Seeker)

GET /api/jobs - Get all jobs (supports search queries like ?search=react)

GET /api/jobs/:id - Get single job details

POST /api/jobs/:id/apply - Apply for a job (Protected)

POST /api/jobs/:id/save - Save/Unsave a job (Protected)

GET /api/jobs/my-applications/list - Get list of applied jobs (Protected)

DELETE /api/jobs/:id/withdraw - Withdraw an application (Protected)

Employer

POST /api/jobs - Post a new job

GET /api/jobs/myjobs - Get jobs posted by the logged-in employer

PUT /api/jobs/:jobId/applicants/:applicantId - Approve/Reject an applicant

DELETE /api/jobs/:id - Delete a job post

Profile

GET /api/profile/me - Get current user profile

PUT /api/profile/me - Update user profile

🤝 Contributing

Contributions are always welcome!

Fork the repository.

Create a new Branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

👨‍💻 Author

Alok Kumar

🎓 MCA Student at Marwadi University

💼 Internship: Amdox Technology

📧 Email: alokkumarpatel13@gmail.com

🔗 LinkedIn: Connect with me - www.linkedin.com/in/alok-kumar-n121023

Give a ⭐️ if you liked this project!
