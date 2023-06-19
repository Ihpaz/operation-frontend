import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';


import { IRequest,RequestService } from './request.service';
import { Subject, Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from 'app/components/loader/loader.component';

import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';
import { AlertComponent } from 'app/components/widgets/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})


export class GlobalService {

    private keyStorage: string = 'saCoreLocalData';
    private channels: { [key: string]: Subject<any>; } = {};
    
    constructor(
        private location: Location,
        private router: Router,
        private _requestService: RequestService,
        private toastr: ToastrService,
        private _dialog: MatDialog,
        private _snackBar: MatSnackBar
      

    ) {}
    isLoading= false;
    
    
    async showLoading() {
        if(!this.isLoading){
            this.isLoading=true;
          
        }
      
        return this.isLoading;
        // if(!this.isLoading){
        //     this.dtLoading.dismiss();
        // }
    }

    async dismissLoader() {

       this.isLoading = false;
        return await this.isLoading;
    }

    // async checkLoader(){
    //    await this.loadingCtrl.getTop().then(v => v ? this.loadingCtrl.dismiss() : null);
    // }

    async runRequest(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        path: string,
        parameter?: { key: string, value: any }[],
        body?: { key: string, value: any }[],
    ) {
        try {
            await this.showLoading();
           
            let baseURL = environment.apiBaseURL;
          
           

            const token = await this.getStorage('token');
            console.log('1')
            const newBody: { key: string, value: any }[] = body && body.length ? body : [];
           
            const iRequest: IRequest = {
                method: method,
                url: `${baseURL}${path}`,
                parameter: parameter,
                body: newBody,
                token: token,
            };

            console.log(iRequest,'ireq')

            const req = await this._requestService.runRequest(iRequest);

            return req;
        } catch (error) {
            console.log(error,'error')
            const arrError=['expired token','invalid token','required access token','required two verification otp','jwt malformed']
            if (arrError.includes(error.message.toLowerCase())) {
                this.showAlert(error.message)

                this.clearStorage();
                this.redirectPage('/login')
            } else {
                throw new Error(error.message);
            }
        }finally{
            this.dismissLoader();
        }
    }

    async runRequestUpload(pathUpload: string, file: any) {
        try {
            let baseURL = environment.apiBaseURL;
           
            const token = await this.getStorage('token');
            const req = this._requestService.runRequestUpload(
                `${baseURL}Api/v1/general/upload`,
                token,
                pathUpload,
                file,
            );
            return req;
        } catch (error) {
            const arrError=['expired token','invalid token','required access token','required two verification otp','jwt malformed']
            if (arrError.includes(error.message.toLowerCase())) {
                this.showAlert(error.message)

                this.clearStorage();
                this.redirectPage('/login')
            } else {
                throw new Error(error.message);
            }
        }
    }   

    async redirectPage(page: string, params: { key: string, value: any }[] = [], isRoot: boolean = false) {
        try {
            const parameter = params;
            let qp ={}
            if (isRoot) {
                this.location.go(this.location.path());
            }

            for (const item of params) {
                qp[item.key] = item.value;
            }

            const navigationExtras: NavigationExtras = {
                state: {
                    params: parameter,
                },
                queryParams: qp,
                replaceUrl: isRoot,
            };

            this.router.routeReuseStrategy.shouldReuseRoute = function () {
                return false;
            }
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([`${page}`], navigationExtras);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async showNotif(msg: string,colorOpt: string = 'success',duration:number=2000,positionOpt:any ='middle') {

        if(colorOpt == 'success'){
            this._snackBar.open(msg, 'ok',{
                horizontalPosition:'center',
                verticalPosition:'top'
            });
        }else if(colorOpt == 'error'){
            this._snackBar.open(msg, 'ok',{
                horizontalPosition:'center',
                verticalPosition:'top'
            });
        }
       
        // const toast = await this.toastController.create({
        //   message: msg,
        //   icon: 'information-circle',
        //   color:colorOpt,
        //   duration: duration,
        //   position: positionOpt,
        //   buttons: [{
        //     side: 'end',
        //     role: 'close',
        //     icon: 'close'
        // }]
        
        // });
        // toast.present();
    }

    async showNotifConfirm(msg: string,colorOpt: string = 'primary',positionOpt:any ='middle') {

        msg+=""
      
            this.toastr.success("<br /><br /><button type='button' id='confirmationButtonYes' class='btn clear'>Yes</button>",'delete item?',
            {
                closeButton: false,
                enableHtml:true,
                // onShown: function (toast) {
                //     $("#confirmationButtonYes").click(function(){
                //       console.log('clicked yes');
                //     });
                //   }
            });
       
        // const { role } = await toast.onDidDismiss();
        // if(role =='cancel'){
        //     return true;
        // }else{
        //     return false;
        // }
        
    
    }

    async setStorage(key: string, value: any) {
        try {
            // const localData = await localStorage.getItem(key);
            // const localDataValue = localData.valueOf ? JSON.parse(localData.valueOf) : {};
            // localDataValue[key] = value;

            // await localStorage.set({
            //     key: this.keyStorage,
            //     value: JSON.stringify(localDataValue),
            // });

            localStorage.setItem(key,value);

            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    async getStorage(key: string) {
        try {
            
            const data= localStorage.getItem(key)
            // const localData = await localStorage.get({ key: this.keyStorage }),
            //     localDataValue = localData.value ? JSON.parse(localData.value) : {},
            //     data = localDataValue.hasOwnProperty(key) ? localDataValue[key] : null;

            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async clearStorage() {
        try {
           
            await localStorage.clear()

            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    eventSubscribe(topic: string, observer: (_: any) => void): Subscription {
        if (!this.channels[topic]) {
            this.channels[topic] = new Subject<any>();
        }

        return this.channels[topic].subscribe(observer);
    }

    eventPublish(topic: string, data: any): void {
        const subject = this.channels[topic];
        if (!subject) {
            // Or you can create a new subject for future subscribers
            return;
        }

        subject.next(data);
    }

    eventDestroy(topic: string): null {
        const subject = this.channels[topic];
        if (!subject) {
            return;
        }

        subject.complete();
        delete this.channels[topic];
    }

    showLoader() {
        this._dialog.open(LoaderComponent, {
            width: '250px',
            disableClose: true,
            autoFocus: false,
            data: {},
        });
    }

    async showAlert(
        message: string,
        withInputText: boolean = false,
        inputTextName: string = '',
        inputTextLabel: string = '',
        inputType: string = '',
        width: string = '350px',
        justMessage: boolean = false,
        title: string = 'Notification',
        showForgotPasswordLink: boolean = false,
    ): Promise<any> {
        return new Promise((resolve) => {
            const autoFocus = withInputText ? true : false;
            const dialogRef = this._dialog.open(AlertComponent, {
                width: width,
                disableClose: true,
                autoFocus: autoFocus,
                data: {
                    message: message,
                    withInputText: withInputText,
                    inputTextName: inputTextName,
                    inputTextLabel: inputTextLabel,
                    inputType: inputType,
                    justMessage: justMessage,
                    title: title,
                    showForgotPasswordLink: showForgotPasswordLink,
                },
            });

            dialogRef.afterClosed().subscribe(result => {
                resolve(result);
            });
        });
    }

    async Logout(){
        await  this.clearStorage();
        this.redirectPage('/login')
    }

}
