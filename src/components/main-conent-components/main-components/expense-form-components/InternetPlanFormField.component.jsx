import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

import { API_BASE_URL } from '../../../../config';

const translations = {
    English: {
        label: "Internet Plan",
        options: {
            none: "No internet plan",
            basic: "Basic Connectivity",
            standard: "Standard Plan",
            high_speed: "High-Speed Plan"
        },
        tooltips: {
            none: "No internet plan. Rely on public Wi-Fi or mobile data.",
            basic: "Basic Connectivity: Up to 100 Mbps. Good for light browsing, emails, and standard-definition streaming.",
            standard: "Standard Plan: Up to 500 Mbps. Suitable for HD streaming, online gaming, and smooth video conferencing.",
            high_speed: "High-Speed Plan: Up to 2 Gbps. Ideal for 4K streaming, multiple video conferences, and high-end online gaming."
        },
        cost: "Cost"
    },
    German: {
        label: "Internet-Tarif",
        options: {
            none: "Kein Internet-Tarif",
            basic: "Basisverbindung",
            standard: "Standard-Tarif",
            high_speed: "High-Speed-Tarif"
        },
        tooltips: {
            none: "Kein Internet-Tarif. Nutzung öffentlicher Wi-Fi-Netze oder mobiler Daten.",
            basic: "Basisverbindung: Bis zu 100 Mbit/s. Geeignet für einfaches Surfen, E-Mails und Streaming in Standardauflösung.",
            standard: "Standard-Tarif: Bis zu 500 Mbit/s. Geeignet für HD-Streaming, Online-Spiele und reibungslose Videokonferenzen.",
            high_speed: "High-Speed-Tarif: Bis zu 2 Gbit/s. Ideal für Streaming in 4K, mehrere Videokonferenzen gleichzeitig und anspruchsvolle Online-Spiele."
        },
        cost: "Kosten"
    },

};




class InternetPlanFormField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            internetPlanData: []
        };

        this.internetPlanOptions = ['none', 'basic', 'standard', 'high_speed'];

        this.internetPlanTooltips = {
            'none': 'No internet plan. Rely on public Wi-Fi or mobile data.',
            'basic': 'Basic Connectivity: Up to 100 Mbps. Good for light browsing, emails, and standard-definition streaming.',
            'standard': 'Standard Plan: Up to 500 Mbps. Suitable for HD streaming, online gaming, and smooth video conferencing.',
            'high_speed': 'High-Speed Plan: Up to 2 Gbps. Ideal for 4K streaming, multiple video conferences, and high-end online gaming.'
        };

    }

    componentDidMount() {
        fetch(`${API_BASE_URL}/costs/api/internet_plan/`)
            .then(response => response.json())
            .then(data => {
                this.setState({ internetPlanData: data });
            })
            .catch(error => console.log("Error fetching data: ", error));
    }

    findInternetPlanCost = () => {
        const { internetPlan } = this.props;
        const { internetPlanData } = this.state;

        const found = internetPlanData.find(item => item.plan === internetPlan);
        return found ? found.value : '-';
    }

    handleChange = (event) => {
        this.props.onChange(event);
        this.setState({ isOpen: false });
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
        const optionValue = this.props.internetPlan;
        const tooltipText = this.internetPlanTooltips[optionValue];
        return (
            <Tooltip id="internetPlan-tooltip" className="custom-tooltip" {...props}>
                {tooltipText}
            </Tooltip>
        );
    }

    render() {
        const language = this.props.language || "English"; // Fallback to English if no language prop is provided
        const { label, options, tooltips, cost } = translations[language];

        return (
            <Form.Group as={Row} controlId="internetPlanForm" className="form-group-wrapper">
                <Form.Label column sm="5" className="form-label-right">{label}</Form.Label>
                <Col sm="6" className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
                    <OverlayTrigger
                        placement={window.innerWidth > 768 ? 'right' : 'top'}
                        delay={{ show: 250, hide: 400 }}
                        overlay={(props) => (
                            <Tooltip id="internetPlan-tooltip" className="custom-tooltip" {...props}>
                                {tooltips[this.props.internetPlan]}
                            </Tooltip>
                        )}
                    >
                        <div onMouseDown={this.handleMouseDown}>
                            <Form.Control
                                as="select"
                                name="internetPlan"
                                value={this.props.internetPlan}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                className="red-text"
                            >
                                {this.internetPlanOptions.map(option => (
                                    <option key={option} value={option}>
                                        {options[option] || option.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </option>
                                ))}
                            </Form.Control>
                            <span className="form-control-dropdown-arrow"></span>
                        </div>
                    </OverlayTrigger>
                    <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute' }}>
                        {`- ${Math.floor(this.findInternetPlanCost())} CHF`}

                    </Form.Text>
                </Col>
            </Form.Group>
        );
    }

}

export default InternetPlanFormField;