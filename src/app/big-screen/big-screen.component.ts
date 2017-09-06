import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';
import {HttpClient} from '@angular/common/http';


@Component({
    selector: 'realtime-monitor',
    templateUrl: './big-screen.component.html',
    styleUrls: ['./big-screen.component.scss'],
    animations: [routerTransition()]
})
export class BigScreenComponent implements OnInit {

    chartOption: any;
    echartsIntance: any;
    //坐标
    geoCoord: any;

    constructor(private httpClient: HttpClient) {
    }

    ngOnInit() {
        this.chartOption = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}'
            },
            series: [
                {
                    name: '中国',
                    type: 'map',
                    mapType: 'china',
                    selectedMode: 'multiple',
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: [
                        {name: '北京'}
                    ]
                }
            ]
        };
        //初始化坐标
        this.initProvinceGeo();
    }

    onChartInit(ec) {
        this.echartsIntance = ec;
    }

    onChartClick(e) {
        let geo = this.geoCoord[e.name];
        this.echartsIntance.setOption({
            series: [{
                center: geo,
                zoom: 4,
                data:[
                    {name: e.name, selected: true}
                ],
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut'
            }]
        });
        console.log(e);
        e.event.event.stopImmediatePropagation();
    }

    initProvinceGeo() {
        this.geoCoord = {
            '甘肃': [103.73, 36.03],
            '青海': [101.74, 36.56],
            '四川': [104.06, 30.67],
            '河北': [114.48, 38.03],
            '云南': [102.73, 25.04],
            '贵州': [106.71, 26.57],
            '湖北': [114.31, 30.52],
            '河南': [113.65, 34.76],
            '山东': [117, 36.65],
            '江苏': [118.78, 32.04],
            '安徽': [117.27, 31.86],
            '浙江': [120.19, 30.26],
            '江西': [115.89, 28.68],
            '福建': [119.3, 26.08],
            '广东': [113.23, 23.16],
            '湖南': [113, 28.21],
            '海南': [110.35, 20.02],
            '辽宁': [123.38, 41.8],
            '吉林': [125.35, 43.88],
            '黑龙江': [126.63, 45.75],
            '山西': [112.53, 37.87],
            '陕西': [108.95, 34.27],
            '台湾': [121.30, 25.03],
            '北京': [116.46, 39.92],
            '上海': [121.48, 31.22],
            '重庆': [106.54, 29.59],
            '天津': [117.2, 39.13],
            '内蒙古': [111.65, 40.82],
            '广西': [108.33, 22.84],
            '西藏': [91.11, 29.97],
            '宁夏': [106.27, 38.47],
            '新疆': [87.68, 43.77],
            '香港': [114.17, 22.28],
            '澳门': [113.54, 22.19]
        };
    }

    outerClick(e){
        this.echartsIntance.setOption({
            series: [
                {
                    zoom: 0,
                    data: [
                        {name: '北京'}
                    ]
                }
            ]
        });
    }

}
