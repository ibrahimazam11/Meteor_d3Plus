import React, { Component } from 'react';

import PrivateHeader from './PrivateHeader';
import data from '../data/data.json'
import { httpGet } from '../api/treemapData'

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      config: data,                    // json data for graph
      attributes: [],                  // array to initially display all attributes with checkboxes
      selectedAttributes: [],          // attributes selected by user are maintained in this array  
      check: false
    }
  }

  componentWillMount() {
    let arr = [], selectedArr = [], result = []

    httpGet.getTreemapData().then(function (resp) {     // get tree map data from api
      console.log(resp.data)
      // this.setState({ config: resp.data})

      for (var i of this.state.config.data)         // converting json data to lean array
        result.push(i);

      Object.entries(this.state.config.data[0]).forEach(([key, value], index) => {
        arr.push({ key: key, checked: false })                                // extracting all the attributes from the dataset and saving in array
        // selectedArr.push(key)
      })

      for (var i = 0; i <= arr.length - 1; i++) {     // pre-populating map with some data
        if (arr[i].key === "dividendYield" || arr[i].key === "marketcap" || arr[i].key === "avg30Volume") {
          arr[i].checked = true;
          selectedArr.push(arr[i].key)
        }
      }

      this.setState({ attributes: arr, selectedAttributes: selectedArr, config: result })

    }).catch(e => { console.log(e) })
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
        <div className="scrollmenupad">
          <h3>Select values to generate Tree Map</h3>
          <div className="scrollmenu">
            {this.state.attributes.map((a, i) => {    // displays all attributes with checkboxes 
              return (
                <span><input type="checkbox" name={i} value={a.key} onClick={() => this.updateGraph(a)} checked={a.checked}></input>{" "} <span className="text-span">{a.key}</span></span>
              )
            })}
          </div>
        </div>
        <div />
        <div className="top-panel">
          <div className="inner-panel-array">
            <h5 className="array">
              {this.state.selectedAttributes.map((s, i) => {    // displays all the selected attributes 
                return (s + " --> ")
              })}
            </h5>
          </div>
        </div>
        <div className="button-container">
          <button className="button" onClick={() => this.drawMap()}>draw map</button>   { /* button to draw graph */}
        </div>
        <div id="breadcrumb">
          <ul className="breadcrumb"></ul>
        </div>
        <div className="graph" id="viz"></div>    { /* draws graph in this container */}
      </div >
    )
  }
}

export default Dashboard;
