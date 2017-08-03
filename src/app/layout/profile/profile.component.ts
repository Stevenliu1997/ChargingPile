import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {ProfileEditProfileComponent} from "./profile-editProfile.component";
import {ProfileEditpasswordComponent} from "./profile-editpassword.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {
    queryModel: any = {};
    // datagrid 配置
    config: object = {
        url: 'Userinfo', //和后端交互URL
        column: [
            {name: '用户ID', key: 'account'},
            {name: '用户名', key: 'name'},
            {name: '角色名', key: 'rolename'},
            {name: '密码', key: 'password'},
            {name: '运行商ID', key: 'operatorInformation_operatorid'},
            {name: '手机号', key: 'phone'},
            {name: 'QQ', key: 'qq'},
            {name: '微信', key: 'weixin'},
            {name: 'Emaii地址', key: 'email'},
        ],
        // 与后端交互，queryModel.name
        params: function () {
            return this.queryModel;
        }.bind(this),
    };
    constructor(private ngbModal: NgbModal,public router: Router, private customHttpClient: CustomHttpClient) {
    }


    ngOnInit() {
        this.customHttpClient.get('Userinformation').subscribe(result => {
            this.queryModel = result;
        }, error => {
        })
    }

     editProfile(item) {
        const modalRef = this.ngbModal.open(ProfileEditProfileComponent);
        modalRef.componentInstance.actionTitle = '修改';
        modalRef.componentInstance.editModel = Object.assign({},item);
        modalRef.result.then(result => {
            this.updateProfile(result);
        },
        error => {
         })
    }

    editPassword(){
        const modalRef = this.ngbModal.open(ProfileEditpasswordComponent);
        modalRef.componentInstance.actionTitle = '修改';
        modalRef.result.then(result => {
            this.updatePassword(result);
        })
    }

    updateProfile(profile: object) {
        this.customHttpClient.post('ManageUser/Update', profile).subscribe(result => {

            if (result.code == '00')
                this.queryModel = result;
        }, error => {
        })
    }


    updatePassword(password: object){
        this.customHttpClient.post('User/UpdatePassword', password).subscribe(result => {

        })
    }
}
