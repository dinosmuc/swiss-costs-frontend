import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';


const translations = {
  English: {
    label: "Marital Status",
    options: {
      S: "Single",
      MSI: "Married with a single income",
      MDI: "Married with a double income",
      SP: "Single parent"
    },
    tooltip: "Your marital status can influence various aspects of your cost of living. Select your marital status to help us estimate your costs more accurately."
  },
  German: {
    label: "Familienstand",
    options: {
      S: "Single",
      MSI: "Verheiratet mit einem Einkommen",
      MDI: "Verheiratet mit doppeltem Einkommen",
      SP: "Alleinerziehend"
    },
    tooltip: "Ihr Familienstand kann verschiedene Aspekte Ihrer Lebenshaltungskosten beeinflussen. Wählen Sie Ihren Familienstand, um Ihre Kosten genauer zu schätzen."
  },
  Croatian: {
    label: "Bračno stanje",
    options: {
      S: "Samac/samica",
      MSI: "U braku s jednim prihodom",
      MDI: "U braku s dvostrukim prihodom",
      SP: "Samohrani roditelj"
    },
    tooltip: "Vaše bračno stanje može utjecati na različite aspekte vaših troškova života. Odaberite svoje bračno stanje kako bismo preciznije procijenili vaše troškove."
  }
};


class MaritalStatusFormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      options: [
        { value: "S", label: "Single" },
        { value: "MSI", label: "Married with a single income" },
        { value: "MDI", label: "Married with a double income" },
        { value: "SP", label: "Single parent" }
      ]
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
    const language = this.props.language || "English"; // default to English if no language prop is passed
    return (
      <Tooltip id="marital-tooltip" className="custom-tooltip" {...props}>
        {translations[language].tooltip}
      </Tooltip>
    );
  }

  render() {
    const language = this.props.language || "English"; // default to English if no language prop is passed
    const options = Object.keys(translations[language].options).map(value => ({ value, label: translations[language].options[value] }));

    return (
      <Form.Group as={Row} controlId="maritalStatusForm" className="form-group-wrapper">
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
                name="maritalStatus"
                value={this.props.maritalStatus} // Fixed typo here
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                className="red-text"
              >
                {options.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
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

export default MaritalStatusFormField;
