import React, { Component } from 'react';

import PrivateHeader from './PrivateHeader';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    // this.config = props.config;
  }

  drawMap() {
    let config = {
      "data": [
        {
          "key": "Afghanistan",
          "region": "Asia",
          "subregion": "Southern Asia",
          "value": 25500100
        },
        {
          "key": "Åland Islands",
          "region": "Europe",
          "subregion": "Northern Europe",
          "value": 2821977
        },
        {
          "key": "Albania",
          "region": "Europe",
          "subregion": "Southern Europe",
          "value": 2821977
        },
        {
          "key": "Algeria",
          "region": "Africa",
          "subregion": "Northern Africa",
          "value": 37900000
        },
        {
          "key": "American Samoa",
          "region": "Oceania",
          "subregion": "Polynesia",
          "value": 55519
        },
        {
          "key": "Andorra",
          "region": "Europe",
          "subregion": "Southern Europe",
          "value": 76246
        }
      ],
      groupBy: ["region", "subregion", "key"],
      size: "value"
    };
    let data = config.data,
      groupBy = config.groupBy;
    alert()
    // eslint-disable-next-line
    let visualization = d3plus.viz()
      .container("#viz")
      .history(false)
      .title(false)
      .messages(false)
      .data(data)
      .type("tree_map")
      .id(groupBy)
      .size(config.size)
      .resize(true)
      .draw();
    alert("here")
    let w = window;
    window.handleBreadCrumb = function handleBreadCrumb(value, depth, states) {
      if (depth.previous === false && depth.value === 0) {
        document.getElementsByClassName("breadcrumb").innerHTML = "";
        w.breadcrumb = [];
      } else if (depth.previous < depth.value) {
        if (states && (states.length - 1 === w.breadcrumb.length)) {
          w.breadcrumb.push({ val: value });
        }
      } else if (depth.previous > depth.value) {
        w.breadcrumb.pop();
      }
      var breadcrumbContainer = document.getElementsByClassName("breadcrumb");
      breadcrumbContainer = breadcrumbContainer[0];
      if (w.breadcrumb.length) breadcrumbContainer.style.display = "block";
      else breadcrumbContainer.style.display = "none";
    };
  };

  render() {
    return (
      <div>
        <PrivateHeader title="Dashboard" />
        <div className="page-content">
          Dashboard page content.
      </div>
        <div id="viz" onLoad={this.drawMap()}></div>
      </div >
    );
  }
};

export default Dashboard
