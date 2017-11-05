import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatagridComponent} from '../../../shared/components/widget/datagrid/datagrid.component';
import {CustomHttpClient} from '../../../shared/services/custom-http-client/CustomHttpClient';
import {EditDeviceComponent} from './edit-device.component';
import {ChargingPileInformationComponent} from './charging-pile-information.component';
import {ToastsManager} from 'ng2-toastr';
import {GunInformationComponent} from './gun-information.component';
import {NgForm} from '@angular/forms';
import {CityService} from "../../../shared/services/city-service/city-service";

@Component({
    selector: 'app-site-essential-information',
    templateUrl: './site-essential-information.component.html'
})
export class SiteEssentialInformationComponent implements OnInit {

    @Input()
    actionTitle: string;
    @Input()
    editModel: any = {
        city: "" ,
        province: "",
        district: ""
    };

    citys: any = [];
    areas: any = [];

    @ViewChild('submitForm')
    editForm: NgForm;

    @ViewChild(DatagridComponent)
    private datagridComponent: DatagridComponent;
    @Input()
    queryModel: any = {};
    config: object = {
        url: 'PileManage/Find',
        column: [
            {name: '设备ID', key: 'pileid'},
            {name: '设备名称', key: 'pilename'},
            {name: '设备型号', key: 'type'},
            {name: '厂商ID', key: 'factoryid'},
            {name: '是否故障', key: 'useful'},
            {name: '工作状态', key: 'workstation'},
            {name: '位置信息', key: 'position'},
            {name: '设备备注', key: 'remarks'}
        ],
        params: function () {
            return this.queryModel;
        }.bind(this),
        topActions: [
            {
                type: 'add',
                name: '添加',
                allowEmpty: true,
                action: function (ids) {
                    const modalRef = this.ngbModal.open(EditDeviceComponent);
                    modalRef.componentInstance.actionTitle = '添加';
                    modalRef.componentInstance.editModel.siteid = this.queryModel.siteid;
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
                    url: 'PileManage/Delete'
                }
            }
        ],
        rowActions: [
            {
                type: 'detail',
                name: '充电桩详细信息',
                action: function (item) {
                    const modalRef = this.ngbModal.open(ChargingPileInformationComponent);
                    modalRef.componentInstance.actionTitle = '此站点下充电桩';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.result.then(result => {
                        },
                        error => {
                        })
                }.bind(this)
            },
            {
                type: 'detail',
                name: '充电枪信息',
                action: function (item) {
                    const modalRef = this.ngbModal.open(GunInformationComponent);
                    modalRef.componentInstance.actionTitle = '充电枪';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.componentInstance.editModel.pileid = item.pileid;
                    modalRef.result.then(result => {
                        },
                        error => {
                        })
                }.bind(this)
            },
            {
                type: 'edit',
                name: '编辑充电桩信息',
                action: function (item) {
                    const modalRef = this.ngbModal.open(EditDeviceComponent);
                    modalRef.componentInstance.actionTitle = '修改';
                    modalRef.componentInstance.editModel = Object.assign({}, item);
                    modalRef.componentInstance.editModel.pileid = parseInt(item.pileid, 10);
                    modalRef.result.then(result => {
                        this.refreshGrid();
                        },
                        error => {
                        })
                }.bind(this)
            },
            {
                type: 'delete',
                name: '删除',
                action: function (item) {
                }.bind(this),
                autoConfig: {
                    url: 'PileManage/Delete'
                }
            }
        ]
    }

    constructor(
        public activeModal: NgbActiveModal,
        private ngbModal: NgbModal,
        private customHttpClient: CustomHttpClient,
        public toastr: ToastsManager,
        public cityService: CityService,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }
    ngOnInit() {
    }

    confirm() {
        if (this.editForm.form.invalid) {
            return;
        }
        this.activeModal.close(this.editModel);
    }

    refreshGrid() {
        this.datagridComponent.refreshGrid();
    }
    confirmChange() {
        const tempquery = Object.assign({}, Object.assign({}, this.editModel), {siteid: 0});
        if (tempquery.isopen === 'true') {
            tempquery.isopen = true;
        } else if (tempquery.isopen === 'false') {
            tempquery.isopen = false;
        } else {
            tempquery.isopen = true;
        }
        if (tempquery.isscanning === 'true') {
            tempquery.isscanning = true;
        } else if (tempquery.isscanning === 'false') {
            tempquery.isscanning = false;
        } else {
            tempquery.isscanning = true;
        }
        tempquery.siteid = parseInt(this.editModel.siteid, 10);
        this.customHttpClient.post('Site/Manage/Update', tempquery).subscribe(result => {
            if (result.code === '00') {
                this.activeModal.close(this.editModel);
            }
        })
    }
}
