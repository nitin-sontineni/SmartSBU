# SmartSBU

SmartSBU is a powerful web application designed to streamline and enhance the learning experience for students. With its dynamic features, SmartSBU simplifies the creation and interaction with course materials using Generative AI while ensuring a seamless and intuitive user experience.

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


## Tech Stack

### Frontend
- **React**: Efficient UI rendering and component-based architecture.  
- **Material-UI**: Elegant and responsive component styling.  

### Backend
- **Firebase Authentication**: Secure login and user management.  
- **Firebase Storage**: Reliable storage for uploaded materials.

### Additional Tools
- **React Router**: Smooth routing and URL management.  
- **React Hooks**: State management and functional components.  


## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/nitin-sontineni/SmartSBU.git
cd SmartSBU
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase
- Navigate to the Firebase console and create a project.
- Retrieve your Firebase configuration (API key, Auth Domain, etc.).
- Update `firebaseConfig.jsx` with your Firebase credentials.

### 4. Start the Development Server
```bash
npm start
```

### 5. Access the Application
Open your browser and navigate to:  
```
http://localhost:3000
```


## Future Enhancements

### Short-term Goals
- **File Previews**: Enable inline previews for uploaded documents like PDFs and Word files.  
- **Course Notifications**: Notify users about new updates or changes in courses.  

### Long-term Vision
- **Role-based Access Control**: Implement instructor and student roles for tailored functionality.  
- **AI Query Integration**: Use fine-tuned LLMs for answering questions based on course materials.  
- **Collaboration Tools**: Add discussion boards and group workspaces.  


## Contribution Guidelines

We welcome contributions to improve SmartSBU. To get started:
1. Fork the repository.  
2. Create a feature branch:  
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and submit a pull request.


## License

This project is licensed under the [MIT License](LICENSE). By contributing, you agree to abide by its terms.

## Acknowledgements

This project was developed by:  
- **Nitin Gopala Krishna Sontineni**
- **Moni Gayathri Sayana**  

Special thanks to our instructor, Prof. Zhenhua Liu and peers for their guidance and feedback.
