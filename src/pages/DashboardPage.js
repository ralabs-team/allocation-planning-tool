import React from 'react';
import { Link } from 'react-router-dom';

// components
import TimelineCalendar from '../components/TimelineCalendar';

// mock data
import scheduler from '../mock/scheduler';
import users from '../mock/users.json';

const DashboardPage = () => (
  <div>
    <h1>Dashboard Page</h1>

    <div>
      <Link to="/">Main Page</Link>
    </div>

    <div className="calendar">
      <TimelineCalendar
        employees={users}
        scheduler={scheduler}
      />
    </div>
  </div>
);

export default DashboardPage;
