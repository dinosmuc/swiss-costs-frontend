import React from "react";

class HousingTypeFormField extends React.Component {
    constructor(props) {
        super(props);

        this.housingTypes = {
            'studio': 'Studio Apartment', 
            '1.5_bedroom': '1.5-Bedroom Apartment', 
            '2.5_bedroom': '2.5-Bedroom Apartment', 
            '3.5_bedroom': '3.5-Bedroom Apartment', 
            '4.5_bedroom': '4.5-Bedroom Apartment',
        };
    }

    handleChange = (event) => {
        this.props.onChange(event);  
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">  
                    <label>
                        Housing Type:
                        <select name="housingType" value={this.props.housingType} onChange={this.handleChange}>
                            {Object.entries(this.housingTypes).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
        );
    }
}

export default HousingTypeFormField;
