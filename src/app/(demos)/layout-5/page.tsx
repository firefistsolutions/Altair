import React from 'react'
import './styles.css'

export default function Layout5() {
    return (
        <div className="layout-5">
            {/* Animated Background */}
            <div className="cyber-background">
                <div className="grid-overlay"></div>
                <div className="particles"></div>
            </div>

            {/* Navigation */}
            <nav className="cyber-nav">
                <div className="nav-content">
                    <div className="cyber-logo">
                        <span className="logo-hex">⬡</span>
                        <span className="logo-text">ALTAIR <span className="neon-text">MEDICAL</span></span>
                    </div>
                    <ul className="cyber-menu">
                        <li><a href="#home">HOME</a></li>
                        <li><a href="#systems">SYSTEMS</a></li>
                        <li><a href="#tech">TECHNOLOGY</a></li>
                        <li><a href="#data">DATA</a></li>
                        <li><a href="#contact">CONTACT</a></li>
                    </ul>
                    <button className="cyber-btn">ACCESS PORTAL</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="cyber-hero" id="home">
                <div className="hero-split">
                    <div className="hero-left">
                        <div className="status-badge">
                            <span className="pulse-dot"></span>
                            SYSTEM ONLINE • ISO 13485 CERTIFIED
                        </div>
                        <h1 className="glitch-text" data-text="NEXT-GEN MEDICAL INFRASTRUCTURE">
                            NEXT-GEN MEDICAL INFRASTRUCTURE
                        </h1>
                        <p className="hero-desc">
                            Pioneering the future of healthcare with AI-powered medical systems,
                            quantum-encrypted data management, and revolutionary modular infrastructure
                            designed for the hospitals of tomorrow.
                        </p>
                        <div className="hero-actions">
                            <button className="neon-btn primary">
                                <span>EXPLORE SYSTEMS</span>
                                <span className="btn-glow"></span>
                            </button>
                            <button className="neon-btn secondary">
                                <span className="play-icon">▶</span>
                                <span>WATCH DEMO</span>
                            </button>
                        </div>
                        <div className="hero-metrics">
                            <div className="metric-box">
                                <div className="metric-value">1000+</div>
                                <div className="metric-label">ACTIVE INSTALLATIONS</div>
                                <div className="metric-bar"></div>
                            </div>
                            <div className="metric-box">
                                <div className="metric-value">50+</div>
                                <div className="metric-label">COUNTRIES DEPLOYED</div>
                                <div className="metric-bar"></div>
                            </div>
                            <div className="metric-box">
                                <div className="metric-value">99.9%</div>
                                <div className="metric-label">SYSTEM UPTIME</div>
                                <div className="metric-bar"></div>
                            </div>
                        </div>
                    </div>
                    <div className="hero-right">
                        <div className="hologram-container">
                            <div className="hologram-frame">
                                <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=900&fit=crop" alt="Medical Technology" />
                                <div className="scan-line"></div>
                                <div className="holo-overlay"></div>
                            </div>
                            <div className="floating-data data-1">
                                <div className="data-icon">⚡</div>
                                <div className="data-info">
                                    <strong>REAL-TIME SYNC</strong>
                                    <span>Cloud Integration</span>
                                </div>
                            </div>
                            <div className="floating-data data-2">
                                <div className="data-icon">🔒</div>
                                <div className="data-info">
                                    <strong>QUANTUM SECURE</strong>
                                    <span>256-bit Encryption</span>
                                </div>
                            </div>
                            <div className="floating-data data-3">
                                <div className="data-icon">🤖</div>
                                <div className="data-info">
                                    <strong>AI POWERED</strong>
                                    <span>Predictive Analytics</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Systems Grid */}
            <section className="systems-section" id="systems">
                <div className="section-header">
                    <span className="section-tag">CORE SYSTEMS</span>
                    <h2>ADVANCED MEDICAL INFRASTRUCTURE</h2>
                    <p>Cutting-edge solutions engineered for precision healthcare delivery</p>
                </div>

                <div className="systems-grid">
                    <div className="system-card hex-card">
                        <div className="card-border"></div>
                        <div className="card-glow"></div>
                        <div className="hex-icon">⬡</div>
                        <h3>MODULAR OT SYSTEMS</h3>
                        <p>Next-generation operating theaters with ISO Class 5 cleanroom technology, integrated HVAC, and smart surgical equipment.</p>
                        <ul className="system-specs">
                            <li><span className="spec-dot"></span>ISO Class 5 Cleanrooms</li>
                            <li><span className="spec-dot"></span>Smart HVAC Integration</li>
                            <li><span className="spec-dot"></span>Medical Gas Networks</li>
                            <li><span className="spec-dot"></span>AI-Powered Monitoring</li>
                        </ul>
                        <a href="#" className="system-link">
                            ACCESS MODULE <span className="arrow">→</span>
                        </a>
                    </div>

                    <div className="system-card hex-card">
                        <div className="card-border"></div>
                        <div className="card-glow"></div>
                        <div className="hex-icon">⬡</div>
                        <h3>QUANTUM DIAGNOSTICS</h3>
                        <p>FDA-approved diagnostic systems with quantum computing integration for unprecedented accuracy and speed.</p>
                        <ul className="system-specs">
                            <li><span className="spec-dot"></span>Quantum Processing</li>
                            <li><span className="spec-dot"></span>Real-Time Analysis</li>
                            <li><span className="spec-dot"></span>Cloud Synchronization</li>
                            <li><span className="spec-dot"></span>FDA Certified</li>
                        </ul>
                        <a href="#" className="system-link">
                            ACCESS MODULE <span className="arrow">→</span>
                        </a>
                    </div>

                    <div className="system-card hex-card">
                        <div className="card-border"></div>
                        <div className="card-glow"></div>
                        <div className="hex-icon">⬡</div>
                        <h3>CRITICAL CARE MATRIX</h3>
                        <p>Advanced ICU infrastructure with AI-driven patient monitoring and automated life support systems.</p>
                        <ul className="system-specs">
                            <li><span className="spec-dot"></span>AI Patient Monitoring</li>
                            <li><span className="spec-dot"></span>Automated Life Support</li>
                            <li><span className="spec-dot"></span>Environmental Control</li>
                            <li><span className="spec-dot"></span>Emergency Protocols</li>
                        </ul>
                        <a href="#" className="system-link">
                            ACCESS MODULE <span className="arrow">→</span>
                        </a>
                    </div>

                    <div className="system-card hex-card">
                        <div className="card-border"></div>
                        <div className="card-glow"></div>
                        <div className="hex-icon">⬡</div>
                        <h3>NEURAL NETWORK HIS</h3>
                        <p>AI-powered Hospital Information System with blockchain-secured patient records and predictive analytics.</p>
                        <ul className="system-specs">
                            <li><span className="spec-dot"></span>Blockchain Security</li>
                            <li><span className="spec-dot"></span>Neural Networks</li>
                            <li><span className="spec-dot"></span>DICOM & HL7</li>
                            <li><span className="spec-dot"></span>Predictive Analytics</li>
                        </ul>
                        <a href="#" className="system-link">
                            ACCESS MODULE <span className="arrow">→</span>
                        </a>
                    </div>

                    <div className="system-card hex-card">
                        <div className="card-border"></div>
                        <div className="card-glow"></div>
                        <div className="hex-icon">⬡</div>
                        <h3>BIOMETRIC MONITORING</h3>
                        <p>Advanced patient monitoring with biometric sensors, wireless connectivity, and real-time data streaming.</p>
                        <ul className="system-specs">
                            <li><span className="spec-dot"></span>Biometric Sensors</li>
                            <li><span className="spec-dot"></span>Wireless Connectivity</li>
                            <li><span className="spec-dot"></span>Real-Time Streaming</li>
                            <li><span className="spec-dot"></span>Alert Systems</li>
                        </ul>
                        <a href="#" className="system-link">
                            ACCESS MODULE <span className="arrow">→</span>
                        </a>
                    </div>

                    <div className="system-card hex-card">
                        <div className="card-border"></div>
                        <div className="card-glow"></div>
                        <div className="hex-icon">⬡</div>
                        <h3>TELEMEDICINE NEXUS</h3>
                        <p>Next-gen telemedicine platform with holographic consultations and remote surgical assistance.</p>
                        <ul className="system-specs">
                            <li><span className="spec-dot"></span>Holographic Display</li>
                            <li><span className="spec-dot"></span>Remote Surgery</li>
                            <li><span className="spec-dot"></span>5G Connectivity</li>
                            <li><span className="spec-dot"></span>AR Integration</li>
                        </ul>
                        <a href="#" className="system-link">
                            ACCESS MODULE <span className="arrow">→</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Technology Showcase */}
            <section className="tech-showcase" id="tech">
                <div className="tech-container">
                    <div className="tech-visual">
                        <div className="tech-frame">
                            <img src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=900&h=700&fit=crop" alt="Technology" />
                            <div className="tech-scan"></div>
                        </div>
                    </div>
                    <div className="tech-content">
                        <span className="section-tag">CORE TECHNOLOGY</span>
                        <h2>POWERED BY INNOVATION</h2>
                        <p>Our systems leverage cutting-edge technology to deliver unprecedented performance and reliability in healthcare environments.</p>

                        <div className="tech-features">
                            <div className="tech-item">
                                <div className="tech-hex">⬡</div>
                                <div className="tech-text">
                                    <h4>QUANTUM ENCRYPTION</h4>
                                    <p>Military-grade security with quantum-resistant encryption protocols protecting sensitive patient data.</p>
                                </div>
                            </div>
                            <div className="tech-item">
                                <div className="tech-hex">⬡</div>
                                <div className="tech-text">
                                    <h4>AI NEURAL NETWORKS</h4>
                                    <p>Deep learning algorithms for predictive diagnostics and automated treatment recommendations.</p>
                                </div>
                            </div>
                            <div className="tech-item">
                                <div className="tech-hex">⬡</div>
                                <div className="tech-text">
                                    <h4>EDGE COMPUTING</h4>
                                    <p>Real-time processing at the edge for instant response times in critical care situations.</p>
                                </div>
                            </div>
                            <div className="tech-item">
                                <div className="tech-hex">⬡</div>
                                <div className="tech-text">
                                    <h4>BLOCKCHAIN LEDGER</h4>
                                    <p>Immutable medical records with distributed ledger technology ensuring data integrity.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Visualization */}
            <section className="data-section" id="data">
                <div className="data-header">
                    <span className="section-tag">PERFORMANCE METRICS</span>
                    <h2>REAL-TIME SYSTEM STATUS</h2>
                </div>

                <div className="data-grid">
                    <div className="data-card">
                        <div className="data-visual">
                            <div className="circular-progress">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" className="progress-bg"></circle>
                                    <circle cx="50" cy="50" r="45" className="progress-bar" style={{ strokeDashoffset: 18 }}></circle>
                                </svg>
                                <div className="progress-value">99.9%</div>
                            </div>
                        </div>
                        <h3>SYSTEM UPTIME</h3>
                        <p>Continuous operation across all deployed systems</p>
                    </div>

                    <div className="data-card">
                        <div className="data-visual">
                            <div className="circular-progress">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" className="progress-bg"></circle>
                                    <circle cx="50" cy="50" r="45" className="progress-bar" style={{ strokeDashoffset: 0 }}></circle>
                                </svg>
                                <div className="progress-value">100%</div>
                            </div>
                        </div>
                        <h3>COMPLIANCE RATE</h3>
                        <p>FDA, EC, and ISO 13485 certified excellence</p>
                    </div>

                    <div className="data-card">
                        <div className="data-visual">
                            <div className="circular-progress">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" className="progress-bg"></circle>
                                    <circle cx="50" cy="50" r="45" className="progress-bar" style={{ strokeDashoffset: 56 }}></circle>
                                </svg>
                                <div className="progress-value">1000+</div>
                            </div>
                        </div>
                        <h3>GLOBAL DEPLOYMENTS</h3>
                        <p>Healthcare facilities across 50+ countries</p>
                    </div>

                    <div className="data-card">
                        <div className="data-visual">
                            <div className="circular-progress">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" className="progress-bg"></circle>
                                    <circle cx="50" cy="50" r="45" className="progress-bar" style={{ strokeDashoffset: 70 }}></circle>
                                </svg>
                                <div className="progress-value">24/7</div>
                            </div>
                        </div>
                        <h3>SUPPORT NETWORK</h3>
                        <p>Round-the-clock technical assistance worldwide</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="cyber-testimonials">
                <div className="testimonials-header">
                    <span className="section-tag">CLIENT FEEDBACK</span>
                    <h2>TRUSTED BY HEALTHCARE LEADERS</h2>
                </div>

                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <div className="card-border"></div>
                        <div className="quote-icon">&ldquo;</div>
                        <p className="testimonial-text">The modular OT system has revolutionized our surgical department. The precision engineering and AI integration are exceptional.</p>
                        <div className="testimonial-footer">
                            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop" alt="Dr. Sarah Johnson" />
                            <div className="author-info">
                                <strong>Dr. Sarah Johnson</strong>
                                <span>Chief Surgeon, Metro Hospital</span>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card">
                        <div className="card-border"></div>
                        <div className="quote-icon">&ldquo;</div>
                        <p className="testimonial-text">Outstanding reliability and support. The quantum diagnostic systems have significantly improved our diagnostic accuracy.</p>
                        <div className="testimonial-footer">
                            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop" alt="Dr. Michael Chen" />
                            <div className="author-info">
                                <strong>Dr. Michael Chen</strong>
                                <span>Director, City Medical Center</span>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card">
                        <div className="card-border"></div>
                        <div className="quote-icon">&ldquo;</div>
                        <p className="testimonial-text">From planning to deployment, the team demonstrated exceptional expertise. Our new ICU is truly world-class.</p>
                        <div className="testimonial-footer">
                            <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop" alt="Dr. Priya Sharma" />
                            <div className="author-info">
                                <strong>Dr. Priya Sharma</strong>
                                <span>Head of Critical Care, Regional Hospital</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cyber-cta" id="contact">
                <div className="cta-container">
                    <div className="cta-glow"></div>
                    <h2>READY TO UPGRADE YOUR FACILITY?</h2>
                    <p>Join the future of healthcare with our next-generation medical infrastructure solutions</p>
                    <div className="cta-buttons">
                        <button className="neon-btn primary large">
                            <span>SCHEDULE CONSULTATION</span>
                            <span className="btn-glow"></span>
                        </button>
                        <button className="neon-btn secondary large">
                            <span>DOWNLOAD SPECS</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="cyber-footer">
                <div className="footer-content">
                    <div className="footer-grid">
                        <div className="footer-col">
                            <div className="footer-logo">
                                <span className="logo-hex">⬡</span>
                                <span className="logo-text">ALTAIR <span className="neon-text">MEDICAL</span></span>
                            </div>
                            <p>Pioneering the future of healthcare infrastructure with cutting-edge technology and innovation.</p>
                        </div>
                        <div className="footer-col">
                            <h4>SYSTEMS</h4>
                            <ul>
                                <li><a href="#">Modular OT</a></li>
                                <li><a href="#">Quantum Diagnostics</a></li>
                                <li><a href="#">Critical Care</a></li>
                                <li><a href="#">Neural Network HIS</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>COMPANY</h4>
                            <ul>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Partners</a></li>
                                <li><a href="#">Support</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>CONTACT</h4>
                            <ul>
                                <li>contact@altairmedical.com</li>
                                <li>+1 (555) QUANTUM</li>
                                <li>24/7 Support Available</li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 Altair Medical Systems. All rights reserved.</p>
                        <div className="footer-links">
                            <a href="#">Privacy</a>
                            <a href="#">Terms</a>
                            <a href="#">Security</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
