import {Injectable} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmService} from "../confirm-service/confirm.service";
import {CustomHttpClient} from "../custom-http-client/CustomHttpClient";
/**
 * Created by thundersoft on 2017/7/26.
 */

@Injectable()
export class CRUDService {
    constructor(private confirmService: ConfirmService, private customHttpClient: CustomHttpClient) {
    }

    delete(url: string, ids: string | string[], successFn: any, title?: string){
        if(typeof ids  === 'string'){
            ids = [ids];
        }
        this.confirmService.deleteConfirm(title).then(
            result => {
                this.customHttpClient.post(url, {ids: ids}).subscribe(
                    success => {
                        successFn();
                    }
                );
            },
            error => {
            }
        )
    }


}
