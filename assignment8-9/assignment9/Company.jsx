import React, { userState, userEffect} from 'react';
import axios from 'axios';

const Company = () => {
    const [companyImage, setCompanyImage] = userState([]);
    userEffect(() => {
        const fetchCompanyImage = async (companyImage) => {
            try {
                const response = await axios.get('/company');
                setCompanyImage(response.data);
            } catch (error) {
                console.error('error', error);
            }
        };
        fetchCompanyImage(companyImage);
    },[]    
    );
    return (
        <div>
            <h1>Company</h1>
            <img src={companyImage.image} alt={companyImage.name} />
            <h2>{companyImage.name}</h2>
            <p>{companyImage.description}</p>
        </div>
    );
};

export default Company;