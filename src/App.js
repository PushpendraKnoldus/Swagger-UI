import React, { Component } from "react";
import "./App.css";
import SwaggerUI from "swagger-ui";
import Config from "./organization_config.json";
import Sidebar from "./Sidebar.js";
import "../node_modules/swagger-ui/dist/swagger-ui.css";
import { mockData } from "./APIURL";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationConfig: null,
      definitionList: null,
      definitionLink: "https://backend-qa.knoldus.com/api-docs/swagger.json",
    };
    this.swaggerhub = this.swaggerhub.bind(this);
    this.getOrganizationData = this.getOrganizationData.bind(this);
    this.updateDefinitionLink = this.updateDefinitionLink.bind(this);
  }

  componentWillMount() {
    this.setState({
      organizationConfig: Config.orgData,
    });
  }

  componentDidUpdate() {
    SwaggerUI({
      domNode: document.getElementById("api-data"),
      url: this.state.definitionLink,
    });
  }

  swaggerhub(inputMethod, inputResource, inputParams) {
    let url = "";
    if (inputParams) {
      url =
        "https://api.swaggerhub.com/apis/" + inputResource + "?" + inputParams;
    } else {
      url = "https://api.swaggerhub.com/apis/" + inputResource;
    }

    return fetch(url, {
      method: inputMethod,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("There was an issue requesting the API");
      })
      .then((json) => {
        return json;
      });
  }

  getOrganizationData(organization) {
    let inputParams = "page=0&limit=10&sort=NAME&order=ASC";
    let inputResource = organization;

    this.swaggerhub("GET", inputResource, inputParams).then((response) => {
      this.setState({
        definitionList: mockData,
      });
    });
  }

  updateDefinitionLink(newLink) {
    this.setState({
      definitionLink: newLink,
    });
  }

  render() {
    return (
      <div className="App">
        <Sidebar
          organizationConfig={this.state.organizationConfig}
          definitionList={this.state.definitionList}
          updateDefinitionLink={this.updateDefinitionLink}
          getOrganizationData={this.getOrganizationData}
        />
        <div id="api-data" />
      </div>
    );
  }
}

export default App;
