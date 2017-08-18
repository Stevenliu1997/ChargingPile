import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {CustomHttpClient} from '../../shared/services/custom-http-client/CustomHttpClient';

@Component({
    selector: 'app-order-analysis',
    templateUrl: './order-analysis.component.html',
    styleUrls: ['./order-analysis.component.scss'],
    animations: [routerTransition()]
})
export class OrderAnalysisComponent implements OnInit {

    @ViewChild('orderCount')
    private orderCountComponent: DatagridComponent;
    @ViewChild('chargingCount')
    private chargingCountComponent: DatagridComponent;
    @ViewChild('moneyCount')
    private moneyCountComponent: DatagridComponent;

    private formUrl: string = 'orderform/analysis/form';
    private chartUrl: string = 'orderform/analysis/group';
    /*tabs id*/
    tabsConfig: any;

    /*站点信息*/
    sites: Array<any>;
    /*查询条件对象*/
    queryModel: any = {};
    /*datagrid配置*/
    datagridConfigs: any = {};
    /*图表数据*/
    chartConfig: any = {};

    constructor(private customHttpClient: CustomHttpClient) {}

    ngOnInit(): void {
        this.tabsConfig = [
            {
                key: 'orderCount',
                findType: '1',
                gridConfig: {
                    column: [
                        {name: '日期', key: 'time'},
                        {name: '名称', key: 'sitename'},
                        {name: '订单数量', key: 'analyseData'}
                    ]
                }
            },
            {
                key: 'chargingCount',
                findType: '2',
                gridConfig: {
                    column: [
                        {name: '日期', key: 'time'},
                        {name: '名称', key: 'sitename'},
                        {name: '充电量', key: 'analyseData'}
                    ],
                    params: {findType: '2'}
                }
            },
            {
                key: 'moneyCount',
                findType: '3',
                gridConfig: {
                    column: [
                        {name: '日期', key: 'time'},
                        {name: '名称', key: 'sitename'},
                        {name: '总价格', html: function (data) {
                            return data.analyseData[0];
                        }},
                        {name: '总电费', function (data) {
                            return data.analyseData[1];
                        }},
                        {name: '总服务费', function (data) {
                            return data.analyseData[2];
                        }}
                    ]
                }
            }
        ];

        /*查询站点*/
        this.querySites().then(result => {
            this.sites = result;
        })
        /*初始化查询对象*/
        this.initQueryModel();
        this.initDatagridConfig();
        this.initChartConfig();
    }

    /**
     * 查询站点
     * @returns {Promise<T>}
     */
    querySites(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.customHttpClient.post('OrderAnalysis/Sites', {siteid: -1, pageNumber: 1, pageSize: 999999}).subscribe(result => {
                if (result.code === '00') {
                    resolve(result.pageData);
                }
            })
        })
    }

    /**
     * 初始化查询数据
     */
    initQueryModel() {
        for (let i in this.tabsConfig) {
            /*默认为选择年*/
            this.initQueryModelSingle(this.tabsConfig[i].key);
        }
    }

    initQueryModelSingle(key: string) {
        if (key === 'orderCount') {
            this.queryModel[key] = {
                timeType: 1,
                objectname: [],
                findType: 1
            };
        } else if (key === 'chargingCount') {
            this.queryModel[key] = {
                timeType: 1,
                objectname: [],
                findType: 2
            };
        } else if (key === 'moneyCount') {
            this.queryModel[key] = {
                timeType: 1,
                objectname: [],
                findType: 3
            };
        }
    }

    /*初始化datagrid*/
    initDatagridConfig() {
        for(let i in this.tabsConfig) {
            let tabConfig = this.tabsConfig[i];
            let config = {
                url: this.formUrl,   /*现在三个tab都用一个url*/
                column: tabConfig.gridConfig.column,
                params: () => {
                    /*TODO 站点选择*/
                    let tempObj: any = Object.assign({}, this.queryModel[tabConfig.key]);
                    tempObj.objectname.splice(0, tempObj.objectname.length);
                    for (let i = 0; i < this.queryModel[tabConfig.key].objectname.length; i++) {
                        if (this.queryModel[tabConfig.key].objectname[i] === true) {
                            tempObj.objectname.push(this.sites[i].name);
                        }
                    }
                    return tempObj;
                },
            };
            this.datagridConfigs[tabConfig.key] = config;
        }
    }

    /**
     * 初始化图表基本数据
     */
    initChartConfig() {
        for(let i in this.tabsConfig) {
            let tabConfig = this.tabsConfig[i];
            this.chartConfig[tabConfig.key] = {
                options: {responsive: true}
            };
        }
    }

    /**
     * 刷新表格
     * @param key
     */
    refreshGrid(key: string) {
        this[`${key}Component`].refreshGrid();
        /*点击查询，也要重新刷新图表*/
        this.refreshChart(key);
    }

    /**
     * 清空查询条件
     * @param key
     */
    clearQueryModel(key: string) {
        this.initQueryModelSingle(key);
    }

    changeTimeType(key: string, type: number) {
        this.queryModel[key].timeType = type;
        this.refreshChart(key);
    }

    refreshChart(key: string) {
        let tempObj: any = Object.assign({}, this.queryModel[key]);
        tempObj.objectname.splice(0, tempObj.objectname.length);
        for (let i = 0; i < this.queryModel[key].objectname.length; i++) {
            if (this.queryModel[key].objectname[i] === true) {
                tempObj.objectname.push(this.sites[i].name);
            }
        }
        this.customHttpClient.post(this.chartUrl, tempObj).subscribe(result => {
            if (result.code === '00') {
                this.buildChartData(result.data, key);
            }
        });
    }

    buildChartData(data: any, key: string) {
        let keyObj = this.chartConfig[key];
        keyObj.datasets = [];
        keyObj.colors = [];
        for (var i in data) {
            let currentItem = data[i];
            /*收支统计返回的analyseData数组中有又是数据，因为有三种数据*/
            let dataTemp = currentItem.analyseData[0] instanceof Array ?
                currentItem.analyseData.map(item => {
                    return item[0];
                }) : currentItem.analyseData;
            keyObj.datasets.push({data: dataTemp, label: currentItem.sitename});
            keyObj.labels = currentItem.time;
            /*TODO 随机一个站点生成颜色，现在全是一种*/
            keyObj.colors.push({ // grey
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            });


        }
    }

    beforeChange(event: any) {

    }


}
