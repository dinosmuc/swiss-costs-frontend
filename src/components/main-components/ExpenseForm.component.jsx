import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import ExpenseResult from './ExpenseResult.component';

import CantonFormField from '../expense-form-components/CantonFormField.component';
import MartialStatusFormField from '../expense-form-components/MartialStatusFormField.component';
import NumberOfChildrenFormField from '../expense-form-components/NumberOfChildrenFormField.component';
import ChurchMemberFormField from '../expense-form-components/ChurchMemberFormField.component'; 
import AgeFormField from '../expense-form-components/AgeFormField.component';
import SalaryJobFormField from '../expense-form-components/SalaryJobFormField.component';
import VehicleTypeFormField from '../expense-form-components/VehicleTypeFormField.component';
import PublicTransportFormField from '../expense-form-components/PublicTransportFormField.component';
import PhonePlanFormField from '../expense-form-components/PhonePlanFormField.component';
import InternetPlanFormField from '../expense-form-components/InternetPlanFormField.component';
import FoodBudgetFormField from '../expense-form-components/FoodBudgetFormField.component';
import ClothingBudgetFormField from '../expense-form-components/ClothingBudgetFormField.component';
import ChildCareOptionsFormField from '../expense-form-components/ChildCareOptionsFormField.component';
import EducationOptionFormField from '../expense-form-components/EducationOptionFormField.component';
import EntertainmentAndLeisureBudgetFormField from '../expense-form-components/EntertainmentAndLeisureBudgetFormField.component';
import HousingTypeFormField from '../expense-form-components/HousingTypeFormField.component';
import HealthInsuranceFormField from '../expense-form-components/HealthInsuranceFormField.component';
                


