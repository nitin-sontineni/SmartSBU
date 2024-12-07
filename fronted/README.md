# SmartSBU

SmartSBU is a web application designed to simplify course management and enhance the learning experience for students and instructors. The platform allows users to create and manage courses, upload course materials, and interact through an intuitive interface.

---

## Features

- **Course Management**:
  - Create, view, and manage courses.
  - Display existing courses dynamically.

- **File Upload**:
  - Drag-and-drop functionality for uploading course materials.
  - Supports large file uploads (up to 200MB).

- **Authentication**:
  - Google-based authentication using Firebase.
  - Secure login and logout functionality.

- **Dynamic Navigation**:
  - Seamless navigation between dashboard and course pages.

---

## Tech Stack

- **Frontend**: React, Material-UI
- **Backend**: Firebase Authentication, Firebase Storage (for file uploads)
- **Routing**: React Router
- **State Management**: React Hooks

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/nitin-sontineni/SmartSBU.git
   cd SmartSBU
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Add your Firebase project configuration to `firebaseConfig.jsx`.

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the application in your browser at:
   ```
   http://localhost:3000
   ```

---

## Future Enhancements

- **File Previews**: Enable previews for uploaded documents.
- **Notifications**: Add notifications for new course updates.
- **Role-based Access**: Implement instructor and student roles for better functionality.

---

## License

This project is licensed under the [MIT License](LICENSE).