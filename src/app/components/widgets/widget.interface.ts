export interface IShowHideCondition {
    useShowHideCondition: boolean;
    condition: {
        and: {
            key: string;
            value: any;
            condition: 'eq' | 'neq';
        }[];
        or: {
            key: string;
            value: any;
            condition: 'eq' | 'neq';
        }[];
    };
}

export interface IDisabledCondition {
    useDisabledCondition: boolean;
    condition: {
        and: {
            key: string;
            value: any;
            condition: 'eq' | 'neq';
        }[];
        or: {
            key: string;
            value: any;
            condition: 'eq' | 'neq';
        }[];
    };
}

export interface IRequestOptions {
    path: string;
    pathDownload: string;
    params: IParams[];
    paramsCanNull?: boolean;
}

export interface IParams {
    key: string;
    value: any;
}

export interface IAction {
    type: 'openModal' | 'redirect' | 'request' | 'viewFile' | 'nothing' | 'pushPage' | 'assignValue' | 'logout' | 'select' | 'dynamicRedirect' | 'downloadStatic' | 'setStorage' ;
    pageId: string;
    widthModal: string;
    cameraFilename: string;
    cameraURL: string;
    params: IParams[];
    requestOptions: IRequestOptions;
    confirmation: {
        useConfirmation: boolean;
        withInputText: boolean;
        inputTextName: string;
        inputTextLabel: string;
        inputType: 'textarea' | 'password' | 'text';
        message: string;
        showForgotPasswordLink: boolean;
    };
    onSuccessRequest: {
        type: 'stay' | 'closeModal' | 'redirect' | 'loadTable' | 'nothing' | 'backwardPage';
        pageId: string;
        loadTable: string[];
        params: IParams[];
        alert: {
            useAlert: boolean;
            message: string;
        }
    };
    viewFileKey: string;
    showHideCondition: IShowHideCondition;
}

export interface IValidation {
    isRequired: boolean;
    isDisabled: boolean;
}
