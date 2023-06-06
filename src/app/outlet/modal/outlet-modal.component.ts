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
    selector: 'app-outlet-modal',
    templateUrl: './outlet-modal.component.html',
    styleUrls: ['./outlet-modal.component.scss'],
    providers: [
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },
      { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
  })
  
  export class OutletModalComponent implements OnInit {
  
    onRequest: boolean = false;
  
    modelData: {
      Am: string;
      Drm: string;
      CodeOutlet: string;
      OutletName:string;
      DistrictArea: string;
      OutletType: string;
      OutletStatus: string;
     
    };
  
    constructor(
      private _globalService: GlobalService,
      public _dialogRef: MatDialogRef<OutletModalComponent>,
      private _dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  
    async ngOnInit() {
      this.modelData = {
        Am: '',
        Drm: '',
        CodeOutlet: '',
        OutletName:'',
        DistrictArea: '',
        OutletType:'',
        OutletStatus:''
      };
  
      
    }
  
  
    doCancel() {
      this._dialogRef.close(false);
    }
  

  
    async doSave() {
      try {
        this.onRequest = true;
        await this._globalService.runRequest(
          'POST',
          `Api/v1/Outlets`,
          [],
          [
            { key: 'Am', value: this.modelData.Am },
            { key: 'Drm', value: this.modelData.Drm },
            { key: 'CodeOutlet', value: this.modelData.CodeOutlet },
            { key: 'OutletName',  value: this.modelData.OutletName },
            { key: 'DistrictArea', value: this.modelData.DistrictArea },
            { key: 'OutletType', value: this.modelData.OutletType },
            { key: 'OutletStatus', value: this.modelData.OutletStatus },
           
          ]
        );
        
        this._dialogRef.close(true);
      } catch (error) {
        this._globalService.showNotif(error.message,'error');
      } finally {
        this.onRequest = false;
      }
    }
  
    
    openModalDistrict() {
      const dialogRef = this._dialog.open(DistrictModalComponent, {
        width: '500px',
        disableClose: false,
        autoFocus: false,
        data: {},
      });
  
   
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.modelData.DistrictArea = result.DistrictArea;
            }
        });
    }
    
   
  
  }


  
  @Component({
    selector: 'app-district-modal',
    templateUrl: './district-modal.component.html',
    styleUrls: ['./modal.component.scss']
  })
  export class DistrictModalComponent implements OnInit {
  
    onRequest: boolean = false;
    
    previewData: any[] = [];
    tempData: any[] = [];
    search: string = '';
  
    modelData: {
      DistrictArea: string;
    };
    trainingList: any[] = [];
  
    constructor(
      private _globalService: GlobalService,
      public _dialogRef: MatDialogRef<DistrictModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  
    async ngOnInit() {
      this.modelData = {
        DistrictArea: '',
      };
  
      // this.trainingList = await this.getMasterTrainingNonMandatory();
      this.previewData = await this.getMasterDistrict();
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
  
    async getMasterDistrict() {
      try {
        this.onRequest = true;
        const req = await this._globalService.runRequest(
          'POST',
          'sam-helpdesk/get-master-department'
        );
        return req.data;
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
  
    onRowClick(index: number) {
      this.previewData.map(item => {
        item.checked = false;
      });
      this.previewData[index].checked = true;
      this.tempData[index].checked = true;
    }
  
    doAction() {
      const filterData = this.previewData.filter(iFilter => {
        return iFilter.checked === true;
      });
      const selectedData = filterData.length ? filterData[0] : null;
      this._dialogRef.close(selectedData);
    }
  
  }




