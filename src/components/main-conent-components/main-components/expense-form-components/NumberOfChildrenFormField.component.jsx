import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

const translations = {
  English: {
    label: "Number of Children",
    tooltip: "The number of children you have can significantly impact various aspects of your cost of living. This includes certain tax benefits. Please select the number of children to help us estimate these costs more accurately."
  },
  German: {
    label: "Anzahl der Kinder",
    tooltip: "Die Anzahl Ihrer Kinder kann verschiedene Aspekte Ihrer Lebenshaltungskosten erheblich beeinflussen. Dies beinhaltet bestimmte steuerliche Vorteile. Bitte geben Sie die Anzahl der Kinder an, um diese Kosten genauer zu schätzen."
  },
  Croatian: {
    label: "Broj djece",
    tooltip: "Broj djece koju imate može značajno utjecati na različite aspekte vaših troškova života. To uključuje određene porezne pogodnosti. Molimo odaberite broj djece kako bismo preciznije procijenili vaše troškove."
  }
};

class NumberOfChildrenFormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
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
      <Tooltip id="children-tooltip" className="custom-tooltip" {...props}>
        {translations[language].tooltip}
      </Tooltip>
    );
  }

  render() {
    const language = this.props.language || "English"; // default to English if no language prop is passed
    return (
      <Form.Group as={Row} controlId="numChildrenForm" className="form-group-wrapper">
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
                name="numChildren"
                value={this.props.numChildren}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                className="red-text"
              >
                {[...Array(11).keys()].map((num) =>
                  <option key={num} value={num}>{num}</option>
                )}
              </Form.Control>
              <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
            </div>
          </OverlayTrigger>
        </Col>
      </Form.Group>
    );
  }
}

export default NumberOfChildrenFormField;
