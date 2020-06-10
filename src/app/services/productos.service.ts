import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../intefaces/producto.interfase';
import { rejects } from 'assert';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, rejects) => {

      this.http.get('https://angular-html-42a09.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          setTimeout(() => {
            this.cargando = false;

          }, 1000);
          resolve();
        });
    });
  }

  public cargarProducto(id: string) {
    return this.http.get(`https://angular-html-42a09.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      this.cargarProductos().then(() => {
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);

    }

    // this.productosFiltrado = this.productos.filter(productos => {
    //   return true;
    // });
  }

  private filtrarProductos(termino: string) {
    console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLowerCase();
    this.productos.forEach(prod => {
      const titlower = prod.titulo.toLowerCase();
      const catlower = prod.titulo.toLowerCase();
      if (catlower.indexOf(termino) >= 0 || titlower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
