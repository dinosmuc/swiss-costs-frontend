import React, { useState, useEffect } from 'react';
import Typewriter from 'react-typewriter';
import './ResultCard.scss';

import { API_BASE_URL } from '../../../config';


const ResultCard = (props) => {

  const [nettSalary, setNettSalary] = useState(0);
  const [grossSalary, setGrossSalary] = useState(props.grossSalary);

  const [housingCost, setHousingCost] = useState(0);
  const [healthInsurance, setHelthInsuraceCost] = useState(0);
  const [vehicleCost, setVehicleCost] = useState(0);
  const [publicTransportCost, setPublicTransportCost] = useState(0);
  const [phonePlaneCost, setPhonePlaneCost] = useState(0);
  const [internetPlanCost, setInternetPlanCost] = useState(0);
  const [foodBudget, setFoodBudgetCost] = useState(0);
  const [clothingBudget, setClothingBudgetCost] = useState(0);
  const [childCare, setChildcareCost] = useState(0);
  const [educationCost, setEducationCost] = useState(0);
  const [entertainmentAndLeisureCost, setEntertainmentAndLeisureCost] = useState(0);
  const [savings, setSavings] = useState(0);







  const fetchHousingCostEstimate = async (canton, housingType) => {
    try {
      const response = await fetch(`${API_BASE_URL}/costs/api/calculate_housing_cost/?housing_Type=${housingType}&canton=${canton}`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();

      setHousingCost(data.cost);  // Adjust the 'cost' to whatever field your API actually uses
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };



  useEffect(() => {
    // Pretpostavlja se da su canton i housingType dostupni kao props 
    fetchHousingCostEstimate(props.canton, props.housingType);
  }, []);


  const fetchNettSalaryEstimate = async (salary) => {
    try {
      const response = await fetch(`${API_BASE_URL}/costs/api/calculate_neto_salary/?bruto_salary=${salary}`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();


      setNettSalary(data.neto_salary);  // Adjust the 'cost' to whatever field your API actually uses
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };



  useEffect(() => {
    // Pretpostavlja se da su canton i housingType dostupni kao props
    fetchNettSalaryEstimate(props.grossSalary);
  }, []);


  const fetchHelthInsuraceCostEstimate = async (coverage, age) => {
    try {
      const response = await fetch(`${API_BASE_URL}/costs/api/calculate_insurance_cost/?age=${age}&coverage=${coverage}`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();


      setHelthInsuraceCost(data.cost);  // Adjust the 'cost' to whatever field your API actually uses
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };



  useEffect(() => {
    // Pretpostavlja se da su canton i housingType dostupni kao props
    fetchHelthInsuraceCostEstimate(props.healthInsurance, props.age);
  }, []);




  const fetchPublicTransportCost = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/costs/api/public_transport/`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();

      // Pretpostavimo da je props.publicTransport 'none'
      const selectedData = data.find(item => item.usage === props.publicTransport);
      if (selectedData) {
        setPublicTransportCost(selectedData.value);
      } else {
        console.error('Nema podataka za odabrani usage:', props.publicTransport);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPublicTransportCost();
  }, [props.publicTransport]);


  const fetchPhonePlanCost = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/costs/api/phone_plan/`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();

      const selectedData = data.find(item => item.plan === props.phonePlan);

      if (selectedData) {

        setPhonePlaneCost(selectedData.value);
      } else {
        console.error('Nema podataka za odabrani usage:', props.publicTransport);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPhonePlanCost();
  }, [props.phonePlan]);

  const fetchInternetPlanCost = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/costs/api/internet_plan/`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();

      const selectedData = data.find(item => item.plan === props.phonePlan);

      if (selectedData) {

        setInternetPlanCost(selectedData.value);
      } else {
        console.error('Nema podataka za odabrani usage:', props.publicTransport);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchInternetPlanCost();
  }, [props.internetPlan]);


  const fetchFoodBudgetCost = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/costs/api/food_budget/`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      const selectedData = data.find(item => item.budget === props.foodBudget);

      if (selectedData) {

        setFoodBudgetCost(selectedData.value);
      } else {
        console.error('Nema podataka za odabrani usage:', props.foodBudget);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchFoodBudgetCost();
  }, [props.foodBudget]);

  const fetchClothingBudgetCost = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/costs/api/clothing_budget/`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();

      const selectedData = data.find(item => item.budget === props.clothingBudget);
      if (selectedData) {
        setClothingBudgetCost(selectedData.value);
      } else {
        console.error('Nema podataka za odabrani usage:', props.clothingBudget);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchClothingBudgetCost();
  }, [props.clothingBudget]);

  const fetchChildcareCost = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/costs/api/childcare/`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();

      const selectedData = data.find(item => item.childcare_type === props.childcare);
      if (selectedData) {
        setChildcareCost(selectedData.value);
      } else {
        console.error('Nema podataka za odabrani usage:', props.childcare);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchChildcareCost();
  }, [props.childcare]);

  const fetchEducationCost = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/costs/api/education/`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();

      const selectedData = data.find(item => item.education_type === props.educationCost);
      if (selectedData) {
        setEducationCost(selectedData.value);
      } else {
        console.error('Nema podataka za odabrani usage:', props.educationCost);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchEducationCost();
  }, [props.educationCost]);

  const fetchEntertainmentAndLeisureCost = async () => {


    try {
      const response = await fetch(`${API_BASE_URL}/costs/api/entertainment_and_leisure/`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();

      const selectedData = data.find(item => item.budget === props.entertainmentAndLeisure);

      if (selectedData) {
        setEntertainmentAndLeisureCost(selectedData.value);
      } else {
        console.error('Nema podataka za odabrani usage:', props.entertainmentAndLeisure);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchEntertainmentAndLeisureCost();
  }, [props.entertainmentAndLeisure]);


  const fetchVehicleCostData = () => {
    let payload;

    payload = props.data;


    const endpoint = props.endpoint;

    console.log("endpoint:", endpoint);


    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setVehicleCost(data.calculated_cost);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    fetchVehicleCostData();
  }, [props.data, props.endpoint]);






  // Inside ResultCard component

  const updateSavings = () => {
    //console.log("DATA:", props.data);
    // Convert all values to float numbers for safe arithmetic operations
    const totalExpenses = parseFloat(housingCost) + parseFloat(healthInsurance) + parseFloat(vehicleCost) + parseFloat(publicTransportCost) + parseFloat(phonePlaneCost) + parseFloat(internetPlanCost) + parseFloat(foodBudget) + parseFloat(clothingBudget) + parseFloat(childCare) + parseFloat(educationCost) + parseFloat(entertainmentAndLeisureCost);

    // Calculate new savings
    const newSavings = parseFloat(nettSalary) - totalExpenses;

    // Update local state
    setSavings(newSavings);

    // Update parent state
    props.setSavings(newSavings);
  };






  useEffect(() => {
    updateSavings();

  }, [nettSalary, housingCost, healthInsurance, vehicleCost, publicTransportCost, phonePlaneCost, internetPlanCost, foodBudget, clothingBudget, childCare, educationCost, entertainmentAndLeisureCost, props.data]);





  const gross_salary = Math.floor(grossSalary).toString();
  const nett_salary = Math.floor(nettSalary).toString();

  const housing_cost = Math.floor(housingCost).toString();
  const health_insurance = Math.floor(healthInsurance).toString();
  const vehicle_cost = Math.floor(vehicleCost).toString();
  const public_transport_cost = Math.floor(publicTransportCost).toString();
  const phone_plan_cost = Math.floor(phonePlaneCost).toString();
  const internet_plan_cost = Math.floor(internetPlanCost).toString();
  const food_budget = Math.floor(foodBudget).toString();
  const clothing_budget = Math.floor(clothingBudget).toString();
  const childcare = Math.floor(childCare).toString();
  const education_cost = Math.floor(educationCost).toString();
  const entertainment_and_leisure = Math.floor(entertainmentAndLeisureCost).toString();
  const save = Math.floor(savings).toString();



  return (
    <Typewriter typing={1} minDelay={5} maxDelay={10}>
      <div className="result-card">

        <div className="card-content">
          <h2 className="card-title">Living Cost Estimate</h2>
          <p className="card-p">Thank you for using SwissCosts! Based on the details you have provided, here is an overview of your estimated cost of living in Switzerland:</p>
          <p className="card-text">Gross Salary: {gross_salary} CHF <span className="currency"></span></p>
          <p className="card-text">Net Salary: {nett_salary} CHF<span className="currency"></span></p>
          <p className="card-p">Here are the detailed breakdown of your estimated costs:</p>
          <div className="card-text">
            <ul>
              <li>Housing: <span className="currency">{housing_cost} CHF</span></li>
              <li>Health Insurance: <span className="currency">{health_insurance} CHF</span></li>
              <li>Vehicle: <span className="currency">{vehicle_cost} CHF</span></li>
              <li>Public Transport: <span className="currency">{public_transport_cost} CHF</span></li>
              <li>Phone Plan: <span className="currency">{phone_plan_cost} CHF</span></li>
              <li>Internet Plan: <span className="currency">{internet_plan_cost} CHF</span></li>
              <li>Food Budget: <span className="currency">{food_budget} CHF</span></li>
              <li>Clothing Budget: <span className="currency">{clothing_budget} CHF</span></li>
              <li>Childcare:  <span className="currency">{childcare} CHF</span></li>
              <li>Education:  <span className="currency">{education_cost} CHF</span></li>
              <li>Entertainment and Leisure: <span className="currency">{entertainment_and_leisure} CHF</span></li>
            </ul>
            <p>After accounting for all these estimated costs, you are left with <span className="currency">{save} CHF</span> for savings or discretionary spending. Please note that these are rough estimates and actual costs may vary. We recommend doing a more detailed personal budget for more accurate planning. Keep exploring and living your best life in Switzerland!</p>
          </div>
        </div>

      </div>
    </Typewriter>
  )
}

export default ResultCard;