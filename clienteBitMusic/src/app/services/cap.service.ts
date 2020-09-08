import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //Nos permite hacer conexiones con aplicaciones externas utilizando el protocolo http
import { Cap } from '../models/Cap'; //Cargamos el modelo
import { UserService } from './user.service';
import { GLOBAL } from './global'

  

@Injectable({
  providedIn: 'root'
})
export class CapService {

  public apiURL: String

  constructor(

    private http: HttpClient,
    private user: UserService
  ) { this.apiURL = GLOBAL.url }

  prepareHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.user.getToken()
      })
    }
  }

  createCap(formData, serieId) {
    return this.http.post<Cap>(`${this.apiURL}/create-song/${serieId}`, formData);
  }

  getCaps(filter, page) {
    return this.http.get(`${this.apiURL}/getAll/${page}/${filter}`, this.prepareHeaders())

  }

  getTotalCaps() {
    return this.http.get(`${this.apiURL}/getTotalSongs`, this.prepareHeaders())
  }

}
