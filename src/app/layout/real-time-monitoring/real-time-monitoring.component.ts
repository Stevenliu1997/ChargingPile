import {Component, OnInit} from '@angular/core';
import { OfflineOptions, ControlAnchor, NavigationControlType } from 'angular2-baidu-map';
import {routerTransition} from '../../router.animations';
import {$WebSocket} from 'angular2-websocket/angular2-websocket'
import {NgbModal, NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {send} from "q";

@Component({
    selector: 'map-presentation',
    templateUrl: './real-time-monitoring.component.html',
    styleUrls: ['./real-time-monitoring.component.scss'],
    animations: [routerTransition()]
})
export class RealTimeMonitoringComponent implements OnInit {
    chartsModel: any = {
    };
    //地图
    opts: any;
    offlineOpts: OfflineOptions;
    ngOnInit() {
        this.opts = {
            center: {
                longitude: 100.506191,
                latitude: 30.245554,       //纬度
            },
            zoom: 6,   //变焦
            markers: [
                { //标记
                    longitude: 100.506191,
                    latitude: 30.245554,
                    title: 'Where',
                    content: 'Put description here',
                    enableDragging: false
                },
                { //标记
                    longitude: 121.506191,
                    latitude: 32.245554,
                    title: 'Where',
                    content: 'Put description here',
                    enableDragging: false
                },
                {
                    longitude: 122.506191,
                    latitude: 34.245554,
                    title: 'Where',
                    content: 'Put description here',
                    enableDragging: false
                },
                {
                    longitude: 123.506191,
                    latitude: 34.245554,
                    title: 'Where',
                    content: 'Put description here',
                    enableDragging: false
                },
                {
                    longitude: 124.506191,
                    latitude: 34.245554,
                    title: 'Where',
                    content: 'Put description here',
                    enableDragging: false
                }
            ],
            geolocationCtrl: {//地理定位控制
                anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT
            },
            scaleCtrl: {//比例控制
                anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
            },
            overviewCtrl: { //概括
                isOpen: true
            },
            navCtrl: {//导航
                type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
            }
        };


        this.offlineOpts = {//重试间隔
            retryInterval: 5000,
            txt: 'NO-NETWORK'
        };
        //图表
        this.formdata();
    }

    loadMap(map: any) {
        console.log('map instance here', map);
    }

    clickMarker(marker: any) {
        console.log('The clicked marker is', marker);
    }

    clickmap(e: any) {
        console.log(`Map clicked with coordinate: ${e.point.lng}, ${e.point.lat}`);
    }


    //柱状图
    public barChartData:any[] = [{data: [],label: ''} ];
    timesChart: any = [{data: []}];  //充电次数
    amountChart: any = [{data: []}];//充电量
    userChart: any = [{data: []}];//用户数
    reduceChart: any = [{data: []}];//减少排碳量


    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels:string[] = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00','21:00'];
    public barChartType:string = 'bar';
    public ChartLegend:boolean = true;
    public barChartLegend:boolean = false; //下面四个

    public barChartColors:Array<any> = [
        {
            backgroundColor: '#00b3ee'
        },
        {
            backgroundColor: '#5cb85c'
        },
        {
            backgroundColor: '#d9534f'
        }
    ];
    public timesChartColors:Array<any> = [
        {
            backgroundColor: 'rgba(48,159,177,0.2)',
        }
    ];
    public amountChartColors:Array<any> = [
        {
            backgroundColor: 'rgba(48,59,177,0.2)',
        }
    ];
    public userChartColors:Array<any> = [
        {
            backgroundColor: 'rgba(48,59,77,0.2)',
        }
    ];
    public reduceChartColors:Array<any> = [
        {
            backgroundColor: 'rgba(148,59,77,0.2)',
        }
    ];

    formdata(){
        console.log("123132");
        let ws = new $WebSocket("realtimemonitor");
/*        ws.onOpen("");
        ws.onMessage(
            (msg: any)=> {
                console.log("123132");
                if(msg.code == "00"){
                    console.log("123132", msg.chartdata);
                    this.timesChart[0].data = msg.chartdata[0].data;
                    this.amountChart[0].data = msg.chartdata[1].data;
                    this.userChart[0].data = msg.chartdata[2].data;
                    this.barChartData[0].data = msg.chartdata[3].data;
                    this.barChartData[1].data = msg.chartdata[4].data;
                    this.barChartData[2].data = msg.chartdata[5].data;

                    this.barChartData[0].label = msg.chartdata[3].datatype;
                    this.barChartData[1].label = msg.chartdata[4].datatype;
                    this.barChartData[2].label = msg.chartdata[5].datatype;
                }
            },
            {autoApply: false}
        );*/
        ws.getDataStream().subscribe(
            (msg)=> {
                console.log("123132");
                console.log("next", msg.data);
                if(msg.code == "00"){
                    console.log("123132", msg.chartdata);
                    this.chartsModel = msg.numdata;
                    this.timesChart[0].data = msg.chartdata[0].data;
                    this.amountChart[0].data = msg.chartdata[1].data;
                    this.userChart[0].data = msg.chartdata[2].data;
                    this.barChartData[0].data = msg.chartdata[3].data;
                    this.barChartData[1].data = msg.chartdata[4].data;
                    this.barChartData[2].data = msg.chartdata[5].data;

                    this.barChartData[0].label = msg.chartdata[3].datatype;
                    this.barChartData[1].label = msg.chartdata[4].datatype;
                    this.barChartData[2].label = msg.chartdata[5].datatype;
                }
            },
            (msg)=> {
                console.log("error", msg);
            },
            ()=> {
                console.log("complete");
            }
        );

/*        this.barChartData = [
            {data: [65, 59, 80, 81, 56, 55, 40, 30], label: '今日在线桩数'},
            {data: [28, 48, 40, 19, 86, 27, 90], label: '今日使用桩数'},
            {data: [20, 30],label:'今日故障桩数' }
        ];
        this.timesChart=[{data: [65, 59, 80, 81, 56, 55, 40, 30]}];
        this.amountChart=[{data: [65, 59, 80, 81, 56, 55, 40, 30]}];
        this.userChart=[{data: [65, 59, 80, 81, 56, 55, 40, 30]}];
        this.reduceChart=[{data: [65, 59, 80, 81, 56, 55, 40, 30]}];*/
    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

}
