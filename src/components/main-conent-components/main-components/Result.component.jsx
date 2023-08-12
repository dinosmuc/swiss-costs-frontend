import React from "react";
import "./result.styles.scss";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: props.show };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.show !== prevState.show) {
      return { show: nextProps.show };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show && this.props.show) {
      this.node.classList.add("show");
    }
  }

  render() {
    let classes = "result";

    if (this.state.show) {
      classes += " show";
    }

    return (
      <div className={classes} ref={node => this.node = node}>
        <h2>Save: 500 CHF</h2>
      </div>
    );
  }
}

export default Result;
