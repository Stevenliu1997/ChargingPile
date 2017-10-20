import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    constructor(public router: Router) { }

    ngOnInit() {
        if (this.router.url === '/') {
            this.router.navigate(['/role']);
        }
    }

    onActivate(event) {
        window.setTimeout(() => {
            let nodes = document.body.querySelectorAll('.sidebar-parent-menu');
            for(let i=0;i<nodes.length;i++){
                let n = nodes[i];
                // n.classList.remove('active');
                if(n.parentElement.querySelectorAll('.sub-menu .active').length > 0){
                    n.classList.add('active');
                }else {
                    n.classList.remove('active')
                }
            }
        })

    }


}
