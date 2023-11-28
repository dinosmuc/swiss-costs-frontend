import React from 'react';
import { Form, Card, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Button from "./button-components/Button.component"
import "./expenseForm.styles.scss";
import PropTypes from 'prop-types';


import CantonFormField from './expense-form-components/CantonFormField.component';
import MartialStatusFormField from './expense-form-components/MartialStatusFormField.component';
import NumberOfChildrenFormField from './expense-form-components/NumberOfChildrenFormField.component';
import ChurchMemberFormField from './expense-form-components/ChurchMemberFormField.component';
import AgeFormField from './expense-form-components/AgeFormField.component';
import SalaryJobFormField from './expense-form-components/SalaryJobFormField.component';
import VehicleTypeFormField from './expense-form-components/VehicleTypeFormField.component';
import PublicTransportFormField from './expense-form-components/PublicTransportFormField.component';
import PhonePlanFormField from './expense-form-components/PhonePlanFormField.component';
import InternetPlanFormField from './expense-form-components/InternetPlanFormField.component';
import FoodBudgetFormField from './expense-form-components/FoodBudgetFormField.component';
import ClothingBudgetFormField from './expense-form-components/ClothingBudgetFormField.component';
import ChildCareOptionsFormField from './expense-form-components/ChildCareOptionsFormField.component';
import EducationOptionFormField from './expense-form-components/EducationOptionFormField.component';
import EntertainmentAndLeisureBudgetFormField from './expense-form-components/EntertainmentAndLeisureBudgetFormField.component';
import HousingTypeFormField from './expense-form-components/HousingTypeFormField.component';
import HealthInsuranceFormField from './expense-form-components/HealthInsuranceFormField.component';


class ExpenseForm extends React.Component {


    render() {
        const { language } = this.props;

        return (
            <Card className="card-form mt-5 p-5">
                <Row>
                    <Col xs={{ span: 12 }} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
                        <Form onSubmit={this.props.onFormSubmit}>
                            <CantonFormField language={language} name="canton" onChange={this.props.handleChange} canton={this.props.canton} className="form-group-wrapper d-flex flex-column flex-md-row" />
                            <MartialStatusFormField language={language} name="martialStatus" onChange={this.props.handleChange} className="form-group-wrapper d-flex flex-column flex-md-row" />
                            <NumberOfChildrenFormField language={language} name="numChildren" onChange={this.props.handleChange} className="form-group-wrapper d-flex flex-column flex-md-row" />
                            <ChurchMemberFormField language={language} name="churchMember" onChange={this.props.handleChange} className="form-group-wrapper d-flex flex-column flex-md-row" />
                            <AgeFormField language={language} name="age" onChange={this.props.handleChange} age={this.props.age} className="form-group-wrapper d-flex flex-column flex-md-row" />
                            <SalaryJobFormField
                                language={language}
                                enterSalary={this.props.enterSalary}
                                salary={this.props.salary}
                                net_salary={this.props.net_salary}
                                jobTitle={this.props.jobTitle}
                                onCheckboxChange={this.props.handleCheckboxChange}
                                onSalaryChange={this.props.handleSalaryChange}
                                onJobChange={this.props.handleJobChange}
                                className="form-group-wrapper d-flex flex-column flex-md-row"
                            />
                            <HousingTypeFormField language={language} name="housingType" onChange={this.props.handleChange} canton={this.props.canton} housingType={this.props.housingType} className="form-group-wrapper d-flex flex-column flex-md-row" />
                            <HealthInsuranceFormField language={language} name="healthInsurance" onChange={this.props.handleChange} healthInsurance={this.props.healthInsurance} age={this.props.age} className="form-group-wrapper d-flex flex-column flex-md-row" />
                            <VehicleTypeFormField
                                language={language}
                                vehicleType={this.props.vehicleType}
                                electricVehicle={this.props.electricVehicle}
                                combustionVehicle={this.props.combustionVehicle}
                                onVehicleTypeChange={this.props.handleVehicleTypeChange}
                                handleElectricVehicleChange={this.props.handleElectricVehicleChange}
                                handleCombustionVehicleChange={this.props.handleCombustionVehicleChange}
                                className="form-group-wrapper d-flex flex-column flex-md-row"
                            />
                            <PublicTransportFormField language={language} name="publicTransport" onChange={this.props.handleChange} publicTransport={this.props.publicTransport} className="form-group-wrapper d-flex flex-column flex-md-row" />
                            <PhonePlanFormField language={language} name="phonePlan" onChange={this.props.handleChange} phonePlan={this.props.phonePlan} className="form-group-wrapper d-flex flex-column flex-md-row" />
                            <InternetPlanFormField language={language} name="internetPlan" onChange={this.props.handleChange} internetPlan={this.props.internetPlan} className="form-group-wrapper d-flex flex-column flex-md-row" />
                            <FoodBudgetFormField language={language} name="foodBudget" onChange={this.props.handleChange} foodBudget={this.props.foodBudget} className="form-group-wrapper d-flex flex-column flex-md-row" />
                            <ClothingBudgetFormField language={language} name="clothingBudget" onChange={this.props.handleChange} clothingBudget={this.props.clothingBudget} className="form-group-wrapper d-flex flex-column flex-md-row" />
                            <ChildCareOptionsFormField language={language} name="childcare" onChange={this.props.handleChange} childcare={this.props.childcare} className="form-group-wrapper d-flex flex-column flex-md-row" />
                            <EducationOptionFormField language={language} name="education" onChange={this.props.handleChange} education={this.props.education} className="form-group-wrapper d-flex flex-column flex-md-row" />
                            <EntertainmentAndLeisureBudgetFormField language={language} name="entertainmentAndLeisure" onChange={this.props.handleChange} entertainmentAndLeisure={this.props.entertainmentAndLeisure} className="form-group-wrapper d-flex flex-column flex-md-row" />
                            <div className="text-center">
                                <Button className="calculate-button">Calculate</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Card>
        );
    }

}
ExpenseForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
};

export default ExpenseForm;