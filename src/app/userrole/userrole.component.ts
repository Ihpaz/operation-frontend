import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';
import { UserroleModalComponent } from './modal/userrole-modal.component';

@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.css']
})
export class UserRoleComponent implements OnInit {

  tblSchema: any =  {
    name: "MsUserRole",
    pageSize: [
      10,
      50,
      100
    ],
    requestOptions: {
      path: "Api/v1/userrole/datatable",
      params: []
    },
    useFilterFields: true,
    width: "100vw",
    height: "70vh",
    fields: [
      {
        name: "Username",
        title: "Username",
        width: 100,
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
        name: "type",
        title: "Role",
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
        name: "outlet",
        title: "Outlet",
        width: 300,
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
        title: "username",
        subtitle: "type",
        miniSubtitle: null
      },
      rightField: {
        title: null,
        subtitle:null,
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
    CodeOutlet: string;
    OutletName: string;
  };
  
  constructor(   
      private _globalService: GlobalService,
      private _dialog: MatDialog
    ) { }

  ngOnInit() {
    this.modelFilter = {
      CodeOutlet: '',
      OutletName: '',
    };
  }

  onDataValueHandler(value: any[]) {
    this.datatable = value;
  }

  onFilter() {
    this._globalService.eventPublish('loadTableSAM:MsOutlet', true);
  }

  addUser() {
    const dialogRef = this._dialog.open(UserroleModalComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: {
        RecID: null
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._globalService.showNotif('Success save User role');
        this._globalService.eventPublish('loadTable:MsUserRole', true);
      }
    });
  }

  async callbackActionHandler(action: any) {
    try {
      
          // await this.deleteForm(action.value);

    } catch (error) {
        // this._globalService.showSnackBar(error.message);
        this._globalService.showNotif(error.message);
    } finally {
        this._globalService.eventPublish('global:showLoader', false);
    }
  }

  async deleteOutlet(id) {
    const alertData = await this._globalService.showAlert('Are you sure want to delete ?');
    if (alertData.isYes) {
      try {
      
        await this._globalService.runRequest(
          'DELETE',
          `Api/v1/Outlets/${id}`,
          [],
          
        );

        this._globalService.eventPublish('loadTableSAM:MsOutlet', true);

      } catch (error) {
        this._globalService.showNotif(error.message,'error');
        throw new Error(error.message);
      }
    }
  }

  async getOutletDetail(id) {
    try {
      
      const req = await this._globalService.runRequest(
        'GET',
        `api/v1/Outlets/detail/${id}`,
         
      );

      return req;
    } catch (error) {
      this._globalService.showNotif(error.message);
    } finally {
      
    }

  }

  async downloadExcel(){
    try {
      
      const req = await this._globalService.runRequest('POST','Api/v1/Outlets/download-excel' , [], []);
      console.log(req);
      window.location.href = req;
    } catch (error) {
      
    }
  }

}
