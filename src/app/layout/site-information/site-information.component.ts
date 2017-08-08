import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {NgbModal, NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from 'ng2-toastr';
import {SiteManagementAddComponent} from './site-management-modal/site-management-add.component';
import {ChargingRuleAddComponent} from './charging-rule-modal/charging-rule-add.component';
import {ArticleManagementAddComponent} from './article-management-modal/article-management-add.component';
import {SiteEssentialInformationComponent} from './site-management-modal/site-essential-information.component';
import {ChargingRuleEditComponent} from './charging-rule-modal/charging-rule-edit.component';
import {ChargingRuleInformationComponent} from './charging-rule-modal/charging-rule-information.component';

@Component({
    selector: 'app-site-information',
    templateUrl: './site-information.component.html',
    styleUrls: ['./site-information.component.scss'],
    animations: [routerTransition()]
})
export class SiteInformationComponent implements OnInit {
    @ViewChild('siteM')
    private siteMComponent: DatagridComponent;
    @ViewChild('charging')
    private chargingComponent: DatagridComponent;
    @ViewChild('article')
    private articleComponent: DatagridComponent;

    queryModel: any = {};

    /*站点管理*/
    siteMConfig: object = {
        key: 'siteid',
        url: 'SiteInformation/site-management',
        column: [
            {name: '站点ID', key: 'siteid'},
            {name: '站点名称', key: 'sitename'},
            {name: '省市', key: 'provincecity'},
            {name: '站点状态', key: 'state'}
        ],
        params: function () {
            const tempquery = Object.assign({}, this.queryModel);
            if (!tempquery.siteid) {
                tempquery.siteid = -1;
            }
            tempquery.provincecity = `${this.queryModel.province || ''}${this.queryModel.city || ''}`;
            tempquery.province = undefined;
            tempquery.city = undefined;
            return tempquery;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
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
                    url: 'CarBrand/Delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'detail',
                action: function (item) {
                    const modalRef = this.ngbModal.open(SiteEssentialInformationComponent, {size: 'lg'});
                    modalRef.componentInstance.actionTitle = '查看站点信息';
                    modalRef.result.then(result => {
                    }, error => {})
                }.bind(this)
            }
        ]
    };

    /*计费规则管理*/
    chargingRConfig: object = {
        url: 'ChargingRule/Find',
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
            /*const tempquery = Object.assign({}, this.queryModel);
            if (!tempquery.siteid) {
                tempquery.siteid = -1;
            }*/
            return this.queryModel;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                action: function (ids) {
                    const modalRef = this.ngbModal.open(ChargingRuleAddComponent, {size: 'lg'});
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.result.then(result => {
                        this.ChargingRuleAdd(result);
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
                action: function (item) {
                    const modalRef = this.ngbModal.open(ChargingRuleInformationComponent, {size: 'lg'});
                    modalRef.componentInstance.actionTitle = '';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.update(result);
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'edit',
                action: function (item) {
                    const modalRef = this.ngbModal.open(ChargingRuleEditComponent, {size: 'lg'});
                    modalRef.componentInstance.actionTitle = '';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.update(result);
                    }, error => {})
                }.bind(this)
            }
        ]
    };

    /*文章管理*/
    articleMConfig: object = {
        url: 'ArticleManage/Find',
        column: [
            {name: '所属分类', key: 'classification'},
            {name: '一级标题', key: 'levelonetitle'},
            {name: '二级标题', key: 'leveltwotitle'},
            {name: '是否显示', key: 'isdisplay'},
            {name: '追加用户', key: 'additionaluser'},
            {name: '追加时间', key: 'additionaltime'},
            {name: '最后修改人', key: 'finalmodifier'},
            {name: '最后修改时间', key: 'finalmodifiedtime'}
        ],
        params: function () {
            /*const tempquery = Object.assign({}, this.queryModel);
            if (!tempquery.siteid) {
                tempquery.siteid = -1;
            }*/
            return this.queryModel;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                action: function (ids) {
                    const modalRef = this.ngbModal.open(ArticleManagementAddComponent);
                    modalRef.componentInstance.actionTitle = '添加';
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
                action: function (item) {
                    const modalRef = this.ngbModal.open(ArticleManagementAddComponent);
                    modalRef.componentInstance.actionTitle = '编辑';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.refreshGridArticle();
                    }, error => {})
                }.bind(this)
            }
        ]
    };
    constructor(
        private ngbModal: NgbModal,
        public toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    confirm() {

    }
    ngOnInit() {
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
