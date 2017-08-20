import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";


@Component({
    selector: 'app-tables',
    templateUrl: './sitedata.component.html',
    styleUrls: ['./sitedata.component.scss'],
    animations: [routerTransition()],
})
export class SiteDataComponent implements OnInit {
    //查询对象
    queryModel: any = {};

    constructor(private customHttpClient: CustomHttpClient) {
    }

    ngOnInit() {
        this.refreshChart();
    }

    timesChart: any = [{data: []}];
    userChart: any = [{data: []}];
    amountChart: any = [{data: []}];
    errorChart: any = [{data: []}];

    public timesChartLabels:Array<any>;
    public userChartLabels:Array<any>;
    public amountChartLabels:Array<any>;
    public errorChartLabels:Array<any>;

    public lineChartOptions:any = {
        responsive: true,
        maintainAspectRatio: false
    };
    public timesChartColors:Array<any> = [
        {
            backgroundColor: 'rgba(48,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            pointsize:'small',
        }
    ];
    public userChartColors:Array<any> = [
        {
            backgroundColor: 'rgba(48,59,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            pointsize:'small',
        }
    ];
    public amountChartColors:Array<any> = [
        {
            backgroundColor: 'rgba(48,59,77,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            pointsize:'small',
        }
    ];
    public errorChartColors:Array<any> = [
        {
            backgroundColor: 'rgba(148,59,77,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            pointsize:'small',
        }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    formData(tempResult:any){
        this.timesChart[0].data = tempResult.data[0].analysisData;
        this.userChart[0].data = tempResult.data[1].analysisData;
        this.amountChart[0].data = tempResult.data[2].analysisData;
        this.errorChart[0].data = tempResult.data[3].analysisData;

        this.timesChartLabels = tempResult.data[0].time;
        this.userChartLabels = tempResult.data[1].time;
        this.amountChartLabels = tempResult.data[2].time;
        this.errorChartLabels = tempResult.data[3].time;

        this.timesChart[0].label = tempResult.data[0].datatype;
        this.userChart[0].label = tempResult.data[1].datatype;
        this.amountChart[0].label = tempResult.data[2].datatype;
        this.errorChart[0].label = tempResult.data[3].datatype;
    };

    refreshChart(){
        this.customHttpClient.post('DataAnalysis/Find',this.queryModel).subscribe(result => {
            if(result.code == '00'){
                this.formData(result);
            }
        });
    }

    clear(){
        this.queryModel = {};
    };

    exporttimesGrid(){
        let options = this.queryModel;

        let params = new URLSearchParams();
        for(let key in options){
            params.set(key, options[key])
        }
        let URL = "DataAnalysis/GetExcelTimes?"+params.toString();
        window.open(URL);
    }

    exportamountGrid(){
        let options = this.queryModel;

        let params = new URLSearchParams();
        for(let key in options){
            params.set(key, options[key])
        }
        let URL = "DataAnalysis/GetExcelAmount?"+params.toString();
        window.open(URL);
    }

    exporterrorGrid(){
        let options = this.queryModel;

        let params = new URLSearchParams();
        for(let key in options){
            params.set(key, options[key])
        }
        let URL = "DataAnalysis/GetExcelErrornumber?"+params.toString();
        window.open(URL);
    }

    exportuserGrid(){
        let options = this.queryModel;

        let params = new URLSearchParams();
        for(let key in options){
            params.set(key, options[key])
        }
        let URL = "DataAnalysis/GetExcelUsernumber?"+params.toString();
        window.open(URL);
    }
}
