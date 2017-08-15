import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from 'ng2-toastr';
import {CustomHttpClient} from '../../shared/services/custom-http-client/CustomHttpClient';
import {promise} from "selenium-webdriver";

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

    //tabs id
    tabsConfig: any;

    //站点信息
    sites: Array<any>;
    //查询条件对象
    queryModel: any = {};
    //datagrid配置
    datagridConfigs: any = {};

    constructor(private customHttpClient: CustomHttpClient){}

    ngOnInit(): void {
        this.tabsConfig = [
            {
                key: 'orderCount',
                findType: "1",
                gridConfig:{
                    column: [
                        {name: '日期', key: 'time'},
                        {name: '名称', key: 'sitename'},
                        {name: '订单数量', key: 'analyseData'}
                    ]
                }
            },
            {
                key: 'chargingCount',
                findType: "2",
                gridConfig:{
                    column: [
                        {name: '日期', key: 'time'},
                        {name: '名称', key: 'sitename'},
                        {name: '充电量', key: 'analyseData'}
                    ],
                    params: {findType: "2"}
                }
            },
            {
                key: 'moneyCount',
                findType: "3",
                gridConfig:{
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

        //查询站点
        this.querySites().then(result => {
            this.sites = result;
        })
        //初始化查询对象
        this.initQueryModel();
        this.initDatagridConfig();
    }

    /**
     * 查询站点
     * @returns {Promise<T>}
     */
    querySites(): Promise<any>{
        return new Promise((resolve, reject) => {
            this.customHttpClient.post('Site/Manage/Find', {siteid: -1, pageNumber:1, pageSize: 999999}).subscribe(result => {
                if(result.code === '00')
                    resolve(result.pageData);
            })
        })
    }

    /**
     * 初始化查询数据
     */
    initQueryModel(){
        for(let i in this.tabsConfig){
            //默认为选择日
            this.queryModel[this.tabsConfig[i].key] = '1';
        }
    }

    //初始化datagrid
    initDatagridConfig(){
        for(let i in this.tabsConfig){
            let tabConfig = this.tabsConfig[i];
            let config = {
                url: 'orderForm/analysis/form',//现在三个tab都用一个url
                column: tabConfig.gridConfig.column,
                params: () => {
                    return Object.assign({}, this.queryModel[tabConfig.key], {findType: tabConfig.findType})
                },
            };
            this.datagridConfigs[tabConfig.key] = config;
        }
    }

    /**
     * 刷新表格
     * @param key
     */
    refreshGrid(key: string){
        this[`${key}Component`].refreshGrid();
    }

    refreshChart(key: string){
        this.customHttpClient.post('')
    }

    beforeChange(event: any){

    }


}
