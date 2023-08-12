import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import "./footer.styles.scss";

class Footer extends React.Component {
    render() {
        return (
            
                <Container className="footer-container">
                    <Row>
                        <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} className="text-center">
                            <p className="footer-text dis-title">Disclaimer</p>
                            <p className="disclamer">The information provided on SwissCosts is intended to serve as a general overview and rough estimate of living costs in Switzerland. We strive to provide accurate and up-to-date data; however, we make no guarantees or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the information, products, services, or related graphics contained on the site.</p>
                            <p className="disclamer">The information is subject to change based on varying factors and may not reflect the actual living costs you may incur. Before making any decisions or commitments based on the information provided here, we strongly recommend conducting a detailed personal financial analysis or consulting with a professional. Use of this website is at your own risk, and we will not be held liable for any discrepancies or misunderstandings arising from the information presented here.</p>
                            <p className="footer-text right" >© 2023 Dino Smuc, SwissCosts, All Right Reserved.</p>
                            <div>
                                <a href="https://www.facebook.com/dino.smuc/" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook className="mx-2" size={60} style={{ color: '#4267B2' }} />
                                </a>
                                <a href="https://github.com/dinosmuc" target="_blank" rel="noopener noreferrer">
                                    <FaGithub className="mx-2" size={60} style={{ color: '#000000' }} />
                                </a>
                                <a href="https://www.linkedin.com/in/dino-smuc-030b77195/" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="mx-2" size={60} style={{ color: '#0E76A8' }} />
                                </a>
                            </div>
                            <p className="footer-text open">Developed by Dino Smuc, passionate about creating user-friendly digital solutions. Open for opportunities. Contact me at <a href="mailto:dino.smuc@gmail.com">dino.smuc@gmail.com</a> or connect with me on <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>
                        </Col>
                    </Row>
                </Container>
            
        );
    }
}

export default Footer;
