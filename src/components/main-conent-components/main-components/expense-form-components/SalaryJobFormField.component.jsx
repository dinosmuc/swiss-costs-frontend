import React from 'react';
import { Form, Row, Col, Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import jobOptions from './JobOptions';
import '../expenseForm.styles.scss';

import { API_BASE_URL } from '../../../../config';

const translations = {
  English: {
    jobOrSalary: "Job or Salary",
    selectJob: "Select Job",
    enterSalary: "Enter Salary",
    salaryGross: "Salary Gross:",
    netSalary: "Net Salary",
    jobTitle: "Job Title:",
    search: "Search...",
    selectJobTitle: "Select a job title",
    gross: "Gross",
    net: "Net",
    tooltip: 'The salaries associated with these job titles are average values sourced from our research on sites like job.ch. They may not always reflect the most current or accurate salaries. Always conduct your own research when considering salary figures.'
  },
  German: {
    jobOrSalary: "Arbeit oder Gehalt",
    selectJob: "Job wählen",
    enterSalary: "Gehalt eingeben",
    salaryGross: "Bruttogehalt:",
    netSalary: "Nettogehalt",
    jobTitle: "Berufsbezeichnung:",
    search: "Suche...",
    selectJobTitle: "Einen Jobtitel auswählen",
    gross: "Brutto",
    net: "Netto",
    tooltip: 'Die mit diesen Berufsbezeichnungen verbundenen Gehälter sind Durchschnittswerte, die auf unserer Recherche auf Websites wie job.ch basieren. Sie spiegeln nicht immer die aktuellsten oder genauesten Gehälter wider. Führen Sie immer Ihre eigene Recherche durch, wenn Sie Gehaltszahlen in Betracht ziehen.'
  },
  Croatian: {
    jobOrSalary: "Posao ili plaća",
    selectJob: "Odaberi posao",
    enterSalary: "Unesi plaću",
    salaryGross: "Bruto plaća:",
    netSalary: "Neto plaća",
    jobTitle: "Naziv posla:",
    search: "Pretraga...",
    selectJobTitle: "Odaberi naziv posla",
    gross: "Bruto",
    net: "Neto",
    tooltip: 'Plaće povezane s ovim nazivima poslova su prosječne vrijednosti dobivene istraživanjem na stranicama poput job.ch. One ne moraju uvijek odražavati najnovije ili najtočnije plaće. Uvijek provodite vlastita istraživanja prilikom razmatranja iznosa plaća.'
  }
};


class SalaryJobFormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      enterSalary: this.props.enterSalary || false,
      salary: this.props.salary || "",
      neto_salary: null,
      searchQuery: '',
      jobTitle: this.props.jobTitle || "",



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

  renderTooltip = (props) => {
    const language = this.props.language || "English"; // Assuming 'language' is passed in props
    const tooltipText = translations[language].tooltip;
    return (
      <Tooltip id="job-title-tooltip" className="custom-tooltip" {...props}>
        {tooltipText}
      </Tooltip>
    );
  }

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  componentDidMount() {
    this.fetchSalary(this.props.salary);
  }

  componentDidUpdate(prevProps, prevState) {
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

    this.setState({
      neto_salary: data.neto_salary,
      salary: data.gross_salary // Ovdje pretpostavljam da tvoj API vraća "gross_salary" za bruto plaću.
    });

    // Ako želiš ažurirati "salary" u roditeljskoj komponenti, koristi metodu iz props-a
    this.props.onSalaryChange(data.gross_salary);
  };



  fetchSalary = async (salary) => {

    const response = await fetch(`${API_BASE_URL}/costs/api/calculate_neto_salary/?bruto_salary=${salary}`);

    const data = await response.json();
    this.setState({ neto_salary: data.neto_salary }); // Adjust the 'cost' to whatever field your API actually uses
  };



  render() {
    const language = this.props.language || "English"; // default to English if no language prop is passed
    const currentTranslations = translations[language];
    const filteredJobOptions = jobOptions.filter(option =>
      option.label.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    );

    return (
      <Form.Group controlId="salaryJobForm">
        <Form.Group as={Row} className="align-items-center form-group-wrapper">
          <Form.Label column sm={5} className="form-label-right">
            {currentTranslations.jobOrSalary}
          </Form.Label>
          <Col sm={6}>
            <ButtonGroup aria-label={currentTranslations.jobOrSalary} className="salary-job-btn-group">
              <Button variant={this.state.enterSalary ? "outline-primary" : "primary"} name="selectJob" onClick={this.handleButtonClick}>{currentTranslations.selectJob}</Button>
              <Button variant={this.state.enterSalary ? "primary" : "outline-primary"} name="enterSalary" onClick={this.handleButtonClick}>{currentTranslations.enterSalary}</Button>
            </ButtonGroup>
          </Col>
        </Form.Group>
        {this.state.enterSalary ? (
          <Form.Group as={Row} className="align-items-center form-group-wrapper">
            <Form.Label column sm={5} className="form-label-right">{currentTranslations.salaryGross}</Form.Label>
            <Col sm={6} className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
              <Form.Control type="number" name="salary" value={this.state.salary} onChange={this.handleChange} className="red-text" />
              <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute' }}>
                <span style={{ marginLeft: '20px' }}>
                  {this.state.neto_salary !== null ? `${currentTranslations.netSalary} - ${Math.floor(this.state.neto_salary)} CHF` : '- Loading...'}
                </span>
              </Form.Text>
            </Col>
          </Form.Group>
        ) : (
          <Form.Group as={Row} className="align-items-center form-group-wrapper">
            <Form.Label column sm={5} className="form-label-right">{currentTranslations.jobTitle}</Form.Label>
            <Col sm={6} className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
              <OverlayTrigger
                placement={window.innerWidth > 768 ? 'right' : 'top'}
                delay={{ show: 250, hide: 400 }}
                overlay={this.renderTooltip}
              >
                <div onMouseDown={this.handleMouseDown}>
                  <Form.Control as="select" name="jobTitle" value={this.state.jobTitle} onChange={this.handleChange} className="red-text">
                    {this.state.isOpen && (
                      <input
                        type="text"
                        placeholder={currentTranslations.search}
                        value={this.state.searchQuery}
                        onChange={this.handleSearch}
                      />
                    )}
                    <option value="">{currentTranslations.selectJobTitle}</option>
                    {filteredJobOptions.map((jobOption, index) => (
                      <option key={index} value={jobOption.value}>{jobOption.label}</option>
                    ))}
                  </Form.Control>
                  <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
                </div>
              </OverlayTrigger>
              <Form.Text className="text-muted form-text-custom-small" style={{ position: 'absolute' }}>
                {this.state.salary !== null ? `${currentTranslations.gross} - ${Math.floor(this.state.salary)} CHF -> ` : '- Loading...'}
                {this.state.neto_salary !== null ? `${currentTranslations.net} - ${Math.floor(this.state.neto_salary)} CHF` : '- Loading...'}
              </Form.Text>
            </Col>
          </Form.Group>
        )}
      </Form.Group>
    )


  }

}

export default SalaryJobFormField;
