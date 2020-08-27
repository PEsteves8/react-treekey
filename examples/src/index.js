import React from "react";
import { render } from "react-dom";

import { BasicTree } from "./BasicTree";
import { CustomTree } from "./CustomTree";

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
       <CustomTree />
       <BasicTree />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
