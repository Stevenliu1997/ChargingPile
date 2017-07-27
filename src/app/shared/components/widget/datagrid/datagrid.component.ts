import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {User} from "../../../models/User";
import {CustomHttpClient} from "../../../services/custom-http-client/CustomHttpClient";
import {CRUDService} from "../../../services/crud-service/crud.service";

@Component({
    selector: 'app-datagrid',
    templateUrl: './datagrid.component.html',
    styleUrls: ['./datagrid.component.scss']
})

/**
 * config: obj {
 *  url:string//请求url,
 *  columns:Array[obj: {
 *      name:string//列头显示
 *      key:string//字段名
 *  }]
 * }
 */
export class DatagridComponent implements OnInit {

    @Input()
    config: any;
    @Input()
    url: string;
    @Input()
    columns: object;
    //默认配置
    defaultConfig: object;
    //翻页对象
    page: any = {};
    key: string;
    //全选标记
    allChecked: boolean = false;

    fetchedData: any = [];

    constructor(private httpClient: CustomHttpClient, private crudService: CRUDService) {

    }

    ngOnInit() {
        //默认配置
        this.defaultConfig = {
            key: 'id',
            topActions: [],
            rowActions: [],
            pageSize: 20,
            pageSizes: [20, 50, 100],
            params: function () {
            }
        };
        this.config = Object.assign(this.defaultConfig, this.config);
        //翻页对象初始化
        this.page = {
            pageNumber: 1,
            pageSize: this.config.pageSize
        };
        this.key = this.config.key;

        this.loadData(this.config.url, this.config.params());
    }

    public loadData(ur: string, params?: object, options?: object): void{
        this.httpClient.get(this.config.url, {httpParams: Object.assign({}, params, this.page)}).subscribe((result: any) => {
            if(result.result == 'OK')
                this.fetchedData = result.data;
        })
    }

    public refreshGrid(){
        this.page.pageNumber = 1;
        this.loadData(this.config.url, this.config.params());
    }

    rowAction (act: any, item: object){
        act.action(item);
        if(act.autoConfig){
            switch (act.type){
                case 'delete':
                    this.autoDelete(act.autoConfig, item[this.key]);
                    break;
            }
        }
    }

    topAction (act: any) {
        //TODO 传入checkBox选中数据
        act.action();
        if(act.autoConfig){
            switch (act.type){
                case 'delete':
                    this.autoDelete(act.autoConfig, this.getSelectedIds());
                    break;
            }
        }


    }

    autoDelete(autoConfig: any, ids: string | string[]){
        this.crudService.delete(autoConfig.url, ids, function () {
            this.refreshGrid()
        }.bind(this))
    }

    /**
     * 获取选择的ids
     * @returns {Array}
     */
    getSelectedIds(): string[]{
        return this.fetchedData.filter(function (filItem) {
            return filItem.checked;
        }).map(function (mapItem) {
            return mapItem[this.key];
        }.bind(this));
    }

    checkAll(checked: boolean) {
        for(let i in this.fetchedData){
            this.fetchedData.checked = checked;
        }
    }

}
