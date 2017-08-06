import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SiteModifyInformationComponent} from './ModalPage/site-modify-information.component';
import {SiteDataComponent} from './ModalPage/site-data.component';
import {SiteInformationComponent} from './ModalPage/site-information.component';
import {ToastsManager} from 'ng2-toastr';

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
    address: any = {};

    config: object = {
        key: 'siteid',
        url: 'Site/Find',
        column: [
            {name: '站点ID', key: 'siteid'},
            {name: '站点名称', key: 'name'},
            {name: '站点省市', key: 'provincecity'},
            {name: '站点状态', key: 'state'},
            {name: '收费是否合理', key: 'isreasonable'},
        ],
        params: function () {
            this.queryModel.provincecity = `${this.address.province || ''}&${this.address.city || ''}`;
            return this.queryModel;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                action: function (ids) {
                    const modalRef = this.ngbModal.open(SiteModifyInformationComponent);
                    modalRef.componentInstance.actionTitle = '新建站点';
                    modalRef.result.then(result => {
                        this.refreshGrid()
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
                action: function (item) {
                    const modalRef = this.ngbModal.open(SiteModifyInformationComponent);
                    modalRef.componentInstance.actionTitle = '修改信息';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.refreshGrid()
                    }, error => {})
                }.bind(this)
            },
        ]
    };

    constructor(
        private ngbModal: NgbModal,
        public toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
    }

    refreshGrid() {
        this.queryModel.siteid = -1;
        this.datagridComponent.refreshGrid();
    }

    clear(): void {
        this.queryModel.siteid = '';
        this.queryModel.name = '';
        this.queryModel.province = 'Default';
        this.queryModel.city = 'Default';
        this.queryModel.state = 'Default';
    }
}
