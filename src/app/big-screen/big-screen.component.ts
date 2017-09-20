import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';
import {CustomHttpClient} from "../shared/services/custom-http-client/CustomHttpClient";
import {$WebSocket} from 'angular2-websocket/angular2-websocket'

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
    chartsModel: any ={};
    intervalId: any;

    constructor(private customHttpClient: CustomHttpClient) {
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

        //左侧
        this.startInterval();
    }

    //图表配置
    timesChart: any = [{data: []}];  //充电次数
    userChart: any = [{data: []}];//用户数
    errorChart: any = [{data: []}];//故障数

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = ['0', '2', '4', '6', '8', '10', '12', '14','16','18','20','22'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;

    public timesChartColors: Array<any> = [
        {
            backgroundColor: 'rgba(48,159,177,0.2)',
        }
    ];

    public userChartColors: Array<any> = [
        {
            backgroundColor: 'rgba(48,59,77,0.2)',
        }
    ];
    public errorChartColors: Array<any> = [
        {
            backgroundColor: 'rgba(148,59,77,0.2)',
        }
    ];

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    //饼状图
    public doughnutChartLabels: string[] = ['在线', '不在线'];
    public doughnutChartData: number[] =[];
    public doughnutChartType: string = 'doughnut';


    //地图事件
    onChartInit(ec) {
        this.echartsIntance = ec;
    }

    onChartClick(e) {
        let geo = this.geoCoord[e.name];
        this.echartsIntance.setOption({
            series: [{
                center: geo,
                zoom: 4,
                data: [
                    {name: e.name, selected: true}
                ],
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut'
            }]
        });
        console.log(e);
        e.event.event.stopImmediatePropagation();

        this.startInterval(e);

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

    outerClick(e) {
        this.echartsIntance.setOption({
            series: [
                {
                    zoom: 0,
                    center: [116.46, 39.92],
                    data: [
                        {name: '北京'}
                    ]
                }
            ]
        });
        this.startInterval();

    }
    formdata(e?: any) {
        let params = e ? {data: e.name} : {data: "全国"};
        this.customHttpClient.post('LargeMonitor',params).subscribe(result => {
            if (result.code == '00') {
                this.chartsModel.todayamount = result.numdata.todayamount;

                this.timesChart[0].data = null;
                window.setTimeout(() => {
                    this.timesChart[0].data = result.chartdata[0].data;
                });

                this.userChart[0].data = null;
                window.setTimeout(() => {
                    this.userChart[0].data = result.chartdata[1].data;
                });

                this.errorChart[0].data = null;
                window.setTimeout(() => {
                    this.errorChart[0].data = result.chartdata[2].data;
                });

                this.doughnutChartData[0] = result.numdata.todayonlinenumbers;
                this.doughnutChartData[1] = result.numdata.todayofflinenumbers;
                this.chartsModel.freeDC = result.addata[0].dcdata;
                this.chartsModel.freeAC = result.addata[0].acdata;
                this.chartsModel.useDC = result.addata[1].dcdata;
                this.chartsModel.useAC = result.addata[1].acdata;
                this.chartsModel.buildDC = result.addata[2].dcdata;
                this.chartsModel.buildAC = result.addata[2].acdata;
                this.chartsModel.outDC = result.addata[3].dcdata;
                this.chartsModel.outAC = result.addata[3].acdata;
                this.chartsModel.errorDC = result.addata[4].dcdata;
                this.chartsModel.errorAC = result.addata[4].acdata;
            }
        });
    }

    startInterval(e?: any) {
        window.clearInterval(this.intervalId);
        this.formdata(e);

        this.intervalId = setInterval(function () {
            this.formdata(e);
        }.bind(this), 30000);
    }

}
