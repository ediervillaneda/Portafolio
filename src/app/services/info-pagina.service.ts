import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina, EquipoTrabajo } from '../intefaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})

export class InfoPaginaService {
  info: InfoPagina = {};
  equipo: EquipoTrabajo = {};
  cargada = false;

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();

  }

  private cargarInfo() {
    this.http.get('assets/data/data.json')
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
      });
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-42a09.firebaseio.com/equipo.json')
      .subscribe((resp: EquipoTrabajo) => {
        this.cargada = true;
        this.equipo = resp;
      });
  }
}
