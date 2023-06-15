import React from "react";

class MartialStatusFormField extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            options: [
                {value: "S", label: "Single"},
                {value: "MSI", label: "Married with a single income"},
                {value: "MDI", label: "Married with a double income"},
                {value: "SP", label: "Single parent"}
            ]
        };
    }

    handleChange = (event) => {
        this.props.onChange(event);  
    }

    render() { 
        const { options } = this.state;
        return (
            <div className="row">
                <div className="col-md-6">
                  <label> 
                    Marital Status:
                    <select name="maritalStatus" value={this.props.martialStatus} onChange={this.handleChange}>
                      {options.map((option, index) => (
                          <option key={index} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </label>
                </div>
            </div>
        );
    }   

}

export default MartialStatusFormField;
