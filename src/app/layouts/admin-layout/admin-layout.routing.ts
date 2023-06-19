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
import { VocDashboardComponent } from 'app/voc/voc-dashboard/sam-dashboard/voc-dashboard.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
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
    { path: 'voc-dashboard', component:VocDashboardComponent}
];
