import {inject,bindable} from 'aurelia-framework';

export class Publishing{

    attached(){
        this.apps = [
            {
                Title: "App1",
                Sheets: [
                    {
                        Name: "Sheet1",
                        Id: "1"
                    },
                    {
                        Name: "Sheet2",
                        Id: "2"
                    },
                    {
                        Name: "Sheet3",
                        Id: "3"
                    }
                ]
            },
            {
                Title: "App2",
                Sheets: [
                    {
                        Name: "Sheet1",
                        Id: "1"
                    },
                    {
                        Name: "Sheet2",
                        Id: "2"
                    },
                    {
                        Name: "Sheet3",
                        Id: "3"
                    }
                ]
            },
            {
                Title: "App3",
                Sheets: [
                    {
                        Name: "Sheet1",
                        Id: "1"
                    },
                    {
                        Name: "Sheet2",
                        Id: "2"
                    },
                    {
                        Name: "Sheet3",
                        Id: "3"
                    }
                ]
            },
            
        ]
    }

    fetchApp(app){

    }
}