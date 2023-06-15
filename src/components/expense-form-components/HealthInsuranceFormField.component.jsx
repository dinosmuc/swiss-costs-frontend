import React from "react";

class HealthInsuranceFormField extends React.Component {
    constructor(props) {
        super(props);

        this.healthInsuranceOptions = [
            'Basic Coverage', 'Standard Coverage', 'Comprehensive Coverage',
            'Premium Coverage', 'Maximum Coverage'
        ];

    }

    handleChange = (event) => {
        this.props.onChange(event);  
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">  
                    <label>
                        Health Insurance:
                        <select name="healthInsurance" value={this.props.healthInsurance} onChange={this.handleChange}>
                            {this.healthInsuranceOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
        );
    }
}

export default HealthInsuranceFormField;
