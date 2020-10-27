import React, {Component} from "react";
import {transformTime} from "../helper/div";
import {numberWithCommas} from "../helper/div";

export default class Asteroid extends Component {

    static defaultProps = {
        id: '',
        name: '',
        missingDistance: 0,
        diameter: 0,
        timeUntilImpact: 0,
        timeOfImpact: 0,
        URLNasa: '',
    }



    render(){
        return(
            <div className={"asteroid"} key={this.props.id}>
                <div className={"asteroid-data"}>
                    <div> Name: {this.props.name}</div>
                    <div> ID: {this.props.id}</div>
                    <div>
                        Missing Earth by: {numberWithCommas(this.props.missingDistance)}km
                    </div>
                    <div>
                        Est. diameter: {this.props.diameter}m
                    </div>
                    <div>
                        Closest to earth by: {transformTime(this.props.timeOfImpact)} UTC
                    </div>
                </div>

            </div>
        )
    }
}
