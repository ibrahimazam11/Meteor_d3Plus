import React, { Component } from 'react';

import PrivateHeader from './PrivateHeader';
import data from '../data/data.json'
import { httpGet } from '../api/treemapData'

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      config: [],                    // json data for graph
      attributes: [],                  // array to initially display all attributes with checkboxes
      selectedAttributes: [],          // attributes selected by user are maintained in this array  
    }
  }

  componentWillMount() {
    let arr = [], selectedArr = [];

    httpGet.getTreemapData().then(function (resp) {     // get tree map data from api

      let data = []
      if (typeof resp.data === 'object') {          // checking type of data and converting into array if needed
        data.push(resp.data)
      }
      else {
        data = resp.data
      }

      Object.entries(data[0]).forEach(([key, value], index) => {
        arr.push({ key: key, checked: false })               // extracting all the attributes from the dataset and saving in array
        // selectedArr.push(key)
      })

      for (var i = 0; i <= arr.length - 1; i++) {     // pre-populating map with some data
        if (arr[i].key === "dividendYield" || arr[i].key === "marketcap" || arr[i].key === "avg30Volume") {
          arr[i].checked = true;
          selectedArr.push(arr[i].key)
        }
      }

      this.setState({ attributes: arr, selectedAttributes: selectedArr, config: data })   // setting state with data and pre-populated attributes to draw graph on button click

    }.bind(this)).catch(e => { console.log(e) })
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
        .data(data)                             // data from api
        .type("tree_map")                       // type of d3plus graph to display i.e. treemap
        .id(this.state.selectedAttributes)      // selected/checked attributes
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
    this.setState({ attributes: arr, selectedAttributes: selectedAttr })    // setting state with updated selected attributes to re-render the graph on button click
  }

  render() {
    return (
      <div>
        <PrivateHeader title="Dashboard" />
        <div className="scrollmenupad">      {/*top container for selecting attributes */}
          <h3>Select values to generate Tree Map</h3>
          <div className="scrollmenu">      { /* horizontal scroll container in which all the attributes are displayed */}
            {this.state.attributes.map((a, i) => {    // displays all attributes with checkboxes 
              return (
                <span key={i}><input type="checkbox" key={i + 'c'} name={i} value={a.key} onClick={() => this.updateGraph(a)} defaultChecked={a.checked}></input>{" "} <span key={i + 'k'} className="text-span">{a.key}</span></span>
              )
            })}
          </div>
        </div>
        <div />
        <div className="top-panel">
          <div className="inner-panel-array">
            <h5 className="array">
              {this.state.selectedAttributes.map((s, i) => {   // displays all the selected attributes 
                return <span key={i}>{s}  --> </span>
              })}
            </h5>
          </div>
        </div>
        <div className="button-container">
          <button className="button" onClick={() => this.drawMap()}>draw map</button>   { /* button to draw graph */}
        </div>
        <div className="graph" id="viz"></div>    { /* draws graph in this container */}
      </div >
    )
  }
}

export default Dashboard;
