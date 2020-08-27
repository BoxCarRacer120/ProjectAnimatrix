import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-listar-series',
  templateUrl: './listar-series.component.html',
  styleUrls: ['./listar-series.component.css']
})
export class ListarSeriesComponent implements OnInit {
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
  }

}
