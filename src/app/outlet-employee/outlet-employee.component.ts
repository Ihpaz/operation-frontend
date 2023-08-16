import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';
import { ISAWTableDyn } from 'app/components/widgets/sa-w-table/sa-w-table.interface';

@Component({
  selector: 'app-outlet-employee',
  templateUrl: './outlet-employee.component.html',
  styleUrls: ['./outlet-employee.component.css']
})
export class OutletEmployeeComponent implements OnInit {

  

  tblSchema: any =  {
    name: "MsOutletEmployee",
    pageSize: [
      10,
      50,
      100
    ],
    requestOptions: {
      path: "Api/v1/attendance/datatable",
      params: []
    },
    useFilterFields: true,
    width: "100vw",
    height: "70vh",
    fields: [
      {
        name: "EmployeeId",
        title: "Employee ID",
        width: 200,
        canOrder: true,
        isSticky: true,
        filterOptions: {
          canFilter: true,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "FullName",
        title: "Full Name",
        width: 200,
        canOrder: true,
        isSticky: true,
        filterOptions: {
          canFilter: true,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "OutletName",
        title: "Outlet Name",
        width: 150,
        canOrder: true,
        isSticky: true,
        filterOptions: {
          canFilter: true,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      }
    ],
    fieldActions: [
      {
        title: "Delete",
        icon: "delete",
        width: "100px",
        action: {
          type: "pushPage",
          pageId: "attrsrevform",
          widthModal: null,
          params: [
           
          ],
          requestOptions: {
            path: null,
            params: []
          },
          confirmation: {
            useConfirmation: false,
            withRemark: false,
            remarkKey: null,
            message: null
          },
          onSuccessRequest: {
            type: "stay",
            pageId: null,
            loadTable: [],
            alert: {
              useAlert: false,
              message: null
            }
          },
          viewFileKey: "URL",
          showHideCondition: {
            useShowHideCondition: false,
            condition: {
              and: [],
              or: []
            }
          }
        }
      }
    ],
    forMobile: {
      leftField: {
        title: "EmployeeId",
        subtitle: "Fullname",
        miniSubtitle: null
      },
      rightField: {
        title: "CheckIn",
        subtitle: "CheckOut",
        miniSubtitle: null
      },
      height: "100vh",
      useAction: true,
      withBackground: true,
      actions: [
        {
          title: "View",
          icon: "info",
          width: "100px",
          action: {
            type: "pushPage",
            pageId: "attrsrevform",
            widthModal: null,
            params: [
              {
                key: "RecID",
                value: null
              }
            ],
            requestOptions: {
              path: null,
              params: []
            },
            confirmation: {
              useConfirmation: false,
              withRemark: false,
              remarkKey: null,
              message: null
            },
            onSuccessRequest: {
              type: "stay",
              pageId: null,
              loadTable: [],
              alert: {
                useAlert: false,
                message: null
              }
            },
            viewFileKey: "URL",
            showHideCondition: {
              useShowHideCondition: false,
              condition: {
                and: [],
                or: []
              }
            }
          }
        }
      ]
    }
  }


  datatable: any[] = [];
  modelFilter: {
    Tittle: string;
  };
  
  onUpload: boolean = false;
  acceptExt: string = ".xlsx,xlx";
  url: string = '';
  Attachment:string='';
  AttachmentUrl:string='';
  NewAttachment:string='';

  constructor(   
      private _globalService: GlobalService,
      private _dialog: MatDialog
    ) { }

  ngOnInit() {
    this.modelFilter = {
      Tittle: ''
    };
  }

  async exportTemplateAttendance() {
    try {
        
        // const token = await this._globalService.getStorage('token');
        // const parameter = [
        //     { key: 'access_token', value: token },

            
        // ];
        const req = await this._globalService.runRequest('GET', 'Api/v1/attendance/download-template-attendance', []);
        window.location.href = req;
    } catch (error) {
        this._globalService.showNotif(error.message,'error');
    }

  }

  async importTemplateAttendance() {
    try {
      
     let url='Api/v1/attendance/import-template-attendance';
     const req= await this._globalService.runRequest(
        'POST',
         url,
        [],
        [
          { key: 'Attachment', value: this.NewAttachment }
        ]
      );
        
      await this._globalService.eventPublish('loadTable:MsOutletEmployee', true);
    } catch (error) {
      this._globalService.showNotif(error.message);
    } 
  }


  async attachFile() {
    if (!this.onUpload) {
        document.getElementById(`fileInput`).click();
    }
      
  }

  async fileChange(file: any) {
    try {
      this.onUpload=true;
        if (file.length) {
            const size = file[0].size;
            if (  (size / 1000) > 50000) {
                throw new Error(`File size is not allowed. Max file size is 50 MB`);
            }
            const filename: string = file[0].name;
            this.Attachment = filename;
            const extFl = filename.substring(filename.lastIndexOf('.'), filename.length);
            const isPDF = extFl === '.pdf' ? true : false;
            const isXls = extFl === '.xls' || extFl === '.xlsx' ? true : false;
            if (isPDF || isXls) {
        
                const req = await this._globalService.runRequestUpload('', file[0]);
                this.Attachment = filename;
                this.AttachmentUrl = req.data.url;
                this.NewAttachment = req.data.filename;
               
            }
        }

        this.onUpload=false;
    } catch (error) {
        this._globalService.showAlert(error.message);
    }
  }

  removeAttachment(event){
    event.preventDefault();
    event.stopPropagation();
    this.Attachment='';
    this.NewAttachment='';
    this.AttachmentUrl='';
  }

  onDataValueHandler(value: any[]) {
    this.datatable = value;
    console.log(this.datatable,'datatable')
  }

  onFilter() {
    this._globalService.eventPublish('loadTableSAM:MsOutletEmployee', true);
  }

  goToDetail(){
    this._globalService.redirectPage(`form/detail`, [], true);
  }

  goToDetailWithId(id:number){
    this._globalService.redirectPage(`form/detail`, [{key:'id',value:id}], true);
  }


  async callbackActionHandler(action: any) {
    try {
      
          await this.deleteForm(action.value);

    } catch (error) {
        // this._globalService.showSnackBar(error.message);
        this._globalService.showNotif(error.message);
    } finally {
        this._globalService.eventPublish('global:showLoader', false);
    }
  }

  async deleteForm(action) {
    const alertData = await this._globalService.showAlert('Are you sure want to delete ?');
    if (alertData.isYes) {
      try {
      
        await this._globalService.runRequest(
          'DELETE',
          `Api/v1/attendance/remove/${action.id}`,
          [],
          
        );

        this._globalService.showNotif('Success delete attendance!');
        await this._globalService.eventPublish('loadTable:MsOutletEmployee', true);

      } catch (error) {
        this._globalService.showNotif(error.message,'error');
        throw new Error(error.message);
      }
    }
  }

 
}
