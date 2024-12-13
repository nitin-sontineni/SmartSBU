# SmartSBU

SmartSBU is a powerful web application built using the **MERN stack**, designed to streamline and enhance the learning experience for students. With its dynamic features, SmartSBU simplifies the creation and interaction with course materials using Generative AI while ensuring a seamless and intuitive user experience.

---

## Features

### Course Management
- Effortlessly **create**, **view**, and **manage courses** via a user-friendly dashboard.  
- Dynamically display existing courses, allowing easy access to relevant materials.

### File Upload
- Drag-and-drop interface for uploading course materials, supporting multiple file formats.  
- Handles **large file uploads** with robust storage integration.

### Intelligent AI Interaction
- Context-aware responses powered by fine-tuned Large Language Models (LLMs) using the uploaded materials.  

### Authentication
- Secure **Google-based authentication** using Firebase for login and logout.  
- Ensures safe access to sensitive course data.

### Dynamic Navigation
- Intuitive navigation between the **dashboard**, **course pages**, and other key sections.  

---

## Tech Stack

### Frontend
- **React**: Efficient UI rendering and component-based architecture.  
- **Material-UI**: Elegant and responsive component styling.  

### Backend
- **Node.js**: Backend runtime for building scalable server-side applications.  
- **Express.js**: Framework to create RESTful APIs for handling user requests and processing AI queries.  
- **MongoDB**: NoSQL database to store embeddings, user queries, and course materials.  
- **Firebase Authentication**: Secure login and user management.

---

## Comprehensive Setup Instructions

Follow these steps to set up and run the SmartSBU application:

### 1. Clone the Repository
First, clone the repository to your local machine and navigate into the project directory:
```bash
git clone https://github.com/nitin-sontineni/SmartSBU.git
cd SmartSBU
```

---

### 2. Install Dependencies
Install the necessary dependencies for both **frontend** and **backend**:

#### Frontend:
```bash
cd frontend
npm install
```

#### Backend:
```bash
cd ../backend
npm install
```

---

### 3. Set Up Firebase
To enable authentication and storage, configure Firebase for your project:
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable the **Authentication** and **Storage** services in your Firebase project settings.  
   - For Authentication, enable **Google Sign-In**.
   - For Storage, ensure rules allow the application to upload and read files securely.
3. Retrieve your Firebase configuration (API Key, Auth Domain, Project ID, etc.) from the project settings.
4. Update the `firebaseConfig.jsx` file in the **frontend/src/config** directory with your Firebase credentials:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
   };

   export default firebaseConfig;
   ```

---

### 4. Configure Backend Environment
Set up a `.env` file in the **backend** directory to store environment variables:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
Replace `your_mongodb_connection_string` with the URI for your MongoDB database. If using **MongoDB Atlas**, you can find this in the Atlas console.

---

### 5. Start the Application
Run both the frontend and backend servers:

#### Start the Backend:
```bash
cd backend
npm start
```

#### Start the Frontend:
In another terminal:
```bash
cd frontend
npm start
```

---

### 6. Access the Application
Once both servers are running, open your browser and navigate to:
```
http://localhost:3000
```

---

### Deployment Instructions
To deploy the application:

#### Backend:
Deploy the **backend** server to a cloud hosting service such as **Heroku** or **AWS**. Ensure the MongoDB connection string is correctly set in the environment variables on the hosting platform.

#### Frontend:
Deploy the **frontend** application using platforms like **Vercel**, **Netlify**, or **Firebase Hosting**:
1. Build the project:
   ```bash
   npm run build
   ```
2. Upload the contents of the `build/` folder to the hosting platform.

---

## Future Enhancements

### Short-term Goals
- **File Previews**: Enable inline previews for uploaded documents like PDFs and Word files.  
- **Course Notifications**: Notify users about new updates or changes in courses.  

### Long-term Vision
- **Role-based Access Control**: Implement instructor and student roles for tailored functionality.  
- **AI Query Integration**: Use fine-tuned LLMs for answering questions based on course materials.  
- **Collaboration Tools**: Add discussion boards and group workspaces.  

---

## Contribution Guidelines

We welcome contributions to improve SmartSBU. To get started:
1. Fork the repository.  
2. Create a feature branch:  
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE). By contributing, you agree to abide by its terms.

---

## Acknowledgements

This project was developed by:  
- **Nitin Gopala Krishna Sontineni**
- **Moni Gayathri Sayana**  

Special thanks to our instructor, Prof. Zhenhua Liu, and peers for their guidance and feedback.
