import React from "react";
import { render } from "react-dom";

import { BasicTree } from "./BasicTree";
import { CustomTree } from "./CustomTree";
import Link from "./Link";

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="ml-3 mt-3">
          <h5>
            Manual Config - Custom Templates, Multi Selection with shift/ctrl
            keys
            <Link
              href={
                "https://github.com/PEsteves8/react-treekey/blob/master/examples/src/CustomTree.js"
              }
            />
          </h5>
        </div>
        <CustomTree />
        <hr></hr>
        <div className="ml-3 mt-3">
          <h5>
            No Config - Default Templates, Single Selection&nbsp;
            <Link
              href={
                "https://github.com/PEsteves8/react-treekey/blob/master/examples/src/BasicTree.js"
              }
            />
          </h5>
        </div>
        <BasicTree />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
