import React from 'react';
import '../css/Layout.css'; 
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="layout-container">
     
      <header className="header">
       
        <nav className="navbar">
        <h2>Social Media Uploads</h2>
          <ul>
            <li><a href="/adminDashboard">Admin</a></li>
            <li><a href="/">User Upload</a></li>
          </ul>
        </nav>
      </header>

     
      <main className="main-content">
        <Outlet/>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
