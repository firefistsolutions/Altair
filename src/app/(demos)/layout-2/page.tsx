import React from 'react'
import './styles.css'

export default function Layout2() {
    return (
        <div className="layout-2">
            {/* Header */}
            <header className="header">
                <div className="header-container">
                    <div className="brand">
                        <span className="brand-icon">🏥</span>
                        <span className="brand-text">Altair <strong>Medical Systems</strong></span>
                    </div>
                    <nav>
                        <ul className="nav-menu">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#products">Products</a></li>
                            <li><a href="#technology">Technology</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </nav>
                    <button className="header-btn">Get Started</button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-section" id="home">
                <div className="hero-container">
                    <div className="hero-badge">
                        <span className="badge-pulse"></span>
                        🏆 ISO 13485 Certified Excellence
                    </div>
                    <h1 className="hero-title">
                        Pioneering the Future of <span className="highlight">Medical Technology</span>
                    </h1>
                    <p className="hero-subtitle">
                        Transforming healthcare delivery through innovative medical devices, advanced infrastructure solutions, and cutting-edge digital health platforms trusted by leading hospitals worldwide.
                    </p>
                    <div className="hero-actions">
                        <button className="btn btn-gradient">
                            Discover Our Solutions
                            <span className="arrow">→</span>
                        </button>
                        <button className="btn btn-outline">
                            <span className="play">▶</span>
                            Watch Demo
                        </button>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-box">
                            <div className="stat-number">1000+</div>
                            <div className="stat-label">Installations Worldwide</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-number">50+</div>
                            <div className="stat-label">Countries Served</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-number">99.9%</div>
                            <div className="stat-label">System Uptime</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="products-section" id="products">
                <div className="section-intro">
                    <span className="section-tag">Our Portfolio</span>
                    <h2 className="section-title">Comprehensive Medical Solutions</h2>
                    <p className="section-subtitle">Engineered for excellence in modern healthcare delivery</p>
                </div>

                <div className="products-grid">
                    <div className="product-card">
                        <div className="product-image-wrapper">
                            <img src="https://images.unsplash.com/photo-1581093804475-577d72e38aa0?w=800&h=500&fit=crop" alt="Modular OT" className="product-image" />
                            <div className="product-badge infrastructure">Infrastructure</div>
                        </div>
                        <div className="product-content">
                            <h3 className="product-title">Modular Operation Theaters</h3>
                            <p className="product-description">
                                Precision-engineered modular OT systems with advanced HVAC, medical gas pipelines, and integrated surgical equipment for optimal clinical performance.
                            </p>
                            <ul className="product-features">
                                <li>ISO Class 5 Cleanrooms</li>
                                <li>Advanced HVAC Systems</li>
                                <li>Medical Gas Pipelines</li>
                                <li>Integrated Equipment</li>
                            </ul>
                            <a href="#" className="product-link">Explore Details →</a>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="product-image-wrapper">
                            <img src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=500&fit=crop" alt="Patient Monitoring" className="product-image" />
                            <div className="product-badge devices">Medical Devices</div>
                        </div>
                        <div className="product-content">
                            <h3 className="product-title">Patient Monitoring Systems</h3>
                            <p className="product-description">
                                Real-time vital signs monitoring with wireless connectivity, cloud integration, and AI-powered predictive analytics for proactive patient care.
                            </p>
                            <ul className="product-features">
                                <li>Real-Time Monitoring</li>
                                <li>Cloud Integration</li>
                                <li>AI-Powered Analytics</li>
                                <li>Wireless Connectivity</li>
                            </ul>
                            <a href="#" className="product-link">Explore Details →</a>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="product-image-wrapper">
                            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop" alt="ICU Solutions" className="product-image" />
                            <div className="product-badge critical">Critical Care</div>
                        </div>
                        <div className="product-content">
                            <h3 className="product-title">ICU & NICU Solutions</h3>
                            <p className="product-description">
                                Complete critical care setups with advanced life support systems, environmental controls, and integrated monitoring for intensive patient management.
                            </p>
                            <ul className="product-features">
                                <li>Advanced Ventilators</li>
                                <li>Environmental Controls</li>
                                <li>Life Support Systems</li>
                                <li>Integrated Monitoring</li>
                            </ul>
                            <a href="#" className="product-link">Explore Details →</a>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="product-image-wrapper">
                            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop" alt="Surgical Equipment" className="product-image" />
                            <div className="product-badge surgical">Surgical Tech</div>
                        </div>
                        <div className="product-content">
                            <h3 className="product-title">Surgical Equipment Suite</h3>
                            <p className="product-description">
                                State-of-the-art surgical instruments, imaging systems, and robotic assistance platforms designed for precision and minimal invasiveness.
                            </p>
                            <ul className="product-features">
                                <li>Robotic Assistance</li>
                                <li>Imaging Systems</li>
                                <li>Precision Instruments</li>
                                <li>Minimal Invasive Tech</li>
                            </ul>
                            <a href="#" className="product-link">Explore Details →</a>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="product-image-wrapper">
                            <img src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&h=500&fit=crop" alt="Digital Health" className="product-image" />
                            <div className="product-badge digital">Digital Health</div>
                        </div>
                        <div className="product-content">
                            <h3 className="product-title">Telemedicine Platform</h3>
                            <p className="product-description">
                                Comprehensive telehealth solution with video consultations, remote diagnostics, EHR integration, and secure patient data management.
                            </p>
                            <ul className="product-features">
                                <li>Video Consultations</li>
                                <li>Remote Diagnostics</li>
                                <li>EHR Integration</li>
                                <li>Secure Data Management</li>
                            </ul>
                            <a href="#" className="product-link">Explore Details →</a>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="product-image-wrapper">
                            <img src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&h=500&fit=crop" alt="Diagnostic Systems" className="product-image" />
                            <div className="product-badge diagnostics">Diagnostics</div>
                        </div>
                        <div className="product-content">
                            <h3 className="product-title">Advanced Diagnostic Systems</h3>
                            <p className="product-description">
                                High-precision diagnostic equipment including imaging systems, laboratory automation, and point-of-care testing devices for accurate diagnosis.
                            </p>
                            <ul className="product-features">
                                <li>Imaging Systems</li>
                                <li>Lab Automation</li>
                                <li>Point-of-Care Testing</li>
                                <li>High Precision</li>
                            </ul>
                            <a href="#" className="product-link">Explore Details →</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Section */}
            <section className="technology-section" id="technology">
                <div className="tech-container">
                    <div className="tech-content">
                        <span className="section-tag">Innovation</span>
                        <h2>Cutting-Edge Medical Technology</h2>
                        <p>
                            Our solutions leverage the latest advancements in medical engineering, IoT, and artificial intelligence to deliver superior patient outcomes and operational efficiency.
                        </p>

                        <div className="tech-features">
                            <div className="tech-feature">
                                <div className="tech-icon">🔒</div>
                                <div className="tech-feature-content">
                                    <h4>FDA & EC Compliant</h4>
                                    <p>All products meet stringent regulatory standards for safety and efficacy in medical applications.</p>
                                </div>
                            </div>

                            <div className="tech-feature">
                                <div className="tech-icon">🌐</div>
                                <div className="tech-feature-content">
                                    <h4>IoT Integration</h4>
                                    <p>Seamless connectivity with hospital systems through DICOM, HL7, and modern API standards.</p>
                                </div>
                            </div>

                            <div className="tech-feature">
                                <div className="tech-icon">🤖</div>
                                <div className="tech-feature-content">
                                    <h4>AI-Powered Analytics</h4>
                                    <p>Machine learning algorithms for predictive diagnostics and treatment optimization.</p>
                                </div>
                            </div>

                            <div className="tech-feature">
                                <div className="tech-icon">⚡</div>
                                <div className="tech-feature-content">
                                    <h4>Real-Time Monitoring</h4>
                                    <p>Continuous patient data streaming with instant alerts for critical parameter changes.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tech-visual">
                        <img src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=600&fit=crop" alt="Medical Technology" />
                        <div className="tech-overlay">
                            <div className="tech-stat">
                                <strong>AI-Powered</strong>
                                <span>Predictive Analytics</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="process-section">
                <div className="section-intro">
                    <span className="section-tag">Our Process</span>
                    <h2 className="section-title">From Concept to Deployment</h2>
                    <p className="section-subtitle">A proven methodology for delivering excellence</p>
                </div>

                <div className="process-grid">
                    <div className="process-step">
                        <div className="step-number">01</div>
                        <h3>Consultation & Analysis</h3>
                        <p>Understanding your unique requirements and clinical workflows to design the perfect solution.</p>
                    </div>
                    <div className="process-step">
                        <div className="step-number">02</div>
                        <h3>Design & Planning</h3>
                        <p>Creating detailed blueprints and specifications with regulatory compliance at the forefront.</p>
                    </div>
                    <div className="process-step">
                        <div className="step-number">03</div>
                        <h3>Development & Testing</h3>
                        <p>Building and rigorously testing every component to ensure safety and reliability.</p>
                    </div>
                    <div className="process-step">
                        <div className="step-number">04</div>
                        <h3>Installation & Training</h3>
                        <p>Seamless deployment with comprehensive training for your medical staff.</p>
                    </div>
                    <div className="process-step">
                        <div className="step-number">05</div>
                        <h3>Support & Maintenance</h3>
                        <p>24/7 technical support and preventive maintenance to ensure uninterrupted operations.</p>
                    </div>
                    <div className="process-step">
                        <div className="step-number">06</div>
                        <h3>Continuous Improvement</h3>
                        <p>Regular updates and enhancements based on feedback and technological advancements.</p>
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="certifications">
                <div className="section-intro">
                    <span className="section-tag">Quality Assurance</span>
                    <h2 className="section-title">Certifications & Standards</h2>
                    <p className="section-subtitle">Committed to the highest quality and safety standards</p>
                </div>

                <div className="cert-grid">
                    <div className="cert-item">
                        <div className="cert-icon">✓</div>
                        <div className="cert-name">ISO 13485</div>
                        <p>Medical Device Quality Management</p>
                    </div>
                    <div className="cert-item">
                        <div className="cert-icon">✓</div>
                        <div className="cert-name">FDA Approved</div>
                        <p>US Food & Drug Administration</p>
                    </div>
                    <div className="cert-item">
                        <div className="cert-icon">✓</div>
                        <div className="cert-name">EC Certified</div>
                        <p>European Conformity</p>
                    </div>
                    <div className="cert-item">
                        <div className="cert-icon">✓</div>
                        <div className="cert-name">CE Marking</div>
                        <p>European Health & Safety</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to Transform Your Healthcare Facility?</h2>
                    <p>Partner with us to bring world-class medical infrastructure and technology solutions to your institution</p>
                    <div className="cta-buttons">
                        <button className="btn-gradient-large">Schedule Consultation</button>
                        <button className="btn-outline-large">Download Brochure</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-grid">
                        <div className="footer-col">
                            <div className="footer-brand">
                                <span className="brand-icon">🏥</span>
                                <span className="brand-text">Altair <strong>Medical Systems</strong></span>
                            </div>
                            <p>Advancing healthcare through innovation and cutting-edge medical technology solutions.</p>
                        </div>
                        <div className="footer-col">
                            <h4>Solutions</h4>
                            <ul>
                                <li><a href="#">Modular OT</a></li>
                                <li><a href="#">Medical Devices</a></li>
                                <li><a href="#">ICU Solutions</a></li>
                                <li><a href="#">Digital Health</a></li>
                                <li><a href="#">Diagnostics</a></li>
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
                            <h4>Resources</h4>
                            <ul>
                                <li><a href="#">Documentation</a></li>
                                <li><a href="#">Support</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Case Studies</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 Altair Medical Systems. Advancing Healthcare Through Innovation.</p>
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
