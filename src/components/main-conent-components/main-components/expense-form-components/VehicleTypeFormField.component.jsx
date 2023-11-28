import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'react-bootstrap';
import '../expenseForm.styles.scss';

import { API_BASE_URL } from '../../../../config';

// Utility Functions/Constants
const electricityConsumptionOptions = {
    'low': 'Low (10-15 kWh/100km)',
    'medium': 'Medium (16-20 kWh/100km)',
    'high': 'High (21-25 kWh/100km)',
    'very_high': 'Very High (26+ kWh/100km)'
};

const distanceDrivenOptions = {
    'low': 'Low (10-20 km)',
    'medium': 'Medium (21-50 km)',
    'high': 'High (51-100 km)',
    'very_high': 'Very High (100+ km)'
};

const fuelTypeOptions = {
    'diesel': 'Diesel',
    'petrol': 'Petrol'
};

const fuelConsumptionOptions = {
    'low': 'Low (3-6 L/100km)',
    'medium': 'Medium (7-11 L/100km)',
    'high': 'High (12-16 L/100km)',
    'very_high': 'Very High (16+ L/100km)'
};

// DropdownField Component
const DropdownField = ({ label, name, options, value, onChange, textBelow, vehicleData }) => {


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
                <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute' }}>
                    {textBelow}
                </Form.Text>



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
const ElectricVehicleFields = ({ values, onChange, vehicleData }) => (
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
            textBelow={vehicleData && vehicleData.calculated_cost ? `- ${vehicleData.calculated_cost} CHF` : 'Calculating...'}

        />
    </div>
);

// CombustionVehicleFields Component
const CombustionVehicleFields = ({ values, onChange, vehicleData }) => (
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
            textBelow={vehicleData && vehicleData.calculated_cost ? `- ${vehicleData.calculated_cost} CHF` : 'Calculating...'}


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
            vehicleData: [],
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
        this.setState({ vehicleType: newVehicleType });
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

    printSelectedState = () => {
        let selectedState;

        if (this.state.vehicleType === "combustion") {
            selectedState = this.state.combustionVehicle;
        } else if (this.state.vehicleType === "electric") {
            selectedState = this.state.electricVehicle;
        }

        const stateAsJson = JSON.stringify(selectedState, null, 2); // Za formatiranje

    }

    sendDataToBackend = () => {
        let payload;

        if (this.state.vehicleType === "combustion") {
            payload = this.state.combustionVehicle;
        } else if (this.state.vehicleType === "electric") {
            payload = this.state.electricVehicle;
        }

        const endpoint = this.state.vehicleType === "combustion"
            ? '/costs/api/calculate_combustion_vehicle_cost/'
            : '/costs/api/calculate_electric_vehicle_cost/';

        fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ vehicleData: data });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    componentDidMount() {
        this.sendDataToBackend();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.vehicleType !== prevState.vehicleType ||
            JSON.stringify(this.state.electricVehicle) !== JSON.stringify(prevState.electricVehicle) ||
            JSON.stringify(this.state.combustionVehicle) !== JSON.stringify(prevState.combustionVehicle)) {
            this.sendDataToBackend();
        }


    }

    render() {
        this.printSelectedState();
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
                        vehicleData={this.state.vehicleData}
                    />
                )}

                {this.state.vehicleType === 'combustion' && (
                    <CombustionVehicleFields
                        values={this.state.combustionVehicle}
                        onChange={this.handleChangeCombustionVehicle}
                        vehicleData={this.state.vehicleData}
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