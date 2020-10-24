import React, {Component} from "react";
import { scaleLinear } from "d3-scale";
import {extent} from "d3-array"

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
        console.log(data)
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
                    style={{ fontSize: 12 }}
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

        const axis = xScale.ticks(10).map((d, i) => (
            <g className="x-tick" key={i}>
                <line
                    style={{ stroke: "#e4e5eb" }}
                    y1={0}
                    y2={height}
                    x1={xScale(d)}
                    x2={xScale(d)}
                />
                <text
                    style={{ textAnchor: "middle", fontSize: 12 }}
                    dy=".71em"
                    x={xScale(d)}
                    y={height + textPadding}
                >
                    {d}
                </text>
            </g>
        ));
        return <>{axis}</>;
    }

    scatter() {
        const data = this.randomData(),
            w = 600,
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
            .domain(extent(data, d => d.x))
            .range([0, width]);
        const yScale = scaleLinear()
            .domain(extent(data, d => d.y))
            .range([height, 0]);

        const circles = data.map((d, i) => (
            <circle
                key={i}
                r={5}
                cx={xScale(d.x)}
                cy={yScale(d.y)}
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

        return(
            <div>
                {this.scatter()}
            </div>
        )
    }

}
