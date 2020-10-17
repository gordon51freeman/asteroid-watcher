import React, { Component } from 'react';
import Asteroid from "./Asteroid";
import {getDataLS, saveDataLS, storageEmpty} from "../helper/ls";
import {transformDate} from "../helper/div";
import Graph from "./Graph";

export default class AsteroidList extends Component{

    static defaultProps = {
        baseURL : 'https://api.nasa.gov/neo/rest/v1/feed?',
        startDate : '2020-10-15',
        endDate : '2020-10-22,',
        APIKey: 'Tl8bCAKuSFVZztg6mholYejRDcQ2bVMBWoJWxKFz',

    }

    state = {
        dataLoaded : false,
        data : null,
        activeIndex: 0,
        graphActive: false,
        graphData: [[]],
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
        //this.arrangeRawData(getDataLS())
    }

    isThisActive(index){
        if(index == this.state.activeIndex){
            return true
        }else{
            return false;
        }
    }

    arrangeRawData(data){
        for (let day in data){
            console.log(data[day])
        }
    }

    updateActiveIndex(e, index){
        e.stopPropagation()
        this.setState({activeIndex : index})
    }

    graphDataUpdate(dayIndex, id, name, distance, diameter, timeOfImpact){
        let graphArray = this.state.graphData;
        if(graphArray[dayIndex] == null){
            graphArray.push([])
        }
        graphArray[dayIndex].push({
            id: id,
            name : name,
            distance: this.getDistance(distance),
            diameter : this.getDiameter(diameter),
            timeOfImpact: timeOfImpact
        })
        this.state.graphData = graphArray;
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
        this.setState({graphActive : true})
    }

    deactivateGraph(e){
        e.stopPropagation()
        this.setState({graphActive: false})
    }

    render(){

        const { data, dataLoaded } = this.state

        let daysArray = [];
        for(let day in data){
            daysArray.push(day)
        }

        daysArray.sort()

        if(dataLoaded){
            return(
                <div className="asteroid-list">
                    {daysArray.map((day, index) => {
                        return(
                            <div
                                className={this.isThisActive(index)?'active day' : 'day'}
                                id={day} key={day}
                                onClick={(event) => this.updateActiveIndex(event, index)}
                            >
                                <div className="day-menu">
                                    <div className={"day-label"}> {transformDate(day)} </div>
                                    <div className={"view-select"}>
                                        <div className={"show-data"} onClick={(event) => this.deactivateGraph(event)}>
                                            <img src={require('../res/icons/list.svg')}/>
                                        </div>
                                        <div className={"show-graph"} onClick={(event) => this.activateGraph(event)}>
                                            <img src={require('../res/icons/graph.svg')}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={this.state.graphActive? 'daily-list' : 'daily-list active'}>
                                    {data[day]
                                        .sort((a, b) => {
                                            return a.close_approach_data[0].epoch_date_close_approach - b.close_approach_data[0].epoch_date_close_approach
                                        })
                                        .map((asteroid) => {
                                            console.log('called')
                                            this.graphDataUpdate(
                                                index,
                                                asteroid.id,
                                                asteroid.name,
                                                asteroid.close_approach_data[0].miss_distance.kilometers,
                                                asteroid.estimated_diameter.kilometers.estimated_diameter_max,
                                                asteroid.close_approach_data[0].epoch_date_close_approach
                                            )

                                            return(
                                                <Asteroid
                                                    key={asteroid.id}
                                                    id={asteroid.id}
                                                    name={asteroid.name}
                                                    missingDistance={this.numberWithCommas(this.getDistance(asteroid.close_approach_data[0].miss_distance.kilometers))}
                                                    diameter={this.getDiameter(asteroid.estimated_diameter.kilometers.estimated_diameter_max)}
                                                    URLNasa={asteroid.nasa_jpl_url}
                                                    timeOfImpact = {(asteroid.close_approach_data[0].epoch_date_close_approach)}
                                                />
                                            )
                                        })}
                                </div>
                                <div className={this.state.graphActive? 'graph active' : 'graph'}>
                                    <Graph graphData={this.state.graphData[index]} index={index}/>
                                </div>
                            </div>
                        )

                    })}

                </div>
            )
        }else{
            return(
                <div>
                    <p> nothing loaded yet </p>
                </div>
            )
        }


    }
}
