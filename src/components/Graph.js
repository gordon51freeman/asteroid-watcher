import React, {Component} from "react";
import { scaleLinear } from "d3-scale";
import {extent} from "d3-array"
import {transformTime} from "../helper/div";

//modeled this class after https://dev.to/julienassouline/let-s-get-started-with-react-and-d3-2nd7
//because I barely understand d3 to be honest
export default class Graph extends Component {

    static defaultProps ={
        graphData: [],
        index: 0
    }

    randomData() {
        const data = [...Array(100)].map((e, i) => {
            return {
                x: Math.random() * 40,
                y: Math.random() * 40,
                temparature: Math.random() * 500
            };
        });
        return data;
    }

    axisLeft({ yScale, width }) {
        const textPadding = -20

        const axis = yScale.ticks(5).map((d, i) => (
            <g key={i} className="y-tick">
                <line
                    style={{ stroke: "#e4e5eb" }}
                    y1={yScale(d)}
                    y2={yScale(d)}
                    x1={0}
                    x2={width}
                />
                <text
                    style={{ fontSize: 16, fill:"#FFFFFF" }}
                    x={textPadding}
                    dy=".32em"
                    y={yScale(d)}
                >
                    {d}
                </text>
            </g>
        ));
        return <>{axis}</>;
    }

    axisBottom({ xScale, height }) {
        const textPadding = 10;

        const axis = xScale.ticks(24).map((d, i) => (
            <g className="x-tick" key={i}>
                <text
                    style={{ textAnchor: "middle", fontSize: 16, fill:"#FFFFFF"}}
                    dy=".71em"
                    x={xScale(d)}
                    y={height + textPadding}
                >
                    {transformTime(d)}
                </text>
            </g>
        ));
        return <>{axis}</>;
    }

    scatter() {
        //const data = this.randomData(),
        const data = this.props.graphData,
            w = 1280,
            h = 600,
            margin = {
                top: 40,
                bottom: 40,
                left: 40,
                right: 40
            };
        const width = w - margin.right - margin.left,
            height = h - margin.top - margin.bottom;
        const xScale = scaleLinear()
            .domain(extent(data, d => d.timeOfImpact))
            .range([0, width]);
        const yScale = scaleLinear()
            .domain(extent(data, d => d.distance))
            .range([height, 0]);

        const circles = data.map((d, i) => (
            <circle
                key={i}
                r={Math.min(Math.max(d.diameter/20, 2), 30)}
                cx={xScale(d.timeOfImpact)}
                cy={yScale(d.distance)}
                style={{ fill: "lightblue"}}
            />
        ));
        return(
            <div>
                <svg width={w} height={h}>
                    <g transform={`translate(${margin.left},${margin.top})`}>
                        {circles}
                        {this.axisLeft({yScale, width})}
                        {this.axisBottom({xScale, height})}
                    </g>
                </svg>
            </div>
        )
    }

    render(){

        const {graphData} = this.props
        console.log(typeof(graphData[0].diameter))

        return(
            <div>
                {this.scatter()}
            </div>
        )
    }

}
