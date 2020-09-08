import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { UserService } from '../../services/user.service';
import { SwiperModule, SwiperConfigInterface } from 'ngx-swiper-wrapper';


@Component({
  selector: 'app-listar-series',
  templateUrl: './listar-series.component.html',
  styleUrls: ['./listar-series.component.css']
})
export class ListarSeriesComponent implements OnInit {
  role
  user
  index
  idSerie: String;
  series: Array<any>;
  apiURL: String;
  search: String;
  totSeries: Number;
  page: Number = 1;
  totalTabs: Array<any>;

  constructor(
    private SeriesService: SeriesService,
    private userService: UserService
  ) {
    this.apiURL = this.SeriesService.apiURL
    this.user = this.userService.infoUser();
    this.role = this.user.role
    console.log(this.role);
  }
  config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 2,
    slideToClickedSlide: true,
    mousewheel: true,
    scrollbar: false,
    watchSlidesProgress: true,
    navigation: true,
    keyboard: true,
    initialSlide: 1,
    pagination: false,
    centeredSlides: true,
    loop: true,
    roundLengths: true,
    slidesOffsetBefore: 100,
    slidesOffsetAfter: 100,
    spaceBetween: 0,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2
      }
    }
  };

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
        console.log(this.series, "series------")

      }
    )
  }


  getTotalSongs() {

    this.SeriesService.getTotalSeries().subscribe((totAllSeries: any) => {
      let tabs = Math.ceil(totAllSeries.total / 10);
      this.totalTabs = Array.apply(null, new Array(tabs)).map((e, i) => ++i);

    })
  }
  guardarIdserieLocal(serieId, nombreSerie) {
    localStorage.setItem('idSerieStorage', serieId)
    localStorage.setItem('NombreSerieStorage', nombreSerie)
    
  }

}




