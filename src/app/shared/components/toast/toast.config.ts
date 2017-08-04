import {ToastOptions} from "ng2-toastr";
/**
 * Created by thundersoft on 2017/8/3.
 */
export class ToastConfig extends ToastOptions {
    animate = 'fade'; // you can override any options available
    newestOnTop = false;
    showCloseButton = true;
    positionClass = 'toast-top-center';
}
