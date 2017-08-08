import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";

@Component({
    selector: 'app-tables',
    templateUrl: './sitedata.component.html',
    styleUrls: ['./sitedata.component.scss'],
    animations: [routerTransition()]
})
export class SiteDataComponent implements OnInit {


    //查询对象
    queryModel: any = {};

    constructor(private customHttpClient: CustomHttpClient) {
    }

    ngOnInit() {
    }

    clear(){
        this.queryModel = {};
    };


    timesChart: any = {data: []};
    userChart: any = {data: []};
    amountChart: any = {data: []};
    errorChart: any = {data: []};
    chartDate: any = {data: []};

    formData(tempResult:any){

        this.timesChart.data = tempResult.times;
        this.userChart.data = tempResult.usernumber;
        this.amountChart.data = tempResult.errornumber;
        this.errorChart.data = tempResult.amount;
        this.chartDate = tempResult.date;
        this.timesChart.label = '充电次数';
        this.userChart.label = '用户数';
        this.amountChart.label = '充电量';
        this.errorChart.label = '故障数';
    };

    refreshChart(){
        this.customHttpClient.post('DataAnalysis/Find',this.queryModel).subscribe(result => {
            if(result.code == '00'){
                this.formData(result);
            }
        });
    }


    public timesChartData:Array<any> = this.timesChart;
    public userChartData:Array<any> = this.userChart;
    public errorChartData:Array<any> =this.errorChart;
    public amountChartData:Array<any> = this.amountChart;
    public lineChartLabels:Array<any> = this.chartDate;
    public lineChartOptions:any = {
        responsive: true
    };
    public lineChartColors:Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

}
