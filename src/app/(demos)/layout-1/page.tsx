import React from 'react'
import './styles.css'

export default function Layout1() {
  return (
    <div className="layout-1">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">⚕</span>
            <span>Altair <strong>Medical Systems</strong></span>
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#solutions">Solutions</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button className="nav-btn">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              ISO 13485 Certified Excellence
            </div>
            <h1>Advanced Healthcare Solutions for Modern Medicine</h1>
            <p>Delivering cutting-edge medical technology and comprehensive healthcare infrastructure solutions that transform patient care and clinical outcomes across the globe.</p>
            <div className="cta-buttons">
              <button className="btn-primary">
                Explore Solutions
                <span className="btn-arrow">→</span>
              </button>
              <button className="btn-secondary">
                <span className="play-icon">▶</span>
                Watch Demo
              </button>
            </div>
            <div className="hero-metrics">
              <div className="metric">
                <strong>1000+</strong>
                <span>Installations</span>
              </div>
              <div className="metric">
                <strong>50+</strong>
                <span>Countries</span>
              </div>
              <div className="metric">
                <strong>24/7</strong>
                <span>Support</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-wrapper">
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop" alt="Healthcare Technology" />
              <div className="floating-card card-1">
                <div className="card-icon">💊</div>
                <div className="card-info">
                  <strong>Smart Monitoring</strong>
                  <span>Real-time patient data</span>
                </div>
              </div>
              <div className="floating-card card-2">
                <div className="card-icon">🏥</div>
                <div className="card-info">
                  <strong>Modular OT</strong>
                  <span>Advanced infrastructure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-section">
        <div className="trust-container">
          <p className="trust-title">Trusted by Leading Healthcare Institutions</p>
          <div className="trust-logos">
            <div className="trust-logo">Apollo Hospitals</div>
            <div className="trust-logo">Fortis Healthcare</div>
            <div className="trust-logo">Max Healthcare</div>
            <div className="trust-logo">Medanta</div>
            <div className="trust-logo">AIIMS</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <span className="section-label">Our Capabilities</span>
          <h2>Comprehensive Healthcare Solutions</h2>
          <p>Designed to meet the highest standards of medical excellence and clinical performance</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏥</div>
            <h3>Modular Operation Theaters</h3>
            <p>State-of-the-art modular OT solutions with precision engineering, ensuring sterile environments and optimal surgical workflows for critical procedures.</p>
            <ul className="feature-list">
              <li>ISO Class 5 Cleanrooms</li>
              <li>Advanced HVAC Systems</li>
              <li>Medical Gas Pipelines</li>
              <li>Integrated Surgical Equipment</li>
            </ul>
            <a href="#" className="feature-link">Learn More →</a>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔬</div>
            <h3>Medical Device Integration</h3>
            <p>Seamless integration of advanced medical devices with hospital systems, ensuring real-time data management and enhanced patient monitoring capabilities.</p>
            <ul className="feature-list">
              <li>IoT-Enabled Devices</li>
              <li>Cloud Data Sync</li>
              <li>AI-Powered Analytics</li>
              <li>DICOM & HL7 Standards</li>
            </ul>
            <a href="#" className="feature-link">Learn More →</a>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚕️</div>
            <h3>Critical Care Infrastructure</h3>
            <p>Complete ICU and NICU setups with advanced life support systems, designed to provide the highest level of patient care in critical situations.</p>
            <ul className="feature-list">
              <li>Advanced Ventilator Systems</li>
              <li>Patient Monitoring Hubs</li>
              <li>Environmental Controls</li>
              <li>Emergency Response Systems</li>
            </ul>
            <a href="#" className="feature-link">Learn More →</a>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Healthcare IT Solutions</h3>
            <p>Comprehensive digital health platforms including DICOM, HL7 integration, and telemedicine capabilities for connected healthcare delivery.</p>
            <ul className="feature-list">
              <li>Electronic Health Records</li>
              <li>Telemedicine Platforms</li>
              <li>Hospital Information Systems</li>
              <li>Data Analytics Dashboards</li>
            </ul>
            <a href="#" className="feature-link">Learn More →</a>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Safety & Compliance</h3>
            <p>ISO 13485 certified processes ensuring FDA and EC approval standards, with rigorous quality management and risk assessment protocols.</p>
            <ul className="feature-list">
              <li>FDA Approved Devices</li>
              <li>EC Certification</li>
              <li>Quality Management Systems</li>
              <li>Risk Assessment Protocols</li>
            </ul>
            <a href="#" className="feature-link">Learn More →</a>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔧</div>
            <h3>Maintenance & Support</h3>
            <p>24/7 technical support and preventive maintenance services to ensure uninterrupted operation of critical medical infrastructure and equipment.</p>
            <ul className="feature-list">
              <li>24/7 Technical Support</li>
              <li>Preventive Maintenance</li>
              <li>Spare Parts Management</li>
              <li>Annual Maintenance Contracts</li>
            </ul>
            <a href="#" className="feature-link">Learn More →</a>
          </div>
        </div>
      </section>

      {/* Solutions Showcase */}
      <section className="solutions-showcase" id="solutions">
        <div className="solutions-header">
          <span className="section-label">Our Solutions</span>
          <h2>End-to-End Healthcare Infrastructure</h2>
        </div>
        <div className="solutions-grid">
          <div className="solution-item">
            <div className="solution-image">
              <img src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&h=600&fit=crop" alt="Medical Development" />
              <div className="solution-overlay">
                <span className="solution-tag">Development</span>
              </div>
            </div>
            <div className="solution-content">
              <h3>Full Lifecycle Development</h3>
              <p>From initial concept and prototype development to fully validated and verified medical products ready for market deployment. Our comprehensive approach ensures regulatory compliance and clinical excellence.</p>
              <ul className="solution-features">
                <li>Concept design and feasibility studies</li>
                <li>Prototype development and testing</li>
                <li>Regulatory compliance and documentation</li>
                <li>Product validation and verification</li>
                <li>Market launch support and training</li>
              </ul>
              <button className="btn-outline">Explore Service</button>
            </div>
          </div>

          <div className="solution-item reverse">
            <div className="solution-image">
              <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop" alt="Operating Theater" />
              <div className="solution-overlay">
                <span className="solution-tag">Infrastructure</span>
              </div>
            </div>
            <div className="solution-content">
              <h3>Modular Infrastructure Solutions</h3>
              <p>Precision-engineered modular operation theaters and critical care environments meeting stringent clinical and hygiene standards. Turnkey solutions from design to commissioning.</p>
              <ul className="solution-features">
                <li>Custom modular OT design and installation</li>
                <li>HVAC and air filtration systems</li>
                <li>Medical gas pipeline systems</li>
                <li>Surgical lighting and equipment integration</li>
                <li>Cleanroom technology implementation</li>
              </ul>
              <button className="btn-outline">Explore Service</button>
            </div>
          </div>

          <div className="solution-item">
            <div className="solution-image">
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop" alt="Healthcare IT" />
              <div className="solution-overlay">
                <span className="solution-tag">Digital Health</span>
              </div>
            </div>
            <div className="solution-content">
              <h3>Clinical Data Management</h3>
              <p>Advanced healthcare IT solutions for seamless data integration, patient monitoring, and telemedicine capabilities. Empowering healthcare providers with actionable insights.</p>
              <ul className="solution-features">
                <li>DICOM and HL7 integration</li>
                <li>Electronic health records (EHR) systems</li>
                <li>Telemedicine platform development</li>
                <li>Wireless patient data interfaces</li>
                <li>Real-time monitoring dashboards</li>
              </ul>
              <button className="btn-outline">Explore Service</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-content">
          <div className="stats-text">
            <h2>Delivering Excellence Across the Globe</h2>
            <p>Our commitment to quality and innovation has made us a trusted partner for healthcare institutions worldwide.</p>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Healthcare Facilities Served</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Medical Devices Developed</p>
            </div>
            <div className="stat-item">
              <h3>15+</h3>
              <p>Years of Excellence</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Compliance Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="testimonials-header">
          <span className="section-label">Client Success</span>
          <h2>What Healthcare Leaders Say</h2>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">The modular OT system has completely transformed our surgical department. The precision engineering and attention to sterile protocols are exceptional. Our surgical outcomes have improved significantly.</p>
            <div className="testimonial-author">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop" alt="Dr. Sarah Johnson" />
              <div className="author-info">
                <strong>Dr. Sarah Johnson</strong>
                <span>Chief Surgeon, Metro Hospital</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">Outstanding support and reliability. Their medical devices have significantly improved our patient monitoring capabilities. The real-time data integration is seamless and has enhanced our clinical decision-making.</p>
            <div className="testimonial-author">
              <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop" alt="Dr. Michael Chen" />
              <div className="author-info">
                <strong>Dr. Michael Chen</strong>
                <span>Director, City Medical Center</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">From planning to installation, the team demonstrated exceptional expertise. Our new ICU is world-class and meets all international standards. The project was delivered on time and within budget.</p>
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

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Healthcare Facility?</h2>
          <p>Partner with us to bring world-class medical infrastructure and technology solutions to your institution</p>
          <div className="cta-actions">
            <button className="btn-primary-large">Schedule Consultation</button>
            <button className="btn-secondary-large">Download Brochure</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                <span className="logo-icon">⚕</span>
                <span>Altair <strong>Medical Systems</strong></span>
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
                <li>+1 (555) 123-4567</li>
                <li>24/7 Support Available</li>
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
