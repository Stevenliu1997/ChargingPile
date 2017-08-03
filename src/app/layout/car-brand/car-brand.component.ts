import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {CarBrandEditComponent} from './car-brand-edit.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomHttpClient} from '../../shared/services/custom-http-client/CustomHttpClient';
import {CarBrandDetailComponent} from './car-brand-detail.component';

@Component({
    selector: 'app-tables',
    templateUrl: './car-brand.component.html',
    styleUrls: ['./car-brand.component.scss'],
    animations: [routerTransition()]
})
export class CarBrandComponent implements OnInit {
    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    /*查询对象*/
    queryModel: any = {};
    // datagrid 配置
    config: object = {
        url: 'CarBrand/Find',
        column: [
            {name: '品牌ID', key: 'brandid'},
            {name: '品牌名称', key: 'brandname'},
            {name: '车型', key: 'cartyper'}
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
                    const modalRef = this.ngbModal.open(CarBrandEditComponent);
                    modalRef.componentInstance.actionTitle = '添加';
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
                    url: 'CarBrand/Delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'edit',
                action: function (item) {
                    const modalRef = this.ngbModal.open(CarBrandEditComponent);
                    modalRef.componentInstance.actionTitle = '编辑';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.edit(result);
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'detail',
                action: function (item) {
                    const modalRef = this.ngbModal.open(CarBrandDetailComponent);
                    modalRef.componentInstance.actionTitle = '车辆';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        this.detail(result);
                    }, error => {})
                }.bind(this)
            }
        ]
    };

    constructor(private ngbModal: NgbModal, private customHttpClient: CustomHttpClient) {
    }

    ngOnInit() {
    }

    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }

    find(): void {
        this.customHttpClient.post('CarBrand/Find', this.queryModel).subscribe(result => {
            this.refreshGrid();
        })
    }

    add(obj: object) {
        this.customHttpClient.post('CarBrand/Add', {brandname: this.queryModel.brandname, cartype: this.queryModel.cartype})
            .subscribe(result => {
            if (result.code === '00') {
                this.clear();
                this.refreshGrid();
            } else if (result.code === '01') {
                alert('错误！' + result.message);
            } else {
                alert('未知错误!');
            }
        });
    }
    clear(): void {
        this.queryModel = {};
    }
}
