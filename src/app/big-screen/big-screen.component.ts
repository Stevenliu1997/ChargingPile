import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';
import {HttpClient} from '@angular/common/http';
import {$WebSocket} from 'angular2-websocket/angular2-websocket'

@Component({
    selector: 'realtime-monitor',
    templateUrl: './big-screen.component.html',
    styleUrls: ['./big-screen.component.scss'],
    animations: [routerTransition()]
})
export class BigScreenComponent implements OnInit {

    chartOption: any;
    dashboardOption: any;
    echartsIntance: any;
    //坐标
    geoCoord: any;
    chartsModel: any = {
    };

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

        //左侧

        //右侧仪表盘
        this.dashboardOption = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '今日充电量',
                    type: 'gauge',
                    data: [{value: 60, name: 'Kwh'}]
                }
            ]
        };

    }

    //图表配置
    timesChart: any = [{data: []}];  //充电次数
    userChart: any = [{data: []}];//用户数
    errorChart: any = [{data: []}];//故障数

    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels:string[] = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00','21:00'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = false;

    public timesChartColors:Array<any> = [
        {
            backgroundColor: 'rgba(48,159,177,0.2)',
        }
    ];

    public userChartColors:Array<any> = [
        {
            backgroundColor: 'rgba(48,59,77,0.2)',
        }
    ];
    public errorChartColors:Array<any> = [
        {
            backgroundColor: 'rgba(148,59,77,0.2)',
        }
    ];

    formdata(){
        console.log("123132");
        let ws = new $WebSocket("realtimemonitor");
        ws.getDataStream().subscribe(
            (msg)=> {
                console.log("123132");
                console.log("next", msg.data);
                if(msg.code == "00"){
                    console.log("123132", msg.chartdata);
                    this.chartsModel = msg.numdata;
                    this.timesChart[0].data = msg.chartdata[0].data;
                    this.userChart[0].data = msg.chartdata[2].data;
                }
            },
            (msg)=> {
                console.log("error", msg);
            },
            ()=> {
                console.log("complete");
            }
        );
    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    //饼状图
    public doughnutChartLabels:string[] = ['在线', '不在线'];
    public doughnutChartData:number[] = [1350, 450];
    public doughnutChartType:string = 'doughnut';

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
                data:[
                    {name: e.name, selected: true}
                ],
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut'
            }]
        });
        console.log(e);
        e.event.event.stopImmediatePropagation();
        this.httpClient.post('', e.name).subscribe(result => {
            if(result == '00')
                this.formdata();
        })
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
                    center: [116.46, 39.92],
                    data: [
                        {name: '北京'}
                    ]
                }
            ]
        });
        this.httpClient.get('').subscribe(result => {
            if(result == '00')
                this.formdata();
        })
    }
}
