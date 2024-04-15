const jobs = [];

function addJob(jobDetails) {
    const { companyName, jobTitle, description, salary } = jobDetails;

    if (!companyName || !jobTitle || !description || !salary) {
        return { error: 'All fields are required.' };
    }

    const newJob = {
        id: jobs.length + 1, 
        companyName,
        jobTitle,
        description,
        salary
    };

    jobs.push(newJob);

    return newJob;
}

module.exports = { addJob };