class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canton: 'Zürich',
      martialStatus: 'S',
      numChildren: 0,
      churchMember: 'not_church_member',
      age: 30,
      enterSalary: false,
      jobTitle: '',
      salary: 6000,
      housingType: '2.5_bedroom',
      healthInsurance: 'standard',
      vehicleType: 'combustion_vehicle',
      electricVehicle: {
        electricityConsumption: 'medium',
        distanceDriven: 'medium',
      },
      combustionVehicle: {
        fuelType: 'petrol',
        fuelConsumption: 'medium',
        distanceDriven: 'medium',
      },
      publicTransport: 'occasional',
      phonePlan: 'standard',
      internetPlan: 'standard',
      foodBudget: 'medium',
      clothingBudget: 'medium',
      childcare: 'none',
      education: 'university',
      entertainmentAndLeisure: 'medium',
      remaining_salary: null, 
      isLoading: false,
    };
  }

    
    
  
    
  handleChange = (event) => {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    // Split the name on period (".") if it exists
    const nameParts = name.split(".");
  
    if (nameParts.length === 2) { // if name is like "electricVehicle.distanceDriven"
      let [part1, part2] = nameParts;
      let obj = {...this.state[part1]}; // Create a new copy of the nested object
      obj[part2] = value; // Update the value in the copied object
      value = obj; // Set value to the updated copy
    }
  
    this.setState({
      [name]: value
    });
  }

  handleCheckboxChange = (enterSalary) => {
    this.setState({ enterSalary });
  }
  
  handleSalaryChange = (salary) => {
    this.setState({ salary });
  }
  
  handleJobChange = (jobTitle) => {
    this.setState({ jobTitle });
  }

  handleVehicleTypeChange = (vehicleType) => {
    this.setState({ vehicleType });
  }
  
  handleElectricVehicleChange = (electricVehicle) => {
    this.setState({ electricVehicle });
  }
  
  handleCombustionVehicleChange = (combustionVehicle) => {
    this.setState({ combustionVehicle });
  }
  
  handleSubmit = (event) => {
    event.preventDefault();

    
    let dataToSend = {
      user: {
          canton: this.state.canton,
          marital_status: this.state.martialStatus,
          num_children: this.state.numChildren,
          church_member: this.state.churchMember,
          age: this.state.age,
          // I noticed 'year' in the reference json but it's not present in your data. 
          // You might want to include it here if needed
      },
      job: {
          job_title: this.state.jobTitle
      },
      salary: this.state.salary,  // Change made here
      housingType: {
          type: this.state.housingType
      },
      healthInsurance: {
          coverage: this.state.healthInsurance
      },
      phonePlan: {
          plan: this.state.phonePlan
      },
      internetPlan: {
          plan: this.state.internetPlan
      },
      foodBudget: {
          budget: this.state.foodBudget
      },
      clothingBudget: {
          budget: this.state.clothingBudget
      },
      childcare: {
          childcare_type: this.state.childcare
      },
      education: {
          education_type: this.state.education
      },
      entertainmentAndLeisure: {
          budget: this.state.entertainmentAndLeisure
      }
  };
  
  // If the vehicleType is combustion_vehicle, include the corresponding fields
  if (this.state.vehicleType === 'combustion_vehicle') {
      if (this.state.combustionVehicle.fuelType === 'diesel') {
          dataToSend.combustionVehicle = {
              fuel_type: 'diesel',
              fuel_consumption: this.state.combustionVehicle.fuelConsumption,
              distance_driven: this.state.combustionVehicle.distanceDriven
          };
      } else if (this.state.combustionVehicle.fuelType === 'petrol') {
          dataToSend.combustionVehicle = {
              fuel_type: 'petrol',
              fuel_consumption: this.state.combustionVehicle.fuelConsumption,
              distance_driven: this.state.combustionVehicle.distanceDriven
          };
      }
  }
  
  // If the vehicleType is electric_vehicle, include the corresponding fields
  if (this.state.vehicleType === 'electric') {
      dataToSend.electricVehicle = {
          electricity_consumption: this.state.electricVehicle.electricityConsumption,
          distance_driven: this.state.electricVehicle.distanceDriven
      };
  }
  
  
    // If the vehicleType is electric_vehicle, include the corresponding fields
    if (this.state.vehicleType === 'electric') {
      dataToSend = {
        ...dataToSend,
        electricityConsumption: this.state.electricVehicle.electricityConsumption,
        distanceDriven: this.state.electricVehicle.distanceDriven
      };
    }
  
    console.log('Sending:', dataToSend);
  
    const jsonString = JSON.stringify(dataToSend);
    console.log(jsonString);
    
    // set isLoading to true when the request starts
    this.setState({ isLoading: true });
  
    fetch('http://localhost:8000/api/calculate_expenses/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonString,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        // Update the state with the fetched data
        this.setState({
          expenseResult: data.result,
          housingCost: data.housing_cost,
          childcareCost: data.childcare_cost,
          isLoading: false
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ isLoading: false });
      });
  }
    
    
    

  render() {
    return (
      <div>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <CantonFormField name="canton" onChange={this.handleChange} canton={this.state.canton} />
              </div>
              <div className='form-group'>
                <MartialStatusFormField name="maritalStatus" onChange={this.handleChange} />
              </div>
              <div className='form-group'>
                <NumberOfChildrenFormField name="numberOfChildren" onChange={this.handleChange} />  
              </div>
              <div className='form-group'>
                <ChurchMemberFormField name="churchMember" onChange={this.handleChange} />
              </div>
              <div className='form-group'>
                <AgeFormField name="age" onChange={this.handleChange} age={this.state.age} />
              </div>
              <div className='form-group'>
                <SalaryJobFormField 
                    enterSalary={this.state.enterSalary}
                    salary={this.state.salary}
                    jobTitle={this.state.jobTitle}
                    onCheckboxChange={this.handleCheckboxChange}
                    onSalaryChange={this.handleSalaryChange}
                    onJobChange={this.handleJobChange} />                                       
              </div>
              <div className='form-group'>
                <HousingTypeFormField name="housingType" onChange={this.handleChange} housingType={this.state.housingType}/>
              </div>
              <div className='form-group'>
                <HealthInsuranceFormField name="healthInsurance" onChange={this.handleChange} />
              </div>
              <div className='form-group'>
                <VehicleTypeFormField 
                    onVehicleTypeChange={this.handleVehicleTypeChange} 
                    handleElectricVehicleChange={this.handleElectricVehicleChange}
                    handleCombustionVehicleChange={this.handleCombustionVehicleChange} 
                />
              </div>
              <div className='form-group'>
                <PublicTransportFormField name="publicTransport" onChange={this.handleChange} publicTransport={this.state.publicTransport} />
              </div>
              <div className='form-group'>
                <PhonePlanFormField name="phonePlan" onChange={this.handleChange} phonePlan={this.state.phonePlan} />
              </div>
              <div className='form-group'>
                <InternetPlanFormField name="internetPlan" onChange={this.handleChange} internetPlan={this.state.internetPlan} />
              </div>
              <div className='form-group'>
                <FoodBudgetFormField name="foodBudget" onChange={this.handleChange} foodBudget={this.state.foodBudget} />
              </div>
              <div className='form-group'>
                <ClothingBudgetFormField name="clothingBudget" onChange={this.handleChange} clothingBudget={this.state.clothingBudget} />
              </div>
              <div className='form-group'>
                <ChildCareOptionsFormField name="childcare" onChange={this.handleChange} childcare={this.state.childcare} />
              </div>
              <div className='form-group'>
                <EducationOptionFormField name="education" onChange={this.handleChange} education={this.state.education} />
              </div>
              <div className='form-group'>
                <EntertainmentAndLeisureBudgetFormField name="entertainmentAndLeisure" onChange={this.handleChange} entertainmentAndLeisure={this.state.entertainmentAndLeisure} />
              </div>
              <div className='form-group'>
                <input type="submit" value="Submit" className="btn btn-primary" />
              </div>
            </form>

            <ExpenseResult isLoading={this.state.isLoading} 
                       expenseResult={this.state.expenseResult} 
                       salary={this.state.salary}
                       housingCost={this.state.housingCost}
                       childcareCost={this.state.childcareCost}    
            />

        </div>
        
        
    );
  }
}

export default ExpenseForm;