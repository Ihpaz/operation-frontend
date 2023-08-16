import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';
import { ISAWTableDyn } from 'app/components/widgets/sa-w-table/sa-w-table.interface';

@Component({
  selector: 'app-voc',
  templateUrl: './voc.component.html',
  styleUrls: ['./voc.component.css']
})
export class VocComponent implements OnInit {

  // tblSchema: ISAMWTable = {
  //   name: 'MsVoc',
  //   headers: ['No','Nama Outlet', 'Menu', 'Suka','Rekom','Rating','Saran','DateCreated','Source','Am','Drm','Category'],
  //   requestOptions: {
  //     path: 'Api/v1/voc/datatable',
  //     params: [
        
  //     ],
  //     paramsCanNull: true,
  //   },
  //   limit: 5,
  //   pageSize: [5, 15, 50],
  //   withAction: true,
  //   isSmallScreen: false,
  // }

  tblSchema: any =  {
    name: "MsVoc",
    pageSize: [
      10,
      50,
      100
    ],
    requestOptions: {
      path: "Api/v1/voc/datatable",
      params: []
    },
    useFilterFields: true,
    width: "100vw",
    height: "50vh",
    fields: [
      {
        name: "OutletName",
        title: "Nama Outlet",
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
        name: "Menu",
        title: "Menu",
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
        name: "Saran",
        title: "Saran",
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
        name: "Suka",
        title: "Suka",
        width: 80,
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
        name: "Rekom",
        title: "Rekom",
        width: 0,
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
        name: "Rating",
        title: "Rating",
        width: 80,
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
        name: "Voc_Date",
        title: "Voc Date",
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
      {
        name: "Source",
        title: "Source",
        width: 80,
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
        name: "Am",
        title: "Am",
        width: 90,
        canOrder: false,
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
        name: "Drm",
        title: "Drm",
        width: 0,
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
        name: "Category",
        title: "Category",
        width: 0,
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
        title: "OutletName",
        subtitle: "Saran",
        miniSubtitle: null
      },
      rightField: {
        title: "Source",
        subtitle: "Category",
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

  async exportTemplateVoc() {
    try {
        
        // const token = await this._globalService.getStorage('token');
        // const parameter = [
        //     { key: 'access_token', value: token },

            
        // ];
        const req = await this._globalService.runRequest('GET', 'Api/v1/voc/download-template-voc', []);
        console.log(req,'test')
        window.location.href = req;
    } catch (error) {
        this._globalService.showNotif(error.message,'error');
    }

  }

  async importTemplateVoc() {
    try {
      
     let url='Api/v1/voc/import-template-voc';
     const req= await this._globalService.runRequest(
        'POST',
         url,
        [],
        [
          { key: 'Attachment', value: this.NewAttachment }
        ]
      );
        
      await this._globalService.eventPublish('loadTable:MsVoc', true);
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
    this._globalService.eventPublish('loadTableSAM:MsVoc', true);
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
          `Api/v1/voc/remove/${action.id}`,
          [],
          
        );

        this._globalService.showNotif('Success delete voc!');
        await this._globalService.eventPublish('loadTable:MsVoc', true);

      } catch (error) {
        this._globalService.showNotif(error.message,'error');
        throw new Error(error.message);
      }
    }
  }

 
}
