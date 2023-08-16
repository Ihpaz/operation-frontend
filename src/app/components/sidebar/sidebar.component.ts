import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/services/global.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/outlet', title: 'Outlet',  icon:'location_on', class: '' },
    { path: '/goods', title: 'Goods',  icon:'library_books', class: '' },
    { path: '/outlet-asset', title: 'Outlet Goods',  icon:'store', class: '' },
    { path: '/form', title: 'Form Digital Checklist',  icon:'content_paste', class: '' },
    { path: '/voc', title: 'Voice Of Customer',  icon:'content_paste', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private _globalService: GlobalService,
  ) { }

  async ngOnInit() {
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
    console.log('msuk nih')
    await this.getMenu();
    const app=await this._globalService.getStorage('app');
    this._globalService.eventPublish('getMenu',app);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  getMenu(){
    this._globalService.eventSubscribe(`getMenu`, async (app: string ='master') => {
     
      try {
        let url='Api/v1/menu/get-menu';
        const req= await this._globalService.runRequest(
           'POST',
            url,
           [],
           [{key:'app',value:app}]
         );

         this.menuItems = req;
      } catch (error) {
        this._globalService.showNotif(error.message,'error')
      }
    })

  }

  Logout(){
    console.log('logout')
    this._globalService.Logout();
  }
}
