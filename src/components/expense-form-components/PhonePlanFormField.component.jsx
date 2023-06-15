import React from 'react';  

class PhonePlanFormField extends React.Component {
    constructor(props) {
        super(props);
        this.phonePlanOptions = ['basic', 'standard', 'premium', 'unlimited'];
    }
  
    handleChange = (event) => {
        this.props.onChange(event);  
      }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <label>
                        Phone Plan:
                        <select name="phonePlan" value={this.props.phonePlan} onChange={this.handleChange}>
                            {this.phonePlanOptions.map(option => (
                                <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
        )
    }
}

export default PhonePlanFormField;
