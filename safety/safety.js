import { dataTable } from 'datatables';
import { HazardEventService } from '/services/HazardEventService';
import { TaskQueue, inject } from 'aurelia-framework';
import { select2 } from 'jspm_packages/npm/select2@4.0.3/js/select2.full.min';

@inject(HazardEventService, TaskQueue)
export class safety {

    hazardChanges = [];
    mdsWeight = 2;
    missionTypeWeight = 3;
    missionRoleWeight = 4;
    flightConditionsWeight = 5;
    socWeight = 6;

    mdsWeightOverride = '';
    missionTypeWeightOverride = '';
    missionRoleWeightOverride = '';
    flightConditionsWeightOverride = '';
    socWeightOverride = '';

    selectedHazard = null;
    weightingsChanged = false;
    scenarioSaved = false;


    constructor(hazardEventService, TaskQueue) {
        this.hazardEventService = hazardEventService;
        this.taskQueue = TaskQueue;

        this.initData();
    }

    initData()
    {
        this.hazardEvents = this.hazardEventService.getHazardEvents();
        this.SOCWeightings = this.hazardEventService.getSOCWeightings();
        this.MissionRoleWeightings = this.hazardEventService.getMissionRoleWeightings();
        this.MDSWeightings = this.hazardEventService.getMDSWeightings();
        this.FlightConditionWeightings = this.hazardEventService.getFlightConditionWeightings();
        this.MissionTypeWeightings = this.hazardEventService.getMissionTypeWeightings();
    }

    activate() {
        // this.hazards = generateHazards(this.hazards);
    }

    attached() {

        this.taskQueue.queueMicroTask(() => {
            this.scenarioTable = $('#scenarioTable').DataTable(
                {
                    columnDefs: [
                        { width: 200, targets: 0 },
                        { width: 50, targets: 1 },
                        { width: 29, targets: 2 },
                        { width: 85, targets: 3 },
                        { width: 140, targets: 4 },
                        { width: 55, targets: 5 },
                    ]
                }
            );
        });
    }



    saveWeights() {
        console.log('saving weights');
        this.hazardChanges = [];
        this.weightingsChanged = false;
        this.scenarioSaved = true;
    }

    clearWeights() {
        for (var i = 0; i < this.hazardEvents.length; i++) {
            this.hazardEvents[i].OverrideMeanSeverity = '';
            this.hazardEvents[i].OverrideConsequenceWeighting = '';
        }

        //Since no changes are made, clear hazard changes staging list and flip weightingsChanged boolean
        this.hazardChanges = [];
        this.weightingsChanged = false;
    }

    changeWeight(h) {
        //Aggregate weight change
        var index = this.hazardChanges.findIndex(x => x.HazardEvent == h.HazardEvent);

        if (index == -1) {
            //hazard was not found in staging array
            this.hazardChanges.push(h);
        }
        else {
            if ((h.OverrideMeanSeverity == '') && (h.OverrideConsequenceWeighting == '')) {
                //weighting changed to original value. remove from array.
                this.hazardChanges.splice(index, 1);
            }
            else {
                //update the array with new weights
                this.hazardChanges[index] = h;
            }
        }
        //change boolean to enable/disable saved button
        this.weightingsChanged = this.hazardChanges.length == 0 ? false : true;
    }

    selectHazard(h) {
        this.selectedHazard = h;
    }

    editSeverityOfConsequence() {
        //Find value in SOC array
        var index = $.inArray(this.selectedSeverityOfConsequences, this.SOCWeightings);


        var upperLimit = (index == 0 ? 10 : this.SOCWeightings[index - 1].SevOfConWeighting);
        var lowerLimit = (index == (this.SOCWeightings.length - 1) ? 0 : this.SOCWeightings[index + 1].SevOfConWeighting);

        console.log(upperLimit);
        console.log(lowerLimit);

        //make sure that value is less than higher weight and greater than lower weight
        if ((this.socWeightOverride > upperLimit) || (this.socWeightOverride < lowerLimit)) {
            //If input is invalid, change it to original weight
            this.socWeightOverride = this.SOCWeightings[index].SevOfConWeighting;
            alertify.error('Error! Weight value is invalid. Weight value has been reset');
        }
    }

    runAnalysis() {
        this.scenarioSaved = false;
        this.clearWeights();
    }

    getScenarioResults(mds, missionType, missionRole, flightConditions) {
        
        this.loading = true;
        this.hazardEvents = this.hazardEventService.getScenarioResults(mds, missionType, missionRole, flightConditions);

        this.scenarioTable.destroy();

        this.taskQueue.queueMicroTask(() => {
            this.scenarioTable = $('#scenarioTable').DataTable(
                {
                    columnDefs: [
                        { width: 200, targets: 0 },
                        { width: 50, targets: 1 },
                        { width: 29, targets: 2 },
                        { width: 85, targets: 3 },
                        { width: 140, targets: 4 },
                        { width: 55, targets: 5 },
                    ]
                }
            );
        });
    }
}

// function generateHazards(hazards) {
//     for (var i = 0; i < 100; i++) {
//         hazards.push({
//             name: makeid(),
//             meanSeverity: 1 + Math.floor(Math.random() * 10),
//             overrideMeanSeverity: '',
//             consequenceWeighting: 1 + Math.floor(Math.random() * 10),
//             overrideConsequenceWeighting: '',
//             frequency: 1 + Math.floor(Math.random() * 100)
//         });
//     }
//     return hazards;
// }

// function makeid() {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

//     for (var i = 0; i < 5; i++)
//         text += possible.charAt(Math.floor(Math.random() * possible.length));

//     return text;
// }
