import React from "react";
import APILink from "./APILink.js";
import Logo from "./assets/Knoldus-logo.png";

const Sidebar = (props) => {
  debugger;
  let organizationConfig = props.organizationConfig;
  let apiLinks = [];

  if (props.definitionList === null) {
    props.getOrganizationData(organizationConfig.orgName);
  } else {
    for (let i = 0; i < props.definitionList.length; i++) {
      debugger;
      if (props.definitionList[i].properties[1].value === "true") {
        apiLinks.push(
          <APILink
            key={i}
            apiLinkData={props.definitionList[i]}
            updateDefinitionLink={props.updateDefinitionLink}
          />
        );
      }
    }
  }

  console.log(apiLinks);

  return (
    <div className="side-bar">
      <div className="side-bar-header">
        <img src={Logo} alt="logo" />
        <h1>{organizationConfig.displayName}</h1>
        <h3>{organizationConfig.displayTag}</h3>
      </div>
      <div className="side-bar-body">
        <h3>API DOCS</h3>
        {apiLinks}
      </div>
    </div>
  );
};

export default Sidebar;
