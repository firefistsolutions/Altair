import React from 'react'
import './styles.css'

export default function Layout4() {
    return (
        <div className="layout-4">
            {/* Header */}
            <header className="top-header">
                <div className="header-content">
                    <div className="brand-logo">
                        <span className="brand-icon">🏥</span>
                        <span className="brand-name">Altair <strong>Medical Systems</strong></span>
                    </div>
                    <nav className="primary-nav">
                        <a href="#home">Home</a>
                        <a href="#solutions">Solutions</a>
                        <a href="#technology">Technology</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </nav>
                    <button className="nav-cta">Get Started</button>
                </div>
            </header>

            {/* Hero */}
            <section className="main-hero" id="home">
                <div className="hero-grid">
                    <div className="hero-left">
                        <span className="hero-label">Medical Innovation</span>
                        <h1>Next-Generation Healthcare Infrastructure</h1>
                        <p>Empowering hospitals with state-of-the-art modular operation theaters, advanced medical devices, and comprehensive digital health solutions.</p>
                        <div className="hero-buttons">
                            <button className="btn-solid">Explore Products</button>
                            <button className="btn-ghost">Watch Demo</button>
                        </div>
                        <div className="hero-stats">
                            <div className="stat">
                                <strong>1000+</strong>
                                <span>Installations</span>
                            </div>
                            <div className="stat">
                                <strong>50+</strong>
                                <span>Countries</span>
                            </div>
                            <div className="stat">
                                <strong>99.9%</strong>
                                <span>Uptime</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solutions */}
            <section className="solutions-section" id="solutions">
                <div className="solutions-header">
                    <span className="section-label">What We Offer</span>
                    <h2>Comprehensive Healthcare Solutions</h2>
                    <p>Delivering excellence across every facet of medical infrastructure and technology</p>
                </div>

                <div className="solutions-grid">
                    <div className="solution-card card-purple">
                        <div className="card-icon">🏥</div>
                        <h3>Modular OT Systems</h3>
                        <p>Advanced modular operation theaters with precision HVAC, sterile environments, and integrated surgical equipment.</p>
                        <ul className="card-features">
                            <li>ISO Class 5 Cleanrooms</li>
                            <li>Medical Gas Systems</li>
                            <li>Surgical Lighting</li>
                            <li>HVAC Integration</li>
                        </ul>
                        <a href="#" className="card-link">Learn More →</a>
                    </div>

                    <div className="solution-card card-blue">
                        <div className="card-icon">💉</div>
                        <h3>Medical Devices</h3>
                        <p>FDA-approved medical devices for patient monitoring, diagnostics, and treatment with IoT integration.</p>
                        <ul className="card-features">
                            <li>Real-Time Monitoring</li>
                            <li>Cloud Connectivity</li>
                            <li>AI Analytics</li>
                            <li>FDA Approved</li>
                        </ul>
                        <a href="#" className="card-link">Learn More →</a>
                    </div>

                    <div className="solution-card card-green">
                        <div className="card-icon">🔬</div>
                        <h3>ICU & Critical Care</h3>
                        <p>Complete ICU and NICU infrastructure with advanced life support and environmental control systems.</p>
                        <ul className="card-features">
                            <li>Ventilator Integration</li>
                            <li>Patient Monitoring</li>
                            <li>Emergency Protocols</li>
                            <li>Life Support Systems</li>
                        </ul>
                        <a href="#" className="card-link">Learn More →</a>
                    </div>

                    <div className="solution-card card-orange">
                        <div className="card-icon">💻</div>
                        <h3>Digital Health Platform</h3>
                        <p>Comprehensive HIS, EHR, and telemedicine solutions with DICOM and HL7 integration.</p>
                        <ul className="card-features">
                            <li>Electronic Health Records</li>
                            <li>Telemedicine</li>
                            <li>Data Analytics</li>
                            <li>DICOM & HL7</li>
                        </ul>
                        <a href="#" className="card-link">Learn More →</a>
                    </div>

                    <div className="solution-card card-pink">
                        <div className="card-icon">🩺</div>
                        <h3>Diagnostic Systems</h3>
                        <p>Advanced diagnostic equipment including imaging systems and laboratory automation.</p>
                        <ul className="card-features">
                            <li>Imaging Systems</li>
                            <li>Lab Automation</li>
                            <li>Point-of-Care Testing</li>
                            <li>Quality Control</li>
                        </ul>
                        <a href="#" className="card-link">Learn More →</a>
                    </div>

                    <div className="solution-card card-teal">
                        <div className="card-icon">🛡️</div>
                        <h3>Support & Maintenance</h3>
                        <p>24/7 technical support and preventive maintenance services ensuring uninterrupted operation.</p>
                        <ul className="card-features">
                            <li>24/7 Technical Support</li>
                            <li>Preventive Maintenance</li>
                            <li>Spare Parts Management</li>
                            <li>Remote Monitoring</li>
                        </ul>
                        <a href="#" className="card-link">Learn More →</a>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features-section" id="technology">
                <div className="features-content">
                    <div className="features-text">
                        <span className="section-label">Why Choose Us</span>
                        <h2>Built for Excellence in Healthcare</h2>
                        <p>Our solutions are designed with a deep understanding of healthcare requirements and regulatory compliance.</p>

                        <div className="feature-list">
                            <div className="feature-item">
                                <div className="feature-check">✓</div>
                                <div>
                                    <h4>ISO 13485 Certified</h4>
                                    <p>Quality management systems for medical devices meeting the highest international standards.</p>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-check">✓</div>
                                <div>
                                    <h4>FDA & EC Approved</h4>
                                    <p>All products meet stringent regulatory standards ensuring compliance with international regulations.</p>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-check">✓</div>
                                <div>
                                    <h4>24/7 Support</h4>
                                    <p>Round-the-clock technical assistance and preventive maintenance ensuring uninterrupted operations.</p>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-check">✓</div>
                                <div>
                                    <h4>Proven Track Record</h4>
                                    <p>Trusted by over 1000 healthcare institutions across 50+ countries with 99.9% system uptime.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="process-section">
                <div className="process-header">
                    <span className="section-label">Our Process</span>
                    <h2>From Concept to Deployment</h2>
                    <p>A proven methodology for delivering world-class healthcare solutions</p>
                </div>

                <div className="process-timeline">
                    <div className="timeline-item">
                        <div className="timeline-marker">1</div>
                        <div className="timeline-content">
                            <h3>Consultation & Analysis</h3>
                            <p>Understanding your unique requirements and clinical workflows to design the perfect solution.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-marker">2</div>
                        <div className="timeline-content">
                            <h3>Design & Planning</h3>
                            <p>Creating detailed blueprints with regulatory compliance and safety protocols at the forefront.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-marker">3</div>
                        <div className="timeline-content">
                            <h3>Development & Testing</h3>
                            <p>Building and rigorously testing every component to ensure safety and reliability.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-marker">4</div>
                        <div className="timeline-content">
                            <h3>Installation & Commissioning</h3>
                            <p>Seamless deployment with minimal disruption followed by comprehensive testing.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-marker">5</div>
                        <div className="timeline-content">
                            <h3>Training & Handover</h3>
                            <p>Comprehensive training for your medical and technical staff ensuring optimal utilization.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-marker">6</div>
                        <div className="timeline-content">
                            <h3>Ongoing Support</h3>
                            <p>24/7 technical support and continuous improvement based on feedback.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section">
                <div className="testimonials-header">
                    <span className="section-label">Client Success</span>
                    <h2>Trusted by Healthcare Leaders</h2>
                </div>

                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <div className="quote-mark">"</div>
                        <p>The modular OT system has transformed our surgical department. The precision engineering is exceptional.</p>
                        <div className="testimonial-author">
                            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop" alt="Dr. Sarah Johnson" />
                            <div className="author-info">
                                <strong>Dr. Sarah Johnson</strong>
                                <span>Chief Surgeon, Metro Hospital</span>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card">
                        <div className="quote-mark">"</div>
                        <p>Outstanding support and reliability. Their medical devices have significantly improved our patient monitoring.</p>
                        <div className="testimonial-author">
                            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop" alt="Dr. Michael Chen" />
                            <div className="author-info">
                                <strong>Dr. Michael Chen</strong>
                                <span>Director, City Medical Center</span>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card">
                        <div className="quote-mark">"</div>
                        <p>From planning to installation, the team demonstrated exceptional expertise. Our new ICU is world-class.</p>
                        <div className="testimonial-author">
                            <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop" alt="Dr. Priya Sharma" />
                            <div className="author-info">
                                <strong>Dr. Priya Sharma</strong>
                                <span>Head of Critical Care, Regional Hospital</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="final-cta">
                <div className="cta-box">
                    <h2>Ready to Elevate Your Healthcare Facility?</h2>
                    <p>Let's discuss how our solutions can meet your specific needs and transform patient care</p>
                    <div className="cta-buttons">
                        <button className="cta-button-primary">Schedule Consultation</button>
                        <button className="cta-button-secondary">Download Brochure</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="site-footer">
                <div className="footer-content">
                    <div className="footer-grid">
                        <div className="footer-col">
                            <div className="footer-logo">
                                <span className="brand-icon">🏥</span>
                                <span className="brand-name">Altair <strong>Medical Systems</strong></span>
                            </div>
                            <p>Transforming healthcare through innovation and excellence in medical infrastructure solutions.</p>
                        </div>
                        <div className="footer-col">
                            <h4>Solutions</h4>
                            <ul>
                                <li><a href="#">Modular OT</a></li>
                                <li><a href="#">Medical Devices</a></li>
                                <li><a href="#">ICU Solutions</a></li>
                                <li><a href="#">Digital Health</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">Support</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Contact</h4>
                            <ul>
                                <li>info@altairmedical.com</li>
                                <li>+1 (555) 246-8135</li>
                                <li>Round-the-clock Support</li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 Altair Medical Systems. All rights reserved.</p>
                        <div className="footer-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
