import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomHttpClient} from '../../shared/services/custom-http-client/CustomHttpClient';
import {SiteModifyInformationComponent} from './ModalPage/site-modify-information.component';
import {SiteDataComponent} from './ModalPage/site-data.component';
import {SiteInformationComponent} from './ModalPage/site-information.component';
import {SiteDeleteComponent} from './ModalPage/site-delete.component';
import {SiteCreateComponent} from "./ModalPage/site-create.component";

@Component({
    selector: 'site-management',
    templateUrl: './site-management.component.html',
    styleUrls: ['./site-management.component.scss'],
    animations: [routerTransition()]
})
export class SiteManagementComponent implements OnInit {
    name: String = 'name';

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    /*查询对象*/
    queryModel: any = {
        siteID: '',
        siteName: '',
        siteLocationProvince: 'Default',
        siteLocationCity: 'Default',
        siteStatus: 'Default'
    };
    // datagrid 配置
    config: object = {
        url: 'SiteManagement/site-management',
        column: [
            {name: '站点ID', key: 'siteID'},
            {name: '站点名称', key: 'siteName'},
            {name: '站点省市', key: 'siteLocation'},
            {name: '站点状态', key: 'siteStatus'},
            {name: '收费是否合理', key: 'isReasonable'}
        ],
        params: (function (thisObj) {
            return function () {
                return thisObj.queryModel;
            }
        })(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                action: function (ids) {
                    const modalRef = this.ngbModal.open(SiteCreateComponent);
                    modalRef.componentInstance.actionTitle = '新建';
                    modalRef.result.then(result => {
                        this.updateCar(result);
                    })
                }.bind(this)
            },
            {
                type: 'delete',
                name: '删除',
                action: function (ids) {
                    console.log(ids);
                }.bind(this),
                autoConfig: {
                    url: 'CarBrand/delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'edit',
                action: function (item) {
                    const modalRef = this.ngbModal.open(SiteDataComponent);
                    modalRef.componentInstance.actionTitle = '';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.updateCar(result);
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'detail',
                action: function (item) {
                    const modalRef = this.ngbModal.open(SiteInformationComponent);
                    modalRef.componentInstance.actionTitle = '查看';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.updateCar(result);
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'edit',
                action: function (item) {
                    const modalRef = this.ngbModal.open(SiteModifyInformationComponent);
                    modalRef.componentInstance.actionTitle = '修改';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.updateCar(result);
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'delete',
                action: function (item) {
                    const modalRef = this.ngbModal.open(SiteDeleteComponent);
                    modalRef.componentInstance.actionTitle = '';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.updateCar(result);
                    }, error => {})
                }.bind(this)
            },
        ]
    };

    constructor(private ngbModal: NgbModal, private customHttpClient: CustomHttpClient) {
    }

    ngOnInit() {
    }

    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }

    updateCar(role: object) {
        this.customHttpClient.post('SiteManagement/site-management', role).subscribe(result => {

        })
    }
    clear(): void {
        this.queryModel.siteID = '';
        this.queryModel.siteName = '';
        this.queryModel.siteLocationProvince = 'Default';
        this.queryModel.siteLocationCity = 'Default';
        this.queryModel.siteStatus = 'Default';
    }
}
