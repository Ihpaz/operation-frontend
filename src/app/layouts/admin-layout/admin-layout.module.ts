import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { FeatureAppComponent } from 'app/feature-app/feature-app.component';
import { OutletComponent } from 'app/outlet/outlet.component';
import { DistrictModalComponent, EmpModalComponent, OutletModalComponent } from 'app/outlet/modal/outlet-modal.component';
import { SamWTableComponent } from 'app/components/widgets/sam-w-table/sam-w-table.component';
import { SamWDropdownComponent } from 'app/components/widgets/sam-w-dropdown/sam-w-dropdown.component';
import { MaterialModule } from 'app/modules/material.module';
import { AlertComponent } from 'app/components/widgets/alert/alert.component';
import { GoodsModalComponent } from 'app/goods/modal/goods-modal.component';
import { GoodsComponent } from 'app/goods/goods.component';
import { OutletGoodsComponent } from 'app/outlet-goods/outlet-goods.component';
import { AssetAddModalComponent , InventoryAddModalComponent, ListAssetModalComponent, ListInventoryModalComponent, OutletGoodsModalComponent } from 'app/outlet-goods/modal/outlet-goods-modal.component';
import { NavbarComponent } from 'app/components/navbar/navbar.component';
import { UserRoleComponent } from 'app/userrole/userrole.component';
import { FormComponent } from 'app/form/form.component';
import { FormDetailComponent } from 'app/form/form-detail/form-detail.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { VocComponent } from 'app/voc/voc.component';
import { SaWTableComponent } from 'app/components/widgets/sa-w-table/sa-w-table.component';
import { VocNegatifComponent } from 'app/voc-negatif/voc-negatif.component';
import { VocModalComponent, VocSubCategoryModalComponent } from 'app/voc-negatif/modal/voc-modal.component';
import { NgChartsModule } from 'ng2-charts';
import { VocDashboardComponent } from 'app/voc/voc-dashboard/sam-dashboard/voc-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
    MatIconModule,
    MaterialModule,
    NgxMatTimepickerModule,
    NgChartsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    FeatureAppComponent,
    OutletComponent,
    OutletModalComponent,
    DistrictModalComponent,
    SamWTableComponent,
    SamWDropdownComponent,
    AlertComponent,
    EmpModalComponent,
    OutletGoodsComponent,
    GoodsModalComponent,
    GoodsComponent,
    ListInventoryModalComponent,
    ListAssetModalComponent,
    OutletGoodsModalComponent,
    AssetAddModalComponent,
    InventoryAddModalComponent,
    UserRoleComponent,
    FormComponent,
    FormDetailComponent,
    VocComponent,
    SaWTableComponent,
    VocNegatifComponent,
    VocModalComponent,
    VocSubCategoryModalComponent,
    VocDashboardComponent
    
  ]
})

export class AdminLayoutModule {}
