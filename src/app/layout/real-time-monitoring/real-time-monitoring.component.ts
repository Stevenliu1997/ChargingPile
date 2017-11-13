import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { OfflineOptions, ControlAnchor, NavigationControlType } from 'angular2-baidu-map';
import {routerTransition} from '../../router.animations';
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {NgbModal, NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {stringDistance} from "codelyzer/util/utils";

declare var AMap: any;

@Component({
    selector: 'map-presentation',
    templateUrl: './real-time-monitoring.component.html',
    styleUrls: ['./real-time-monitoring.component.scss'],
    animations: [routerTransition()]
})
export class RealTimeMonitoringComponent implements OnInit,OnDestroy {
    ngOnDestroy(): void {
        window.clearInterval(this.intervalId);
    }
    map: any;

    chartsModel: any = {
    };
    //地图
    intervalId: any;
    opts: any;
    contents:any;
    offlineOpts: OfflineOptions;
    ngOnInit() {
        this.customHttpClient.get('map',).subscribe(result =>{
            console.log(1);
            this.initMap(result);
            this.generateMap(this.opts.markers);
        });
        this.startInterval();

    }
    constructor(private customHttpClient: CustomHttpClient,private chRef: ChangeDetectorRef) {
    }
/*    initMap(result: any){
        this.opts = {
            center: {
                longitude: 104.2115,
                latitude: 28.4230,       //纬度
            },
            zoom: 6,   //变焦
            markers: [
                /!*{ //标记
                    longitude: 100.506191,
                    latitude: 30.245554,
                    title: 'Where',
                    content: 'Put description here',
                    enableDragging: false
                }*!/
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
        for(let i=0; i<result.length ; i++ ){
            this.opts.markers[i] = {};
            this.opts.markers[i].longitude = result.data.lng;
            this.opts.markers[i].latitude = result.data.lat;
            this.opts.markers[i].title = "站点信息";
            this.opts.markers[i].content = result.sitename + result.pilename;
            this.opts.markers[i].enableDragging = false;
        }
    }*/
    initMap(result: any){
        this.opts={
            markers:[
            ],
            infoWindowOffset:{
                "x": 0,
                "y": -30
            }
        };
        this.contents = [];
        for(let i=0; i<result.data.length ; i++ ){
            this.opts.markers[i] = [];
            this.opts.markers[i][0] = result.data[i].lng;
            this.opts.markers[i][1] = result.data[i].lat;
            this.contents[i]=result.data[i].sitename + result.data[i].pilename;
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
                    this.chRef.detectChanges();
                });
            }
        });

    }

    startInterval() {
        window.clearInterval(this.intervalId);
        this.formdata();

        this.intervalId = setInterval(function () {
            this.formdata();
        }.bind(this), 30000);
    }

    mapReady(map: any){
        console.log(map);
    }

    generateMap(markersParam: Array<any>){
        let infoWindow = new AMap.InfoWindow({
            isCustom: true,  //使用自定义窗体
            // content: this.createInfoWindow(title, content.join("<br/>")),
            offset: new AMap.Pixel(16, -45)
        });

        let markers = [];
        let map = new AMap.Map("container", {
            resizeEnable: true,
            center:[105,34],
            zoom: 4
        });
        this.map = map;
        console.log(this.map);
        for(let i=0;i<markersParam.length;i+=1){
            let marker = new AMap.Marker({
                position:markersParam[i],
                // content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
                offset: new AMap.Pixel(-15,-15)
            });
            //鼠标点击marker弹出自定义的信息窗体
            AMap.event.addListener(marker, 'click', () => {
                infoWindow.setContent(this.createInfoWindow('充电桩信息', this.contents[i]));
                infoWindow.open(map, marker.getPosition());
            });
            markers.push(marker);
        }
        new AMap.MarkerClusterer(map, markers,{gridSize:80});
        //加载插件
        map.plugin(["AMap.Scale", 'AMap.ToolBar'], () => {
            //加载比例尺
            let scale = new AMap.Scale();
            map.addControl(scale);
            //工具条
            let toolbar = new AMap.ToolBar();
            map.addControl(toolbar);
        });
    }

    createInfoWindow(textTitle, textContent): any {
        let title = textTitle,
            content = [];
        content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>"+textContent);
        // content.push("电话：010-64733333");
        // content.push("<a href='http://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>");
        let joinContent = content.join("<br/>");

        let info = document.createElement("div");
        info.className = "map-window";

        //可以通过下面的方式修改自定义窗体的宽高
        //info.style.width = "400px";
        // 定义顶部标题
        var top = document.createElement("div");
        var titleD = document.createElement("div");
        var closeX = document.createElement("img");
        top.className = "info-top";
        titleD.innerHTML = title;
        closeX.src = "http://webapi.amap.com/images/close2.gif";
        closeX.onclick = () => {
            this.closeInfoWindow();
        };

        top.appendChild(titleD);
        top.appendChild(closeX);
        info.appendChild(top);

        // 定义中部内容
        var middle = document.createElement("div");
        middle.className = "info-middle";
        middle.style.backgroundColor = 'white';
        middle.innerHTML = joinContent;
        info.appendChild(middle);

        // 定义底部内容
        var bottom = document.createElement("div");
        bottom.className = "info-bottom";
        bottom.style.position = 'relative';
        bottom.style.top = '0px';
        bottom.style.margin = '0 auto';
        var sharp = document.createElement("img");
        sharp.src = "http://webapi.amap.com/images/sharp.png";
        bottom.appendChild(sharp);
        info.appendChild(bottom);
        return info;
    }

    //关闭信息窗体
    closeInfoWindow() {
        this.map.clearInfoWindow();
    }
}
