import { Component, Inject, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import * as moment from 'moment';




export const MY_FORMATS = {
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'DD MMM YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };
  
  @Component({
    selector: 'app-goods-modal',
    templateUrl: './goods-modal.component.html',
    styleUrls: ['./goods-modal.component.scss'],
    providers: [
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },
      { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
  })
  
  export class GoodsModalComponent implements OnInit {
  
    onRequest: boolean = false;
    event: string='save';
  
    modelData: {
      id:number;
      GoodsName: string;
      Specification: string;
      GoodsType : string;
    };
  
    constructor(
      private _globalService: GlobalService,
      public _dialogRef: MatDialogRef<GoodsModalComponent>,
      private _dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  
    async ngOnInit() {
      if (this.data.GoodsName) {
        this.modelData = {
          id:this.data.id,
          GoodsName: this.data.GoodsName,
          Specification: this.data.Specification,
          GoodsType: this.data.GoodsType,

        };
        this.event='update';
      }else{
        this.modelData = {
          id:0,
          GoodsName: '',
          Specification: '',
          GoodsType: '',
        };
      }
     
  
      
    }
  
  
    doCancel() {
      this._dialogRef.close(false);
    }
  

  
    async doSave() {
      try {
        this.onRequest = true;

        const method=this.event=='save' ?  'POST' : 'PATCH';
        const url=this.event=='save' ?  `Api/v1/Outlets-goods` : `Api/v1/Outlets-goods/${this.modelData.id}`;

        await this._globalService.runRequest(
          method,
          url,
          [],
          [
            { key: 'GoodsName', value: this.modelData.GoodsName },
            { key: 'GoodsType', value: this.modelData.GoodsType },
            { key: 'Specification', value: this.modelData.Specification },
            { key: 'id',  value: this.modelData.id }
           
          ]
        );
        
        this._dialogRef.close(true);
      } catch (error) {
        this._globalService.showNotif(error.message,'error');
      } finally {
        this.onRequest = false;
      }
    }
  
  }


  





