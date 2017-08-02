import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {ProfileEditProfileComponent} from "./profile-editProfile.component";
import {ProfileEditpasswordComponent} from "./profile-editpassword.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {error} from "selenium-webdriver";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {
    queryModel: any = {
        account: '',
        name: '',
        rolename: '',
        password: '',
        operatorInformation_operatorid: '',
        phone: '',
        qq: '',
        weixin: '',
        email: ''
    };

    // datagrid 配置
    constructor(private ngbModal: NgbModal,public router: Router, private customHttpClient: CustomHttpClient) {
    }


    ngOnInit() {
        this.customHttpClient.post('Userinfo').subscribe(result => {
            if(result.code == '00'){
                this.queryModel.account=result.pageData.account;
                this.queryModel.name=result.pageData.name;
                this.queryModel.rolename=result.pageData.rolename;
                this.queryModel.password=result.pageData.password;
                this.queryModel.operatorInformation_operatorid=result.pageData.operatorInformation_operatorid;
                this.queryModel.phone=result.pageData.phone;
                this.queryModel.qq=result.pageData.qq;
                this.queryModel.weixin=result.pageData.weixin;
                this.queryModel.email=result.pageData.email;
            }
        },error => {
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
        },
            error => {
            })
    }

    updateProfile(profile: object){
        this.customHttpClient.post('ManageUser/Update', profile).subscribe(result => {
            if(result.code == '00')
                this.queryModel.account=result.pageData.account;
                this.queryModel.name=result.pageData.name;
                this.queryModel.rolename=result.pageData.rolename;
                this.queryModel.password=result.pageData.password;
                this.queryModel.operatorInformation_operatorid=result.pageData.operatorInformation_operatorid;
                this.queryModel.phone=result.pageData.phone;
                this.queryModel.qq=result.pageData.qq;
                this.queryModel.weixin=result.pageData.weixin;
                this.queryModel.email=result.pageData.email;
        },error => {})
    }
    updatePassword(password: object){
        this.customHttpClient.post('User/UpdatePassword', password).subscribe(result => {
        },error => {})
    }
}
