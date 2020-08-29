import { Component, OnInit } from '@angular/core';
import { CapService } from '../../services/cap.service';


@Component({
  selector: 'app-my-songs',
  templateUrl: './my-songs.component.html',
  styleUrls: ['./my-songs.component.css']
})
export class MySongsComponent implements OnInit {
  localId: string;
  caps: Array<any>;
  apiURL: String;
  search: String;
  totSongs: Number;
  page: Number = 1;
  totalTabs: Array<any>;

  constructor(
    private capService: CapService
  ) {
    this.apiURL = this.capService.apiURL
    this.localId = localStorage.getItem('idSerieStorage')
  }

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
