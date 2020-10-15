import React, { Component } from 'react';
import Asteroid from "./Asteroid";
import {getDataLS, saveDataLS, storageEmpty} from "../helper/ls";

export default class AsteroidList extends Component{

    static defaultProps = {
        baseURL : 'https://api.nasa.gov/neo/rest/v1/feed?',
        startDate : '2020-10-15',
        endDate : '2020-10-22,',
        APIKey: 'Tl8bCAKuSFVZztg6mholYejRDcQ2bVMBWoJWxKFz'
    }

    state = {
        dataLoaded : false,
        data : null,
        activeIndex: 0,
        graphData: [],
        graphActive: false,
    }

    async componentDidMount() {
        if(storageEmpty()){
            let fetchURL =
                this.props.baseURL +
                'start_date=' + this.props.startDate +
                '&end_date=' + this.props.endDate +
                '&api_key=' + this.props.APIKey

            const response = await fetch(fetchURL)
            const receivedData = await response.json()

            saveDataLS(receivedData.near_earth_objects);

            this.setState({
                data: getDataLS(),
                dataLoaded: true
            })
        }else{
            this.setState({
                data: getDataLS(),
                dataLoaded: true
            })
        }
    }

    isThisActive(index){
        if(index == this.state.activeIndex){
            return true
        }else{
            return false;
        }
    }

    updateActiveIndex(e, index){
        e.stopPropagation()
        this.setState({activeIndex : index})
    }

    graphDataUpdate(id, name, distance, diameter){
        let graphArray = this.state.graphData;
        graphArray.push({
            id: id,
            name : name,
            distance: this.getDistance(distance),
            diameter : this.getDiameter(diameter)
        })
        this.state.graphData = graphArray
    }

    getDiameter(diameterString){
        return parseFloat(diameterString).toFixed(3)
    }

    getDistance(distanceString){
        return parseFloat(distanceString).toFixed(0)
    }

    //i nicked this function from stackoverflow
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    }

    activateGraph(e){
        e.stopPropagation()
        console.log('dis was clikd')
        this.setState({graphActive : true})
    }

    render(){

        const { data, dataLoaded } = this.state

        let daysArray = [];
        for(let day in data){
            daysArray.push(day)
        }

        daysArray.sort()

        if(dataLoaded){
            if(this.state.graphActive){
                return(
                    <div> dis my graph </div>
                )

            }else{
                return(
                    <div className="asteroid-list">
                        {daysArray.map((day, index) => {
                            return(
                                <div
                                    className={this.isThisActive(index)?'active day' : 'day'}
                                    id={day} key={day}
                                    onClick={(event) => this.updateActiveIndex(event, index)}
                                >
                                    <div className="day-label"> {day} </div>
                                    <div className="daily-list">
                                        {data[day].map((asteroid) => {
                                            this.graphDataUpdate(
                                                asteroid.id,
                                                asteroid.name,
                                                asteroid.close_approach_data[0].miss_distance.kilometers,
                                                asteroid.estimated_diameter.kilometers.estimated_diameter_max,
                                            )
                                            return(
                                                <Asteroid
                                                    key={asteroid.id}
                                                    id={asteroid.id}
                                                    name={asteroid.name}
                                                    missingDistance={this.numberWithCommas(this.getDistance(asteroid.close_approach_data[0].miss_distance.kilometers))}
                                                    diameter={this.getDiameter(asteroid.estimated_diameter.kilometers.estimated_diameter_max)}
                                                    URLNasa={asteroid.nasa_jpl_url}
                                                    onClick={(event) => this.activateGraph(event)}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            )

                        })}

                    </div>
                )
            }
        }else{
            return(
                <div>
                    <p> nothing loaded yet </p>
                </div>
            )
        }


    }
}
