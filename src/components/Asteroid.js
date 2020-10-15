import React, {Component} from "react";

export default class Asteroid extends Component {

   static defaultProps = {
       id: '',
       name: '',
       missingDistance: 0,
       diameter: 0,
       URLNasa: '',
   }

    render(){
        return(
            <div className={"asteroid"} key={this.props.id}>
                <div className={"asteroid-data"}>
                    <div> Name: {this.props.name}</div>
                    <div>
                        Missing Earth by: {this.props.missingDistance}km
                    </div>
                    <div>
                        Est. diameter: {this.props.diameter}km
                    </div>
                </div>
                <div className={"more-info"}>
                    <a href={this.props.URLNasa} target="_blank" rel="noopener noreferrer"> Find out more about this asteroid </a>
                </div>

            </div>
        )
    }
}
