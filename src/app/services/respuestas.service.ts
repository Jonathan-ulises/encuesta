import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const urlService = environment.urlService;
@Injectable({
  providedIn: 'root'
})
export class RespuestasService {

  constructor(private _http: HttpClient) { }

  saveRespuestas(res: any) {
    return this._http.post(`${urlService}`, res);
  }
}
