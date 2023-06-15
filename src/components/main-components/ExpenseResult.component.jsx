import React from "react";

class ExpenseResult extends React.Component {
  render() {
    const { isLoading, expenseResult, salary, housingCost, childcareCost } = this.props;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (!isLoading && expenseResult !== null) {
      return (
        <div>
          <p>Thank you for using SwissCosts! Here is an overview of your estimated cost of living in Switzerland:</p>
          <p>Gross Salary: CHF {salary}</p>
          <p>Here are the detailed breakdown of your estimated costs:</p>
          <p></p>
          <p>Housing: CHF {housingCost}</p>
          <p>Childcare: CHF {childcareCost}</p>
          <p></p>
          <p>You can save: CHF {expenseResult}</p>
        </div>
      );  
    }

    // When it is not loading and there is no result, we return nothing.
    return null;
  }
}

export default ExpenseResult;
