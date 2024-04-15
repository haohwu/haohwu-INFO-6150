import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to the Job Portal</h1>
            <p>Your gateway to a better career starts here!</p>
            <div>
                <Link to="/jobs">View Job Listings</Link>
                <Link to="/companies">Explore Companies</Link>
            </div>
        </div>
    );
}

export default Home;
