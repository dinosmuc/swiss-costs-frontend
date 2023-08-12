import React from 'react';
import Typewriter from 'react-typewriter';
import './ResultCard.scss';


const ResultCard = () => (
    <div className="result-card">
      <Typewriter typing={1} minDelay={5} maxDelay={10}>
      <div className="card-content">
        <h2 className="card-title">Living Cost Estimate</h2>
        <p className="card-p">Thank you for using SwissCosts! Based on the details you have provided, here is an overview of your estimated cost of living in Switzerland:</p>
        <p className="card-text">Gross Salary: <span className="currency">5000 CHF</span></p>
        <p className="card-text">Net Salary: <span className="currency">4500 CHF</span></p>
        <p className="card-p">Here are the detailed breakdown of your estimated costs:</p>
        <div className="card-text">
          <ul>
            <li>Housing: <span className="currency">1200 CHF</span></li>
            <li>Health Insurance: <span className="currency">400 CHF</span></li>
            <li>Transportation: Petrol car with Medium Fuel Consumption, driving a Medium Distance Daily <span className="currency">100 CHF</span></li>
            <li>Utilities: Medium <span className="currency">150 CHF</span></li>
            <li>Phone Plan: Standard <span className="currency">50 CHF</span></li>
            <li>Internet Plan: High-Speed <span className="currency">50 CHF</span></li>
            <li>Food Budget: Medium for Groceries, Dining Out Occasionally <span className="currency">600 CHF</span></li>
            <li>Clothing Budget: Medium <span className="currency">150 CHF</span></li>
            <li>Childcare: Daycare Center <span className="currency">800 CHF</span></li>
            <li>Education: Public School <span className="currency">0 CHF</span></li>
            <li>Entertainment and Leisure: Medium <span className="currency">300 CHF</span></li>
          </ul>
          <p>After accounting for all these estimated costs, you are left with <span className="currency">500 CHF</span> for savings or discretionary spending. Please note that these are rough estimates and actual costs may vary. We recommend doing a more detailed personal budget for more accurate planning. Keep exploring and living your best life in Switzerland!</p>
        </div>
      </div>
    </Typewriter>
  </div>
);

export default ResultCard;
