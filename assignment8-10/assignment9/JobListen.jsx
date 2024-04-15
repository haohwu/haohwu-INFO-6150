import React from 'react';

const Job = () => {
    const joblist = [
    {id: 1, title: "Full Stack Developer", description: 'Koin our dynamic team to work on cutting-edge technologies. Developand maintain sophisticated web applications for our diverse client base.', lastUpdated: 'Last updated 2 days ago'},
    {id: 2, title: 'Digital Marketing Specialist', description: 'Elevate our digital marketing strategies to promote our innovativeproducts. Proficiency in SEO, SEM, and social media marketing is highly valued.', lastUpdated: 'Last updated 1 day ago'}
];

    return (
        <div>
            <h1>Job List</h1>
            <ul>
                {joblist.map(job => (
                    <li key={job.id}>{job.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Job;