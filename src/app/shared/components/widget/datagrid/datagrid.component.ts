import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {User} from "../../../models/User";
import {CustomHttpClient} from "../../../services/custom-http-client/CustomHttpClient";

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

    fetchedData: any = [];

    constructor(private httpClient: CustomHttpClient) {

    }

    ngOnInit() {
        //默认配置
        this.defaultConfig = {
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
    }

}
