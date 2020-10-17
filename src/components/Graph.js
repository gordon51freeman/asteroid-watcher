import React, {Component} from "react";
import {transformTime} from "../helper/div";

export default class Graph extends Component {

    static defaultProps ={
        graphData: [],
        index: 0
    }

    render(){

        const {graphData} = this.props

        return(
            <div>
                {graphData.map((asteroid, index) =>{
                    return(
                        <div key={"graph-" + index}> {asteroid.timeOfImpact} </div>
                    )
                })}
            </div>
        )
    }

}
