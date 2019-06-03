import React, { Component } from 'react';

import PrivateHeader from './PrivateHeader';
import data from '../data/data.json'

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      config: data,                    // json data for graph
      attributes: [],                  // array to initially display all attributes with checkboxes
      selectedAttributes: []          // attributes selected by user are maintained in this array  
    }
  }

  componentWillMount() {
    let arr = [], selectedArr = [], result = []

    for (var i of this.state.config.data)         // converting json data to lean array
      result.push(i);

    Object.entries(this.state.config.data[0]).forEach(([key, value], index) => {
      arr.push({ key: key, checked: false })                                // extracting all the attributes from the dataset and saving in array
      // selectedArr.push(key)
    })
    // arr = arr.filter((a) => (a.key != "value"))
    // selectedArr = selectedArr.filter((a) => (a != "value"))
    this.setState({ attributes: arr, selectedAttributes: selectedArr, config: result })
  }

  drawMap() {                 /********** Draw and Update TreeMap ************/
    let data = this.state.config;
    // eslint-disable-next-line
    document.getElementById("viz").innerHTML = "";            //clear container before updating graph
    if (this.state.selectedAttributes.length) {
      let visualization = d3plus.viz()          // draw graph on the basis of dataset and selected attributes by user
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
  }

  updateGraph(data) {     /***** updates user selection of checkboxes and selected attributes array *****/
    var arr = this.state.attributes, selectedAttr = this.state.selectedAttributes
    for (var i = 0; i <= arr.length - 1; i++) {         // check / uncheck values selected by user
      if (arr[i].key === data.key) {
        arr[i].checked = !data.checked;
      }
    }
    if (!data.checked) {                          // manage selected attributes array
      selectedAttr = selectedAttr.filter((at) => at != data.key)
    }
    else {
      selectedAttr = selectedAttr.filter((at) => at != data.key)
      selectedAttr.push(data.key)
    }
    this.setState({ attributes: arr, selectedAttributes: selectedAttr }, () => {
      console.log(this.state.selectedAttributes)
    })
  }

  render() {
    return (
      <div>
        <PrivateHeader title="Dashboard" />
        <div className="top-panel">
          <div className="inner-panel">
            <div className="row">
              {this.state.attributes.map((a, i) => {        // displays all attributes with checkboxes
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
            <h5>
              {this.state.selectedAttributes.map((s, i) => {      // displays all the selected attributes
                return (s + " --> ")
              })}
            </h5>
          </div>
        </div>
        <div id="breadcrumb">
          <ul className="breadcrumb"></ul>
        </div>
        <div className="graph" id="viz" onLoad={this.drawMap()}></div>    { /* draw graph in container */}
      </div >
    );
  }
};

export default Dashboard
