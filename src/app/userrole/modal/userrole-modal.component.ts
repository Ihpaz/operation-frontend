import { Component, Inject, OnInit, Type } from '@angular/core';
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
    selector: 'app-userrole-modal',
    templateUrl: './userrole-modal.component.html',
    styleUrls: ['./userrole-modal.component.scss'],
    providers: [
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },
      { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
  })
  
  export class UserroleModalComponent implements OnInit {
  
    onRequest: boolean = false;
    event: string='save';
  
    modelData: {
      Username: string;
      Type: string;
      Password:string;
      OutletList:any[];
      OutletIdList:any[];
    };
  
    constructor(
      private _globalService: GlobalService,
      public _dialogRef: MatDialogRef<OutletsModalComponent>,
      private _dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  
    async ngOnInit() {
      if (this.data.Username) {
        this.modelData = {
          Username:this.data.Username,
          Password:this.data.Password,
          Type:this.data.Type,
          OutletList:this.data.OutletList,
          OutletIdList:this.data.OutletIdList
        };
        this.event='update';
      }else{
        this.modelData = {
          Username:'',
          Password:'',
          Type:'',
          OutletList:[],
          OutletIdList:[]
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
        const url=this.event=='save' ?  `Api/v1/userrole` : `Api/v1/userrole/${this.modelData.Username}`;

        await this._globalService.runRequest(
          method,
          url,
          [],
          [
            { key: 'Username', value: this.modelData.Username },
            { key: 'Password', value: this.modelData.Password },
            { key: 'Type', value: this.modelData.Type },
            { key: 'Outlets', value: this.modelData.OutletIdList },
           
          ]
        );
        
        this._dialogRef.close(true);
      } catch (error) {
        this._globalService.showNotif(error.message,'error');
      } finally {
        this.onRequest = false;
      }
    }
  
    openModalOutlet() {
     
        const dialogRef = this._dialog.open(OutletsModalComponent, {
            width: '500px',
            disableClose: false,
            autoFocus: false,
            data: {},
          });
    
      
        dialogRef.afterClosed().subscribe((result: any[]) => {
          if (result) {

          
            for (const itemResult of result) {
              const filter = this.modelData.OutletIdList.filter((iFilter: string) => {
                return iFilter === itemResult.id;
              });
              
            
              if (!filter.length) {
              
                this.modelData.OutletIdList.push(itemResult.id);
                this.modelData.OutletList.push(itemResult);
              }
            }
          }
        });
    }

    deleteEmp(id: string) {
     
      this.modelData.OutletIdList = this.modelData.OutletIdList.filter((iFilter: string) => {
        return iFilter !== id;
      });
  
      this.modelData.OutletList = this.modelData.OutletList.filter((iFilter: any) => {
        return iFilter.id !== id;
      });
    }
    
   
  
  }


  


  @Component({
    selector: 'app-outlet-modal',
    templateUrl: './outlet-modal.component.html',
    styleUrls: ['./modal.component.scss']
  })
  export class OutletsModalComponent implements OnInit {
  
    onRequest: boolean = false;
    
    previewData: any[] = [];
    tempData: any[] = [];
    search: string = '';
  
    modelData: {
      OutletName: string;
      id:number;
    };
    trainingList: any[] = [];
  
    constructor(
      private _globalService: GlobalService,
      public _dialogRef: MatDialogRef<OutletsModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  
    async ngOnInit() {
      this.modelData = {
        OutletName:'',
        id:0
      };
  
      // this.trainingList = await this.getMasterTrainingNonMandatory();
      this.previewData = await this.getMasterOutlet();

      this.previewData.map(item => {
        let isChecked = false;
        if (this.data.defaultValue) {
          for (const key in item) {
            isChecked = item[key] === this.data.defaultValue ? true : false;
            if (isChecked) break;
          }
        }
        item['checked'] = isChecked;
      });
      this.tempData = this.previewData;
    }
  
    doCancel() {
      this._dialogRef.close();
    }
  
    async getMasterOutlet() {
      try {
        this.onRequest = true;
        const req = await this._globalService.runRequest(
          'POST',
          'api/v1/Outlets/outletlist'
        );
        return req;
      } catch (error) {
        this._globalService.showNotif(error.message);
      } finally {
        this.onRequest = false;
      }
    }
  
    onSearch() {
      if (this.search) {
        const filterData = this.tempData.filter(item => {
          let isTrue: boolean = false;
          for (const key in item) {
            if (typeof item[key] === 'string') {
              const val = item[key].toLowerCase();
              if (val.indexOf(this.search.toLowerCase()) > -1) {
                isTrue = true;
                break;
              }
            }
          }
          return isTrue;
        });
        this.previewData = filterData;
      } else {
        this.previewData = this.tempData;
      }
    }
  
    onRowClick(item: any) {
   
        let statusChecked: boolean = false;
        this.previewData.map((itemMap: any) => {
          if (itemMap.id === item.id) {
            itemMap.checked = !itemMap.checked;
            statusChecked = itemMap.checked;
          }
        });
    
        this.tempData.map((itemMap: any) => {
          if (itemMap.id === item.id) {
            itemMap.checked = statusChecked;
          }
        });
    }
  
    doAction() {
  
      const filterData: any[] = this.tempData.filter(iFilter => {
        return iFilter.checked === true;
      });
      this._dialogRef.close(filterData);
    }
  
  }




