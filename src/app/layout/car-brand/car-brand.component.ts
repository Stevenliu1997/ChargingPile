import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {CarBrandEditComponent} from './car-brand-edit.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarBrandDetailComponent} from './car-brand-detail.component';
import {ToastsManager} from 'ng2-toastr';

@Component({
    selector: 'app-tables',
    templateUrl: './car-brand.component.html',
    styleUrls: ['./car-brand.component.scss'],
    animations: [routerTransition()]
})
export class CarBrandComponent implements OnInit {
    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;

    queryModel: any = {};

    config: object = {
        key: 'brandid',
        url: 'CarBrand/Find',
        column: [
            {name: '品牌ID', key: 'brandid'},
            {name: '品牌名称', key: 'brandname'},
            {name: '车型', key: 'cartyper'}
        ],
        params: function () {
            const tempquery = Object.assign({}, this.queryModel);
            if (!tempquery.brandid) {
                tempquery.brandid = -1;
            }
            return tempquery;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                allowEmpty: true,
                action: function (ids) {
                    const modalRef = this.ngbModal.open(CarBrandEditComponent);
                    modalRef.componentInstance.actionTitle = '添加';
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
                        this.refreshGrid();
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
                        this.refreshGrid();
                    }, error => {})
                }.bind(this)
            },
            {
                type: 'delete',
                action: function (item) {
                }.bind(this),
                autoConfig: {
                    url: 'CarBrand/Delete'
                }
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

    ngOnInit() {
    }

    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }
    clear(): void {
        this.queryModel = {};
    }
}
