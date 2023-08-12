import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

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

  renderTooltip = (props) => (
    <Tooltip id="church-tooltip" className="custom-tooltip" {...props}>
      In Switzerland, registered members of a church often pay a church tax, which is collected in addition to the regular cantonal tax. The tax rate varies by canton and your choice here may affect your estimated cost of living.
    </Tooltip>
  )

  render() {
    return (
      <Form.Group as={Row} controlId="churchMemberForm" className="form-group-wrapper">
        <Form.Label column sm={5} className="form-label-right">Church Member</Form.Label>
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
                <option value="church_member">A church member</option>
                <option value="not_church_member">Not a church member</option>
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
