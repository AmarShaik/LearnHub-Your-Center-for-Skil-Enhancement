# LearnHub – Online Learning Platform (MERN Stack)

**LearnHub** is a full-stack online learning platform (OLP) developed using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It offers a scalable, responsive, and user-friendly experience for students, teachers, and administrators to manage and engage with educational content seamlessly.

## Key Features

### Teacher
- Can **create and delete courses**
- Upload course materials (video, description, price)
- View enrolled students count per course

### Student
- **Register** and **enroll** in free or paid courses
- View all available courses with filter options (All / Free / Paid)
- Dashboard to view all **enrolled courses**
- Resume courses anytime
- One-click **enrollment** (no payment gateway, revenue is calculated from price)

### Admin
- Access **Admin Dashboard** at `/admin/dashboard`
- View total number of:
  - Students
  - Teachers
  - Courses
  - Revenue generated from course enrollments (based on course price)
- Monitor all course details (title, price, teacher name, enrollments)

## Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Frontend    | React.js, Vite, Tailwind CSS, Bootstrap, Material UI |
| Backend     | Node.js, Express.js      |
| Database    | MongoDB with Mongoose    |
| UI Support  | Bootstrap, Ant Design, Material UI |
| Media Upload | Multer (videos)         |
| Auth        | JWT Authentication       |

## Application Flow

1. **Student** registers and browses available courses.
2. Courses can be filtered (All / Free / Paid).
3. Student enrolls in a course and sees it in their **dashboard**.
4. **Teacher** can upload courses and view stats on enrollments.
5. **Admin** monitors overall statistics from all users and courses.

## Functional Modules

- User Authentication with JWT
- Protected Routes for different roles (Student, Teacher, Admin)
- REST APIs for managing users, courses, and enrollments
- Frontend route protection and dashboard role separation
- Real-time course filtering
- File upload handling (Multer)

## Installation & Setup

```bash
# Clone the repo
git clone https://github.com/your-username/learnhub.git

# Frontend setup
cd frontend
npm install
npm run dev

# Backend setup
cd ../backend
npm install
npm start
```

## Demo Link

https://drive.google.com/file/d/1q6X1rG0WTpSlsfoq-y75QU_797gu7oEv/view?usp=drive_link
