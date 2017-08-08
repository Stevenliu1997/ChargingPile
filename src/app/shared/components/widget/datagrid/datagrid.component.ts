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
    pageParams: any = {};
    //翻页显示
    page: any = {};
    pageArr: any = [];
    key: string;
    //全选标记
    allChecked: boolean = false;

    fetchedData: any = [];

    private rowIcons: object = {'delete' : 'fa-trash-o',
        'edit': 'fa-pencil-square-o',
        'detail': 'fa-file-o',
        'upload': 'fa-upload'
    };

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
        this.pageParams = {
            pageNumber: 1,
            pageSize: this.config.pageSize
        };
        this.key = this.config.key;

        this.loadData(this.config.url, this.config.params());
    }

    public loadData(ur: string, params?: object, pageParams?: any): void{


        this.httpClient.post(this.config.url, Object.assign({}, params, Object.assign({}, this.pageParams, pageParams))).subscribe((result: any) => {
            if(result.code == '00'){
                this.fetchedData = result.pageData;
                this.page.totalPages = result.totalPages;
                this.page.totalElements = result.totalElements;
                this.pageParams.pageNumber = result.currentPage;
                this.initPageArray(this.page.totalPages);
            }
        })
    }

    public refreshGrid(){
        this.pageParams.pageNumber = 1;
        this.loadData(this.config.url, this.config.params());
    }

    turnPage(page: number){
        if(page < 1 || page >= this.page.totalPages){
            return;
        }
        this.loadData(this.config.url, this.config.params(), {pageNumber: page});
    }


    rowAction (act: any, item: object) {
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

    /**
     * 全选
     * @param checked
     */
    checkAll(checked: boolean) {
        for(let i in this.fetchedData){
            this.fetchedData[i].checked = checked;
        }
    }

    initPageArray(total: number){
        this.pageArr = [];
        for(let i=1;i<=total;i++){
            this.pageArr.push(i);
        }
    }

    /**
     * 每一小列事件
     * @param col
     * @param data
     */
    colAction(col: any, data: object) {
        if(col.action){
            col.action(data);
        }
    }

    /**
     * 行内时间icon
     * @param col
     * @param data
     * @returns {any}
     */
    getIcon(col:any, data: object){
        return col.type ?
            this.rowIcons[col.type] :
            (col.icon ? col.icon(data) : '');
    }

}
