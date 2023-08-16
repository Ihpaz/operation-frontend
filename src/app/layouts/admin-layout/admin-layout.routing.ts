import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { LoginComponent } from 'app/login/login.component';
import { FeatureAppComponent } from 'app/feature-app/feature-app.component';
import { OutletComponent } from 'app/outlet/outlet.component';
import { GoodsComponent } from 'app/goods/goods.component';
import { OutletGoodsComponent } from 'app/outlet-goods/outlet-goods.component';
import { FormComponent } from 'app/form/form.component';
import { FormDetailComponent } from 'app/form/form-detail/form-detail.component';
import { Component } from '@angular/core';
import { VocComponent } from 'app/voc/voc.component';
import { VocNegatifComponent } from 'app/voc-negatif/voc-negatif.component';
import { VocDashboardComponent } from 'app/voc/voc-dashboard/general-dashboard/voc-dashboard.component';
import { VocDaytodayDashboardComponent } from 'app/voc/voc-dashboard/daytoday-dashboard/voc-daytoday-dashboard.component';
import { AttendanceComponent } from 'app/attendance/attendance.component';
import { ReceivingComponent } from 'app/receiving/receiving.component';
import { ReceivingDetailComponent } from 'app/receiving/receiving-detail/receiving-detail.component';
import { SoupQualityComponent } from 'app/soup-quality/soup-quality.component';
import { SoupQualityDetailComponent } from 'app/soup-quality/soup-quality-detail/soup-quality-detail.component';
import { EmployeeComponent } from 'app/employee/employee.component';
import { SoupQualityDashboardComponent } from 'app/soup-quality/soup-quality-dashboard/soup-quality-dashboard.component';
import { AttendanceDashboardComponent } from 'app/attendance/attendance-dashboard/attendance-dashboard.component';
import { ReceivingByCkComponent } from 'app/receiving/receiving-by-ck/receiving-by-ck.component';
import { ReceivingDashboardComponent } from 'app/receiving/receiving-dashboard/receiving-dashboard.component';
import { UserRoleComponent } from 'app/userrole/userrole.component';
import { ClosingComponent } from 'app/closing/closing.component';
import { ClosingDashboardComponent } from 'app/closing/closing-dashboard/closing-dashboard.component';
import { StorageDashboardComponent } from 'app/storage/storage-dashboard/storage-dashboard.component';
import { RedbillDashboardComponent } from 'app/redbill/redbill-dashboard/redbill-dashboard.component';
import { RedbillComponent } from 'app/redbill/redbill.component';
import { StorageComponent } from 'app/storage/storage.component';
import { CxDashboardComponent } from 'app/cx/cx-dashboard/cx-dashboard.component';
import { PestDashboardComponent } from 'app/pest/pest-dashboard/pest-dashboard.component';
import { FrontPrepDashboardComponent } from 'app/front-prep/front-prep-dashboard/front-prep-dashboard.component';
import { KitchenPrepDashboardComponent } from 'app/kitchen-prep/kitchen-prep-dashboard/kitchen-prep-dashboard.component';
import { FoodLooksDashboardComponent } from 'app/food-looks/food-looks-dashboard/food-looks-dashboard.component';
import { SuhuDashboardComponent } from 'app/suhu/suhu-dashboard/suhu-dashboard.component';
import { NpsDashboardComponent } from 'app/nps/nps-dashboard/nps-dashboard.component';
import { ManagementDashboardComponent } from 'app/management-dashboard/management-dashbaord.component';

export const AdminLayoutRoutes: Routes = [
   
    { path: 'login',      component: LoginComponent },
    { path: 'dashboard',      component: FeatureAppComponent },
    { path: 'outlet',         component: OutletComponent },
    { path: 'outlet-asset',   component: OutletGoodsComponent },
    { path: 'goods',          component: GoodsComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'form',           component: FormComponent},
    { path: 'form/detail',    component: FormDetailComponent},
    { path: 'voc',   component:VocComponent},
    { path: 'voc-negatif',   component:VocNegatifComponent},
    { path: 'voc-dashboard', component:VocDashboardComponent},
    { path: 'voc-dashboard-byday', component:VocDaytodayDashboardComponent},
    { path: 'attendance', component:AttendanceComponent},
    { path: 'receiving', component:ReceivingComponent},
    { path: 'receiving/detail', component:ReceivingDetailComponent},
    { path: 'soup-quality', component:SoupQualityComponent},
    { path: 'soup-quality/detail', component:SoupQualityDetailComponent},
    { path: 'employee', component:EmployeeComponent},
    { path: 'soup-quality/dashboard', component:SoupQualityDashboardComponent},
    { path: 'attendance/dashboard', component:AttendanceDashboardComponent},
    { path: 'receiving-ck', component:ReceivingByCkComponent},
    { path: 'receiving/dashboard', component:ReceivingDashboardComponent},
    { path: 'userrole', component:UserRoleComponent},
    { path: 'closing', component:ClosingComponent},
    { path: 'closing/dashboard', component:ClosingDashboardComponent},
    { path: 'storage/dashboard', component:StorageDashboardComponent},
    { path: 'storage', component:StorageComponent},
    { path: 'redbill/dashboard', component:RedbillDashboardComponent},
    { path: 'redbill', component:RedbillComponent},
    { path: 'cx/dashboard', component:CxDashboardComponent},
    { path: 'pest/dashboard', component:PestDashboardComponent},
    { path: 'frontprep/dashboard', component:FrontPrepDashboardComponent},
    { path: 'kitchenprep/dashboard', component:KitchenPrepDashboardComponent},
    { path: 'foodlooks/dashboard', component:FoodLooksDashboardComponent},
    { path: 'suhu/dashboard', component:SuhuDashboardComponent},
    { path: 'nps/dashboard', component:NpsDashboardComponent},
    { path: 'management/dashboard', component:ManagementDashboardComponent},
    

    
    

    
    
    
    
    

    

    
    
    

    
    

    

    
    
    
    
    
    

];
