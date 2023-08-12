import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'react-bootstrap';
import '../expenseForm.styles.scss';

// Utility Functions/Constants
const electricityConsumptionOptions = {
    'low': 'Low (10-15 kWh/100km)', 
    'medium': 'Medium (16-20 kWh/100km)', 
    'high': 'High (21-25 kWh/100km)', 
    'very_high': 'Very High (26+ kWh/100km)'
};

const distanceDrivenOptions = {
    'low': 'Low (0-20 km)', 
    'medium': 'Medium (21-50 km)', 
    'high': 'High (51-100 km)', 
    'very_high': 'Very High (100+ km)'
};

const fuelTypeOptions = {
    'diesel': 'Diesel', 
    'petrol': 'Petrol'
};

const fuelConsumptionOptions = {
    'low': 'Low (1-5 L/100km)', 
    'medium': 'Medium (6-10 L/100km)', 
    'high': 'High (11-15 L/100km)', 
    'very_high': 'Very High (16+ L/100km)'
};

// DropdownField Component
const DropdownField = ({ label, name, options, value, onChange, textBelow }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOptionChange = (event) => {
        onChange(event);
        setIsOpen(false); // Close the dropdown when an option is selected
    };

    const handleMouseDown = () => {
        setIsOpen(!isOpen);
    };

    const handleFocus = () => {
        setIsOpen(true);
    };

    const handleBlur = () => {
        setIsOpen(false);
    };

    return (
        <Form.Group as={Row} className="align-items-center form-group-wrapper">
            <Form.Label column sm={5} className="form-label-right">{label}:</Form.Label>
            <Col sm={6} className={`form-control-with-arrow ${isOpen ? 'open' : ''}`}>
                <div onMouseDown={handleMouseDown}>
                    <Form.Control 
                        as="select" 
                        name={name} 
                        value={value} 
                        onChange={handleOptionChange} // Use handleOptionChange instead of onChange
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="red-text"
                    >
                        {Object.entries(options).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </Form.Control>
                    <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
                </div>
                {textBelow && <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute'}}>{textBelow}</Form.Text>}
            </Col>
        </Form.Group>
    );
};


// VehicleTypeSelector Component
const VehicleTypeSelector = ({ value, onChange }) => (
    <DropdownField
        label="Vehicle Type"
        name="vehicleType"
        options={{
            'electric': 'Electric Vehicle',
            'combustion': 'Combustion Vehicle'
        }}
        value={value}
        onChange={onChange}
    />
);

// ElectricVehicleFields Component
const ElectricVehicleFields = ({ values, onChange }) => (
    <div>
        <DropdownField
            label="Electricity Consumption (Electric Vehicle)"
            name="electricityConsumption"
            options={electricityConsumptionOptions}
            value={values.electricityConsumption}
            onChange={onChange}
        />
        <DropdownField
            label="Distance Driven (Electric Vehicle)"
            name="distanceDriven"
            options={distanceDrivenOptions}
            value={values.distanceDriven}
            onChange={onChange}
            textBelow="- 250 CHF"
        />
    </div>
);

// CombustionVehicleFields Component
const CombustionVehicleFields = ({ values, onChange }) => (
    <div>
        <DropdownField
            label="Fuel Type (Combustion Vehicle)"
            name="fuelType"
            options={fuelTypeOptions}
            value={values.fuelType}
            onChange={onChange}
        />
        <DropdownField
            label="Fuel Consumption (Combustion Vehicle)"
            name="fuelConsumption"
            options={fuelConsumptionOptions}
            value={values.fuelConsumption}
            onChange={onChange}
        />
        <DropdownField
            label="Distance Driven (Combustion Vehicle)"
            name="distanceDriven"
            options={distanceDrivenOptions}
            value={values.distanceDriven}
            onChange={onChange}
            textBelow="- 250 CHF"
        />
    </div>
);

// Main VehicleTypeFormField Component
class VehicleTypeFormField extends React.Component {
    constructor(props) {
        super(props);
        const defaultCombustionVehicle = { 
            fuelType: "petrol", 
            fuelConsumption: "medium", 
            distanceDriven: "medium" 
        };
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
            <Form.Group controlId="vehicleTypeForm">
                <VehicleTypeSelector 
                    value={this.state.vehicleType} 
                    onChange={this.handleChange} 
                />
    
                {this.state.vehicleType === 'electric' && (
                    <ElectricVehicleFields 
                        values={this.state.electricVehicle} 
                        onChange={this.handleChangeElectricVehicle} 
                    />
                )}
    
                {this.state.vehicleType === 'combustion' && (
                    <CombustionVehicleFields 
                        values={this.state.combustionVehicle} 
                        onChange={this.handleChangeCombustionVehicle}
                    />
                )}
            </Form.Group>
        );
    }

}


// PropTypes
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

// Exports
export default VehicleTypeFormField;
