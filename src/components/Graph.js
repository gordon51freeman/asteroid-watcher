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
                {graphData.map((point, index) =>{
                    return(
                        <div key={"graph-" + index}> {point.id} </div>
                    )
                })}
            </div>
        )
    }

}
