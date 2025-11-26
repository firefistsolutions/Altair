import React from 'react'
import './styles.css'

export default function Layout6() {
    return (
        <div className="layout-6">
            {/* Navigation */}
            <nav className="luxury-nav">
                <div className="nav-wrapper">
                    <div className="luxury-logo">
                        <span className="logo-mark">A</span>
                        <div className="logo-text">
                            <span className="brand-name">ALTAIR</span>
                            <span className="brand-tagline">Medical Systems</span>
                        </div>
                    </div>
                    <ul className="luxury-menu">
                        <li><a href="#products">Products</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#events">Events</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#search">Search</a></li>
                    </ul>
                    <button className="luxury-btn">Schedule Consultation</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="luxury-hero" id="home">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-label">
                            <span className="label-line"></span>
                            <span className="label-text">Redefining Healthcare Excellence</span>
                        </div>
                        <h1 className="hero-title">
                            Where Precision Meets
                            <span className="title-accent"> Perfection</span>
                        </h1>
                        <p className="hero-subtitle">
                            Curating world-class medical infrastructure solutions with an unwavering
                            commitment to quality, innovation, and the highest standards of clinical excellence.
                        </p>
                        <div className="hero-cta">
                            <button className="btn-primary">Discover Our World</button>
                            <a href="#" className="btn-text">
                                View Portfolio
                                <span className="arrow-icon">→</span>
                            </a>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="visual-frame">
                            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&h=1100&fit=crop" alt="Medical Excellence" />
                            <div className="frame-accent"></div>
                        </div>
                        <div className="stats-overlay">
                            <div className="stat-item">
                                <div className="stat-number">15+</div>
                                <div className="stat-label">Years of Excellence</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">1000+</div>
                                <div className="stat-label">Global Installations</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="trust-section">
                <div className="trust-container">
                    <p className="trust-text">Trusted by the world&apos;s most prestigious healthcare institutions</p>
                    <div className="trust-logos">
                        <div className="trust-item">Apollo Hospitals</div>
                        <div className="trust-item">Fortis Healthcare</div>
                        <div className="trust-item">Max Healthcare</div>
                        <div className="trust-item">Medanta</div>
                        <div className="trust-item">AIIMS</div>
                    </div>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="expertise-section" id="expertise">
                <div className="expertise-container">
                    <div className="section-intro">
                        <span className="intro-label">Our Expertise</span>
                        <h2 className="section-title">Unparalleled Excellence in Medical Infrastructure</h2>
                        <p className="section-description">
                            With over 15 years of distinguished service, we have established ourselves as
                            the premier choice for healthcare institutions seeking the finest in medical
                            infrastructure and technology solutions.
                        </p>
                    </div>

                    <div className="expertise-grid">
                        <div className="expertise-card">
                            <div className="card-number">01</div>
                            <h3>Modular Operation Theaters</h3>
                            <p>
                                Precision-engineered surgical environments featuring ISO Class 5 cleanroom
                                technology, advanced HVAC systems, and integrated medical gas pipelines.
                                Each installation is a masterpiece of engineering excellence.
                            </p>
                            <ul className="expertise-features">
                                <li>ISO Class 5 Cleanroom Standards</li>
                                <li>Advanced HVAC & Air Filtration</li>
                                <li>Medical Gas Pipeline Systems</li>
                                <li>Integrated Surgical Equipment</li>
                            </ul>
                            <a href="#" className="card-link">Explore More →</a>
                        </div>

                        <div className="expertise-card">
                            <div className="card-number">02</div>
                            <h3>Medical Device Integration</h3>
                            <p>
                                FDA-approved medical devices seamlessly integrated with cutting-edge IoT
                                technology, cloud connectivity, and AI-powered analytics for superior
                                patient care and clinical outcomes.
                            </p>
                            <ul className="expertise-features">
                                <li>FDA & EC Approved Devices</li>
                                <li>IoT-Enabled Connectivity</li>
                                <li>Cloud Data Synchronization</li>
                                <li>AI-Powered Predictive Analytics</li>
                            </ul>
                            <a href="#" className="card-link">Explore More →</a>
                        </div>

                        <div className="expertise-card">
                            <div className="card-number">03</div>
                            <h3>Critical Care Infrastructure</h3>
                            <p>
                                Comprehensive ICU and NICU solutions featuring advanced life support systems,
                                environmental controls, and state-of-the-art monitoring capabilities designed
                                for the most demanding clinical environments.
                            </p>
                            <ul className="expertise-features">
                                <li>Advanced Ventilator Systems</li>
                                <li>Patient Monitoring Hubs</li>
                                <li>Environmental Control Systems</li>
                                <li>Emergency Response Protocols</li>
                            </ul>
                            <a href="#" className="card-link">Explore More →</a>
                        </div>

                        <div className="expertise-card">
                            <div className="card-number">04</div>
                            <h3>Digital Health Platforms</h3>
                            <p>
                                Sophisticated healthcare IT solutions including Electronic Health Records,
                                telemedicine platforms, and hospital information systems with DICOM and HL7
                                integration for seamless data management.
                            </p>
                            <ul className="expertise-features">
                                <li>Electronic Health Records (EHR)</li>
                                <li>Telemedicine Solutions</li>
                                <li>Hospital Information Systems</li>
                                <li>Data Analytics Dashboards</li>
                            </ul>
                            <a href="#" className="card-link">Explore More →</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solutions Showcase */}
            <section className="solutions-section" id="solutions">
                <div className="solutions-container">
                    <div className="solution-item">
                        <div className="solution-visual">
                            <img src="https://images.unsplash.com/photo-1581093804475-577d72e38aa0?w=1200&h=800&fit=crop" alt="Operating Theater" />
                            <div className="visual-overlay"></div>
                        </div>
                        <div className="solution-content">
                            <span className="solution-label">Infrastructure</span>
                            <h2>Surgical Excellence Redefined</h2>
                            <p>
                                Our modular operation theaters represent the pinnacle of surgical infrastructure
                                design. Every detail is meticulously crafted to ensure optimal clinical outcomes,
                                from air quality management to equipment integration.
                            </p>
                            <div className="solution-stats">
                                <div className="stat">
                                    <strong>500+</strong>
                                    <span>OT Installations</span>
                                </div>
                                <div className="stat">
                                    <strong>100%</strong>
                                    <span>Compliance Rate</span>
                                </div>
                                <div className="stat">
                                    <strong>ISO 5</strong>
                                    <span>Cleanroom Standard</span>
                                </div>
                            </div>
                            <button className="btn-outline">Learn More</button>
                        </div>
                    </div>

                    <div className="solution-item reverse">
                        <div className="solution-visual">
                            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop" alt="Medical Technology" />
                            <div className="visual-overlay"></div>
                        </div>
                        <div className="solution-content">
                            <span className="solution-label">Technology</span>
                            <h2>Innovation at Every Level</h2>
                            <p>
                                Leveraging the latest advancements in medical technology, IoT, and artificial
                                intelligence, our solutions deliver unprecedented performance, reliability, and
                                clinical intelligence for modern healthcare delivery.
                            </p>
                            <div className="solution-stats">
                                <div className="stat">
                                    <strong>50+</strong>
                                    <span>Device Models</span>
                                </div>
                                <div className="stat">
                                    <strong>99.9%</strong>
                                    <span>System Uptime</span>
                                </div>
                                <div className="stat">
                                    <strong>24/7</strong>
                                    <span>Support Network</span>
                                </div>
                            </div>
                            <button className="btn-outline">Learn More</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Excellence Section */}
            <section className="excellence-section" id="excellence">
                <div className="excellence-container">
                    <div className="excellence-content">
                        <span className="intro-label">Our Commitment</span>
                        <h2 className="section-title">Certified Excellence</h2>
                        <p className="section-description">
                            Our unwavering commitment to quality is reflected in our certifications and
                            the trust placed in us by leading healthcare institutions worldwide.
                        </p>

                        <div className="certifications">
                            <div className="cert-item">
                                <div className="cert-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="cert-content">
                                    <h4>ISO 13485</h4>
                                    <p>Medical Device Quality Management</p>
                                </div>
                            </div>

                            <div className="cert-item">
                                <div className="cert-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="cert-content">
                                    <h4>FDA Approved</h4>
                                    <p>US Food & Drug Administration</p>
                                </div>
                            </div>

                            <div className="cert-item">
                                <div className="cert-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="cert-content">
                                    <h4>EC Certified</h4>
                                    <p>European Conformity Standards</p>
                                </div>
                            </div>

                            <div className="cert-item">
                                <div className="cert-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="cert-content">
                                    <h4>CE Marking</h4>
                                    <p>European Health & Safety</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="excellence-visual">
                        <div className="visual-card">
                            <img src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=1000&fit=crop" alt="Excellence" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section">
                <div className="testimonials-container">
                    <div className="section-intro centered">
                        <span className="intro-label">Client Testimonials</span>
                        <h2 className="section-title">Words from Healthcare Leaders</h2>
                    </div>

                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div className="quote-mark">&ldquo;</div>
                            <p className="testimonial-text">
                                The modular OT system has completely transformed our surgical department.
                                The precision engineering and attention to detail are exceptional. Our
                                surgical outcomes have improved significantly.
                            </p>
                            <div className="testimonial-author">
                                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop" alt="Dr. Sarah Johnson" />
                                <div className="author-details">
                                    <strong>Dr. Sarah Johnson</strong>
                                    <span>Chief Surgeon, Metro Hospital</span>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card featured">
                            <div className="quote-mark">&ldquo;</div>
                            <p className="testimonial-text">
                                Outstanding support and reliability. Their medical devices have significantly
                                improved our patient monitoring capabilities. The real-time data integration
                                is seamless and has enhanced our clinical decision-making process.
                            </p>
                            <div className="testimonial-author">
                                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop" alt="Dr. Michael Chen" />
                                <div className="author-details">
                                    <strong>Dr. Michael Chen</strong>
                                    <span>Director, City Medical Center</span>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="quote-mark">&ldquo;</div>
                            <p className="testimonial-text">
                                From planning to installation, the team demonstrated exceptional expertise.
                                Our new ICU is world-class and meets all international standards. The project
                                was delivered on time and within budget.
                            </p>
                            <div className="testimonial-author">
                                <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop" alt="Dr. Priya Sharma" />
                                <div className="author-details">
                                    <strong>Dr. Priya Sharma</strong>
                                    <span>Head of Critical Care, Regional Hospital</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section" id="contact">
                <div className="cta-container">
                    <div className="cta-content">
                        <h2>Begin Your Journey to Excellence</h2>
                        <p>
                            Partner with us to elevate your healthcare facility to new heights of
                            clinical excellence and operational efficiency.
                        </p>
                        <div className="cta-actions">
                            <button className="btn-primary large">Schedule Private Consultation</button>
                            <button className="btn-outline large">Download Portfolio</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="luxury-footer">
                <div className="footer-container">
                    <div className="footer-top">
                        <div className="footer-brand">
                            <div className="luxury-logo">
                                <span className="logo-mark">A</span>
                                <div className="logo-text">
                                    <span className="brand-name">ALTAIR</span>
                                    <span className="brand-tagline">Medical Systems</span>
                                </div>
                            </div>
                            <p className="footer-description">
                                Delivering excellence in medical infrastructure and technology solutions
                                to healthcare institutions worldwide since 2008.
                            </p>
                        </div>

                        <div className="footer-links">
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
                                    <li><a href="#">Partners</a></li>
                                    <li><a href="#">Contact</a></li>
                                </ul>
                            </div>

                            <div className="footer-col">
                                <h4>Contact</h4>
                                <ul>
                                    <li>contact@altairmedical.com</li>
                                    <li>+1 (555) 123-4567</li>
                                    <li>Available 24/7</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; 2024 Altair Medical Systems. All rights reserved.</p>
                        <div className="footer-legal">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
