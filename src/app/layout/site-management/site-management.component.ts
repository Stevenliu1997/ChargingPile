import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomHttpClient} from '../../shared/services/custom-http-client/CustomHttpClient';
import {SiteModifyInformationComponent} from './ModalPage/site-modify-information.component';
import {SiteDataComponent} from './ModalPage/site-data.component';
import {SiteInformationComponent} from './ModalPage/site-information.component';

@Component({
    selector: 'site-management',
    templateUrl: './site-management.component.html',
    styleUrls: ['./site-management.component.scss'],
    animations: [routerTransition()]
})
export class SiteManagementComponent implements OnInit {
    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    /*查询对象*/
    queryModel: any = {
        siteid: '',
        sitename: '',
        province: 'Default',
        city: 'Default',
        state: 'Default'
    };
    // datagrid 配置
    config: object = {
        url: 'SiteManagement/site-management',
        column: [
            {name: '站点ID', key: 'siteid'},
            {name: '站点名称', key: 'sitename'},
            {name: '站点省市', key: 'provincecity'},
            {name: '站点状态', key: 'state'},
            {name: '收费是否合理', key: 'isreasonable'}
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
                    const modalRef = this.ngbModal.open(SiteModifyInformationComponent);
                    modalRef.componentInstance.actionTitle = '新建站点';
                    modalRef.result.then(result => {
                        this.add(result);
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
                        this.edit(result);
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
                        this.detail(result);
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
                        this.modify('SiteManagement/site-management', result);
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

    add(obj: object) {
        this.customHttpClient.post('Site/Add', obj).subscribe(result => {
            if (result.code === '00') {
                this.refreshGrid();
            }else if (result.code === '01') {
                alert('错误！' + result.message);
            } else {
                alert('未知错误！');
            }
        })
    }
    edit(obj: object) {
        this.customHttpClient.post('Site/Update', obj).subscribe(result => {
            if (result.code === '00') {
                alert('修改成功！');
                this.refreshGrid();
            } else if (result.code === '01') {
                alert('错误！' + result.message);
            } else {
                alert('未知错误！');
            }
        })
    }
    find(): void {
        this.customHttpClient.post('Site/Find', this.queryModel).subscribe(result => {
            this.refreshGrid();
        })
    }
    detail(role: object) {
        this.customHttpClient.post('Site/Site', role).subscribe(result => {

        })
    }
    modify(role: object) {
        this.customHttpClient.post('Site/Site', role).subscribe(result => {

        })
    }
    clear(): void {
        this.queryModel.siteid = '';
        this.queryModel.sitename = '';
        this.queryModel.provincecity = 'Default';
        this.queryModel.state = 'Default';
    }
}
