import React, { Component } from 'react';

import PrivateHeader from './PrivateHeader';
import data from '../data/data.json'

class Dashboard extends Component {

  constructor(props) {
    super(props);
    // this.config = props.config;
    this.state = {
      config: data,
      attributes: [],
      selectedAttributes: []
    }
  }

  componentWillMount() {
    let arr = [], selectedArr = [], result = []
    // let formatData = JSON.parse(this.state.config.data)
    for (var i of this.state.config.data)
      result.push(i);

    Object.entries(this.state.config.data[0]).forEach(([key, value], index) => {
      arr.push({ key: key, checked: false })
      // selectedArr.push(key)
    })
    // arr = arr.filter((a) => (a.key != "value"))
    // selectedArr = selectedArr.filter((a) => (a != "value"))
    this.setState({ attributes: arr, selectedAttributes: selectedArr, config: result })
  }

  drawMap() {
    let data = this.state.config;
    console.log(data)
    // eslint-disable-next-line
    document.getElementById("viz").innerHTML = "";
    if (this.state.selectedAttributes.length) {
      let visualization = d3plus.viz()
        .container("#viz")
        .history(true)
        .title(false)
        .messages(false)
        .data(data)
        .type("tree_map")
        .id(this.state.selectedAttributes)
        .size("beta")
        .resize(true)
        .draw()
    }
    // $("#viz").html('')
    // let w = window;
    // window.handleBreadCrumb = function handleBreadCrumb(value, depth, states) {
    //   if (depth.previous === false && depth.value === 0) {
    //     document.getElementsByClassName("breadcrumb").innerHTML = "";
    //     w.breadcrumb = [];
    //   } else if (depth.previous < depth.value) {
    //     if (states && (states.length - 1 === w.breadcrumb.length)) {
    //       w.breadcrumb.push({ val: value });
    //     }
    //   } else if (depth.previous > depth.value) {
    //     w.breadcrumb.pop();
    //   }
    //   var breadcrumbContainer = document.getElementsByClassName("breadcrumb");
    //   breadcrumbContainer = breadcrumbContainer[0];
    //   if (w.breadcrumb.length) breadcrumbContainer.style.display = "block";
    //   else breadcrumbContainer.style.display = "none";
    // }
  }

  updateGraph(a) {
    var arr = this.state.attributes, attr = this.state.selectedAttributes
    for (var i = 0; i <= arr.length - 1; i++) {
      if (arr[i].key === a.key) {
        arr[i].checked = !a.checked;
      }
    }
    if (!a.checked) {
      attr = attr.filter((at) => at != a.key)
    }
    else {
      attr = attr.filter((at) => at != a.key)
      attr.push(a.key)
    }
    this.setState({ attributes: arr, selectedAttributes: attr, drawGraph: false })
  }

  render() {
    return (
      <div>
        <PrivateHeader title="Dashboard" />
        <div className="top-panel">
          <div className="inner-panel">
            <div className="row">
              {this.state.attributes.map((a, i) => {
                return (<div key={i} className="column" >
                  <h5><input type="checkbox" name={i} value={a.key} onClick={() => this.updateGraph(a)} checked={a.checked} />{" " + a.key}</h5>
                </div>)
              })}
            </div>
          </div>
        </div>
        <div />       
        <div className="top-panel">
          <div className="inner-panel-array">
            <h5 className="array">
              {this.state.selectedAttributes.map((s, i) => {
                return (s + " --> ")
              })}
            </h5>
          </div>
        </div>
        <div id="breadcrumb">
          <ul className="breadcrumb"></ul>
        </div>
        <div className="graph" id="viz" onLoad={this.drawMap()}></div>
      </div >
    );
  }
};

export default Dashboard
