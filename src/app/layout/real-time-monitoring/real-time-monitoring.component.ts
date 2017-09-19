import {Component, OnInit} from '@angular/core';
import { OfflineOptions, ControlAnchor, NavigationControlType } from 'angular2-baidu-map';
import {routerTransition} from '../../router.animations';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {NgbModal, NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';

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
    intervalId: any;
    opts: any;
    offlineOpts: OfflineOptions;
    ngOnInit() {
        this.customHttpClient.get('map',).subscribe(result =>{
            this.initMap(result);
        });
        this.startInterval();
    }
    constructor(private customHttpClient: CustomHttpClient) {
    }
    initMap(result: any){
        this.opts = {
            center: {
                longitude: 104.2115,
                latitude: 28.4230,       //纬度
            },
            zoom: 6,   //变焦
            markers: [
                /*{ //标记
                    longitude: 100.506191,
                    latitude: 30.245554,
                    title: 'Where',
                    content: 'Put description here',
                    enableDragging: false
                }*/
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

        let n=result.length;
        for(let i=0; i<n ; i++ ){
            this.opts.markers[i] = {};
            this.opts.markers[i].longitude = result.lng;
            this.opts.markers[i].latitude = result.lat;
            this.opts.markers[i].title = "站点信息";
            this.opts.markers[i].content = result.sitename + result.pilename;
            this.opts.markers[i].enableDragging = false;
        }
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
    public barChartData:any[] = [{data: [],label: ''},{data: [],label: ''},{data: [],label: ''} ];
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

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    formdata() {
        this.customHttpClient.post('RealtimeMonitor').subscribe(result => {
            if (result.code == '00')
            {
                this.chartsModel = result.numdata;

                this.timesChart[0].data = null;
                window.setTimeout(() => {
                    this.timesChart[0].data = result.chartdata[0].data;
                });

                this.amountChart[0].data = null;
                window.setTimeout(() => {
                    this.amountChart[0].data = result.chartdata[1].data;
                });

                this.userChart[0].data = null;
                window.setTimeout(() => {
                    this.userChart[0].data = result.chartdata[2].data;
                });

                this.barChartData[0].data = null;
                this.barChartData[1].data = null;
                this.barChartData[2].data = null;
                window.setTimeout(() => {
                    this.barChartData[0].data = result.chartdata[3].data;
                    this.barChartData[1].data = result.chartdata[4].data;
                    this.barChartData[2].data = result.chartdata[5].data;
                    this.barChartData[0].label = result.chartdata[3].datatype;
                    this.barChartData[1].label = result.chartdata[4].datatype;
                    this.barChartData[2].label = result.chartdata[5].datatype;
                });
            }
        });


    }

    startInterval() {
        window.clearInterval(this.intervalId);
        this.formdata();

        this.intervalId = setInterval(function () {
            this.formdata();
        }.bind(this), 100000);
    }
}
