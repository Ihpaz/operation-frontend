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
    event: string='save';
  
    modelData: {
      id:number;
      Am: string;
      Drm: string;
      CodeOutlet: string;
      OutletName:string;
      DistrictArea: string;
      OutletType: string;
      OutletMallType: string;
      OutletStatus: string;
      Ownership: string;
      Address: string;
      EmpList:any[];
      EmpIDList:any[];
     
    };
  
    constructor(
      private _globalService: GlobalService,
      public _dialogRef: MatDialogRef<OutletModalComponent>,
      private _dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  
    async ngOnInit() {
      if (this.data.CodeOutlet) {
        this.modelData = {
          id:this.data.id,
          Am: this.data.Am,
          Drm: this.data.Drm,
          CodeOutlet: this.data.CodeOutlet,
          OutletName: this.data.OutletName,
          DistrictArea: this.data.DistrictArea,
          OutletType:this.data.OutletType,
          OutletMallType:this.data.OutletMallType,
          OutletStatus:this.data.OutletStatus,
          EmpList:this.data.EmpList,
          EmpIDList:this.data.EmpIDList,
          Ownership:this.data.Ownership,
          Address:this.data.Address
        };
        this.event='update';
      }else{
        this.modelData = {
          id:0,
          Am: '',
          Drm: '',
          CodeOutlet: '',
          OutletName:'',
          DistrictArea: '',
          OutletType:'',
          OutletStatus:'',
          EmpList:[],
          EmpIDList:[],
          Ownership:'',
          Address:'',
          OutletMallType:''
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
        const url=this.event=='save' ?  `Api/v1/Outlets` : `Api/v1/Outlets/${this.modelData.id}`;

        await this._globalService.runRequest(
          method,
          url,
          [],
          [
            { key: 'Am', value: this.modelData.Am },
            { key: 'Drm', value: this.modelData.Drm },
            { key: 'CodeOutlet', value: this.modelData.CodeOutlet },
            { key: 'OutletName',  value: this.modelData.OutletName },
            { key: 'DistrictArea', value: this.modelData.DistrictArea },
            { key: 'OutletType', value: this.modelData.OutletType },
            { key: 'OutletMallType', value: this.modelData.OutletMallType },
            { key: 'Ownership', value: this.modelData.Ownership },
            { key: 'Address', value: this.modelData.Address },
            { key: 'OutletStatus', value: this.modelData.OutletStatus },
            { key: 'Employee', value: this.modelData.EmpIDList },
           
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

    openModalEmployee() {
     
        const dialogRef = this._dialog.open(EmpModalComponent, {
            width: '500px',
            disableClose: false,
            autoFocus: false,
            data: {},
          });
    
      
        dialogRef.afterClosed().subscribe((result: any[]) => {
          if (result) {

          
            for (const itemResult of result) {
              const filter = this.modelData.EmpIDList.filter((iFilter: string) => {
                return iFilter === itemResult.EmpID;
              });
              
            
              if (!filter.length) {
              
                this.modelData.EmpIDList.push(itemResult.EmpID);
                this.modelData.EmpList.push(itemResult);
              }
            }
          }
        });
    }

    deleteEmp(empId: string) {
     
      this.modelData.EmpIDList = this.modelData.EmpIDList.filter((iFilter: string) => {
        return iFilter !== empId;
      });
  
      this.modelData.EmpList = this.modelData.EmpList.filter((iFilter: any) => {
        return iFilter.EmpID !== empId;
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

      console.log(this.previewData,'data')
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
          'api/v1/Outlets/district'
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


  @Component({
    selector: 'app-emp-modal',
    templateUrl: './emp-modal.component.html',
    styleUrls: ['./modal.component.scss']
  })
  export class EmpModalComponent implements OnInit {
  
    onRequest: boolean = false;
    
    previewData: any[] = [];
    tempData: any[] = [];
    search: string = '';
  
    modelData: {
      EmpID: string;
      FullName: string;
      Position: string;
    };
    trainingList: any[] = [];
  
    constructor(
      private _globalService: GlobalService,
      public _dialogRef: MatDialogRef<EmpModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  
    async ngOnInit() {
      this.modelData = {
        EmpID: '',
        FullName:'',
        Position:''
      };
  
      // this.trainingList = await this.getMasterTrainingNonMandatory();
      this.previewData = await this.getMasterEmployee();

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
  
    async getMasterEmployee() {
      try {
        this.onRequest = true;
        const req = await this._globalService.runRequest(
          'POST',
          'api/v1/Outlets/employee'
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
          if (itemMap.EmpID === item.EmpID) {
            itemMap.checked = !itemMap.checked;
            statusChecked = itemMap.checked;
          }
        });
    
        this.tempData.map((itemMap: any) => {
          if (itemMap.EmpID === item.EmpID) {
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




