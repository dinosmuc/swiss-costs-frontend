import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

import { API_BASE_URL } from '../../../../config';


const translations = {
    English: {
        label: "Phone Plan",
        options: {
            none: 'None',
            basic: 'Basic',
            standard: 'Standard',
            premium: 'Premium',
        },
        tooltips: {
            none: 'No phone plan selected.',
            basic: 'The Basic plan is tailored for minimal usage, offering essential features like voice calling and SMS, along with limited data. Suitable for those who mainly use their phone for calls and texts within Switzerland.',
            standard: 'The Standard plan is designed for average users, providing a balanced mix of voice calling, SMS, and data. It includes roaming options and caters to those who need regular internet access for apps and browsing.',
            premium: 'The Premium plan is aimed at heavy users, with generous allowances for voice calling, SMS, and high-speed data. Including international roaming and additional services, it\'s ideal for business users and frequent travelers.',
        }
    },
    German: {
        label: "Telefonplan",
        options: {
            none: 'Keiner',
            basic: 'Basis',
            standard: 'Standard',
            premium: 'Premium',
        },
        tooltips: {
            none: 'Kein Telefonplan ausgewählt.',
            basic: 'Der Basis-Tarif ist für minimale Nutzung maßgeschneidert und bietet grundlegende Funktionen wie Sprachanrufe und SMS sowie begrenzte Daten. Geeignet für diejenigen, die ihr Telefon hauptsächlich für Anrufe und SMS innerhalb der Schweiz verwenden.',
            standard: 'Der Standard-Tarif ist für durchschnittliche Benutzer konzipiert und bietet eine ausgewogene Mischung aus Sprachanrufen, SMS und Daten. Er beinhaltet Roaming-Optionen und eignet sich für diejenigen, die regelmäßigen Internetzugang für Apps und Browsen benötigen.',
            premium: 'Der Premium-Tarif richtet sich an Vielnutzer, mit großzügigen Freibeträgen für Sprachanrufe, SMS und Hochgeschwindigkeitsdaten. Einschließlich internationalem Roaming und zusätzlichen Diensten, ist es ideal für Geschäftsleute und häufige Reisende.',
        }
    },
    Croatian: {
        label: "Mobilni plan",
        options: {
            none: 'Nijedan',
            basic: 'Osnovni',
            standard: 'Standardni',
            premium: 'Premium',
        },
        tooltips: {
            none: 'Nije odabran mobilni plan.',
            basic: 'Osnovni plan je prilagođen za minimalnu upotrebu, nudi osnovne funkcije kao što su glasovni pozivi i SMS, uz ograničene podatke. Pogodno za one koji uglavnom koriste telefon za pozive i poruke unutar Švicarske.',
            standard: 'Standardni plan je namijenjen prosječnim korisnicima, pruža uravnoteženu mješavinu glasovnih poziva, SMS-a i podataka. Uključuje opcije roaminga i namijenjen je onima koji trebaju redoviti pristup internetu za aplikacije i pretraživanje.',
            premium: 'Premium plan je namijenjen zahtjevnim korisnicima, s velikodušnim dopuštenjima za glasovne pozive, SMS i podatke visoke brzine. Uključujući međunarodni roaming i dodatne usluge, idealan je za poslovne korisnike i česte putnike.',
        }
    },
    // Add additional languages as needed
};


class PhonePlanFormField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            phonePlanData: []
        };

        this.phonePlanOptions = ['none', 'basic', 'standard', 'premium'];

        this.phonePlanTooltips = {
            'none': 'No phone plan selected.',
            'basic': 'The Basic plan is tailored for minimal usage, offering essential features like voice calling and SMS, along with limited data. Suitable for those who mainly use their phone for calls and texts within Switzerland.',
            'standard': 'The Standard plan is designed for average users, providing a balanced mix of voice calling, SMS, and data. It includes roaming options and caters to those who need regular internet access for apps and browsing.',
            'premium': 'The Premium plan is aimed at heavy users, with generous allowances for voice calling, SMS, and high-speed data. Including international roaming and additional services, it\'s ideal for business users and frequent travelers.',

        };
    }

    componentDidMount() {

        fetch(`${API_BASE_URL}/costs/api/phone_plan/`)
            .then(response => response.json())
            .then(data => {
                this.setState({ phonePlanData: data });
            })
            .catch(error => console.log("Error fetching data: ", error));
    }

    findPhonePlanCost = () => {
        const { phonePlan } = this.props;
        const { phonePlanData } = this.state;

        const found = phonePlanData.find(item => item.plan === phonePlan);
        return found ? found.value : '-';
    }


    handleChange = (event) => {
        this.props.onChange(event);
        this.setState({ isOpen: false }); // Close when an option is chosen
    }

    handleMouseDown = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }

    handleFocus = () => {
        this.setState({ isOpen: true });
    }

    handleBlur = () => {
        this.setState({ isOpen: false });
    }

    renderTooltip = (props) => {
        const language = this.props.language || "English"; // default to English if no language prop is passed
        const optionValue = this.props.phonePlan;
        const tooltipText = translations[language].tooltips[optionValue];
        return (
            <Tooltip id="phonePlan-tooltip" className="custom-tooltip" {...props}>
                {tooltipText}
            </Tooltip>
        )
    }
    render() {
        const language = this.props.language || "English"; // default to English if no language prop is passed
        return (
            <Form.Group as={Row} controlId="phonePlanForm" className="form-group-wrapper">
                <Form.Label column sm="5" className="form-label-right">
                    {translations[language].label}
                </Form.Label>
                <Col sm="6" className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
                    <OverlayTrigger
                        placement={window.innerWidth > 768 ? 'right' : 'top'}
                        delay={{ show: 250, hide: 400 }}
                        overlay={this.renderTooltip}
                    >
                        <div onMouseDown={this.handleMouseDown}>
                            <Form.Control
                                as="select"
                                name="phonePlan"
                                value={this.props.phonePlan}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                className="red-text"
                            >
                                {Object.keys(translations[language].options).map(option => (
                                    <option key={option} value={option}>
                                        {translations[language].options[option]}
                                    </option>
                                ))}
                            </Form.Control>
                            <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
                        </div>
                    </OverlayTrigger>
                    <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute' }}>
                        {`- ${Math.floor(this.findPhonePlanCost())} CHF`}
                    </Form.Text>
                </Col>
            </Form.Group>
        );
    }
}

export default PhonePlanFormField;
