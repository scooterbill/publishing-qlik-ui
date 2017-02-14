import {HEData} from '/data/HEData';
import {inject} from 'aurelia-framework';

@inject(HEData)
export class HazardEventService {
    constructor(HEData){
        this.HEData = HEData;
    }

    getScenarioResults(mds, missionType, missionRole, flightConditions)
    {
        return this.HEData.partial;
    }

    getHazardEvents(){
        return this.HEData.hazardEvent;
    }

    getSOCWeightings(){
        return this.HEData.SOCWeighting;
    }

    getMissionRoleWeightings(){
        return this.HEData.MissionRoleWeighting;
    }

    getMDSWeightings(){
        return this.HEData.MDSWeighting;
    }

    getFlightConditionWeightings(){
        return this.HEData.FlightConditionWeighting;
    }

    getMissionTypeWeightings(){
        return this.HEData.MissionTypeWeighting;
    }
}