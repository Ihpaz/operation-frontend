import { Injectable } from "@angular/core";
import { GlobalService } from "./global.service";
import { LoaderComponent } from "../components/loader/loader.component";
import { MatDialog } from "@angular/material/dialog";
import { IShowHideCondition, IDisabledCondition } from "../components/widgets/widget.interface";
import { DdSelectComponent } from "../components/dd-select/dd-select.component";
import { DdTimepickerComponent } from "../components/dd-timepicker/dd-timepicker.component";

@Injectable({
    providedIn: "root",
})
export class DynamicService {

    constructor(
        private _globalService: GlobalService,
        private _dialog: MatDialog,
    ) { }

    async getPage(pageId: string) {
        try {
            const appRoute: string = await this._globalService.getStorage('AppRoute');
            const req = await this._globalService.runRequest('GET', 'page', [{ key: 'pageCode', value: pageId }, { key: 'route', value: appRoute }]);
            return req.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getData(globalValue: any, path: string, params: any[], paramsCanNull: boolean = false) {
        try {
            const result = {
                isRun: false,
                data: null,
                message: null,
            };
            if (path) {
                const body: any[] = [];
                for (const item of params) {
                    body.push({
                        key: item.key,
                        value: globalValue.hasOwnProperty(item.key) ? globalValue[item.key] : item.value,
                    });
                }

                let canAccess = paramsCanNull ? true : false;
                if (!canAccess) {
                    const filterBody = body.filter(item => {
                        return item.value === null;
                    });
                    canAccess = !filterBody.length ? true : false;
                }

                if (canAccess) {
                    const req = await this._globalService.runRequest(
                        'POST',
                        path,
                        [],
                        body,
                    );

                    result.isRun = true;
                    result.data = req.data;
                    result.message = req.message;
                }
            }

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async checkGlobalValueChange(globalValue: any, tempGlobalValue: any) {
        try {
            const sGlobalValue = JSON.stringify(globalValue),
                sTempGlobalValue = JSON.stringify(tempGlobalValue);

            const isChange = (sGlobalValue === sTempGlobalValue) ? false : true;
            return {
                isChange: isChange,
                globalValue: JSON.parse(sGlobalValue),
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    showHideCondition(globalValue: any = {}, iShowHideCondition: IShowHideCondition) {
        const sGlobalValue = JSON.stringify(globalValue),
            pGlobalValue = JSON.parse(sGlobalValue);

        let resultCondition: boolean = true;
        if (iShowHideCondition.useShowHideCondition) {
            for (const item of iShowHideCondition.condition.and) {
                if (item.condition === "eq") {
                    if (pGlobalValue.hasOwnProperty(item.key)) {
                        try {
                            resultCondition =
                                JSON.stringify(pGlobalValue[item.key]) === JSON.stringify(item.value) ? true : false;
                        } catch (error) {
                            resultCondition =
                                pGlobalValue[item.key] === item.value ? true : false;
                        }
                    } else {
                        resultCondition = false;
                    }
                } else if (item.condition === "neq") {
                    if (pGlobalValue.hasOwnProperty(item.key)) {
                        try {
                            resultCondition =
                                JSON.stringify(pGlobalValue[item.key]) !== JSON.stringify(item.value) ? true : false;
                        } catch (error) {
                            resultCondition =
                                pGlobalValue[item.key] !== item.value ? true : false;
                        }
                    } else {
                        resultCondition = false;
                    }
                }
                if (!resultCondition) break;
            }

            for (const item of iShowHideCondition.condition.or) {
                if (item.condition === "eq") {
                    if (pGlobalValue.hasOwnProperty(item.key)) {
                        try {
                            resultCondition =
                                JSON.stringify(pGlobalValue[item.key]) === JSON.stringify(item.value) ? true : false;
                        } catch (error) {
                            resultCondition =
                                pGlobalValue[item.key] === item.value ? true : false;
                        }
                    } else {
                        resultCondition = false;
                    }
                } else if (item.condition === "neq") {
                    if (pGlobalValue.hasOwnProperty(item.key)) {
                        try {
                            resultCondition =
                                JSON.stringify(pGlobalValue[item.key]) !== JSON.stringify(item.value) ? true : false;
                        } catch (error) {
                            resultCondition =
                                pGlobalValue[item.key] !== item.value ? true : false;
                        }
                    } else {
                        resultCondition = false;
                    }
                }
                if (resultCondition) break;
            }
        }
        return resultCondition;
    }

    disabledCondition(globalValue: any = {}, iDisabledCondition: IDisabledCondition) {
        const sGlobalValue = JSON.stringify(globalValue),
            pGlobalValue = JSON.parse(sGlobalValue);

        let resultCondition: boolean = true;
        if (iDisabledCondition.useDisabledCondition) {
            for (const item of iDisabledCondition.condition.and) {
                if (item.condition === "eq") {
                    if (pGlobalValue.hasOwnProperty(item.key)) {
                        try {
                            resultCondition =
                                JSON.stringify(pGlobalValue[item.key]) === JSON.stringify(item.value) ? true : false;
                        } catch (error) {
                            resultCondition =
                                pGlobalValue[item.key] === item.value ? true : false;
                        }
                    } else {
                        resultCondition = false;
                    }
                } else if (item.condition === "neq") {
                    if (pGlobalValue.hasOwnProperty(item.key)) {
                        try {
                            resultCondition =
                                JSON.stringify(pGlobalValue[item.key]) !== JSON.stringify(item.value) ? true : false;
                        } catch (error) {
                            resultCondition =
                                pGlobalValue[item.key] !== item.value ? true : false;
                        }
                    } else {
                        resultCondition = false;
                    }
                }
                if (!resultCondition) break;
            }

            for (const item of iDisabledCondition.condition.or) {
                if (item.condition === "eq") {
                    if (pGlobalValue.hasOwnProperty(item.key)) {
                        try {
                            resultCondition =
                                JSON.stringify(pGlobalValue[item.key]) === JSON.stringify(item.value) ? true : false;
                        } catch (error) {
                            resultCondition =
                                pGlobalValue[item.key] === item.value ? true : false;
                        }
                    } else {
                        resultCondition = false;
                    }
                } else if (item.condition === "neq") {
                    if (pGlobalValue.hasOwnProperty(item.key)) {
                        try {
                            resultCondition =
                                JSON.stringify(pGlobalValue[item.key]) !== JSON.stringify(item.value) ? true : false;
                        } catch (error) {
                            resultCondition =
                                pGlobalValue[item.key] !== item.value ? true : false;
                        }
                    } else {
                        resultCondition = false;
                    }
                }
                if (resultCondition) break;
            }
        }
        return resultCondition;
    }

    showLoader() {
        this._dialog.open(LoaderComponent, {
            width: '250px',
            disableClose: true,
            autoFocus: false,
            data: {},
        });
    }

    showModalSelect(path: string, params: any[], fields: any[], defaultValue: any, title: string, width: string): Promise<any> {
        return new Promise((resolve) => {
            const dialogRef = this._dialog.open(DdSelectComponent, {
                width: width,
                disableClose: false,
                autoFocus: true,
                data: {
                    path: path,
                    params: params,
                    fields: fields,
                    defaultValue: defaultValue,
                    title: title,
                },
            });

            dialogRef.afterClosed().subscribe(result => {
                resolve(result);
            });
        });
    }

    showModalTimepicker(defaultValue: string = null): Promise<string> {
        return new Promise((resolve) => {
            const dialogRef = this._dialog.open(DdTimepickerComponent, {
                width: '400px',
                disableClose: false,
                autoFocus: false,
                data: {
                    value: defaultValue,
                },
            });

            dialogRef.afterClosed().subscribe(result => {
                resolve(result);
            });
        });
    }

    async doValidation(globalValue: any, widgetSchema: any) {
        try {
            const sGlobalValue = JSON.stringify(globalValue),
                pGlobalValue = JSON.parse(sGlobalValue);

            let resultIsValid = {
                isValid: true,
                message: '',
            };

            for (const keyWidget in widgetSchema) {
                const widget = widgetSchema[keyWidget];
                if (widget.hasOwnProperty('validation')) {
                    for (const keyValidation in widget.validation) {
                        const validation = widget.validation[keyValidation],
                            label = widget.label,
                            value = pGlobalValue[widget.name];
                        if (resultIsValid.isValid) {
                            switch (keyValidation) {
                                case 'isRequired':
                                    resultIsValid = await this.validationIsRequired(validation, label, value);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }

            return resultIsValid;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    private async validationIsRequired(isRequired: boolean, label: string, value: any) {
        try {
            const result = {
                isValid: true,
                message: ''
            };

            if (isRequired) {
                if (value === null || value === '' || value === undefined) {
                    result.isValid = false;
                    result.message = `Required ${label}`;
                }
            }

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
