import React, {Component} from "react";
import {transformTime} from "../helper/div";

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

    //i nicked this function from stackoverflow
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    }

    render(){
        return(
            <a href={this.props.URLNasa} target={"_blank"} rel={"noopener noreferrer"} className={"asteroid"} key={this.props.id}>
                <div className={"asteroid-data"}>
                    <div> Name: {this.props.name}</div>
                    <div> ID: {this.props.id}</div>
                    <div>
                        Missing Earth by: {this.numberWithCommas(this.props.missingDistance)}km
                    </div>
                    <div>
                        Est. diameter: {this.props.diameter}km
                    </div>
                    <div>
                        Time of impact: {transformTime(this.props.timeOfImpact)} UTC
                    </div>
                </div>

            </a>
        )
    }
}
