import React, { useState, useEffect } from 'react';
import {  verifyAdmin } from '../services/api';
import io from 'socket.io-client';  
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
    const [admin, setAdmin] = useState('');
    const [pwd, setPwd] = useState('');
    const [data, setData] = useState([]); 
    const [errorMessage, setErrorMessage] = useState('');
    const [isVerified, setIsVerified] = useState(false);  


    useEffect(() => {
        if (isVerified) {
            const socket = io('http://localhost:5000');  

            
            socket.on('allUsers', (updatedData) => {
              
                setData(updatedData);  
            });

            
            return () => {
                socket.disconnect();  
            };
        }
    }, [isVerified]);  

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsVerified(false); 

        try {
           
            const response = await verifyAdmin({ admin, pwd });
            console.log(response);

            if (response.valid) {
               
                setIsVerified(true);

             
            } else {
                setErrorMessage("Incorrect credentials");
                setData([]);
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Something went wrong. Try again.");
        }
    };

    return (
        <div className="admin-container">
            <h2>Admin Panel Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Enter Username</label>
                <input 
                    type="text" 
                    value={admin} 
                    onChange={(e) => setAdmin(e.target.value)} 
                    required 
                />

                <label>Enter Password</label>
                <input 
                    type="password" 
                    value={pwd} 
                    onChange={(e) => setPwd(e.target.value)} 
                    required 
                />

                <button type="submit">LOGIN</button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

           
            {isVerified && data.length > 0 && (
                <div className="user-table">
                    <h3>Registered Users</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Handle</th>
                                <th>Images</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.handle}</td>
                                    <td className="image-container">
                                        {user.images.map((image, index) => (
                                            <a key={index} href={image} target="_blank" rel="noopener noreferrer">
                                                <img src={image} alt={`user-${index}`} className="user-image" />
                                            </a>
                                        ))}
                                    </td>
                                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
