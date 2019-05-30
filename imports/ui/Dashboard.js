import React, { Component } from 'react';

import PrivateHeader from './PrivateHeader';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    // this.config = props.config;
    this.state = {
      config: {
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
      },
      attributes: [],
      selectedAttributes: [],
      showGraph: true,
      drawGraph: true
    }
  }

  componentWillMount() {
    let arr = [], selectedArr = []
    Object.entries(this.state.config.data[0]).forEach(([key, value], index) => {
      arr.push({ key: key, checked: true })
      selectedArr.push(key)
    })
    arr = arr.filter((a) => (a.key != "value"))
    selectedArr = selectedArr.filter((a) => (a != "value"))
    this.setState({ attributes: arr, selectedAttributes: selectedArr })
  }

  drawMap() {
    let data = this.state.config.data,
      groupBy = this.state.config.groupBy;

    // eslint-disable-next-line
    // this.state.drawGraph ?
    d3plus.viz()
      .container("#viz")
      .history(false)
      .title(false)
      .messages(false)
      .data(data)
      .type("tree_map")
      .id(this.state.selectedAttributes)
      .size(this.state.config.size)
      .resize(true)
      .draw()
    // :null

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

  updateGraph(a) {
    var arr = this.state.attributes, attr = this.state.selectedAttributes
    for (var i = 0; i <= arr.length - 1; i++) {
      if (arr[i].key === a.key) {
        arr[i].checked = !a.checked;
      }
    }
    if (!a.checked) {
      attr = attr.filter((at) => at != a.key )
    }
    else {
      attr = attr.filter((at) => at != a.key )
      attr.push(a.key)
    }

    this.setState({ attributes: arr, selectedAttributes: attr, drawGraph: false }, () => {
      console.log(this.state.selectedAttributes)

      // d3plus.viz()
      //   .container('#viz')
      //   .id(this.state.selectedAttributes)
      //   .data(this.state.config.data)
      //   .size(this.state.config.size)
      //   .draw()
    })

  }

  render() {
    return (
      <div>
        <PrivateHeader title="Dashboard" />
        <div className="page-content">
          <div className="row">
            {this.state.attributes.map((a, i) => {
              return (<div key={i} className="column" >
                <input type="checkbox" name={i} value={a.key} onClick={() => this.updateGraph(a)} checked={a.checked} /><h6>{a.key}</h6>
              </div>)
            })}
          </div>
          <h3>
            {this.state.selectedAttributes.map((s, i) => {
              return (s + " --> ")
            })}
          </h3>
        </div>
        {/* {this.state.showGraph ?  */}
        <div className="graph" id="viz" onLoad={this.drawMap()}></div>
        {/* : <p>abc</p>} */}
      </div >
    );
  }
};

export default Dashboard
