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
  
    render() {
      return (
        <div className="main-content" key={this.state.key}>
          <div className="form">
            <ExpenseForm onFormSubmit={this.handleFormSubmit} />
          </div>
          <div ref={this.resultsRef}>  {/* Add the reference here */}
            {this.state.showResult && <Result />}
            {this.state.showResultCard && <ResultCard show={this.state.showResultCard} />}
          </div>
        </div>
      );
    }
  }
  
  export default MainContent;
  