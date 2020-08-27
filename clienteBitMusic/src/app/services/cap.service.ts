import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //Nos permite hacer conexiones con aplicaciones externas utilizando el protocolo http
import { Cap } from '../models/Cap'; //Cargamos el modelo
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CapService {

  apiURL: String = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private user: UserService
  ) { }

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
    console.log('Esta es la ruta de page --> ', `${page}`)
    return this.http.get(`${this.apiURL}/getAll/${page}${filter}`, this.prepareHeaders())

  }

  getTotalCaps() {
    return this.http.get(`${this.apiURL}/getTotalSongs`, this.prepareHeaders())
  }

}
