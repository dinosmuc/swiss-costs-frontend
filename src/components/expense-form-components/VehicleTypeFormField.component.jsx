import React from "react";
import PropTypes from 'prop-types';

class VehicleTypeFormField extends React.Component {
    constructor(props) {
        super(props);
        const defaultCombustionVehicle = { fuelType: "petrol", fuelConsumption: "medium", distanceDriven: "medium" };
        const combustionVehicle = {
        ...defaultCombustionVehicle,
        ...props.combustionVehicle,
        };

        this.state = {
            vehicleType: props.vehicleType || "combustion",
            electricVehicle: props.electricVehicle || {
                electricityConsumption: "medium",
                distanceDriven: "medium"
            },
            combustionVehicle
        };
    

        this.electricityConsumptionOptions = {
            'low': 'Low (10-15 kWh/100km)', 
            'medium': 'Medium (16-20 kWh/100km)', 
            'high': 'High (21-25 kWh/100km)', 
            'very_high': 'Very High (26+ kWh/100km)'
        };

        this.distanceDrivenOptions = {
            'low': 'Low (0-20 km)', 
            'medium': 'Medium (21-50 km)', 
            'high': 'High (51-100 km)', 
            'very_high': 'Very High (100+ km)'
        };

        this.fuelTypeOptions = {
            'diesel': 'Diesel', 
            'petrol': 'Petrol'
        };

        this.fuelConsumptionOptions = {
            'low': 'Low (1-5 L/100km)', 
            'medium': 'Medium (6-10 L/100km)', 
            'high': 'High (11-15 L/100km)', 
            'very_high': 'Very High (16+ L/100km)'
        };
    }

    handleChange = (event) => {
        const newVehicleType = event.target.value;
        this.setState({vehicleType: newVehicleType});
        this.props.onVehicleTypeChange(newVehicleType);
    }
    
    handleChangeElectricVehicle = (event) => {
        const newState = {
            ...this.state.electricVehicle,
            [event.target.name]: event.target.value
        };
    
        this.setState({
            electricVehicle: newState
        });
    
        this.props.handleElectricVehicleChange(newState);
    }
    
    handleChangeCombustionVehicle = (event) => {
        const newState = {
            ...this.state.combustionVehicle,
            [event.target.name]: event.target.value
        };
    
        this.setState({
            combustionVehicle: newState
        });
    
        this.props.handleCombustionVehicleChange(newState);
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <label>
                        Vehicle Type:
                        <select name="vehicleType" value={this.state.vehicleType} onChange={this.handleChange}>
                            <option value="electric">Electric Vehicle</option>
                            <option value="combustion">Combustion Vehicle</option>
                        </select>
                    </label>
    
                    {this.state.vehicleType === 'electric' && (
                        <div>
                            <label>
                                Electricity Consumption (Electric Vehicle):
                                <select name="electricityConsumption" value={this.state.electricVehicle.electricityConsumption} onChange={this.handleChangeElectricVehicle}>
                                    {Object.entries(this.electricityConsumptionOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Distance Driven (Electric Vehicle):
                                <select name="distanceDriven" value={this.state.electricVehicle.distanceDriven} onChange={this.handleChangeElectricVehicle}>
                                    {Object.entries(this.distanceDrivenOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    )}
    
                    {this.state.vehicleType === 'combustion' && (
                        <div>
                            <label>
                                Fuel Type (Combustion Vehicle):
                                <select name="fuelType" value={this.state.combustionVehicle.fuelType} onChange={this.handleChangeCombustionVehicle}>
                                    {Object.entries(this.fuelTypeOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Fuel Consumption (Combustion Vehicle):
                                <select name="fuelConsumption" value={this.state.combustionVehicle.fuelConsumption} onChange={this.handleChangeCombustionVehicle}>
                                    {Object.entries(this.fuelConsumptionOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Distance Driven (Combustion Vehicle):
                                <select name="distanceDriven" value={this.state.combustionVehicle.distanceDriven} onChange={this.handleChangeCombustionVehicle}>
                                    {Object.entries(this.distanceDrivenOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    )}
                </div>
            </div>
        );
    }      
}

VehicleTypeFormField.propTypes = {
    vehicleType: PropTypes.string,
    electricVehicle: PropTypes.shape({
        electricityConsumption: PropTypes.string,
        distanceDriven: PropTypes.string,
    }),
    combustionVehicle: PropTypes.shape({
        fuelType: PropTypes.string,
        fuelConsumption: PropTypes.string,
        distanceDriven: PropTypes.string,
    }),
    onVehicleTypeChange: PropTypes.func.isRequired,
    handleElectricVehicleChange: PropTypes.func.isRequired,
    handleCombustionVehicleChange: PropTypes.func.isRequired,
};

export default VehicleTypeFormField