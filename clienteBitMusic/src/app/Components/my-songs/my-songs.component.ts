import { Component, OnInit } from '@angular/core';
import { CapService } from '../../services/cap.service';
import { SwiperModule, SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-my-songs',
  templateUrl: './my-songs.component.html',
  styleUrls: ['./my-songs.component.css']
})
export class MySongsComponent implements OnInit {
  index
  localId: string;
  caps: Array<any>;
  apiURL: String;
  search: String;
  totSongs: Number;
  page: Number = 1;
  totalTabs: Array<any>;
  nombreSerie: string;
  sinopsisSerie: String;

  constructor(
    private capService: CapService
  ) {
    this.apiURL = this.capService.apiURL
    this.localId = localStorage.getItem('idSerieStorage')
    this.nombreSerie= localStorage.getItem('NombreSerieStorage')
    this.sinopsisSerie= localStorage.getItem('sinopsisSerie')
  }

  config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 10,
    slideToClickedSlide: true,
    slidesPerGroup: 1,
    loopFillGroupWithBlank: true,
    mousewheel: true,
    scrollbar: false,
    watchSlidesProgress: true,
    navigation: true,
    keyboard: true,
    initialSlide: 5,
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
        slidesPerView: 10
      }
    }
  };

  /** Tarea pesadas como traer todas las canciones almacenadas en la DB */
  ngOnInit(): void {
    this.getTotalSongs();
    this.loadSongs(this.page)

  }

  loadSongs(page: any) {


    this.capService.getCaps(this.localId, page).subscribe(
      (allSongs: Array<any>) => {
        this.totSongs = allSongs.length
        this.caps = allSongs
        console.log(this.caps, "capsarray----");

      }
    )
  }

  changeSong(song, numberSong = '') {
    const audio: HTMLMediaElement = document.getElementById('player') as HTMLMediaElement;
    console.log(audio);
    if (numberSong == '') {

      let dataSong: any = audio.getAttribute('data-song');

      if (song == 'previous') {
        dataSong = dataSong - 1;
      } else {
        dataSong = Number(dataSong) + 1;
      }

      if (dataSong <= 0) {
        dataSong = this.totSongs
      } else if (dataSong > this.totSongs) {
        dataSong = '1';
      }
      numberSong = dataSong;

      const nextPrevious = document.getElementById(dataSong) as HTMLMediaElement;
      song = nextPrevious.getAttribute('value')
    }

    const urlSong = `${this.apiURL}/getSongFile/${song}`;
    audio.setAttribute('src', urlSong);
    audio.setAttribute('data-song', numberSong);
    audio.play();

  }

  getTotalSongs() {

    this.capService.getTotalCaps().subscribe((totAllSongs: any) => {
      let tabs = Math.ceil(totAllSongs.total / 10);
      this.totalTabs = Array.apply(null, new Array(tabs)).map((e, i) => ++i);

    })
  }

}
