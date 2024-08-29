import React from 'react';
import lp1 from '../components/assets/images/lp1.jpg';
import lp2 from '../components/assets/images/lp2.webp';
import lp3 from '../components/assets/images/lp3.jpg';
import lp4 from '../components/assets/images/lp4.jpg';
import lp5 from '../components/assets/images/lp5.jpg';
import './Home.css'; // Import the custom CSS file

export default function Home() {
    return (
        <div className="container">
            <header className="bg-light text-center py-5 mb-4 border-bottom">
                <h1 className="font-weight-bold custom-text-color mb-3">Welcome to Talent Management</h1>
                <p className="custom-text-color mb-4">Streamline your hiring process and find the perfect candidates effortlessly.</p>
                <img src={lp1} alt="Header" className="img-fluid rounded feature-img smaller-img" />
            </header>
            <section className="text-center py-5">
                <div className="feature mb-4" data-aos="fade-right" data-aos-delay="1550">
                    <img src={lp2} alt="Search Jobs" className="feature-img" />
                    <h2 className="font-weight-bold custom-text-color feature-title" >Search Job Postings</h2>
                    <p className="text-muted feature-description">Explore a wide range of job opportunities tailored to your skills and preferences.</p>
                </div>
                <div className="feature mb-4" data-aos="fade-left" data-aos-delay="1550">
                    <img src={lp3} alt="Apply to Jobs" className="feature-img" />
                    <h2 className="font-weight-bold custom-text-color feature-title">Apply to Jobs</h2>
                    <p className="text-muted feature-description">Submit your applications quickly and easily with just a few clicks.</p>
                </div>
                <div className="feature mb-4" data-aos="fade-right" data-aos-delay="1550">
                    <img src={lp4} alt="Upload Resume" className="feature-img" />
                    <h2 className="font-weight-bold custom-text-color feature-title">Upload Your Resume</h2>
                    <p className="text-muted feature-description">Upload and manage your resume to keep it updated and ready for new opportunities.</p>
                </div>
                <div className="feature mb-4" data-aos="fade-left" data-aos-delay="1550">
                    <img src={lp5} alt="Manager Features" className="feature-img" />
                    <h2 className="font-weight-bold custom-text-color feature-title" >For Managers</h2>
                    <p className="text-muted feature-description">Easily upload job postings, review applications, and select the best candidates.</p>
                </div>
            </section>
            <footer className="bg-light text-center py-3 border-top">
                <p className="custom-text-color mb-0">© 2024 Talent Management. All rights reserved.</p>
            </footer>
        </div>
    );
}
