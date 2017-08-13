import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserSelectorComponent} from "./user-selector/user-selector.component";
import {Injectable} from "@angular/core";
/**
 * Created by thundersoft on 2017/8/8.
 */

@Injectable()
export class BusinessSelector {

    constructor(public ngbModal: NgbModal){}

    /**
     * 用户选择器
     * @param multi 多选
     */
    userSelector(multi?: boolean): Promise<any>{
        //TODO 现在只有单选功能
        return new Promise((resolve, reject) => {
            const modalRef = this.ngbModal.open(UserSelectorComponent, {size: 'lg'});
            modalRef.componentInstance.multi = multi;
            modalRef.result.then(result => {
                resolve(result);
            },error => {})
        })

    }
}
