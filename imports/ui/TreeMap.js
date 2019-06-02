import React, { Component } from 'react';

class TreeMap extends Component {
    constructor(props) {
        super(props);
        this.config = props.config;
        this.attributes = props.attributes
    }

    drawMap() {
        let data = this.config.data,
            groupBy = this.config.groupBy;
            console.log(this.attributes)
        // eslint-disable-next-line
        $("#viz").html('');
        let visualization = d3plus.viz()
            .container("#viz")
            .history(false)
            .title(false)
            .messages(false)
            .data(data)
            .type("tree_map")
            .id(this.attributes)
            .size(this.config.size)
            .resize(true)
            .draw();
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
        return (<div id="viz" onLoad={this.drawMap()}></div>);
    }
}

export default TreeMap;