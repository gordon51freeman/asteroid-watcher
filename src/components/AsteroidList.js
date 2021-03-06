import React, { Component } from 'react';
import Asteroid from "./Asteroid";
import {getDataLS, saveDataLS, storageEmpty, isDataOld} from "../helper/ls";
import {transformDate} from "../helper/div";
import Graph from "./Graph";

export default class AsteroidList extends Component{

    static defaultProps = {
        baseURL : 'https://api.nasa.gov/neo/rest/v1/feed?',
        startDate : '2020-10-15',
        endDate : '',
        APIKey: 'Tl8bCAKuSFVZztg6mholYejRDcQ2bVMBWoJWxKFz',

    }

    state = {
        dataLoaded : false,
        data : null,
        activeIndex: 0,
        graphActive: false,
        arrangedData : null,
        graphData: [[]],
    }

    async componentDidMount() {

        if(storageEmpty() || isDataOld()){
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
            })
        }else{
            this.setState({data: getDataLS()
            })
        }
        this.arrangeRawData(getDataLS())
        this.setState({dataLoaded : true})
    }

    arrangeRawData(data){
        let arrangedData = [[]]
        let dayIndex = -1;
        for (let day in data){
            dayIndex++;
            for(let asteroid in data[day]){
                if(arrangedData[dayIndex] == null){
                    arrangedData.push([])
                }
                arrangedData[dayIndex].push({
                        id: data[day][asteroid].id,
                        name : data[day][asteroid].name,
                        distance : this.getDistance(data[day][asteroid].close_approach_data[0].miss_distance.kilometers),
                        diameter: this.getDiameter(data[day][asteroid].estimated_diameter.kilometers.estimated_diameter_max,),
                        timeOfImpact : data[day][asteroid].close_approach_data[0].epoch_date_close_approach,
                        nasaUrl: data[day][asteroid].nasa_jpl_url
                    }
                )
            }
            arrangedData[dayIndex].sort((a, b) => {
                return a.timeOfImpact - b.timeOfImpact
            })
        }
        this.setState({arrangedData : arrangedData})
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

    getDiameter(diameterString){
        let diameterInMeter = parseFloat(diameterString)*1000
        diameterInMeter = diameterInMeter.toFixed(0)
        //return parseFloat(diameterString).toFixed(3)
        return parseInt(diameterInMeter, 10)
    }

    getDistance(distanceString){
        //return parseFloat(distanceString).toFixed(0)
        return parseInt(distanceString, 10)
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
                                <div className={this.state.graphActive? 'daily-list' : 'active daily-list'}>
                                    {this.state.arrangedData[index].map((asteroid) => {
                                            return(
                                                <Asteroid
                                                    key={asteroid.id}
                                                    id={asteroid.id}
                                                    name={asteroid.name}
                                                    missingDistance={asteroid.distance}
                                                    diameter={asteroid.diameter}
                                                    URLNasa={asteroid.nasaUrl}
                                                    timeOfImpact = {asteroid.timeOfImpact}
                                                />
                                            )
                                        })}
                                </div>
                                <div className={this.state.graphActive? 'graph active' : 'graph'}>
                                    <Graph graphData={this.state.arrangedData[index]} index={index}/>
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
