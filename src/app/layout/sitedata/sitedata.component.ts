import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
//import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';

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

    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    formData(tempResult:any){
        this.timesChart[0].data = tempResult.data[0].analyseData;
        this.userChart[0].data = tempResult.data[1].analyseData;
        this.amountChart[0].data = tempResult.data[2].analyseData;
        this.errorChart[0].data = tempResult.data[3].analyseData;

        this.timesChartLabels = tempResult.data[0].time;
        this.userChartLabels = tempResult.data[1].time;
        this.amountChartLabels = tempResult.data[2].time;
        this.errorChartLabels = tempResult.data[3].time;

        this.timesChart[0].label = '充电次数';
        this.userChart[0].label = '用户数';
        this.amountChart[0].label = '充电量';
        this.errorChart[0].label = '故障数';
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


    downloadCanvas1(event){
        var anchor = event.target;
        anchor.href = document.getElementById('chart1')[0].toDataURL();
        anchor.download = "chargetimes.png";
    };

    downloadCanvas2(event){
        var anchor = event.target;
        anchor.href = document.getElementById('chart2')[0].toDataURL();
        anchor.download = "chargeamount.png";
    };

    downloadCanvas3(event){
        var anchor = event.target;
        anchor.href = document.getElementById('chart3')[0].toDataURL();
        anchor.download = "users.png";
    };

    downloadCanvas4(event){
        var anchor = event.target;
        anchor.href = document.getElementById('chart4')[0].toDataURL();
        anchor.download = "errors.png";
    }
}
