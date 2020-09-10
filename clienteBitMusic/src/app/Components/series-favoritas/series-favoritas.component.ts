import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service'

@Component({
  selector: 'app-series-favoritas',
  templateUrl: './series-favoritas.component.html',
  styleUrls: ['./series-favoritas.component.css']
})
export class SeriesFavoritasComponent implements OnInit {
  favArrayStorage: Array<String>
  favArray: Array<any>
  filter
  totSeries
  series: Array<any>
  page: Number = 1;
  apiURL: String;

  constructor(
    private SeriesService: SeriesService,
  ) {
    this.apiURL = this.SeriesService.apiURL
    this.favArray = []
  }

  ngOnInit(): void {
    this.getStorage()
    this.getSeries(this.page)

  }
  getStorage() {
    this.favArrayStorage = JSON.parse(localStorage.getItem("arregloSeriesFav"))
    console.log(this.favArrayStorage);
  }

  getSeries(page: any) {

    this.filter = `?searchBy=`


    this.SeriesService.getSeries(this.filter, page).subscribe(
      (allSeries: Array<any>) => {
        this.totSeries = allSeries.length
        this.series = allSeries
        console.log(this.series, "series------")
        this.getFavSeries(this.series)

      }
    )
  }
  
  getFavSeries(series) {
    for (let i = 0; i < series.length; i += 1) {
      
      for (let j = 0; j < this.favArrayStorage.length; j += 1) {
        if (series[i]._id == this.favArrayStorage[j]) {

          this.favArray.push(series[i])
        }
      }
    }
    console.log(this.favArray, "array");
  }
   guardarIdserieLocal(serieId, nombreSerie, sinopsisSerie) {
    localStorage.setItem('idSerieStorage', serieId)
    localStorage.setItem('NombreSerieStorage', nombreSerie)
    localStorage.setItem('sinopsisSerie', sinopsisSerie)

  }
}
