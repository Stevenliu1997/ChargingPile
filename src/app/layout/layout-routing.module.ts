import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'role', loadChildren: './role/role.module#RoleModule' },
            { path: 'user', loadChildren: './user/user.module#UserModule' },

            /*基础数据管理*/
            /*充电桩程序库*/
            { path: 'recharge-program', loadChildren: './recharge-program/recharge-program.module#RechargeProgramModule' },
            //汽车品牌管理
            { path: 'car-brand', loadChildren: './car-brand/car-brand.module#CarBrandModule' },
            //站点管理
            { path: 'site-management', loadChildren: './site-management/site-management.module#SiteManagementModule'},
            /*系统设置*/
            { path: 'system-setting', loadChildren: './system-setting/system-setting.module#SystemSettingModule'},
            //充电桩硬件设备库
            { path: 'recharge-equipment', loadChildren: './recharge-equipment/recharge-equipment.module#RechargeEquipmentModule' },
            /*操作记录*/
            { path: 'operation-record', loadChildren: './operation-record/operation-record.module#OperationRecordModule' },
            /*个人信息*/
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
            /*IC卡管理*/
            { path: 'IC-card-manage', loadChildren: './IC-card-manage/IC-card-manage.module#ICCardManageModule' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            {path: 'dockoperator', loadChildren: './dockoperator/dockoperator.module#DockoperatorModule'},
            {path: 'provider', loadChildren: './provider/provider.module#ProviderModule'},
            {path: 'order-manage',loadChildren: './order-manage/order-manage.module#OrderManageModule'},
            {path: 'orderquery',loadChildren: './orderquery/orderquery.module#OrderQueryModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
