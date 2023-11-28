import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import "./footer.styles.scss";

class Footer extends React.Component {
    render() {
        const { language } = this.props;
        return (
            <Container className="footer-container">
                <Row>
                    <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} className="text-center">
                        <p className="footer-text dis-title">
                            {language === 'English' && 'Disclaimer'}
                            {language === 'German' && 'Haftungsausschluss'}
                            {language === 'Croatian' && 'Odricanje odgovornosti'}
                        </p>
                        <p className="disclamer">
                            {language === 'English' && 'The information provided on SwissCosts is intended to serve as a general overview and rough estimate of living costs in Switzerland. We strive to provide accurate and up-to-date data, however, we make no guarantees or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the information, products, services, or related graphics contained on the site.'}
                            {language === 'German' && 'Die auf SwissCosts bereitgestellten Informationen dienen dazu, einen allgemeinen Überblick und eine grobe Schätzung der Lebenshaltungskosten in der Schweiz zu geben. Wir bemühen uns, genaue und aktuelle Daten bereitzustellen, jedoch übernehmen wir keine Garantien oder Gewährleistungen jeglicher Art, ausdrücklich oder stillschweigend, hinsichtlich der Vollständigkeit, Genauigkeit, Zuverlässigkeit, Eignung oder Verfügbarkeit in Bezug auf die auf der Website enthaltenen Informationen, Produkte, Dienstleistungen oder zugehörige Grafiken.'}
                            {language === 'Croatian' && 'Informacije pružene na SwissCosts namijenjene su pružanju općeg pregleda i grubih procjena troškova života u Švicarskoj. Trudimo se pružiti točne i ažurirane podatke, međutim, ne dajemo nikakva jamstva ili garancije bilo koje vrste, izričite ili implicirane, o potpunosti, točnosti, pouzdanosti, prikladnosti ili dostupnosti u vezi s informacijama, proizvodima, uslugama ili povezanim grafikama sadržanim na stranici.'}
                        </p>
                        <p className="disclamer">
                            {language === 'English' && 'The information is subject to change based on varying factors and may not reflect the actual living costs you may incur. Before making any decisions or commitments based on the information provided here, we strongly recommend conducting a detailed personal financial analysis or consulting with a professional. Use of this website is at your own risk, and we will not be held liable for any discrepancies or misunderstandings arising from the information presented here.'}
                            {language === 'German' && 'Die Informationen können sich je nach verschiedenen Faktoren ändern und spiegeln möglicherweise nicht die tatsächlichen Lebenshaltungskosten wider, die Ihnen entstehen könnten. Bevor Sie Entscheidungen treffen oder Verpflichtungen aufgrund der hier bereitgestellten Informationen eingehen, empfehlen wir dringend, eine detaillierte persönliche Finanzanalyse durchzuführen oder sich von einem Fachmann beraten zu lassen. Die Nutzung dieser Website erfolgt auf eigenes Risiko, und wir übernehmen keine Haftung für Diskrepanzen oder Missverständnisse, die aus den hier präsentierten Informationen entstehen.'}
                            {language === 'Croatian' && 'Informacije se mogu mijenjati na temelju različitih čimbenika i možda neće odražavati stvarne troškove života koje biste mogli imati. Prije donošenja bilo kakvih odluka ili obveza na temelju ovdje pruženih informacija, snažno preporučujemo da provedete detaljnu osobnu financijsku analizu ili se konzultirate s profesionalcem. Korištenje ove web stranice je na vlastitu odgovornost, i nećemo biti odgovorni za bilo kakve nesuglasice ili nesporazume koji proizlaze iz ovdje prezentiranih informacija.'}
                        </p>

                        <p className="footer-text right">
                            © 2023 Dino Smuc, SwissCosts,
                            {language === 'English' && 'All Right Reserved.'}
                            {language === 'German' && 'Alle Rechte vorbehalten.'}
                            {language === 'Croatian' && 'Sva prava pridržana.'}
                        </p>

                        {/* Social icons remain the same */}
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

                        <p className="footer-text open">
                            {language === 'English' && (
                                <>
                                    Developed by Dino Smuc, passionate about creating user-friendly digital solutions. Open for opportunities. Contact me at <a href="mailto:dino.smuc@gmail.com">dino.smuc@gmail.com</a> or connect with me on <a href="https://www.linkedin.com/in/dino-smuc-030b77195/" target="_blank" rel="noopener noreferrer">LinkedIn</a>, <a href="https://www.facebook.com/dino.smuc/" target="_blank" rel="noopener noreferrer">Facebook</a>, or <a href="https://github.com/dinosmuc" target="_blank" rel="noopener noreferrer">GitHub</a>.
                                </>
                            )}
                            {language === 'German' && (
                                <>
                                    Entwickelt von Dino Smuc, leidenschaftlich daran interessiert, benutzerfreundliche digitale Lösungen zu erstellen. Offen für Möglichkeiten. Kontaktieren Sie mich unter <a href="mailto:dino.smuc@gmail.com">dino.smuc@gmail.com</a> oder vernetzen Sie sich mit mir auf <a href="https://www.linkedin.com/in/dino-smuc-030b77195/" target="_blank" rel="noopener noreferrer">LinkedIn</a>, <a href="https://www.facebook.com/dino.smuc/" target="_blank" rel="noopener noreferrer">Facebook</a>, oder <a href="https://github.com/dinosmuc" target="_blank" rel="noopener noreferrer">GitHub</a>.
                                </>
                            )}
                            {language === 'Croatian' && (
                                <>
                                    Razvijeno od strane Dino Smuca, strastvenog u stvaranju korisnički prijateljskih digitalnih rješenja. Otvoren za prilike. Kontaktirajte me na <a href="mailto:dino.smuc@gmail.com">dino.smuc@gmail.com</a> ili se povežite sa mnom na <a href="https://www.linkedin.com/in/dino-smuc-030b77195/" target="_blank" rel="noopener noreferrer">LinkedInu</a>, <a href="https://www.facebook.com/dino.smuc/" target="_blank" rel="noopener noreferrer">Facebooku</a>, ili <a href="https://github.com/dinosmuc" target="_blank" rel="noopener noreferrer">GitHubu</a>.
                                </>
                            )}
                        </p>

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Footer;
