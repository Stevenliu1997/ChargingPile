import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {CustomHttpClient} from '../../shared/services/custom-http-client/CustomHttpClient';
import {FactoryInformationComponent} from './ModalPage/factory-information.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertInformationComponent} from './ModalPage/alert-information.component';
import {TransactionRecordComponent} from './ModalPage/transaction-record.component';
import {StatusInformationComponent} from './ModalPage/status-information.component';
import {CityService} from "../../shared/services/city-service/city-service";

@Component({
    selector: 'app-tables',
    templateUrl: './pile-monitor.component.html',
    styleUrls: ['./pile-monitor.component.scss'],
    animations: [routerTransition()]
})
export class PileMonitorComponent implements OnInit {
    /*查询对象*/
    queryModel: any = {};
    url: string;
    pageParams: any = {};
    page: any = {};
    pageArr: any = [];
    key: string;
    fetchedData: any = [];
    /*查询到的站点名称数组*/
    SiteName: any = [];

    citys: any = [];
    areas: any = [];

    config: any = {
        key: '',
        url: 'Site_Pile_Gun/Find',
        column: [
            {name: '站点名', key: 'sitename'},
            {name: '厂家', isModal: true, action: function(item) {
                /*打开对应模态框*/
                const modalRef = this.ngbModal.open(FactoryInformationComponent);
                modalRef.componentInstance.actionTitle = '查看厂商';
                modalRef.componentInstance.request.factoryid = item.factoryid;
                modalRef.result.then(result => {
                    this.refreshGrid();
                })
            }.bind(this)},
            {name: '型号', key: 'piletype'},
            {name: '名称', key: 'pilename'},
            {name: '安装时间', key: 'installationtime'},
            {name: '枪头ID', key: 'gunid'},
            {name: '类型', key: 'guntype', isIcon: true},
            {name: '告警', isModal: true, action: function(item) {
                /*打开对应模态框*/
                const modalRef = this.ngbModal.open(AlertInformationComponent, {size: 'lg'});
                modalRef.componentInstance.actionTitle = '查看告警';
                modalRef.componentInstance.editModel.pileid = item.pileid;
                modalRef.componentInstance.editModel.gunid = item.gunid;
                modalRef.result.then(result => {
                    this.refreshGrid();
                })
            }.bind(this)},
            {name: '交易记录', isModal: true, action: function(item) {
                /*打开对应模态框*/
                const modalRef = this.ngbModal.open(TransactionRecordComponent, {size: 'lg'});
                modalRef.componentInstance.actionTitle = '查看交易记录';
                modalRef.componentInstance.request.gunid = item.gunid;
                modalRef.result.then(result => {
                    this.refreshGrid();
                })
            }.bind(this)},
            {name: '预约状态', key: 'reservestate', isIcon: true},
            {name: '是否在线', key: 'isonline', isIcon: true},
            {name: '输出电压', key: 'v'},
            {name: '输出电流', key: 'i'},
            {name: '输出功率', key: 'p'},
            {name: '累计电量', key: 'gunchargeamount'},
            {name: '状态', key: 'gunstate', isIcon: true, isModal: true, action: function (item) {
                /*打开对应模态框*/
                const modalRef = this.ngbModal.open(StatusInformationComponent, {size: 'lg'});
                modalRef.componentInstance.actionTitle = '查看状态';
                modalRef.result.then(result => {
                    this.refreshGrid();
                })
            }.bind(this)},
            {name: '有无', key: 'has'},
            {name: '编号', key: 'number'},
            {name: '状态', key: 'state'},
            {name: '停车状态', key: 'parking', isIcon: true}
        ],
        pageSize: 20,
        pageSizes: [20, 50, 100],
        params: function () {
            return this.queryModel;
        }.bind(this),
    };

    constructor(
        private httpClient: CustomHttpClient,
        private ngbModal: NgbModal,
        public cityService: CityService
    ) {}
    ngOnInit() {
        this.clear();
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
        this.queryModel.province = '';
        this.queryModel.city = '';
        this.queryModel.district = '';
        this.queryModel.sitename = '';
    }
    public loadData(ur: string, params?: object, pageParams?: any): void {
        this.httpClient.post(this.config.url, Object.assign({}, params, Object.assign({}, this.pageParams, pageParams)))
            .subscribe((result: any) => {
            if (result.code === '00') {
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
        for (let i = 1; i <= total; i++) {
            this.pageArr.push(i);
        }
    }

    /*打开模态框的行内点击事件*/
    colAction(col: any, data: object) {
        if (col.action) {
            col.action(data);
        }
    }
    /*行内小图标*/
    getIcon(col: any, data: object) {
        if (data[col.key] === true) {
            switch (col.key) {
                case 'guntype': return ;
                case 'reservestate': return ;
                case 'isonline': return 'fa-link';
                case 'state': return ;
                case 'parking': return 'fa-car';
            }
        } else if (data[col.key] === false) {
            switch (col.key) {
                case 'guntype': return ;
                case 'reservestate': return ;
                case 'isonline': return 'fa-chain-broken';
                case 'state': return ;
                case 'parking': return 'fa-car';
            }
        }
    }
    /*发送查询站点名称的请求将站点名称显示在下拉菜单中*/
    sitename() {
        let tempObj = {
            province: '',
            city: '',
            district: ''
        }
        tempObj.province = this.queryModel.province;
        tempObj.city = this.queryModel.city;
        tempObj.district = this.queryModel.district;
        this.httpClient.post('SiteName/Find', tempObj).subscribe(result => {
            if (result.code === '00') {
                this.SiteName = result.data;
            }
        })
    }
}
