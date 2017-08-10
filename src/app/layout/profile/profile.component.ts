import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import {CustomHttpClient} from "../../shared/services/custom-http-client/CustomHttpClient";
import {ProfileEditProfileComponent} from "./profile-editProfile.component";
import {ProfileEditpasswordComponent} from "./profile-editpassword.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginService} from "../../login/login.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {
    queryModel: any = {};
    x: any = {};
    // datagrid 配置
    constructor(private ngbModal: NgbModal,public router: Router, private customHttpClient: CustomHttpClient,private loginService: LoginService) {
    }


    ngOnInit() {
        this.loginService.getUserInfo().then(userInfo => {
            this.queryModel = userInfo;
        })
    }

     editProfile() {
        const modalRef = this.ngbModal.open(ProfileEditProfileComponent);
        modalRef.componentInstance.actionTitle = '修改';
        modalRef.componentInstance.editModel = Object.assign({},this.queryModel);
        modalRef.result.then(result => {
            this.queryModel = result;
            this.loginService.userInfo = result;
        },
        error => {
         })
    }
    //todo 修改成功后返回登录界面
    editPassword(){
        const modalRef = this.ngbModal.open(ProfileEditpasswordComponent);
        modalRef.componentInstance.actionTitle = '修改';
        modalRef.result.then(result => {
        }, error => {
        })
    }
}
