import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomHttpClient} from '../../shared/services/custom-http-client/CustomHttpClient';

@Component({
    selector: 'site-information',
    templateUrl: './site-information.component.html',
    styleUrls: ['./site-information.component.scss'],
    animations: [routerTransition()]
})
export class SiteInformationComponent implements OnInit {
    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;

    queryModel: any = {
        siteid: '',
        sitename: '',
        province: 'Default',
        city: 'Default',
        state: 'Default',

        chargename: '',
        operator: 'Default',
        chargerulenum: '',
        startstate: 'Default',
        ruletype: 'Default',
        usingsign: 'Default',
        testdata: 'Default',

        levelonetitle: 'Default',
        leveltwotitle: '',
        isdisplay: 'Default',
        classification: 'Default'
    };

    @Input()
    userId: string;

    siteMConfig: object = {
        url: 'SiteInformation/site-management',
        column: [
            {name: '站点ID', key: 'siteid'},
            {name: '站点名称', key: 'sitename'},
            {name: '省市', key: 'provincecity'},
            {name: '站点状态', key: 'state'}
        ],
        params: function () {
            return {userId: this.userId};
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                action: function (ids) {
                    const modalRef = this.ngbModal.open();
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.result.then(result => {
                        this.update(result);
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
                    url: 'CarBrand/Delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'detail',
                action: function (item) {
                    const modalRef = this.ngbModal.open();
                    modalRef.componentInstance.actionTitle = '编辑';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.update(result);
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'delete',
                action: function (item) {
                    const modalRef = this.ngbModal.open();
                    modalRef.componentInstance.actionTitle = '车辆';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.update(result);
                    }, error => {})
                }.bind(this)
            }
        ]
    };

    chargingRConfig: object = {
        url: 'SiteInformation/charing-rule',
        column: [
            {name: '计费规则名称', key: 'chargename'},
            {name: '运营方', key: 'operator'},
            {name: '版本号', key: 'chargerulenum'},
            {name: '规则开始日', key: 'startdate'},
            {name: '规则结束日', key: 'enddate'},
            {name: '开启状态', key: 'startstate'},
            {name: '规则类别', key: 'ruletype'},
            {name: '使用标志', key: 'usingsign'},
            {name: '是否测试数据', key: 'testdata'},
            {name: '创建时间', key: 'createtime'}
        ],
        params: function () {
            return {userId: this.userId};
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                action: function (ids) {
                    const modalRef = this.ngbModal.open();
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.result.then(result => {
                        this.update(result);
                    })
                }.bind(this)
            }
        ],
        rowActions: [
            {
                type: 'detail',
                action: function (item) {
                    const modalRef = this.ngbModal.open();
                    modalRef.componentInstance.actionTitle = '编辑';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.update(result);
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'edit',
                action: function (item) {
                    const modalRef = this.ngbModal.open();
                    modalRef.componentInstance.actionTitle = '车辆';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.update(result);
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'delete',
                action: function (item) {
                    const modalRef = this.ngbModal.open();
                    modalRef.componentInstance.actionTitle = '车辆';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.update(result);
                    }, error => {})
                }.bind(this)
            }
        ]
    };
    articleMConfig: object = {
        url: 'SiteInformation/article-management',
        column: [
            {name: '所属分类', key: 'classification'},
            {name: '一级标题', key: 'levelonetitle'},
            {name: '二级标题', key: 'leveltwotitle'},
            {name: '是否显示', key: 'isdisplay'},
            {name: '排序', key: 'sort'},
            {name: '追加用户', key: 'additionaluser'},
            {name: '追加时间', key: 'additionaltime'},
            {name: '最后修改人', key: 'finalmodifier'},
            {name: '最后修改时间', key: 'finalmodifiedtime'}
        ],
        params: function () {
            return {userId: this.userId};
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                action: function (ids) {
                    const modalRef = this.ngbModal.open();
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.result.then(result => {
                        this.update(result);
                    })
                }.bind(this)
            }
        ],
        rowActions: [
            {
                type: 'detail',
                action: function (item) {
                    const modalRef = this.ngbModal.open();
                    modalRef.componentInstance.actionTitle = '编辑';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.update(result);
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'delete',
                action: function (item) {
                    const modalRef = this.ngbModal.open();
                    modalRef.componentInstance.actionTitle = '车辆';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.update(result);
                    }, error => {})
                }.bind(this)
            }
        ]
    };
    constructor(private customHttpClient: CustomHttpClient) {
    }

    confirm() {

    }
    ngOnInit() {
    }

    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }
    siteclear(): void {
        this.queryModel.siteid = '';
        this.queryModel.sitename = '';
        this.queryModel.province = 'Default';
        this.queryModel.city = 'Default';
        this.queryModel.state = 'Default';
    }
    chargingclear(): void {
        this.queryModel.chargename = '';
        this.queryModel.operator = 'Default';
        this.queryModel.chargerulenum = '';
        this.queryModel.startstate = 'Default';
        this.queryModel.ruletype = 'Default';
        this.queryModel.usingsign = 'Default';
        this.queryModel.testdata = 'Default';
    }
    articleclear(): void {
        this.queryModel.levelonetitle = 'Default';
        this.queryModel.leveltwotitle = '';
        this.queryModel.isdisplay = 'Default';
        this.queryModel.classification = 'Default';
    }
}
