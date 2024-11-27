import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook


const Dashboard = () => {
    const navigate = useNavigate(); // Initialize navigate

    const [courses, setCourses] = useState([
    { id: 1, number: 'AMS 691', name: 'Topics in Applied Mathematics' },
    { id: 2, number: 'CSE 512', name: 'Machine Learning' },
    ]);
    const [newCourse, setNewCourse] = useState({ number: '', name: '' });
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
    };

    const handleCreateCourse = () => {
    if (newCourse.number && newCourse.name) {
        setCourses([
        ...courses,
        { id: courses.length + 1, number: newCourse.number, name: newCourse.name },
        ]);
        setSuccessMessage(`Course '${newCourse.number}' created successfully!`);
        setNewCourse({ number: '', name: '' });
        setTimeout(() => setSuccessMessage(''), 3000); // Clear the success message after 3 seconds
    }
    };

    const handleViewCourse = (courseId) => {
        navigate('/coursepage/'); // Navigate to the course page with the course ID
      };

    return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <h1>SmartSBU</h1>
        <p>Welcome to your course dashboard. Here you can view your courses or create new ones.</p>
        
        <section>
        <h2>Create a New Course</h2>
        <div style={{ marginBottom: '10px' }}>
            <input
            type="text"
            name="number"
            placeholder="Course Number"
            value={newCourse.number}
            onChange={handleInputChange}
            style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
            }}
            />
            <textarea
            name="name"
            placeholder="Course Name"
            value={newCourse.name}
            onChange={handleInputChange}
            style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
            }}
            />
            <button
            onClick={handleCreateCourse}
            style={{
                padding: '10px 20px',
                border: 'none',
                backgroundColor: '#007BFF',
                color: '#fff',
                borderRadius: '5px',
                cursor: 'pointer',
            }}
            >
            Create Course
            </button>
        </div>
        {successMessage && (
            <div
            style={{
                backgroundColor: '#D4EDDA',
                color: '#155724',
                padding: '10px',
                borderRadius: '5px',
            }}
            >
            {successMessage}
            </div>
        )}
        </section>

        <section style={{ marginTop: '20px' }}>
        <h2>Your Courses</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {courses.map((course) => (
            <div
                key={course.id}
                style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                width: '200px',
                textAlign: 'center',
                }}
            >
                <h3>{course.number}</h3>
                <p>{course.name}</p>
                <button
                onClick={() => handleViewCourse(course.id)}
                style={{
                    padding: '5px 10px',
                    border: 'none',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                >
                View Course {course.id}
                </button>
            </div>
            ))}
        </div>
        </section>
    </div>
    );
};

export default Dashboard;
