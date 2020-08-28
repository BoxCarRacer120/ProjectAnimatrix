import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-listar-series',
  templateUrl: './listar-series.component.html',
  styleUrls: ['./listar-series.component.css']
})
export class ListarSeriesComponent implements OnInit {
  idSerie: String;
  series: Array<any>;
  apiURL: String;
  search: String;
  totSeries: Number;
  page: Number = 1;
  totalTabs: Array<any>;

  constructor(
    private SeriesService: SeriesService
  ) {
    this.apiURL = this.SeriesService.apiURL
  }

  ngOnInit(): void {
    this.getSeries(this.page)
  }
  getSeries(page: any) {
    console.log('this.search -> ', this.search)
    let filter = ''
    if (typeof this.search == "string" && this.search.length > 0) {
      filter = `?searchBy=${this.search}`
    }



    this.SeriesService.getSeries(filter, page).subscribe(
      (allSeries: Array<any>) => {
        this.totSeries = allSeries.length
        this.series = allSeries
        console.log(this.series, "SERIES-------------------");

      }
    )
  }

  getSerieImage() {

  }

  getTotalSongs() {

    this.SeriesService.getTotalSeries().subscribe((totAllSeries: any) => {
      let tabs = Math.ceil(totAllSeries.total / 10);
      this.totalTabs = Array.apply(null, new Array(tabs)).map((e, i) => ++i);

    })
  }
  guardarIdserieLocal(serieId) {
    localStorage.setItem('idSerieStorage', serieId)
    alert('guardado en storage')
  }

}




