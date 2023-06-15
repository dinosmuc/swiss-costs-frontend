import React from "react";

class SalaryJobFormField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enterSalary: this.props.enterSalary || false,
            salary: this.props.salary || "",
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

    handleCheckboxChange = (event) => {
        this.setState({enterSalary: event.target.checked});
        this.props.onCheckboxChange(event.target.checked);
    }

    handleChange = (event) => {
        if (this.state.enterSalary) {
            this.setState({salary: event.target.value});
            this.props.onSalaryChange(event.target.value);
        } else {
            this.setState({jobTitle: event.target.value});
            this.props.onJobChange(event.target.value);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">  
                    <label>
                        <input
                            name="enterSalary"
                            type="checkbox"
                            checked={this.state.enterSalary}
                            onChange={this.handleCheckboxChange}
                        />
                        Enter salary manually 
                    </label>
                    {this.state.enterSalary ? (
                        <label>
                            Salary:
                            <input name="salary" type="number" value={this.state.salary} onChange={this.handleChange} />
                        </label>
                    ) : (
                        <label>
                            Job Title:
                            <select name="jobTitle" value={this.state.jobTitle} onChange={this.handleChange}>
                                <option value="">Select a job title</option>
                                {this.state.jobTitles.map((jobTitle, index) =>
                                    <option key={index} value={jobTitle}>{jobTitle}</option>
                                )}
                            </select>
                        </label>
                    )}
                </div>
            </div>
        );
    }
}

export default SalaryJobFormField;
