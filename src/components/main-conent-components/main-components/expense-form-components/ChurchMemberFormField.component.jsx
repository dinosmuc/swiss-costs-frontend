import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';


const translations = {
  English: {
    label: "Church Member",
    options: {
      church_member: "A church member",
      not_church_member: "Not a church member"
    },
    tooltip: "In Switzerland, registered members of a church often pay a church tax, which is collected in addition to the regular cantonal tax. The tax rate varies by canton and your choice here may affect your estimated cost of living."
  },
  German: {
    label: "Kirchenmitglied",
    options: {
      church_member: "Ein Kirchenmitglied",
      not_church_member: "Kein Kirchenmitglied"
    },
    tooltip: "In der Schweiz zahlen registrierte Kirchenmitglieder oft eine Kirchensteuer, die zusätzlich zur regulären kantonalen Steuer erhoben wird. Der Steuersatz variiert je nach Kanton und Ihre Wahl hier kann Ihre geschätzten Lebenshaltungskosten beeinflussen."
  },
  Croatian: {
    label: "Član crkve",
    options: {
      church_member: "Član crkve",
      not_church_member: "Nisam član crkve"
    },
    tooltip: "U Švicarskoj, registrirani članovi crkve često plaćaju crkveni porez koji se naplaćuje uz redoviti kantonalni porez. Stopa poreza varira po kantonu i vaš izbor ovdje može utjecati na procijenjene troškove života."
  }
};


class ChurchMemberFormField extends React.Component {
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
      <Tooltip id="church-tooltip" className="custom-tooltip" {...props}>
        {translations[language].tooltip}
      </Tooltip>
    );
  }

  render() {
    const language = this.props.language || "English"; // default to English if no language prop is passed
    return (
      <Form.Group as={Row} controlId="churchMemberForm" className="form-group-wrapper">
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
                name="churchMember"
                value={this.props.churchMember}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                className="red-text"
              >
                <option value="church_member">{translations[language].options.church_member}</option>
                <option value="not_church_member">{translations[language].options.not_church_member}</option>
              </Form.Control>
              <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
            </div>
          </OverlayTrigger>
        </Col>
      </Form.Group>
    );
  }
}

export default ChurchMemberFormField;


