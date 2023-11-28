import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

import { API_BASE_URL } from '../../../../config';  // Adjust the path to point to your config.js


const translations = {
    English: {
        label: "Child Care Options",
        options: {
            none: "None",
            home_based: "Home-based Childcare",
            daycare_center: "Daycare Center",
            nanny: "Nanny",
            au_pair: "Au Pair"
        },
        tooltips: {
            none: 'You do not require any childcare services.',
            home_based: 'Home-based childcare is a care service in a home setting, often with fewer children than in daycare centers.',
            daycare_center: 'Daycare centers are larger facilities and often have a more structured and educational-based environment.',
            nanny: 'A nanny provides childcare within the kids\' own home and can offer more personalized care.',
            au_pair: 'An au pair is a person from overseas employed to live with a family and do light housework in exchange for room and board and the opportunity to learn the family\'s language.'
        }
    },
    German: {
        label: "Kinderbetreuungsmöglichkeiten",
        options: {
            none: "Keine",
            home_based: "Hausbasierte Kinderbetreuung",
            daycare_center: "Kindertagesstätte",
            nanny: "Kindermädchen",
            au_pair: "Au Pair"
        },
        tooltips: {
            none: 'Sie benötigen keine Kinderbetreuungsdienste.',
            home_based: 'Die häusliche Kinderbetreuung ist ein Betreuungsdienst in einem häuslichen Umfeld, oft mit weniger Kindern als in Kindertagesstätten.',
            daycare_center: 'Kindertagesstätten sind größere Einrichtungen und haben oft ein strukturierteres und auf Bildung basiertes Umfeld.',
            nanny: 'Ein Kindermädchen bietet Kinderbetreuung im eigenen Zuhause des Kindes an und kann individuellere Betreuung bieten.',
            au_pair: 'Ein Au Pair ist eine Person aus dem Ausland, die angestellt ist, bei einer Familie zu leben und leichte Hausarbeit im Austausch für Kost und Logis und die Möglichkeit, die Sprache der Familie zu lernen, zu verrichten.'
        }
    },
    Croatian: {
        label: "Mogućnosti skrbi za djecu",
        options: {
            none: "Nijedna",
            home_based: "Njega temeljena na domu",
            daycare_center: "Dječji vrtić",
            nanny: "Dadilja",
            au_pair: "Au Pair"
        },
        tooltips: {
            none: 'Ne trebate usluge čuvanja djece.',
            home_based: 'Njega temeljena na domu je usluga skrbi u kućnom okruženju, često s manje djece nego u vrtićima.',
            daycare_center: 'Dječji vrtići su veće ustanove i često imaju strukturiranije i obrazovno okruženje.',
            nanny: 'Dadilja pruža skrb za djecu unutar dječje kuće i može ponuditi personaliziraniju skrb.',
            au_pair: 'Au pair je osoba iz inozemstva zaposlena da živi s obitelji i obavlja lagane kućanske poslove u zamjenu za smještaj i hranu te priliku za učenje jezika obitelji.'
        }
    }
}





class ChildCareOptionsFormField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            childCareData: []
        };

        this.childCareOptions = [
            { value: "none", label: "None" },
            { value: "home_based", label: "Home-based Childcare" },
            { value: "daycare_center", label: "Daycare Center" },
            { value: "nanny", label: "Nanny" },
            { value: "au_pair", label: "Au Pair" },
        ];

        this.childCareTooltips = {
            'none': 'You do not require any childcare services.',
            'home_based': 'Home-based childcare is a care service in a home setting, often with fewer children than in daycare centers.',
            'daycare_center': 'Daycare centers are larger facilities and often have a more structured and educational-based environment.',
            'nanny': 'A nanny provides childcare within the kids\' own home and can offer more personalized care.',
            'au_pair': 'An au pair is a person from overseas employed to live with a family and do light housework in exchange for room and board and the opportunity to learn the family\'s language.',
        };
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
        const language = this.props.language || "English"; // Default to English if no language prop is provided
        const optionValue = this.props.childcare;
        const tooltipText = translations[language].tooltips[optionValue];

        return (
            <Tooltip id="childCare-tooltip" className="custom-tooltip" {...props}>
                {tooltipText}
            </Tooltip>
        )
    }

    componentDidMount() {
        fetch(`${API_BASE_URL}/costs/api/childcare/`)
            .then(response => response.json())
            .then(data => {
                this.setState({ childCareData: data });
            })
            .catch(error => console.log("Error fetching data: ", error));
    }

    findChildCareCost = () => {
        const { childcare } = this.props;
        const { childCareData } = this.state;

        const found = childCareData.find(item => item.childcare_type === childcare);
        return found ? found.value : '-';  // Return '-' if not found
    }


    render() {

        const language = this.props.language || "English"; // Default to English
        return (
            <Form.Group as={Row} controlId="childCareForm" className="form-group-wrapper">
                <Form.Label column sm="5" className="form-label-right">{translations[language].label}</Form.Label>
                <Col sm="6" className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
                    <OverlayTrigger
                        placement={window.innerWidth > 768 ? 'right' : 'top'}
                        delay={{ show: 250, hide: 400 }}
                        overlay={this.renderTooltip}
                    >
                        <div onMouseDown={this.handleMouseDown}>
                            <Form.Control
                                as="select"
                                name={this.props.name}
                                value={this.props.childcare}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                className="red-text"
                            >
                                {this.childCareOptions.map(option => (
                                    <option key={option.value} value={option.value}>{translations[language].options[option.value]}</option>
                                ))}
                            </Form.Control>
                            <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
                        </div>
                    </OverlayTrigger>
                    <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute' }}>
                        {`- ${Math.round(this.findChildCareCost())} CHF`}
                    </Form.Text>

                </Col>
            </Form.Group>
        );
    }
}

export default ChildCareOptionsFormField;
