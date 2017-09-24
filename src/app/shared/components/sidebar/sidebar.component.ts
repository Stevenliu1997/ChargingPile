import {Component, OnInit} from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [
        trigger('menuCollapse', [
            state('collapse', style({
                display: 'none'
            })),
            state('expand',   style({
                display: 'block'
            })),
            transition('collapse => expand', animate('1000ms ease-in')),
            transition('expand => collapse', animate('1000ms ease-out'))
        ])
    ]
})
export class SidebarComponent implements OnInit{
    isActive = false;
    showMenu = '';

    sideMenu: any;
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    ngOnInit(): void {
        this.sideMenu = [
            {name: '系统管理', children: [
                {name: '角色管理', routerLink: '/role'},
                {name: '用户管理', routerLink: '/user'},
                {name: '操作记录', routerLink: '/operation-record'}
            ]},
            {name: '基础数据管理', children: [
                {name: '出厂设置', routerLink: '/factory-settings'},
                {name: '系统设置', routerLink: '/system-setting'},
                {name: '充电桩程序库', routerLink: '/recharge-program'},
                {name: '充电桩硬件设备库', routerLink: '/recharge-equipment'},
                {name: '汽车品牌管理', routerLink: '/car-brand'},
                {name: '对接运营商管理', routerLink: '/dockoperator'},
                {name: '站点管理', routerLink: '/site-management'},
                {name: '硬件提供商管理', routerLink: '/provider'}
            ]},
            {name: '运营商管理', children: [
                {name: '站点管理', routerLink: '/site-information'},
/*                {name: 'IC卡数据管理', routerLink: '/IC-card-manage'},
                {name: 'IC卡审核', routerLink: '/IC-card-check'},*/
                {name: '预约管理', routerLink: '/order-manage'},
                {name: '订单查询', routerLink: '/orderquery'},
                {name: '站点数据分析', routerLink: '/sitedata'},
                {name: '订单分析', routerLink: '/order-analysis'}
            ]},
            {name: '站点运维', children: [
                {name: '电桩监控', routerLink: '/pile-monitor'},
                {name: '实时监控', routerLink: '/real-time-monitoring'},
                {name: '大屏展示', routerLink: '/big-screen'}
            ]}
        ]
    }
}
