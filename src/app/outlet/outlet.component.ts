import { Component, OnInit } from '@angular/core';
import { OutletModalComponent } from './modal/outlet-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'app/services/global.service';
import { ISAMWTable } from 'app/components/widgets/sam-w-table/sam-w-table.component';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.css']
})
export class OutletComponent implements OnInit {

  tblSchema: ISAMWTable = {
    name: 'MsOutlet',
    headers: ['No', 'Area Manager', 'Div Regional Manager','Code Outlet','Outlet Name','DistrictArea','OutletType','OutletStatus',''],
    requestOptions: {
      path: 'sam-helpdesk/get-master-helpdesk-list',
      params: [
        { key: 'CategoryID', value: null },
        { key: 'CategoryNm', value: null },
      ],
      paramsCanNull: true,
    },
    limit: 10,
    pageSize: [10, 25, 50],
    withAction: true,
    isSmallScreen: false,
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

  addOutlet() {
    const dialogRef = this._dialog.open(OutletModalComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: {
        RecID: null
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._globalService.showNotif('Success save outlet');
        this._globalService.eventPublish('loadTableSAM:samMSHelpdesk', true);
      }
    });
  }

}
