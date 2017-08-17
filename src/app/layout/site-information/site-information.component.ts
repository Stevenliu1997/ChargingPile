import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {NgbModal, NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from 'ng2-toastr';
import {CustomHttpClient} from '../../shared/services/custom-http-client/CustomHttpClient';
import {SiteManagementAddComponent} from './site-management-modal/site-management-add.component';
import {ChargingRuleAddComponent} from './charging-rule-modal/charging-rule-add.component';
import {ArticleManagementAddComponent} from './article-management-modal/article-management-add.component';
import {SiteEssentialInformationComponent} from './site-management-modal/site-essential-information.component';
import {ChargingRuleEditComponent} from './charging-rule-modal/charging-rule-edit.component';
import {ChargingRuleInformationComponent} from './charging-rule-modal/charging-rule-information.component';
import {ChargingRuleUpdateComponent} from './charging-rule-modal/charging-rule-update.component';

@Component({
    selector: 'app-site-information',
    templateUrl: './site-information.component.html',
    styleUrls: ['./site-information.component.scss'],
    animations: [routerTransition()],
})
export class SiteInformationComponent implements OnInit {
    @ViewChild('siteM')
    private siteMComponent: DatagridComponent;
    @ViewChild('charging')
    private chargingComponent: DatagridComponent;
    @ViewChild('article')
    private articleComponent: DatagridComponent;

    queryModel: any = {};
    Operator: any = {};

    /*站点管理*/
    siteMConfig: object = {
        key: 'siteid',
        url: 'Site/Manage/Find',
        column: [
            {name: '站点ID', key: 'siteid'},
            {name: '站点名称', key: 'sitename'},
            {name: '省市', key: 'provincecity'},
            {name: '站点状态', key: 'state'}
        ],
        params: function () {
            const tempquery = {
                siteid: 0,
                sitename: '',
                state: '',
                provincecity: '',
                district: '',
            };
            tempquery.siteid = this.queryModel.siteid;
            tempquery.sitename = this.queryModel.sitename;
            tempquery.state = this.queryModel.state;
            tempquery.district = this.queryModel.district;
            if (!tempquery.siteid) {
                tempquery.siteid = -1;
            }
            tempquery.provincecity = `${this.queryModel.province || ''}${this.queryModel.city || ''}`;
            return tempquery;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                allowEmpty: true,
                action: function (ids) {
                    const modalRef = this.ngbModal.open(SiteManagementAddComponent);
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.result.then(result => {
                        this.refreshGridSiteM();
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
                    url: 'Site/Manage/Delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'detail',
                name: '查看站点信息',
                action: function (item) {
                    const modalRef = this.ngbModal.open(SiteEssentialInformationComponent, {size: 'lg'});
                    modalRef.componentInstance.actionTitle = '查看站点信息';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.componentInstance.queryModel.siteid = item.siteid;
                    modalRef.result.then(result => {
                        this.refreshGridSiteM();
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'delete',
                name: '删除',
                action: function (item) {
                }.bind(this),
                autoConfig: {
                    url: 'Site/Manage/Delete'
                }
            }
        ]
    };

    /*计费规则管理*/
    chargingRConfig: object = {
        url: 'ChargingRule/Find',
        column: [
            {name: '计费规则名称', key: 'rulename'},
            {name: '版本号', key: 'version'},
            {name: '规则开始日', key: 'starttime'},
            {name: '规则结束日', key: 'endtime'},
            {name: '规则类别', key: 'ruletype'},
            {name: '使用标志', key: 'usersate'},
            {name: '创建时间', key: 'createtime'}
        ],
        params: function () {
            const tempquery = {
                rulename: '',
                usersate: false,
                version: '',
                ruletype: ''
            };
            tempquery.rulename = this.queryModel.rulename;
            tempquery.version = this.queryModel.version;
            tempquery.ruletype = this.queryModel.ruletype;
            if (this.queryModel.usersate === 'true') {
                tempquery.usersate = true;
            } else if (this.queryModel.usersate === 'false') {
                tempquery.usersate = false;
            } else {
                tempquery.usersate = false;
            }
            return tempquery;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                allowEmpty: true,
                action: function (ids) {
                    const modalRef = this.ngbModal.open(ChargingRuleAddComponent);
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.componentInstance.operatorname = this.Operator.operatorname;
                    modalRef.componentInstance.editModel.operatorid = this.Operator.operatorid;
                    modalRef.result.then(result => {
                        this.refreshGridCharging();
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
                    url: 'ChargingRule/Delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'detail',
                name: '查看详细信息',
                action: function (item) {
                    const modalRef = this.ngbModal.open(ChargingRuleInformationComponent, {size: 'lg'});
                    modalRef.componentInstance.actionTitle = '查看详细信息';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'edit',
                name: '编辑规则',
                action: function (item) {
                    const modalRef = this.ngbModal.open(ChargingRuleUpdateComponent);
                    modalRef.componentInstance.actionTitle = '编辑规则';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.refreshGridCharging();
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'edit',
                name: '编辑细则',
                action: function (item) {
                    const modalRef = this.ngbModal.open(ChargingRuleEditComponent, {size: 'lg'});
                    modalRef.componentInstance.actionTitle = '编辑细则';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.refreshGridCharging();
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'delete',
                name: '删除',
                action: function (item) {
                }.bind(this),
                autoConfig: {
                    url: 'ChargingRule/Delete'
                }
            }
        ]
    };

    /*文章管理*/
    articleMConfig: object = {
        url: 'ArticleManage/Find',
        column: [
            {name: '所属分类', key: 'articletype'},
            {name: '一级标题', key: 'firsttitle'},
            {name: '二级标题', key: 'secondtitle'},
            {name: '是否显示', key: 'isdisplay'},
            {name: '作者', key: 'adduser'},
            {name: '追加时间', key: 'addtime'},
            {name: '最后修改人', key: 'lastupdateuser'},
            {name: '最后修改时间', key: 'lastupdatetime'}
        ],
        params: function () {
            const tempquery = {
                firsttitle: '',
                secondtitle: '',
                isdisplay: true,
                articletype: ''
            };
            tempquery.firsttitle = this.queryModel.firsttitle;
            tempquery.secondtitle = this.queryModel.secondtitle;
            tempquery.articletype = this.queryModel.articletype;
            if (this.queryModel.isdisplay === 'true') {
                tempquery.isdisplay = true;
            } else if (this.queryModel.isdisplay === 'false') {
                tempquery.isdisplay = false;
            } else {
                tempquery.isdisplay = true;
            }
            return tempquery;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                allowEmpty: true,
                action: function (ids) {
                    const modalRef = this.ngbModal.open(ArticleManagementAddComponent);
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.componentInstance.Operator = Object.assign({}, this.Operator);
                    modalRef.result.then(result => {
                        this.refreshGridArticle();
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
                    url: 'ArticleManage/Delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'detail',
                name: '编辑文章',
                action: function (item) {
                    const modalRef = this.ngbModal.open(ArticleManagementAddComponent);
                    modalRef.componentInstance.actionTitle = '编辑';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.componentInstance.Operator = Object.assign({}, this.Operator);
                    modalRef.result.then(result => {
                        this.refreshGridArticle();
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'delete',
                name: '删除',
                action: function (item) {
                }.bind(this),
                autoConfig: {
                    url: 'ArticleManage/Delete'
                }
            }
        ]
    };
    constructor(
        private ngbModal: NgbModal,
        private customHttpClient: CustomHttpClient,
        public toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    confirm() {

    }
    ngOnInit() {
        this.siteclear();
        this.chargingclear();
        this.articleclear();
        this.customHttpClient.get('Operator/Get').subscribe(result => {
            if (result.code === '00') {
                this.Operator = result.data;
            }
        })
    }
    beforeChange($event: NgbTabChangeEvent) {
        if ($event.activeId === 'siteManagement') {
            this.chargingclear();
            this.articleclear();
        } else if ($event.activeId === 'chargingRule') {
            this.siteclear();
            this.articleclear();
        } else if ($event.activeId === 'articleManagement') {
            this.siteclear();
            this.chargingclear();
        }
    }
    refreshGridSiteM() {
        this.siteMComponent.refreshGrid();
    }
    refreshGridCharging() {
        this.chargingComponent.refreshGrid();
    }
    refreshGridArticle() {
        this.articleComponent.refreshGrid();
    }

    siteclear(): void {
        this.queryModel.siteid = '';
        this.queryModel.name = '';
        this.queryModel.province = 'Default';
        this.queryModel.city = 'Default';
        this.queryModel.state = 'Default';
        this.queryModel.district = 'Default';
    }
    chargingclear(): void {
        this.queryModel.rulename = '';
        this.queryModel.version = '';
        this.queryModel.ruletype = 'Default';
        this.queryModel.usersate = 'Default';
    }
    articleclear(): void {
        this.queryModel.firsttitle = 'Default';
        this.queryModel.secondtitle = '';
        this.queryModel.isdisplay = 'Default';
        this.queryModel.articletype = 'Default';
    }
}
