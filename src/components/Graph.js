import React, {Component} from "react";
import Details from "./Details";
import { scaleLinear } from "d3-scale";
import {extent} from "d3-array"
import {pad, numberWithCommas} from "../helper/div";
//modeled this class after https://dev.to/julienassouline/let-s-get-started-with-react-and-d3-2nd7
//because I barely understand d3 to be honest
export default class Graph extends Component {

    static defaultProps ={
        graphData: [],
    }

    state={
        asteroidDetails: [],
        detailsActive : false
    }

    getDecimalTime(fullDate){
        let date = new Date(fullDate);
        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();
        return hours + minutes/60;
    }

    isFirst(index){
        if(index == 0){
            return true;
        }
        return false;
    }

    displayDetails(e, data){
        e.stopPropagation()
        this.setState({detailsActive : true})
        this.setState({asteroidDetails : data})
    }

    closeDetails(e){
        e.stopPropagation()
        this.setState({detailsActive : false})
    }

    axisLeft({ yScale, width}) {
        const textPadding = -100

        const axis = yScale.ticks(8).map((d, i) => (
            <g key={i} className={this.isFirst(i)?'first y-tick':'y-tick'}>
                <line
                    //style={{ stroke: "#e4e5eb" }}
                    y1={yScale(d)}
                    y2={yScale(d)}
                    x2={width}
                />
                <text
                    style={{ fontSize: 16, fill:"#FFFFFF" }}
                    x={textPadding}
                    dy=".32em"
                    y={yScale(d)}
                >
                    {numberWithCommas(d) + 'km'}
                </text>
            </g>
        ));
        return <>{axis}</>;
    }

    axisBottom({ xScale, height }) {
        const textPadding = 10;

        const axis = xScale.ticks(12).map((d, i) => (
            <g className={this.isFirst(i)?'first x-tick':'x-tick'} key={i}>
                <line
                    y1={0}
                    y2={height}
                    x1={xScale(d)}
                    x2={xScale(d)}
                />
                <text
                    style={{ textAnchor: "middle", fontSize: 16, fill:"#FFFFFF"}}
                    dy=".71em"
                    x={xScale(d)}
                    y={height + textPadding}
                >
                    {pad(d) + ':00'}
                </text>
            </g>
        ));
        return <>{axis}</>;
    }

    scatter() {
        const data = this.props.graphData,
            w = 1100,
            h = 600,
            margin = {
                top: 40,
                bottom: 40,
                left: 100,
                right: 20
            };
        const width = w - margin.right - margin.left,
            height = h - margin.top - margin.bottom;
        const xScale = scaleLinear()
            //we want absolute values in the domain because a day always has 24 hours
            //but sometimes the first asteroid doesn't show up until 03:00 or something
            .domain(extent([0, 24]))
            .range([0, width]);
        const yScale = scaleLinear()
            //.domain(extent(data, d => d.distance))
            .domain(extent([0, 80000000]))
            .range([height, 0]);

        const circles = data.map((d, i) => (
            <circle
                key={i}
                r={Math.min(Math.max(d.diameter/20, 5), 40)}
                cx={xScale(this.getDecimalTime(d.timeOfImpact))}
                cy={yScale(d.distance)}
                onClick={(event) => this.displayDetails(event, d)}
            />
        ));
        return(
            <div className={'d3-graph'}>
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
        if(this.state.detailsActive){
            return(
                <div onClick={(event) =>this.closeDetails(event)}>
                    {this.scatter()}
                    <Details asteroidData={this.state.asteroidDetails}/>
                </div>
            )
        }else{
            return(
                <div onClick={(event) =>this.closeDetails(event)}>
                    {this.scatter()}
                </div>
            )
        }

    }

}
