import React, {Component} from "react";
import {transformTime, numberWithCommas} from "../helper/div";

export default class Graph extends Component {

    static defaultProps ={
        asteroidData: [],
    }


    render(){
        const { asteroidData } = this.props
        return(
            <div className={"details-window"}>
                <div>Name: {asteroidData.name}</div>
                <div>Distance: {numberWithCommas(asteroidData.distance) + 'km'}</div>
                <div> Diameter: {asteroidData.diameter}m</div>
                <div>Closest to earth by: {transformTime(asteroidData.timeOfImpact)}</div>
            </div>
        )
    }
}
