import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {

  constructor(private _http: HttpClient) { }

  saveRespuestas(res: any) {
    return this._http.post('http://192.168.211.174:8080/upload-response', res);
  }
}
