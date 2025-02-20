# DBMS Quiz App

This project is a quiz application built using **HTML, CSS, JavaScript** for the frontend, and **Node.js with SQLite** for the backend and database management. The application allows students to take quizzes on different modules, view their scores, and provide feedback.

## 🚀 Preview
[Insert a screenshot or a link to a deployed version if available]

## 📌 Key Features
- **Quiz Functionality**: Students can take quizzes on different modules.
- **Score Management**: Stores and retrieves quiz scores from the database.
- **Feedback System**: Collects and stores feedback from students.
- **Responsive Design**: Ensures a seamless user experience on both desktop and mobile devices.

## 🛠 Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js
- **Database**: SQLite

## ⚙ How to Run

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Kishore-SR/DBMS-Quiz.git
```

### 2️⃣ Install Dependencies
Ensure you have **Node.js** and **SQLite** installed.
```bash
npm install
```

### 3️⃣ Navigate to the Project Directory
```bash
cd DBMS-Quiz
```

### 4️⃣ Run the Application
```bash
node server.js
```

### 5️⃣ Access the Website
Open your web browser and visit:
```
http://localhost:3000/
```

## 📡 API Endpoints

### 1️⃣ Save Student
**POST** `/api/saveStudent`

#### Request Body:
```json
{
  "name": "Student Name",
  "usn": "Student USN"
}
```
#### Response Body:
```json
{
  "studentId": 1
}
```

---

### 2️⃣ Fetch Questions
**GET** `/api/questions/:module`

#### Response Body Example:
```json
[
  {
    "id": 1,
    "question": "Sample question 1?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0
  },
  {
    "id": 2,
    "question": "Sample question 2?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 1
  }
]
```

---

### 3️⃣ Save Score
**POST** `/api/saveScore`

#### Request Body:
```json
{
  "studentId": 1,
  "module": 1,
  "score": 5
}
```
#### Response Body:
```json
{
  "message": "Score saved successfully"
}
```

---

### 4️⃣ Save Feedback
**POST** `/api/saveFeedback`

#### Request Body:
```json
{
  "studentId": 1,
  "module": 1,
  "rating": 5,
  "feedback": "Thank you!"
}
```
#### Response Body:
```json
{
  "message": "Feedback saved successfully"
}
```
#### Screenshots
![Image](https://github.com/Jeevanreddy-2005/DBMS-Quiz/blob/main/assets/Landing%20Page.jpeg)
![Image](https://github.com/Jeevanreddy-2005/DBMS-Quiz/blob/main/assets/Select%20Module%20Option.jpeg)
![Image](https://github.com/Jeevanreddy-2005/DBMS-Quiz/blob/main/assets/Questions%20for%20each%20module%20will%20be%20fetched%20from%20database.jpeg)
![Image](https://github.com/Jeevanreddy-2005/DBMS-Quiz/blob/main/assets/Questions%20displayed%20with%20Options.jpeg)
![Image](https://github.com/Jeevanreddy-2005/DBMS-Quiz/blob/main/assets/Feedbackform.jpeg)
![Image](https://github.com/Jeevanreddy-2005/DBMS-Quiz/blob/main/assets/All%20students%20details%20gets%20updated%20automatically%20in%20quiz.db.jpeg)
![Image](https://github.com/Jeevanreddy-2005/DBMS-Quiz/blob/main/assets/Feedback%20will%20be%20sorted%20seperately.jpeg)


## 📜 License
[Specify the license type, e.g., MIT, Apache 2.0, etc.]

## 👨‍💻 Author
Developed by **[Jeeva]**


