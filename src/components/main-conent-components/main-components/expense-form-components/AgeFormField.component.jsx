import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';



const translations = {
  English: {
    label: "Age",
    tooltip: "Your age can significantly influence various aspects of your cost of living. This includes health insurance premiums, tax benefits or liabilities. Please select your current age to help us estimate these costs more accurately."
  },
  German: {
    label: "Alter",
    tooltip: "Ihr Alter kann verschiedene Aspekte Ihrer Lebenshaltungskosten erheblich beeinflussen. Dazu gehören Krankenversicherungsprämien, steuerliche Vorteile oder Verbindlichkeiten. Bitte wählen Sie Ihr aktuelles Alter, um diese Kosten genauer schätzen zu können."
  },
  Croatian: {
    label: "Dob",
    tooltip: "Vaša dob može značajno utjecati na različite aspekte vaših životnih troškova. To uključuje premije zdravstvenog osiguranja, porezne pogodnosti ili obveze. Molimo odaberite svoju trenutačnu dob kako bismo točnije procijenili ove troškove."
  }
};


class AgeFormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
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
    const language = this.props.language || "English"; // Default to English
    return (
      <Tooltip id="age-tooltip" className="custom-tooltip" {...props}>
        {translations[language].tooltip}
      </Tooltip>
    );
  }


  render() {
    const language = this.props.language || "English"; // Default to English
    return (
      <Form.Group as={Row} controlId="ageForm" className="form-group-wrapper">
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
                name="age"
                value={this.props.age}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                className="red-text"
              >
                {Array.from({ length: 83 }, (_, index) => (
                  <option key={index + 18} value={index + 18}>
                    {index + 18}
                  </option>
                ))}
              </Form.Control>
              <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
            </div>
          </OverlayTrigger>
        </Col>
      </Form.Group>
    )
  }
}

export default AgeFormField;
