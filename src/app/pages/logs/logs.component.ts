import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PagesService } from '../../services/pages.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule], 
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  
  productoEncontrado: boolean = false;
  producto: any | null = null;
  logs: any[] = [];
  filtro: string | null = null
  backLogs: any[] = [];
 
  fromproducto: FormGroup; 
  formAgregarStock: FormGroup; 
  formQuitarStock: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private notifycation: ToastrService, 
    private pagesService: PagesService
  ) {
    this.fromproducto = this.formBuilder.group({
      'codigoONombre': ['', [Validators.required, Validators.minLength(10)]]
    });

    this.formAgregarStock = this.formBuilder.group({
      'cantidad': ['', [Validators.required, Validators.min(0)]],
      'detalles': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });

    this.formQuitarStock = this.formBuilder.group({
      'cantidad': ['', [Validators.required, Validators.min(0)]],
      'detalles': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
    this.obtenerLogs();
  }

  obtenerLogs() {
    this.pagesService.obtenerLogs().subscribe(
      (logs) => {
        this.backLogs= [...logs];
        this.logs = logs.map(log => ({
          ...log,
          nombre: log.nombre
        }));
      },
      (error) => {
        console.error('Error al obtener logs:', error);
        this.notifycation.error('Error al obtener logs', 'Error');
      }
    );
  }


  buscarProducto() {
    const codigoONombre = this.fromproducto.get('codigoONombre')?.value ?? '';
    const esCodigo = !isNaN(Number(codigoONombre)); // Devuelve true si es un número
  
    if (esCodigo) {
      const codigo = Number(codigoONombre);
      this.pagesService.buscarProducto(codigo, '').subscribe(
        (producto) => {
          if (producto && producto.length > 0) {
            this.productoEncontrado = true;
            this.producto = producto[0];
            this.notifycation.success('Producto encontrado', 'Éxito');
          } else {
            this.productoEncontrado = false;
            this.notifycation.error('Producto no encontrado', 'Error');
          }
        },
        (error) => {
          console.error('Error al buscar producto:', error);
          this.notifycation.error('Error al buscar producto', 'Error');
        }
      );
    } else {
      const nombre = codigoONombre;
      this.pagesService.buscarProducto(0, nombre).subscribe(
        (producto) => {
          if (producto && producto.length > 0) {
            this.productoEncontrado = true;
            this.producto = producto[0];
            this.notifycation.success('Producto encontrado', 'Éxito');
          } else {
            this.productoEncontrado = false;
            this.notifycation.error('Producto no encontrado', 'Error');
          }

        },
        (error) => {
          console.error('Error al buscar producto:', error);
          this.notifycation.error('Error al buscar producto', 'Error');
        }
      );
    }
  }
  
  agregarStock() {
    if (this.formAgregarStock.invalid) {
      this.notifycation.error('Debes completar todos los campos para agregar stock', 'Error');
      return;
    }
    
    if (!this.productoEncontrado || !this.producto) {
      this.notifycation.error('Debes buscar un producto antes de agregar stock', 'Error');
      return;
    }
  
    const cantidad = Number(this.formAgregarStock.get('cantidad')?.value??''); 
    const detalles = this.formAgregarStock.get('detalles')?.value??''; 

    this.pagesService.agregarStock(this.producto.codigo, cantidad, detalles).subscribe({
      next: (response) => {
        this.notifycation.success(response.message, 'Éxito');
        this.formAgregarStock.reset();
        this.fromproducto.reset();
        this.obtenerLogs();
      },  
      error: (error) => {
        this.notifycation.error(error.message, 'Error');
      }
    });
  }
  
  quitarStock() {
    if (this.formQuitarStock.invalid) {
      this.notifycation.error('Debes completar todos los campos para quitar stock', 'Error');
      return;
    }

    if (!this.productoEncontrado || !this.producto) {
      this.notifycation.error('Debes buscar un producto antes de agregar stock', 'Error');
      return;
    }
  
    const cantidad= Number(this.formQuitarStock.get('cantidad')?.value ?? '');
    const detalles = this.formQuitarStock.get('detalles')?.value ?? '';
  
    this.pagesService.quitarStock(this.producto.codigo,cantidad, detalles).subscribe({
      next: (response) => {
        this.notifycation.success(response.message, 'Éxito');
        this.formQuitarStock.reset();
        this.fromproducto.reset();
        this.obtenerLogs();
      },
      error: (error) => {
        this.notifycation.error(error.message, 'Error');
      }
    });
  }

  filtrarLogs(fechaOtipo: string | null) {
    if (!fechaOtipo) {
      this.logs = [...this.backLogs];
      return;
    }
    this.pagesService.filtrarLogs(fechaOtipo).subscribe(
      (logs) => {
        this.logs = logs.map(log => ({
          ...log,
          nombre: log.nombre 
        }));
      },
      (error) => {
        console.error('Error al filtrar logs:', error);
        this.notifycation.error('Error al filtrar logs', 'Error');
      }
    );
  }

  
}
