import React from 'react'
import './styles.css'

export default function Layout3() {
    return (
        <div className="layout-3">
            {/* Navigation */}
            <nav className="navigation">
                <div className="nav-wrapper">
                    <div className="logo-brand">
                        <span className="logo-symbol">⚕️</span>
                        <span className="logo-name">Altair <strong>Medical Systems</strong></span>
                    </div>
                    <ul className="menu">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#expertise">Expertise</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    <button className="nav-action">Schedule Consultation</button>
                </div>
            </nav>

            {/* Hero Banner */}
            <section className="hero-banner" id="home">
                <div className="hero-overlay"></div>
                <div className="hero-wrapper">
                    <div className="hero-badge">
                        <span className="badge-icon">★</span>
                        Excellence in Healthcare Since 2008
                    </div>
                    <h1>Elevating Healthcare Standards Through Innovation & Excellence</h1>
                    <p>A distinguished leader in medical infrastructure and technology solutions, delivering unparalleled quality and precision to healthcare institutions across the globe.</p>
                    <div className="hero-cta">
                        <button className="btn-primary">Explore Our Services</button>
                        <button className="btn-secondary">Our Portfolio</button>
                    </div>
                </div>
            </section>

            {/* Services Overview */}
            <section className="services-overview" id="services">
                <div className="services-intro">
                    <span className="intro-label">Our Services</span>
                    <h2>Comprehensive Healthcare Solutions</h2>
                    <p>Delivering excellence across every facet of medical infrastructure and technology</p>
                </div>

                <div className="services-layout">
                    <div className="service-box">
                        <div className="service-number">01</div>
                        <div className="service-icon">🏥</div>
                        <h3>Modular Operation Theaters</h3>
                        <p>Precision-engineered modular OT solutions featuring advanced HVAC systems, medical gas pipelines, and ISO Class 5 cleanroom technology.</p>
                        <ul className="service-highlights">
                            <li>ISO Class 5 Cleanroom Standards</li>
                            <li>Advanced HVAC & Air Filtration</li>
                            <li>Medical Gas Pipeline Systems</li>
                            <li>Integrated Surgical Equipment</li>
                        </ul>
                        <a href="#" className="service-more">Learn More →</a>
                    </div>

                    <div className="service-box">
                        <div className="service-number">02</div>
                        <div className="service-icon">💉</div>
                        <h3>Medical Device Integration</h3>
                        <p>FDA-approved medical devices with seamless IoT integration, cloud connectivity, and AI-powered analytics.</p>
                        <ul className="service-highlights">
                            <li>FDA & EC Approved Devices</li>
                            <li>IoT-Enabled Connectivity</li>
                            <li>Cloud Data Synchronization</li>
                            <li>AI-Powered Predictive Analytics</li>
                        </ul>
                        <a href="#" className="service-more">Learn More →</a>
                    </div>

                    <div className="service-box">
                        <div className="service-number">03</div>
                        <div className="service-icon">⚕️</div>
                        <h3>Critical Care Infrastructure</h3>
                        <p>Comprehensive ICU and NICU setups with advanced life support systems and environmental controls.</p>
                        <ul className="service-highlights">
                            <li>Advanced Ventilator Systems</li>
                            <li>Patient Monitoring Hubs</li>
                            <li>Environmental Control Systems</li>
                            <li>Emergency Response Protocols</li>
                        </ul>
                        <a href="#" className="service-more">Learn More →</a>
                    </div>

                    <div className="service-box">
                        <div className="service-number">04</div>
                        <div className="service-icon">💻</div>
                        <h3>Digital Health Platforms</h3>
                        <p>Comprehensive healthcare IT solutions including EHR systems, telemedicine platforms, and hospital information systems.</p>
                        <ul className="service-highlights">
                            <li>Electronic Health Records (EHR)</li>
                            <li>Telemedicine Solutions</li>
                            <li>Hospital Information Systems</li>
                            <li>Data Analytics Dashboards</li>
                        </ul>
                        <a href="#" className="service-more">Learn More →</a>
                    </div>

                    <div className="service-box">
                        <div className="service-number">05</div>
                        <div className="service-icon">🔬</div>
                        <h3>Laboratory Solutions</h3>
                        <p>Complete laboratory infrastructure with automated systems and quality control protocols.</p>
                        <ul className="service-highlights">
                            <li>Laboratory Automation</li>
                            <li>Quality Control Systems</li>
                            <li>Diagnostic Equipment</li>
                            <li>Sample Management</li>
                        </ul>
                        <a href="#" className="service-more">Learn More →</a>
                    </div>

                    <div className="service-box">
                        <div className="service-number">06</div>
                        <div className="service-icon">🛡️</div>
                        <h3>Compliance & Support</h3>
                        <p>ISO 13485 certified processes with comprehensive 24/7 technical support and preventive maintenance.</p>
                        <ul className="service-highlights">
                            <li>ISO 13485 Certification</li>
                            <li>24/7 Technical Support</li>
                            <li>Preventive Maintenance</li>
                            <li>Regulatory Compliance</li>
                        </ul>
                        <a href="#" className="service-more">Learn More →</a>
                    </div>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="expertise-section" id="expertise">
                <div className="expertise-container">
                    <div className="expertise-content">
                        <span className="intro-label">Our Expertise</span>
                        <h2>Decades of Excellence in Medical Infrastructure</h2>
                        <p>With over 15 years of distinguished service, we have established ourselves as a trusted partner for healthcare institutions worldwide.</p>

                        <div className="expertise-stats">
                            <div className="stat-item">
                                <div className="stat-value">1000+</div>
                                <div className="stat-description">Healthcare Facilities Served</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">50+</div>
                                <div className="stat-description">Countries Worldwide</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">100%</div>
                                <div className="stat-description">Compliance Rate</div>
                            </div>
                        </div>

                        <div className="expertise-features">
                            <div className="feature-point">
                                <div className="point-marker">✓</div>
                                <div className="point-content">
                                    <h4>ISO 13485 Certified Excellence</h4>
                                    <p>Rigorous quality management systems ensuring the highest standards in medical device manufacturing.</p>
                                </div>
                            </div>

                            <div className="feature-point">
                                <div className="point-marker">✓</div>
                                <div className="point-content">
                                    <h4>FDA & EC Approved Solutions</h4>
                                    <p>All products meet stringent international regulatory standards for safety and efficacy.</p>
                                </div>
                            </div>

                            <div className="feature-point">
                                <div className="point-marker">✓</div>
                                <div className="point-content">
                                    <h4>Turnkey Project Delivery</h4>
                                    <p>Comprehensive end-to-end solutions from consultation through installation and ongoing support.</p>
                                </div>
                            </div>

                            <div className="feature-point">
                                <div className="point-marker">✓</div>
                                <div className="point-content">
                                    <h4>Global Service Network</h4>
                                    <p>24/7 technical support and maintenance services across 50+ countries.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section">
                <div className="testimonials-intro">
                    <span className="intro-label">Client Testimonials</span>
                    <h2>Trusted by Healthcare Leaders</h2>
                </div>

                <div className="testimonials-grid">
                    <div className="testimonial-item">
                        <div className="quote-symbol">&ldquo;</div>
                        <p className="testimonial-quote">The modular OT system has completely transformed our surgical department. The precision engineering and attention to sterile protocols are exceptional.</p>
                        <div className="testimonial-author">
                            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop" alt="Dr. Sarah Johnson" className="author-photo" />
                            <div className="author-details">
                                <strong className="author-name">Dr. Sarah Johnson</strong>
                                <span className="author-position">Chief Surgeon, Metro Hospital</span>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-item">
                        <div className="quote-symbol">&ldquo;</div>
                        <p className="testimonial-quote">Outstanding support and reliability. Their medical devices have significantly improved our patient monitoring capabilities.</p>
                        <div className="testimonial-author">
                            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop" alt="Dr. Michael Chen" className="author-photo" />
                            <div className="author-details">
                                <strong className="author-name">Dr. Michael Chen</strong>
                                <span className="author-position">Director, City Medical Center</span>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-item">
                        <div className="quote-symbol">&ldquo;</div>
                        <p className="testimonial-quote">From planning to installation, the team demonstrated exceptional expertise. Our new ICU is world-class.</p>
                        <div className="testimonial-author">
                            <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop" alt="Dr. Priya Sharma" className="author-photo" />
                            <div className="author-details">
                                <strong className="author-name">Dr. Priya Sharma</strong>
                                <span className="author-position">Head of Critical Care, Regional Hospital</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-banner">
                <div className="cta-wrapper">
                    <h2>Partner with Excellence</h2>
                    <p>Transform your healthcare facility with our world-class medical infrastructure and technology solutions</p>
                    <div className="cta-actions">
                        <button className="btn-cta-primary">Schedule Consultation</button>
                        <button className="btn-cta-secondary">Download Brochure</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="site-footer">
                <div className="footer-wrapper">
                    <div className="footer-columns">
                        <div className="footer-column">
                            <div className="footer-brand">
                                <span className="logo-symbol">⚕️</span>
                                <span className="logo-name">Altair <strong>Medical Systems</strong></span>
                            </div>
                            <p className="footer-about">Delivering excellence in medical infrastructure and technology solutions to healthcare institutions worldwide.</p>
                        </div>
                        <div className="footer-column">
                            <h4 className="footer-heading">Services</h4>
                            <ul className="footer-links">
                                <li><a href="#">Modular OT</a></li>
                                <li><a href="#">Medical Devices</a></li>
                                <li><a href="#">ICU Solutions</a></li>
                                <li><a href="#">Digital Health</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4 className="footer-heading">Company</h4>
                            <ul className="footer-links">
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">Support</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4 className="footer-heading">Contact</h4>
                            <ul className="footer-links">
                                <li>contact@altairmedical.com</li>
                                <li>+1 (555) 987-6543</li>
                                <li>Available 24/7</li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p className="footer-copyright">&copy; 2024 Altair Medical Systems. All rights reserved.</p>
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
