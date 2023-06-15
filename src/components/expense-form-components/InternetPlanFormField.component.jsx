import React from "react";

class InternetPlanFormField extends React.Component {
    constructor(props) {
        super(props);
        this.internetPlanOptions = ['basic', 'standard', 'high-speed', 'ultra high-speed'];
    }
    
    handleChange = (event) => {
      this.props.onChange(event);  
  }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                  <label>
                    Internet Plan:
                    <select name="internetPlan" value={this.props.internetPlan} onChange={this.handleChange}>
                      {this.internetPlanOptions.map(option => (
                        <option key={option} value={option}>
                          {option.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
            </div>
        )
    }
}

export default InternetPlanFormField;
