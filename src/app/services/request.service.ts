import { Injectable } from "@angular/core";
import Axios from "axios";

export interface IRequest {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    parameter?: any[];
    body?: any[];
    token?: string;
}

@Injectable({
    providedIn: "root",
})
export class RequestService {
    constructor() { }

    runRequest(iRequest: IRequest): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let param = "";
                let body = {};
                const options = {
                    headers: {},
                };

                if (iRequest.token) {
                    options["headers"] = {
                        Authorization:`Bearer ${iRequest.token}`,
                    };
                }

                if (iRequest.parameter) {
                    param = await this.generateParam(iRequest.parameter);
                }

                if (iRequest.body) {
                    body = await this.generateBody(iRequest.body);
                }

                const HttpClient = Axios.create();
                let resp: any = null;
                if (iRequest.method === "GET") {
                    resp = await HttpClient.get(`${iRequest.url}${param}`, options);
                } else if (iRequest.method === "POST") {
                    resp = await HttpClient.post(
                        `${iRequest.url}${param}`,
                        body,
                        options
                    );
                }

                
                resolve(resp.data);
            } catch (error) {
                console.log(error,'reqservice');
                // reject(error)

                if (error.response) {
                    if (
                        error.response.hasOwnProperty('data') &&
                        error.response.data.hasOwnProperty('message')
                    ) {
                        error.response.message = error.response.data.message;
                    }
                    reject(error.response);
                } else {
                    reject(error);
                }
            }
        });
    }

    runRequestUpload(url: string, token: string, pathUpload: string, file: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const HttpClientAxios = Axios.create();
                const headers = {};
                headers["Content-Type"] = "multipart/form-data";
                headers["Authorization"] = token;

                const bodyFormData = new FormData();
                bodyFormData.append('attachment', file);
                bodyFormData.set('path', pathUpload);

                const resp = await HttpClientAxios.post(url, bodyFormData, {
                    headers: headers,
                });

                resolve(resp.data);
            } catch (error) {
                if (error.response) {
                    if (
                        error.response.hasOwnProperty("data") &&
                        error.response.data.hasOwnProperty("message")
                    ) {
                        error.response.message = error.response.data.message;
                    }
                    reject(error.response);
                } else {
                    reject(error);
                }
            }
        });
    }

    private generateParam(parameter: { key: string, value: any }[]): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                let finalParameter = "?";
                for (const item of parameter) {
                    finalParameter += `${item.key}=${encodeURIComponent(item.value)}&`;
                }
                finalParameter = finalParameter.substr(0, finalParameter.length - 1);
                // resolve(encodeURI(finalParameter));
                resolve(finalParameter);
            } catch (error) {
                reject(error);
            }
        });
    }

    private generateBody(body: { key: string, value: any }[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const rawBody = {};
                for (const item of body) {
                    rawBody[item.key] = item.value;
                }
                resolve(rawBody);
            } catch (error) {
                reject(error);
            }
        });
    }

    async getJSON(path: string) {
        try {
            const HttpClient = Axios.create();
            const resp = await HttpClient.get(path);
            return resp;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
