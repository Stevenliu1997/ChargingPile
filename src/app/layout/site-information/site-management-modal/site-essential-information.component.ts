import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatagridComponent} from '../../../shared/components/widget/datagrid/datagrid.component';
import {CustomHttpClient} from '../../../shared/services/custom-http-client/CustomHttpClient';
import {EditDeviceComponent} from './edit-device.component';
import {ChargingPileInformationComponent} from './charging-pile-information.component';

@Component({
    selector: 'app-site-essential-information',
    templateUrl: './site-essential-information.component.html'
})
export class SiteEssentialInformationComponent implements OnInit {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {};

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    @Input()
    queryModel: any = {}
    config: object = {
        url: 'Site/Manage/Detail',
        column: [
            {name: '设备ID', key: 'deviceid'},
            {name: '设备名称', key: 'devicename'},
            {name: '设备型号', key: 'devicetype'},
            {name: '厂商ID', key: 'manufacturerid'},
            {name: '是否故障', key: 'isnormal'},
            {name: '工作状态', key: 'workstate'},
            {name: '位置信息', key: 'location'},
            {name: '设备备注', key: 'remarks'}
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                action: function (ids) {
                    const modalRef = this.ngbModal.open(EditDeviceComponent);
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
                    url: 'Role/delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'detail',
                action: function (item) {
                    const modalRef = this.ngbModal.open(ChargingPileInformationComponent);
                    modalRef.componentInstance.actionTitle = '此';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                            this.information(result);
                        },
                        error => {
                        })
                }.bind(this)
            },
            {
                type: 'edit',
                action: function (item) {
                    const modalRef = this.ngbModal.open(EditDeviceComponent);
                    modalRef.componentInstance.actionTitle = '修改';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                            this.updateRole(result);
                        },
                        error => {
                        })
                }.bind(this)
            }
        ]
    }

    constructor(
        public activeModal: NgbActiveModal,
        private ngbModal: NgbModal,
        private customHttpClient: CustomHttpClient
    ) {}

    ngOnInit() {
    }

    confirm() {
        this.activeModal.close(this.editModel);
    }

    confirmChange() {
        const tempquery = Object.assign({}, this.editModel);
        tempquery.provincecity = `${this.editModel.province || ''}${this.editModel.city || ''}`;
        tempquery.province = undefined;
        tempquery.city = undefined;
        this.customHttpClient.post('Site/Manage/Update', tempquery).subscribe(result => {
            if (result.code === '00') {
                this.activeModal.close(this.editModel);
            }
        })
    }
}
