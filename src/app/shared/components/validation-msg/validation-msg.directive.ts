/**
 * Created by thundersoft on 2017/8/3.
 */
import {Directive, ElementRef, Input, HostListener, OnInit} from '@angular/core';
import {NgModel} from "@angular/forms";

@Directive({ selector: '[validationMsg]' })
export class ValidationMsgDirective implements OnInit{
    ngOnInit(): void {
        let submitBtn = document.body.querySelector('.btn-submit') as HTMLElement;
        // docment.getElementById()
        if(!submitBtn){
            return;
        }
        let validationFields = document.body.querySelectorAll(' [validationMsg]')
        submitBtn.onclick = event => {
            Array.from(validationFields).forEach(item => {
                let event = new Event('keydown');
                item.dispatchEvent(event);
            })
        }

    }

    errorsMsg: any = {};
    isAddedError: boolean = false;
    activeErrorNode: any;

    constructor(private el: ElementRef) {
        let attrs = this.el.nativeElement.attributes;
        //为空
        if(attrs.hasOwnProperty('required')){
            let errorNode = document.createElement('div');
            errorNode.classList.add('form-control-feedback');
            errorNode.innerText = `不能为空！`;
            this.errorsMsg.required = errorNode;
        }
        if(attrs.hasOwnProperty('minlength')){
            let errorNode = document.createElement('div');
            errorNode.classList.add('form-control-feedback');
            errorNode.innerText = `长度不符！`;
            this.errorsMsg.minlength = errorNode;
        }
    }

    @HostListener('keydown') onkeyDown() {
        window.setTimeout(() => {

            let ele = this.el.nativeElement;
            if(ele.classList.contains('ng-invalid')){
                if(this.activeErrorNode) return;
                ele.parentNode.parentNode.classList.add('has-danger');
                if(ele.attributes.hasOwnProperty('minlength')){
                    this.activeErrorNode = this.errorsMsg.minlength;
                }
                if(ele.attributes.hasOwnProperty('required')){
                    this.activeErrorNode = this.errorsMsg.required;
                }
                ele.parentNode.appendChild(this.activeErrorNode);
            }else {
                if(!this.activeErrorNode) return;
                ele.parentNode.parentNode.classList.remove('has-danger');
                //消除所有错误的nodemsg节点
                ele.parentNode.removeChild(this.activeErrorNode);
                delete this.activeErrorNode;

            }
        }, 0);



    }


}
