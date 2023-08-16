import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';
import { ISAWTableDyn } from 'app/components/widgets/sa-w-table/sa-w-table.interface';

@Component({
  selector: 'app-front-prep',
  templateUrl: './front-prep.component.html',
  styleUrls: ['./front-prep.component.css']
})
export class FrontPrepComponent implements OnInit {


  tblSchema: any =  {
    name: "MsFrontPrep",
    pageSize: [
      10,
      50,
      100
    ],
    requestOptions: {
      path: "Api/v1/front-prep/datatable",
      params: []
    },
    useFilterFields: true,
    width: "100%",
    height: "70vh",
    fields: [
      {
        name: "EmpID",
        title: "Employee ID",
        width: 50,
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
        width: 100,
        canOrder: true,
        isSticky: false,
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
        name: "TransDate",
        title: "Tanggal Pembuatan",
        width: 80,
        canOrder: true,
        isSticky: false,
        filterOptions: {
          canFilter: true,
          filterType: "date",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
  
     
      
    ],
    fieldActions: [
      {
        title: "View",
        icon: "info",
        width: "100px",
        action: {
          type: "detail",
          pageId: "",
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
      },
      {
        title: "Delete",
        icon: "delete",
        width: "100px",
        action: {
          type: "delete",
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
        subtitle: "OutletName",
        miniSubtitle: null
      },
      rightField: {
        title: "TransDate",
        subtitle: null,
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
            pageId: null,
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


  onDataValueHandler(value: any[]) {
    this.datatable = value;
    console.log(this.datatable,'datatable')
  }

  onFilter() {
    this._globalService.eventPublish('loadTableSAM:MsFrontPrep', true);
  }

  goToDetail(){
    this._globalService.redirectPage(`front-prep/detail`, [], true);
  }

  goToDetailWithId(id:number){
    this._globalService.redirectPage(`front-prep/detail`, [{key:'id',value:id}], true);
  }


  async callbackActionHandler(action: any) {
    try {

      console.log(action)
        if(action.action =='delete'){
          await this.deleteForm(action.value);
        }else if(action.action =='detail'){
            this.goToDetailWithId(action.value.id)
        }
          

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
          `Api/v1/front-prep/remove/${action.id}`,
          [],
          
        );

        this._globalService.showNotif('Success delete soup quality!');
        await this._globalService.eventPublish('loadTable:MsFrontPrep', true);

      } catch (error) {
        this._globalService.showNotif(error.message,'error');
        throw new Error(error.message);
      }
    }
  }

 
}
