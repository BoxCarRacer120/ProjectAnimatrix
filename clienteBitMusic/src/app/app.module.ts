import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './Components/menu/menu.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { RegisterSongComponent } from './Components/register-song/register-song.component';
import { NombreTestComponent } from './Components/nombre-test/nombre-test.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { MySongsComponent } from './Components/my-songs/my-songs.component';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { LoginComponent } from './Components/login/login.component';

import { AuthGuard } from './guards/auth.guard';
import { ActualizarUserComponent } from './Components/actualizar-user/actualizar-user.component';
import { ListarSeriesComponent } from './Components/listar-series/listar-series.component';
import { CrearSerieComponent } from './Components/crear-serie/crear-serie.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registrarCancion', canActivate: [AuthGuard], component: RegisterSongComponent },
  { path: 'misCanciones', canActivate: [AuthGuard], component: MySongsComponent },
  { path: 'registrarUsuario', component: CreateUserComponent },
  { path: 'directorioSeries', component: ListarSeriesComponent },

  { path: 'login', component: LoginComponent },
  { path: 'actualizarUser', component: ActualizarUserComponent },
  { path: 'crearSerie', component: CrearSerieComponent },


  { path: '**', component: PageNotFoundComponent }//Ruta para cuando no encontramos una página
]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    RegisterSongComponent,
    NombreTestComponent,
    PageNotFoundComponent,
    MySongsComponent,
    CreateUserComponent,
    LoginComponent,
    ActualizarUserComponent,
    ListarSeriesComponent,
    CrearSerieComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
