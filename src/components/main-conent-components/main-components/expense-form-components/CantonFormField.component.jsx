import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';


const translations = {
  English: {
    label: "Canton",
    tooltip: "Each canton has unique costs and tax structures. Your choice will affect your estimated expenses like housing, insurance, and more. Taxes can vary greatly among cantons."
  },
  German: {
    label: "Kanton",
    tooltip: "Jeder Kanton hat einzigartige Kosten- und Steuerstrukturen. Ihre Wahl beeinflusst Ihre geschätzten Ausgaben wie Wohnen, Versicherungen und mehr. Die Steuern können je nach Kanton stark variieren."
  },
  Croatian: {
    label: "Kanton",
    tooltip: "Svaki kanton ima jedinstvene troškove i porezne strukture. Vaš izbor će utjecati na vaše procijenjene troškove poput stanovanja, osiguranja i slično. Porezi se mogu znatno razlikovati među kantonima."
  }
};


class CantonFormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.cantons = [
      'Aargau', 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden', 'Basel-Landschaft',
      'Basel-Stadt', 'Bern', 'Fribourg', 'Geneva', 'Glarus', 'Graubünden', 'Jura',
      'Lucerne', 'Neuchâtel', 'Nidwalden', 'Obwalden', 'Schaffhausen', 'Schwyz',
      'Solothurn', 'St. Gallen', 'Thurgau', 'Ticino', 'Uri', 'Valais', 'Vaud', 'Zug', 'Zürich'
    ];

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
    const language = this.props.language || "English"; // Default to English
    return (
      <Tooltip id="canton-tooltip" className="custom-tooltip" {...props}>
        {translations[language].tooltip}
      </Tooltip>
    );
  }





  render() {
    const language = this.props.language || "English"; // Default to English
    return (
      <Form.Group as={Row} controlId="cantonForm" className="form-group-wrapper">
        <Form.Label column sm={5} className="form-label-right">{translations[language].label}</Form.Label>
        <Col sm={6} className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
          <OverlayTrigger
            placement={window.innerWidth > 768 ? 'right' : 'top'}
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip}
          >
            <div onMouseDown={this.handleMouseDown}>
              <Form.Control
                as="select"
                name="canton"
                value={this.props.canton}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                className="red-text"
              >
                {this.cantons.map(canton => (
                  <option key={canton} value={canton}>{canton}</option>
                ))}
              </Form.Control>
              <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
            </div>
          </OverlayTrigger>
        </Col>
      </Form.Group>
    );
  }
}

export default CantonFormField;
