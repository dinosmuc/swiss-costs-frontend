import React from "react";
import "./main-content.styles.scss";
import ExpenseForm from "./main-components/ExpenseForm.component";
import Result from "./main-components/Result.component";
import ResultCard from "./main-components/ResultCard.component";


class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.resultsRef = React.createRef();  // Add this line to create a reference

    this.state = {
      showResult: false,
      showResultCard: false,
      key: 0,
      canton: 'Zürich',
      martialStatus: 'S',
      numChildren: 0,
      churchMember: 'not_church_member',
      age: 30,
      enterSalary: false,
      jobTitle: '',
      salary: 6000,
      net_salary: null,
      housingType: '2.5_bedroom',
      healthInsurance: 'standard_coverage',
      vehicleType: 'combustion',
      electricVehicle: {
        electricityConsumption: 'medium',
        distanceDriven: 'medium',
      },
      combustionVehicle: {
        fuelType: 'petrol',
        fuelConsumption: 'medium',
        distanceDriven: 'medium',
      },
      publicTransport: 'none',
      phonePlan: 'standard',
      internetPlan: 'standard',
      foodBudget: 'medium',
      clothingBudget: 'medium',
      childcare: 'none',
      education: 'university',
      entertainmentAndLeisure: 'medium',
      remaining_salary: null,
      isLoading: false,
      savings: 0,
    };
  }

  handleFormSubmit = () => {
    this.setState(prevState => ({
      showResult: true,
      showResultCard: true,
      key: prevState.key + 1
    }), () => {
      this.resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    });
  }

  handleChange = (event) => {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // Split the name on period (".") if it exists
    const nameParts = name.split(".");

    if (nameParts.length === 2) { // if name is like "electricVehicle.distanceDriven"
      let [part1, part2] = nameParts;
      let obj = { ...this.state[part1] }; // Create a new copy of the nested object
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
  setSavings = (newSavings) => {
    this.setState({ savings: newSavings });
  };




  render() {
    let vehicle_data;
    let endpoint;

    if (this.state.vehicleType === 'electric') {
      vehicle_data = this.state.electricVehicle;
      endpoint = '/costs/api/calculate_electric_vehicle_cost/';
    }
    else if (this.state.vehicleType === 'combustion') {
      vehicle_data = this.state.combustionVehicle;
      endpoint = '/costs/api/calculate_combustion_vehicle_cost/';
    }
    else {
      vehicle_data = null;
      endpoint = null;
    }

    return (
      <div className="main-content" key={this.state.key}>
        <div className="form">
          <ExpenseForm
            language={this.props.language}
            currensy={this.props.currensy}
            onFormSubmit={this.handleFormSubmit}
            canton={this.state.canton}
            martialStatus={this.state.martialStatus}
            numChildren={this.state.numChildren}
            churchMember={this.state.churchMember}
            age={this.state.age}
            enterSalary={this.state.enterSalary}
            jobTitle={this.state.jobTitle}
            salary={this.state.salary}
            net_salary={this.state.net_salary}
            housingType={this.state.housingType}
            healthInsurance={this.state.healthInsurance}
            vehicleType={this.state.vehicleType}
            electricVehicle={this.state.electricVehicle}
            combustionVehicle={this.state.combustionVehicle}
            publicTransport={this.state.publicTransport}
            phonePlan={this.state.phonePlan}
            internetPlan={this.state.internetPlan}
            foodBudget={this.state.foodBudget}
            clothingBudget={this.state.clothingBudget}
            childcare={this.state.childcare}
            education={this.state.education}
            entertainmentAndLeisure={this.state.entertainmentAndLeisure}
            remaining_salary={this.state.remaining_salary}
            isLoading={this.state.isLoading}
            handleChange={this.handleChange}
            handleCheckboxChange={this.handleCheckboxChange}
            handleSalaryChange={this.handleSalaryChange}
            handleJobChange={this.handleJobChange}
            handleVehicleTypeChange={this.handleVehicleTypeChange}
            handleElectricVehicleChange={this.handleElectricVehicleChange}
            handleCombustionVehicleChange={this.handleCombustionVehicleChange}

          />

        </div>
        <div ref={this.resultsRef}>  {/* Add the reference here */}
          {this.state.showResult && <Result
            savings={this.state.savings}
          />}
          {this.state.showResultCard && <ResultCard
            show={this.state.showResultCard}
            healthInsurance={this.state.healthInsurance}
            grossSalary={this.state.salary}
            canton={this.state.canton}
            housingType={this.state.housingType}
            age={this.state.age}
            publicTransport={this.state.publicTransport}
            phonePlan={this.state.phonePlan}
            internetPlan={this.state.internetPlan}
            foodBudget={this.state.foodBudget}
            clothingBudget={this.state.clothingBudget}
            childcare={this.state.childcare}
            educationCost={this.state.education}
            entertainmentAndLeisure={this.state.entertainmentAndLeisure}
            setSavings={this.setSavings}
            data={vehicle_data}
            endpoint={endpoint}
          />
          }
        </div>
      </div>
    );
  }
}

export default MainContent;
