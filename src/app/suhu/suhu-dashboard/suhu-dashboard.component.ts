import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicService } from 'app/services/dynamic.service';
import { GlobalService } from 'app/services/global.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-suhu-dashboard',
  templateUrl: './suhu-dashboard.component.html',
  styleUrls: ['./suhu-dashboard.component.scss'],

})
export class SuhuDashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChild('chartCanvas') chartCanvas: ElementRef;
  
  tblSchema: any =  {
    name: "MsSuhuQuaDashboard",
    pageSize: [
      10,
      50,
      100
    ],
    requestOptions: {
      path: "Api/v1/suhu/get-dashboard-suhu-qua/datatable",
      pathDownload: "Api/v1/suhu/download-excel-qua",
      params: [ 
      { key: 'Year', value: null },
      { key: 'Bulan', value: null }
    ]
    },
    useFilterFields: false,
    useDownloadPdfButton: true,
    width: "100vw",
    height: "70vh",
    fields: [
      {
        name: "OutletName",
        title: "Outlet Name",
        width: 250,
        canOrder: true,
        isSticky: true,
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
        name: "Am",
        title: "AM",
        width: 250,
        canOrder: true,
        isSticky: true,
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
        name: "1",
        title: "1",
        width: 0,
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
        name: "2",
        title: "2",
        width: 0,
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
        name: "3",
        title: "3",
        width: 0,
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
        name: "4",
        title: "4",
        width: 0,
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
        name: "5",
        title: "5",
        width: 0,
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
        name: "6",
        title: "6",
        width: 0,
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
        name: "7",
        title: "7",
        width: 0,
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
        name: "8",
        title: "8",
        width: 0,
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
        name: "9",
        title: "9",
        width: 0,
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
        name: "10",
        title: "10",
        width: 0,
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
        name: "11",
        title: "11",
        width: 0,
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
        name: "12",
        title: "12",
        width: 0,
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
        name: "13",
        title: "13",
        width: 0,
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
        name: "14",
        title: "14",
        width: 0,
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
        name: "15",
        title: "15",
        width: 0,
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
        name: "16",
        title: "16",
        width: 0,
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
        name: "17",
        title: "17",
        width: 0,
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
        name: "18",
        title: "18",
        width: 0,
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
        name: "19",
        title: "19",
        width: 0,
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
        name: "20",
        title: "20",
        width: 0,
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
        name: "21",
        title: "21",
        width: 0,
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
        name: "22",
        title: "22",
        width: 0,
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
        name: "23",
        title: "23",
        width: 0,
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
        name: "24",
        title: "24",
        width: 0,
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
        name: "25",
        title: "25",
        width: 0,
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
        name: "26",
        title: "26",
        width: 0,
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
        name: "27",
        title: "27",
        width: 0,
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
        name: "28",
        title: "28",
        width: 0,
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
        name: "29",
        title: "29",
        width: 0,
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
        name: "30",
        title: "30",
        width: 0,
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
        name: "31",
        title: "31",
        width: 0,
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
        title: "OutletName",
        subtitle: "am",
        miniSubtitle: null
      },
      rightField: {
        title: "qty",
        subtitle: "rank",
        miniSubtitle: null
      },
      height: "100vh",
      useAction: true,
      withBackground: true,
      actions: [
      
      ]
    }
  }

  tblSchema2: any =  {
    name: "MsSuhuCompDashboard",
    pageSize: [
      10,
      50,
      100
    ],
    requestOptions: {
      path: "Api/v1/suhu/get-dashboard-suhu-comp/datatable",
      pathDownload: "Api/v1/suhu/download-excel-comp",
      params: [ 
      { key: 'Year', value: null },
      { key: 'Bulan', value: null }
    ]
    },
    useFilterFields: false,
    useDownloadPdfButton: true,
    width: "100vw",
    height: "70vh",
    fields: [
      {
        name: "OutletName",
        title: "Outlet Name",
        width: 250,
        canOrder: true,
        isSticky: true,
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
        name: "Am",
        title: "AM",
        width: 250,
        canOrder: true,
        isSticky: true,
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
        name: "1",
        title: "1",
        width: 0,
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
        name: "2",
        title: "2",
        width: 0,
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
        name: "3",
        title: "3",
        width: 0,
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
        name: "4",
        title: "4",
        width: 0,
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
        name: "5",
        title: "5",
        width: 0,
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
        name: "6",
        title: "6",
        width: 0,
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
        name: "7",
        title: "7",
        width: 0,
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
        name: "8",
        title: "8",
        width: 0,
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
        name: "9",
        title: "9",
        width: 0,
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
        name: "10",
        title: "10",
        width: 0,
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
        name: "11",
        title: "11",
        width: 0,
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
        name: "12",
        title: "12",
        width: 0,
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
        name: "13",
        title: "13",
        width: 0,
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
        name: "14",
        title: "14",
        width: 0,
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
        name: "15",
        title: "15",
        width: 0,
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
        name: "16",
        title: "16",
        width: 0,
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
        name: "17",
        title: "17",
        width: 0,
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
        name: "18",
        title: "18",
        width: 0,
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
        name: "19",
        title: "19",
        width: 0,
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
        name: "20",
        title: "20",
        width: 0,
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
        name: "21",
        title: "21",
        width: 0,
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
        name: "22",
        title: "22",
        width: 0,
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
        name: "23",
        title: "23",
        width: 0,
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
        name: "24",
        title: "24",
        width: 0,
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
        name: "25",
        title: "25",
        width: 0,
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
        name: "26",
        title: "26",
        width: 0,
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
        name: "27",
        title: "27",
        width: 0,
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
        name: "28",
        title: "28",
        width: 0,
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
        name: "29",
        title: "29",
        width: 0,
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
        name: "30",
        title: "30",
        width: 0,
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
        name: "31",
        title: "31",
        width: 0,
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
        title: "OutletName",
        subtitle: "am",
        miniSubtitle: null
      },
      rightField: {
        title: "qty",
        subtitle: "rank",
        miniSubtitle: null
      },
      height: "100vh",
      useAction: true,
      withBackground: true,
      actions: [
      
      ]
    }
  }

  modelFilter: {
    Year: number;
    Bulan: any;
  };

  modelFilterByMonth: {
    StartDate: Date;
    EndDate: Date;
    OutletName: string;
    Am:string;
  };

  StartDate:Date=new Date('2023-01-01');
  EndDate:Date=new Date();
  OutletName:string="";

  constructor(
    private _globalService: GlobalService,
    private _dynamicService: DynamicService,
  ) { }


  barChartData: ChartData<'bar'>;
  barChartDataQua: ChartData<'bar'>;
  leftWidth: number=100;
  rightWidth: number=50;



 bulan:string[]=['Januari','Febuari','Maret','April','Mei','Juni','Juli',
 'Agustus','September','Oktober','November','Desember'];

 year:number[]=[];

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  
    scales: {
      x: {
        stacked: true,
        ticks: {
          font: {
            family: 'Arial',
            style: 'italic',
            weight:'bold',
            size: 14
          }
        }
      },
      y: {
        stacked: true,
        ticks: {
          font: {
            family: 'Arial',
            style: 'italic',
            weight:'bold',
            size: 14
          }
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            family: 'Arial',
            size: 14,
            weight: 'bold',
            style: 'italic'
          }
        }
      },
      datalabels: {
        anchor: 'center',
        align: 'center',
        display: (context) => {
          return context.dataset.data[context.dataIndex] !== 0;
        },
        font: {
          family: 'Arial',
          size: 14,
          weight: 'bold',
          style: 'italic'
        }
      }
    },
    
  };
  barChartType: ChartType = 'bar';
  barChartPlugins = [
    DataLabelsPlugin
  ];

  barChartOptionsStacked: any = {
    responsive: true,
    scales: { x: { stacked: true }, y: { stacked: true } }
  };

  listOutlet:string[]=[];
  listAm:string[]=[];
  
  async ngOnInit() {

     
     let dateNow= new Date(); 
     let yearNow= dateNow.getFullYear();
     let monthNow = dateNow.getMonth();

     for(let x=1;x<=2;x++){
        this.year.push(yearNow-x);
     }

     this.year.push(yearNow);
    //  await this.getDashboardSAM();

     this.modelFilter = {
      Year: yearNow,
      Bulan:monthNow+1,
     }

     this.modelFilterByMonth = {
      StartDate: this.StartDate,
      EndDate: this.EndDate,
      OutletName: this.OutletName,
      Am:""
     }

     
     await this.getOutlet();
     await this.getAm();
     await this.getDashboardSuhu();
     await this.getDashboardSuhuQua();
  }



  filter(){
    // this.getDashboardSAM()
     this._globalService.eventPublish('loadTable:MsSuhuQuaDashboard', true);
     this._globalService.eventPublish('loadTable:MsSuhuCompDashboard', true);
  }

  filterGrafik(){
   this.getDashboardSuhu();
   this.getDashboardSuhuQua()
  }

  chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  onDataValueHandler(value: any[]) {
  }

  downloadChart() {
    const canvas = this.chartCanvas.nativeElement;
    // Use html2canvas to capture the chart canvas as an image
    html2canvas(canvas).then((canvas) => {
      // Create a new jsPDF instance
      const pdf = new jsPDF();

      // Convert the canvas image to a base64-encoded string
      const chartImage = canvas.toDataURL('image/png');

      // Add the image to the PDF document
      pdf.addImage(chartImage, 'PNG', 10, 10, 190, 100);

      // Save the PDF document
      pdf.save('dashboard_voc.pdf');
    });
  }

  async getOutlet() {
    try {
      
      const req = await this._globalService.runRequest(
        'POST',
        `api/v1/Outlets/outletlist`,
         
      );

      this.listOutlet=req;
      return req;
    } catch (error) {
      this._globalService.showNotif(error.message);
    } finally {
      
    }

  }

  async getAm() {
    try {
      
      const req = await this._globalService.runRequest(
        'POST',
        `api/v1/Outlets/am`,
         
      );
      
      console.log(req);
      this.listAm=req;
      return req;
    } catch (error) {
      this._globalService.showNotif(error.message);
    } finally {
      
    }

  }

  async getDashboardSuhu() {
    try {
      // this._dynamicService.showLoader();
      let url='Api/v1/suhu/dashboard-suhubar-comp-ByMonth';
      const req= await this._globalService.runRequest(
         'POST',
          url,
         [],
         [
          {key:'StartDate',value:this.modelFilterByMonth.StartDate},
          {key:'EndDate',value:this.modelFilterByMonth.EndDate},
          {key:'OutletName',value:this.modelFilterByMonth.OutletName},
          {key:'Am',value:this.modelFilterByMonth.Am}
         ]
       );

       this.barChartData ={labels:req.data.labels,
        datasets:req.data.data
      } ;
     
      return true;
    } catch (error) {
      this._globalService.showNotif(error.message,'error');
    } finally {
      this._globalService.eventPublish('global:showLoader', false);
    }
  }

  async getDashboardSuhuQua() {
    try {
      // this._dynamicService.showLoader();
      let url='Api/v1/suhu/dashboard-suhubar-qua-ByMonth';
      const req= await this._globalService.runRequest(
         'POST',
          url,
         [],
         [
          {key:'StartDate',value:this.modelFilterByMonth.StartDate},
          {key:'EndDate',value:this.modelFilterByMonth.EndDate},
          {key:'OutletName',value:this.modelFilterByMonth.OutletName},
          {key:'Am',value:this.modelFilterByMonth.Am}
         ]
       );

       this.barChartDataQua ={labels:req.data.labels,
        datasets:req.data.data
      } ;
     
      return true;
    } catch (error) {
      this._globalService.showNotif(error.message,'error');
    } finally {
      this._globalService.eventPublish('global:showLoader', false);
    }
  }

  async getData() {
    try {
       this._dynamicService.showLoader();
      const req = await this._globalService.runRequest(
        'POST',
        `api/v1/suhu/importRawData`,
         
      );
      
      this.filter();
      return req;
    } catch (error) {
      this._globalService.showNotif(error.message);
    } finally {
      this._globalService.eventPublish('global:showLoader', false);
    }
  }
  
  
 
}
