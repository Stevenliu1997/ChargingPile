import {Component, OnInit} from '@angular/core';
import { OfflineOptions, ControlAnchor, NavigationControlType } from 'angular2-baidu-map';
import {routerTransition} from '../../router.animations';

@Component({
    selector: 'map-presentation',
    templateUrl: './real-time-monitoring.component.html',
    styleUrls: ['./real-time-monitoring.component.scss'],
    animations: [routerTransition()]
})
export class RealTimeMonitoringComponent implements OnInit {
    //地图
    opts: any;
    offlineOpts: OfflineOptions;

    ngOnInit() {
        this.opts = {
            center: {
                longitude: 121.506191,     //经度
                latitude: 31.245554        //纬度
            },
            zoom: 1,   //变焦
            markers: [
                { //标记
                    longitude: 121.506191,
                    latitude: 31.245554,
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
    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    public randomize():void {
        // Only Change 3 values
        let data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40];
        let clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }
}
