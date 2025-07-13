# 📚 StackIt - A Knowledge Sharing Community Platform

StackIt is a full-featured Q&A web application where users can ask questions, give answers, vote on the best solutions, and rise in the leaderboard. It supports multiple communities such as Developers, SSC aspirants, JEE students, NEET candidates, and more.

> 🚀 Built with passion and collaboration by **Team Code Thrust**.

---

## 👥 Team Code Thrust
- **Harish Rajak**
- **Sakshi Singh**
- **Harshita Soni**
- **Ramakant Shukla**

---

## 🌟 Features

- 📝 Ask and answer questions across different categories.
- 📸 Attach images with questions and answers.
- 🔍 Search and filter questions by keywords and tags.
- 🧠 Communities like Developers, SSC, JEE, NEET, etc.
- 💬 Answers are displayed with respective usernames and images.
- 👍 Like-based voting system for answers.
- 🏆 Leaderboard highlighting top contributors by upvotes.
- 🔐 User authentication and profile management.
- 📱 Responsive UI built with Tailwind CSS.
- 🗃️ MongoDB for flexible schema and nested documents.

---

## 📂 Tech Stack

- **Frontend**: HTML, EJS, Tailwind CSS, Vanilla JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB with Mongoose  
- **Templating Engine**: EJS  
- **Authentication**: Passport.js (local strategy)  
- **File Uploads**: Multer

---

## 📦 Folder Structure

StackIt/
│
├── models/
│ └── question.js
│ └── user.js
├── routes/
│ └── index.js
├── views/
│ └── askquestion.ejs
│ └── seeanswer.ejs
│ └── leaderboard.ejs
│ └── questions.ejs
├── public/
│ └── uploads/ # For storing uploaded images
│
├── app.js # Main application file
├── README.md
└── package.json



---

## 🛠️ How to Run the Project Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HARISH-RAJAK/project-learn-private.git
   cd project-learn-private

   npm install
   npm start

   🎯 Future Enhancements
Add upvote/downvote for questions.

Real-time notifications.

Role-based access (moderator/admin).

Dark mode and accessibility improvements.

Rich text editor for answers and questions.


📃 License: Code Thrust Private License

This project (StackIt) is developed and owned by Team Code Thrust:
Harish Rajak, Sakshi Singh, Harshita Soni, Ramakant Shukla.

All rights to this software, including source code, UI/UX, and design, are reserved exclusively for Team Code Thrust.

🔒 You are NOT permitted to:
- Use or modify the source code for personal or commercial purposes
- Redistribute or host this project under your own name
- Claim ownership or authorship

✅ You ARE permitted to:
- View the code for learning or inspiration (non-commercial only)
- Showcase this project only with credit to Team Code Thrust

Any unauthorized usage is strictly prohibited and may lead to legal action.

© 2025 Team Code Thrust. All rights reserved.



