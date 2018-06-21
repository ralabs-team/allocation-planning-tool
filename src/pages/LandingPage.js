import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div>
    <h1>Landing Page</h1>

    <div>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  </div>
);

export default LandingPage;