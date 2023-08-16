import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { GlobalService } from 'app/services/global.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private _globalService: GlobalService,
  ) { }

  Username:string='';
  Password:string='';

  ngOnInit(): void {
  }

  async Login(){
   try {
    if(!this.Username || !this.Login){
        throw new Error(`Username atau password tidak boleh kosong !`)
    }


    const data = await this._globalService.runRequest(
      'POST',
      'Api/v1/auth',
      [],
      [{key:'Username',value:this.Username},
       {key:'Password',value:this.Password}
      ]
    );

    if(data){

      await this._globalService.setStorage('role', data.data.Role);
      await this._globalService.setStorage('username', data.data.Username);
      await this._globalService.setStorage('token', data.access_token);
      await this._globalService.setStorage('outlet', data.data.Outlet);
      

      
      this.router.navigate(['dashboard']);
    }


   } catch (error) {
     this._globalService.showNotif(error.message);
   }
    
  }

}
