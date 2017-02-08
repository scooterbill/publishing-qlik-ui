import dataTable from 'datatables';

export class safety {

    hazards = [];
    mdsWeight = 2;
    missionTypeWeight = 3;
    missionRoleWeight = 4;
    flightConditionsWeight = 5;

    mdsWeightOverride = '';
    missionTypeWeightOverride = '';
    missionRoleWeightOverride = '';
    flightConditionsWeightOverride = '';

    activate() {
        this.hazards = generateHazards(this.hazards);
    }

    attached() {
        $('#example').DataTable(
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
    }


    saveWeights() {
        console.log('saving weights');
    }

    clearWeights() {
        for (var i = 0; i < this.hazards.length; i++)
        {
            this.hazards[i].overrideMeanSeverity = '';
            this.hazards[i].overrideConsequenceWeighting = '';
        }
    }


}

function generateHazards(hazards) {
    for (var i = 0; i < 100; i++) {
        hazards.push({
            name: makeid(),
            meanSeverity: 1 + Math.floor(Math.random() * 10),
            overrideMeanSeverity: '',
            consequenceWeighting: 1 + Math.floor(Math.random() * 10),
            overrideConsequenceWeighting: '',
            frequency: 1 + Math.floor(Math.random() * 100)
        });
    }
    return hazards;
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}