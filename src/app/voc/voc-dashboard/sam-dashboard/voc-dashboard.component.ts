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
  selector: 'app-voc-dashboard',
  templateUrl: './voc-dashboard.component.html',
  styleUrls: ['./voc-dashboard.component.scss']
})
export class VocDashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChild('chartCanvas') chartCanvas: ElementRef;
  
  tblSchema: any =  {
    name: "MsVocRankOutlet",
    pageSize: [
      10,
      50,
      100
    ],
    requestOptions: {
      path: "Api/v1/voc/get-dashboardvocrank-byoutlet/datatable",
      params: [ 
      { key: 'StartDate', value: null },
      { key: 'EndDate', value: null },
      { key: 'TypeVoc', value: null }
    ]
    },
    useFilterFields: false,
    width: "100vw",
    height: "70vh",
    fields: [
      {
        name: "OutletName",
        title: "Nama Outlet",
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
        name: "drm",
        title: "DRM",
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
        name: "am",
        title: "AM",
        width: 100,
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
        name: "qty",
        title: "Qty",
        width: 150,
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
        name: "rank",
        title: "Rank",
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
    StartDate: Date;
    EndDate: Date;
    TypeVoc: string;
  };

  constructor(
    private _globalService: GlobalService,
  ) { }


  barChartData: ChartData<'bar'>;
  leftWidth: number=100;
  rightWidth: number=50;

  StartDate:Date=new Date('2023-01-01');
  EndDate:Date=new Date('2023-06-30');;
  TypeVoc:string="";
  listCategoryComplaint:string[]=['BBQ','FOOD SAFETY','SIDE DISH','CUSTOMER SERVICE',
  'TOPPER','OUT OF STOCK','WT','LAMIAN','OTHERS','SARAN'
 ];

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'center',
        align: 'center'
      }
    }
  };
  barChartType: ChartType = 'bar';
  barChartPlugins = [
    DataLabelsPlugin
  ];

  barChartOptionsStacked: any = {
    responsive: true,
    scales: { x: { stacked: true }, y: { stacked: true } }
  };


  
  async ngOnInit() {

     this.modelFilter = {
      StartDate: this.StartDate,
      EndDate: this.EndDate,
      TypeVoc: this.TypeVoc
     }

    await this.getDashboardSAM();
  }

  async getDashboardSAM() {
    try {
      // this._dynamicService.showLoader();
      let url='Api/v1/voc/dashboard-vocbar-ByMonth';
      const req= await this._globalService.runRequest(
         'POST',
          url,
         [],
         [
          {key:'StartDate',value:this.modelFilter.StartDate},
          {key:'EndDate',value:this.modelFilter.EndDate},
          {key:'TypeVoc',value:this.modelFilter.TypeVoc}
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

  filter(){
    this.getDashboardSAM()
     this._globalService.eventPublish('loadTable:MsVocRankOutlet', true);
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
 
}
