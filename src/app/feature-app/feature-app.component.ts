import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/services/global.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-feature',
  templateUrl: './feature-app.component.html',
  styleUrls: ['./feature-app.component.css']
})
export class FeatureAppComponent implements OnInit {

  constructor(
    private _globalService: GlobalService,
  ) { }

  ngOnInit() {

    
  }

  gotoApp(app:string){

    this._globalService.setStorage('app',app);
    this._globalService.eventPublish('getMenu',app);
  }

}
