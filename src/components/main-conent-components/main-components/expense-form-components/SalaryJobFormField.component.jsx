import React from 'react';
import { Form, Row, Col, Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../expenseForm.styles.scss';

import { API_BASE_URL } from '../../../../config';


class SalaryJobFormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      enterSalary: this.props.enterSalary || false,
      salary: this.props.salary || "",
      neto_salary: null,
      jobTitle: this.props.jobTitle || "",
      jobTitles: [
        "Software Engineer",
        "Data Scientist",
        "Marketing Manager",
        "Sales Manager",
        "Mechanical Engineer",
        "Civil Engineer",
        "Financial Analyst",
        "Project Manager",
        "Graphic Designer",
        "Human Resources Manager"
      ]
      
    };
  }

  handleButtonClick = (event) => {
    const { name } = event.target;
    this.setState({ enterSalary: name === 'enterSalary', isOpen: false });
    this.props.onCheckboxChange(name === 'enterSalary');
  }

  handleChange = (event) => {
    if (this.state.enterSalary) {
      this.setState({ salary: event.target.value, isOpen: false });
      this.props.onSalaryChange(event.target.value);
    } else {
      this.setState({ jobTitle: event.target.value }, () => {
        this.fetchSalaryByJobTitle(this.state.jobTitle);
      });
    }
  }

  handleMouseDown = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  renderTooltip = (props) => (
    <Tooltip id="job-title-tooltip" className="custom-tooltip" {...props}>
      The salaries associated with these job titles are average values sourced from our research on sites like job.ch. They may not always reflect the most current or accurate salaries. Always conduct your own research when considering salary figures.
    </Tooltip>
  )
  
  componentDidMount() {
    this.fetchSalary(this.props.salary);
  }

  componentDidUpdate(prevProps,prevState) {
    if (prevProps.salary !== this.props.salary) {
      this.fetchSalary(this.props.salary);
    }
    if (prevState.jobTitle !== this.state.jobTitle) {
      this.fetchSalaryByJobTitle(this.state.jobTitle);
    }
  }

  fetchSalaryByJobTitle = async (jobTitle) => {
    const response = await fetch(`${API_BASE_URL}/costs/api/get_salary_by_job_title/?job_title=${jobTitle}`);
    const data = await response.json();
    console.log("Salary by Job Title:", data);
    this.setState({ neto_salary: data.neto_salary });
  };

  fetchSalary = async (salary) => {
    
    const response = await fetch(`${API_BASE_URL}/costs/api/calculate_neto_salary/?bruto_salary=${salary}`);

    const data = await response.json();
    console.log(data)
    this.setState({ neto_salary: data.neto_salary }); // Adjust the 'cost' to whatever field your API actually uses
  };



  render() {
    return (
      <Form.Group controlId="salaryJobForm">
        {/* Wrapper Form.Group for Salary/JobTitle */}
        <Form.Group as={Row} className="align-items-center form-group-wrapper">
          <Form.Label column sm={5} className="form-label-right">
            Job or Salary
          </Form.Label>
          <Col sm={6}>
            <ButtonGroup aria-label="Job or Salary" className="salary-job-btn-group">
              <Button variant={this.state.enterSalary ? "outline-primary" : "primary"} name="selectJob" onClick={this.handleButtonClick}>Select Job</Button>
              <Button variant={this.state.enterSalary ? "primary" : "outline-primary"} name="enterSalary" onClick={this.handleButtonClick}>Enter Salary</Button>
            </ButtonGroup>
          </Col>
        </Form.Group>

        {this.state.enterSalary ? (
          // Wrapper Form.Group for Salary input
          <Form.Group as={Row} className="align-items-center form-group-wrapper">
            <Form.Label column sm={5} className="form-label-right">Salary Gross:</Form.Label>
            <Col sm={6} className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
              <Form.Control type="number" name="salary" value={this.state.salary} onChange={this.handleChange} className="red-text" />
              <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute' }}>
                  {this.state.neto_salary !== null ? `Net Salary  -${this.state.neto_salary} CHF` : '- Loading...'}
              </Form.Text>
            </Col>
          </Form.Group>
        ) : (
          // Wrapper Form.Group for JobTitle select
          <Form.Group as={Row} className="align-items-center form-group-wrapper">
            <Form.Label column sm={5} className="form-label-right">Job Title:</Form.Label>
            <Col sm={6} className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
              <OverlayTrigger
                placement={window.innerWidth > 768 ? 'right' : 'top'}
                delay={{ show: 250, hide: 400 }}
                overlay={this.renderTooltip}
              >
                <div onMouseDown={this.handleMouseDown}>
                  <Form.Control as="select" name="jobTitle" value={this.state.jobTitle} onChange={this.handleChange} className="red-text">
                    <option value="">Select a job title</option>
                    {this.state.jobTitles.map((jobTitle, index) => (
                      <option key={index} value={jobTitle}>{jobTitle}</option>
                    ))}
                  </Form.Control>
                  <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
                </div>
              </OverlayTrigger>
              <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute' }}>
                  {this.state.neto_salary !== null ? `Net Salary  -${this.state.neto_salary} CHF` : '- Loading...'}
              </Form.Text>
            </Col>
          </Form.Group>
        )}
      </Form.Group>
    );
  }
}

export default SalaryJobFormField;
