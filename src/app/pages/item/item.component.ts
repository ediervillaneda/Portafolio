import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../intefaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private route: ActivatedRoute, public productosService: ProductosService) { }

  producto: ProductoDescripcion;
  id: string;

  ngOnInit(): void {
    this.route.params.subscribe(parametros => {

      this.productosService.cargarProducto(parametros['id'])
        .subscribe((producto: ProductoDescripcion) => {
          this.producto = producto;
          this.id = parametros['id']
        });

    });
  }

}
