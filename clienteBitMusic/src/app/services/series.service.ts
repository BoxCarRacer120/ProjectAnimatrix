import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //Nos permite hacer conexiones con aplicaciones externas utilizando el protocolo http
import { Serie } from '../models/Serie'; //Cargamos el modelo
import { UserService } from './user.service';
import { GLOBAL } from './global'
@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  public apiURL: string;
  constructor(
    private http: HttpClient,
    private user: UserService
  ) {
    this.apiURL = GLOBAL.url
  }
  prepareHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.user.getToken()
      })
    }
  }
  createSerie(formData) {
    return this.http.post<Serie>(`${this.apiURL}/create-serie/`, formData);
  }

  getSeries(filter, page) {
    console.log('Esta es la ruta de page --> ', `${page}`)
    return this.http.get(`${this.apiURL}/getAllSeries/${page}${filter}`, this.prepareHeaders())

  }

  getTotalSeries() {
    return this.http.get(`${this.apiURL}/getTotalSeries`, this.prepareHeaders())
  }
}
