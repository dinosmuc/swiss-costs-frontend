import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

import { API_BASE_URL } from '../../../../config';

const translations = {
    English: {
        label: "Entertainment and Leisure Budget",
        options: {
            none: "None",
            low: "Low",
            medium: "Medium",
            high: "High"
        },
        tooltips: {
            none: "No entertainment and leisure budget selected.",
            low: "Basic streaming services, maybe a couple of movie tickets or a low-cost hobby like hiking...",
            medium: "Includes things like more frequent cinema visits, mid-range hobbies (e.g., painting supplies, low-cost gym membership), and occasional events like local concerts...",
            high: "High-end hobbies (e.g., golf, skiing), premium streaming services, high-profile concerts or sporting events, and perhaps a weekend getaway..."
        }
    },
    German: {
        label: "Budget für Unterhaltung und Freizeit",
        options: {
            none: "Keines",
            low: "Gering",
            medium: "Mittel",
            high: "Hoch"
        },
        tooltips: {
            none: "Kein Budget für Unterhaltung und Freizeit gewählt.",
            low: "Grundlegende Streaming-Dienste, vielleicht ein paar Kinokarten oder ein kostengünstiges Hobby wie Wandern...",
            medium: "Beinhaltet Dinge wie häufigere Kinobesuche, mittelpreisige Hobbys (z.B. Malutensilien, günstige Fitnessstudio-Mitgliedschaft) und gelegentliche Veranstaltungen wie lokale Konzerte...",
            high: "Hochwertige Hobbys (z.B. Golf, Skifahren), Premium-Streaming-Dienste, große Konzerte oder Sportveranstaltungen und vielleicht ein Wochenendausflug..."
        }
    },
    Croatian: {
        label: "Proračun za zabavu i slobodno vrijeme",
        options: {
            none: "Nijedan",
            low: "Nizak",
            medium: "Srednji",
            high: "Visok"
        },
        tooltips: {
            none: "Nije odabran proračun za zabavu i slobodno vrijeme.",
            low: "Osnovne usluge streaminga, možda par ulaznica za kino ili hobi niskih troškova poput planinarenja...",
            medium: "Uključuje stvari poput češćih posjeta kinu, hobije srednjeg cjenovnog ranga (npr. pribor za slikanje, članstvo u teretani niskih troškova) i povremene događaje poput lokalnih koncerata...",
            high: "Hobiji visokog cjenovnog ranga (npr. golf, skijanje), premium usluge streaminga, koncerti ili sportski događaji visokog profila, i možda vikend bijeg..."
        }
    },
    // Add additional languages as needed
};




class EntertainmentAndLeisureBudgetFormField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            budgetData: []
        };

        this.budgetOptions = ['none', 'low', 'medium', 'high'];

        this.budgetTooltips = {
            'none': 'No entertainment and leisure budget selected.',
            'low': 'Basic streaming services, maybe a couple of movie tickets or a low-cost hobby like hiking...',
            'medium': 'Includes things like more frequent cinema visits, mid-range hobbies (e.g., painting supplies, low-cost gym membership), and occasional events like local concerts...',
            'high': 'High-end hobbies (e.g., golf, skiing), premium streaming services, high-profile concerts or sporting events, and perhaps a weekend getaway...',
        };
    }

    componentDidMount() {
        fetch(`${API_BASE_URL}/costs/api/entertainment_and_leisure/?format=json`)
            .then(response => response.json())
            .then(data => {
                this.setState({ budgetData: data, isLoading: false });
            })
            .catch(error => console.log("Error fetching data: ", error));
    }
    findBudgetValue = () => {
        const { entertainmentAndLeisure } = this.props;
        const { budgetData } = this.state;

        if (!Array.isArray(budgetData)) {
            return '-';
        }

        const found = budgetData.find(item => item.budget === entertainmentAndLeisure);
        return found ? found.value : '-';  // Return '-' if not found
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

    getTranslation = () => {
        const language = this.props.language || "English"; // default to English if no language prop is passed
        return translations[language] || translations.English; // Fallback to English if the language key is not found
    }

    renderTooltip = (props) => {
        const optionValue = this.props.entertainmentAndLeisure;
        const translation = this.getTranslation();
        const tooltipText = translation.tooltips[optionValue];
        return (
            <Tooltip id="entertainment-leisure-tooltip" className="custom-tooltip" {...props}>
                {tooltipText}
            </Tooltip>
        );
    }

    render() {
        const { isOpen } = this.state;
        const translation = this.getTranslation(); // Fetch the current translations
        return (
            <Form.Group as={Row} controlId="entertainmentAndLeisureForm" className="form-group-wrapper">
                <Form.Label column sm="5" className="form-label-right">
                    {translation.label}
                </Form.Label>
                <Col sm="6" className={`form-control-with-arrow ${isOpen ? 'open' : ''}`}>
                    <OverlayTrigger
                        placement={window.innerWidth > 768 ? 'right' : 'top'}
                        delay={{ show: 250, hide: 400 }}
                        overlay={this.renderTooltip}
                    >
                        <div onMouseDown={this.handleMouseDown}>
                            <Form.Control
                                as="select"
                                name="entertainmentAndLeisure"
                                value={this.props.entertainmentAndLeisure}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                className="red-text"
                            >
                                {Object.keys(translation.options).map(option => (
                                    <option key={option} value={option}>
                                        {translation.options[option]}
                                    </option>
                                ))}
                            </Form.Control>
                            <span className="form-control-dropdown-arrow"></span>
                        </div>
                    </OverlayTrigger>
                    <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute' }}>
                        {`- ${Math.round(this.findBudgetValue())} CHF`}
                    </Form.Text>
                </Col>
            </Form.Group>
        );
    }
}

export default EntertainmentAndLeisureBudgetFormField;
