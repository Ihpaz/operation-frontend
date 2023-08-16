import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';
import { ISAWTableDyn } from 'app/components/widgets/sa-w-table/sa-w-table.interface';

@Component({
  selector: 'app-cx',
  templateUrl: './cx.component.html',
  styleUrls: ['./cx.component.css']
})
export class ClosingComponent implements OnInit {


  tblSchema: any =  {
    name: "MsClosing",
    pageSize: [
      10,
      50,
      100
    ],
    requestOptions: {
      path: "Api/v1/cx/datatable",
      params: []
    },
    useFilterFields: true,
    width: "100vw",
    height: "70vh",
    fields: [
      {
        name: "Q1",
        title: "Date",
        width: 200,
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
        name: "Q2",
        title: "Timestamp",
        width: 200,
        canOrder: true,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q5",
        title: "Outlet",
        width: 200,
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
        name: "Q3",
        title: "Nama",
        width: 80,
        canOrder: true,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q4",
        title: "Jabatan",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q6",
        title: "Total Waste",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q7",
        title: "Link Foto Waste",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q8",
        title: "Link Foto Kondisi Dapur",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q9",
        title: "Bagaimana kebersihan lantai yang anda cek?",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q10",
        title: "Foto area lamian (terlihat seluruh meja)",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q11",
        title: "Bagaimana kebersihan area lamian yang anda cek?",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q12",
        title: "Foto Area Topper (terlihat seluruh meja)",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q13",
        title: "Bagaimana kebersihan area Topper yang anda cek?",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q14",
        title: "Foto Area BBQ (terlihat seluruh meja)",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q15",
        title: "Bagaimana kebersihan area BBQ yang anda cek?",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q16",
        title: "Foto Area Pencucian Piring ",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q17",
        title: "Bagaimana kebersihan area pencucian yang anda cek?",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q18",
        title: "Foto Grease Trap dalam keadaan terbuka & terlihat bagian dalam",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q19",
        title: "Bagaimana kebersihan Grease Trap yang anda cek?",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q20",
        title: "Foto saluran pembuangan dalam keadaan terbuka & terlihat bagian dalam",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q21",
        title: "Bagaimana kebersihan saluran pembuangan yang anda cek?",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q22",
        title: "Foto Area Stockpot",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q23",
        title: "Bagaimana kebersihan Area Stockpot yang anda cek?",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q24",
        title: "Foto bahan yang di thawing untuk bahan toppingan di dalam chiller. ",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q25",
        title: "Foto bahan yang di thawing untuk proses BBQ di dalam chiller.",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q26",
        title: "Foto bahan yang di thawing untuk prosespembuatan kuah di dalam chiller. ",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      },
      {
        name: "Q27",
        title: "Berapa total aktual sales hari ini?",
        width: 80,
        canOrder: false,
        isSticky: false,
        filterOptions: {
          canFilter: false,
          filterType: "text",
          filterSelect: {
            path: null,
            params: []
          }
        }
      }
     
    ],
    fieldActions: [
     
    ],
    forMobile: {
      leftField: {
        title: "Q1",
        subtitle: "Q2",
        miniSubtitle: null
      },
      rightField: {
        title: "Q3",
        subtitle: null,
        miniSubtitle: null
      },
      height: "100vh",
      useAction: true,
      withBackground: true,
      actions: [
       
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
  }

  onFilter() {
    this._globalService.eventPublish('loadTableSAM:MsClosing', true);
  }

  goToDetail(){
    this._globalService.redirectPage(`receiving/detail`, [], true);
  }

  goToDetailWithId(id:number){
    this._globalService.redirectPage(`receiving/detail`, [{key:'id',value:id}], true);
  }


  async callbackActionHandler(action: any) {
    try {

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
          `Api/v1/receiving/remove/${action.id}`,
          [],
          
        );

        this._globalService.showNotif('Success delete receiving!');
        await this._globalService.eventPublish('loadTable:MsClosing', true);

      } catch (error) {
        this._globalService.showNotif(error.message,'error');
        throw new Error(error.message);
      }
    }
  }

 
}
