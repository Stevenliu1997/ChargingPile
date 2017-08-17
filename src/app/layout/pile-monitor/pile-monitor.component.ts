import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {CustomHttpClient} from '../../shared/services/custom-http-client/CustomHttpClient';

@Component({
    selector: 'app-tables',
    templateUrl: './pile-monitor.component.html',
    styleUrls: ['./pile-monitor.component.scss'],
    animations: [routerTransition()]
})
export class PileMonitorComponent implements OnInit {
    queryModel: any = {};
    url: string;
    pageParams: any = {};
    page: any = {};
    pageArr: any = [];
    key: string;
    fetchedData: any = [];
    private rowIcons: object = {'delete' : 'fa-trash-o',
        'edit': 'fa-pencil-square-o',
        'detail': 'fa-file-o',
        'upload': 'fa-upload'
    };

    config: any = {
        key: 'brandid',
        url: 'CarBrand/Find',
        column: [
            {name: '站点名', key: 'brandid'},
            {name: '厂家', key: 'brandname', html: function(item) {
                return `<a href="www.baidu.com">查看</a>`;
            }},
            {name: '型号', key: 'cartyper'},
            {name: '名称', key: 'cartyper'},
            {name: '安装时间', key: 'cartyper'},
            {name: '枪头ID', key: 'cartyper'},
            {name: '类型', key: 'cartyper'},
            {name: '告警', key: 'cartyper', html: function(item) {
                return `<a href="www.baidu.com">查看</a>`;
            }},
            {name: '交易记录', key: 'cartyper', html: function(item) {
                return `<a href="www.baidu.com">查看</a>`;
            }},
            {name: '预约状态', key: 'cartyper'},
            {name: '是否在线', key: 'cartyper'},
            {name: '输出电压', key: 'cartyper'},
            {name: '输出电流', key: 'cartyper'},
            {name: '输出功率', key: 'cartyper'},
            {name: '累计电量', key: 'cartyper'},
            {name: '状态', key: 'cartyper', html: function(item) {
                return `<i class="fa mr-2" [ngClass]="getIcon(rowAct, data)" aria-hidden="true" (click)="rowAction(rowAct, data)"></i>`
            }},
            {name: '有无', key: 'cartyper'},
            {name: '编号', key: 'cartyper'},
            {name: '状态', key: 'cartyper'},
            {name: '停车状态', key: 'cartyper'}
        ],
        pageSize: 20,
        pageSizes: [20, 50, 100],
        params: function () {
            return this.queryModel;
        }.bind(this),
    };

    constructor(
        private httpClient: CustomHttpClient,
    ) {}

    ngOnInit() {
        this.pageParams = {
            pageNumber: 1,
            pageSize: this.config.pageSize
        };
        this.key = this.config.key;

        this.loadData(this.config.url, this.config.params());
    }

    refreshGrid() {
        this.pageParams.pageNumber = 1;
        this.loadData(this.config.url, this.config.params());
    }
    clear(): void {
        this.queryModel = {};
    }





    public loadData(ur: string, params?: object, pageParams?: any): void{
        this.httpClient.post(this.config.url, Object.assign({}, params, Object.assign({}, this.pageParams, pageParams)))
            .subscribe((result: any) => {
            if(result.code === '00') {
                this.fetchedData = result.pageData || [];
                this.page.totalPages = result.totalPages;
                this.page.totalElements = result.totalElements;
                this.pageParams.pageNumber = result.currentPage;
                this.initPageArray(this.page.totalPages);
            }
        })
    }
    turnPage(page: number) {
        if (page < 1 || page > this.page.totalPages) {
            return;
        }
        this.loadData(this.config.url, this.config.params(), {pageNumber: page});
    }
    initPageArray(total: number) {
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
    getIcon(col:any, data: object){
        return col.type ?
            this.rowIcons[col.type] :
            (col.icon ? col.icon(data) : '');
    }
}
