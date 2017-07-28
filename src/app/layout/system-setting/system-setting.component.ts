import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {DatagridComponent} from '../../shared/components/widget/datagrid/datagrid.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomHttpClient} from '../../shared/services/custom-http-client/CustomHttpClient';

@Component({
    selector: 'system-setting',
    templateUrl: './system-setting.component.html',
    styleUrls: ['./system-setting.component.scss'],
    animations: [routerTransition()]
})
export class SystemSettingComponent implements OnInit {
    name: String = 'name';

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    /*查询对象*/
    queryModel: any = {
        Status: '开启'
    };
    // datagrid 配置
    config: object = {
        url: 'CarBrand/CarBrand',
        column: [],
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
                    const modalRef = this.ngbModal.open();
                    modalRef.componentInstance.actionTitle = '添加';
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
        rowActions: []
    };

    constructor(private ngbModal: NgbModal, private customHttpClient: CustomHttpClient) {
    }

    ngOnInit() {
    }

    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }

    updateCar(role: object) {
        this.customHttpClient.post('CarBrand/CarBrand', role).subscribe(result => {

        })
    }
    open(): void {
        this.queryModel.Status = '开启';
    }
    close(): void {
        this.queryModel.Status = '关闭';
    }
}
