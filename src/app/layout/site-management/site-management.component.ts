import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SiteModifyInformationComponent} from './ModalPage/site-modify-information.component';
import {SiteDataComponent} from './ModalPage/site-data.component';
import {SiteInformationComponent} from './ModalPage/site-information.component';
import {ToastsManager} from 'ng2-toastr';
import {CityService} from "../../shared/services/city-service/city-service";


@Component({
    selector: 'app-site-management',
    templateUrl: './site-management.component.html',
    styleUrls: ['./site-management.component.scss'],
    animations: [routerTransition()]
})
export class SiteManagementComponent implements OnInit {
    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;

    queryModel: any = {};
    citys: any = [];


    config: object = {
        key: 'siteid',
        url: 'Site/Find',
        column: [
            {name: '站点ID', key: 'siteid'},
            {name: '站点名称', key: 'sitename'},
            {name: '站点所在省', key: 'province'},
            {name: '站点所在市', key: 'city'},
            {name: '站点状态', key: 'state'},
            {name: '收费是否合理', key: 'isreasonable'},
        ],
        params: function () {
            const tempquery = Object.assign({}, this.queryModel);
            if (!tempquery.siteid) {
                tempquery.siteid = -1;
            }
            return tempquery;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                allowEmpty: true,
                action: function (ids) {
                    const modalRef = this.ngbModal.open(SiteModifyInformationComponent);
                    modalRef.componentInstance.actionTitle = '新建站点';
                    modalRef.result.then(result => {
                        this.refreshGrid();
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
                    url: 'Site/Delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'edit',
                name: '查看站点数据',
                action: function (item) {
                    const modalRef = this.ngbModal.open(SiteDataComponent);
                    modalRef.componentInstance.actionTitle = '';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'detail',
                name: '查看信息',
                action: function (item) {
                    const modalRef = this.ngbModal.open(SiteInformationComponent);
                    modalRef.componentInstance.actionTitle = '查看';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'edit',
                name: '修改信息',
                action: function (item) {
                    const modalRef = this.ngbModal.open(SiteModifyInformationComponent);
                    modalRef.componentInstance.actionTitle = '修改信息';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.refreshGrid();
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'delete',
                name: '删除',
                action: function (item) {
                }.bind(this),
                autoConfig: {
                    url: 'Site/Delete'
                }
            }
        ]
    };

    constructor(
        private ngbModal: NgbModal,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        public cityService: CityService

    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.clear();
    }

    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }

    clear(): void {
        this.queryModel.siteid = '';
        this.queryModel.sitename = '';
        this.queryModel.province = '';
        this.queryModel.city = '';
        this.queryModel.state = '';
    }
}
