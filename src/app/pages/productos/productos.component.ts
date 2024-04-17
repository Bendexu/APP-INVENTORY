import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators,} from '@angular/forms';
import { PagesService } from '../../services/pages.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  private toolsForm = inject(FormBuilder);
  private notifycation = inject(ToastrService);
  private pagesService = inject(PagesService)


  formProductos = this.toolsForm.group({
    'codigo': ['', [Validators.required, Validators.minLength(10)]],
    'nombre': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    'stock': ['', [Validators.required, Validators.min(0)]],
    'precio': ['', [Validators.required, Validators.min(0)]],
  });

  savedProducts: any[] = [];
  editarForm: any;
  productos: any[] = [];

  
  ngOnInit() {
    this.getSavedProducts(); // Obtener productos al inicializar el componente
  }

  onSubmit() {
    if (this.formProductos.invalid) {
      this.notifycation.error('Debes completar todos los campos', 'Error'); 
      return;
    }
    this.pagesService.productos({
      codigo:Number( this.formProductos.get('codigo')?.value ?? ''),
      nombre: this.formProductos.get('nombre')?.value ?? '',
      stock: Number(this.formProductos.get('stock')?.value) ??'',
      precio:Number(this.formProductos.get('precio')?.value ?? ''),
    }).subscribe({
      next: (value) => {
        this.notifycation.success(value, 'Exito');
        this.getSavedProducts();
        this.formProductos.reset();
      },
      error: (err) => {
        this.notifycation.error(err.message, 'Error');
      }
    })
  }

  getSavedProducts() {
    this.pagesService.obtenerProductos().subscribe(
      (products: any[]) => {
        this.savedProducts = products; // Actualiza la lista de productos
      },
      (error: any) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  eliminarProducto(codigo: number) {
   
    this.pagesService.eliminarProducto(codigo).subscribe({
      next: (value) => {
        this.notifycation.success(value, 'Exito');
        this.getSavedProducts(); // Vuelve a cargar la lista de productos después de eliminar uno
      },
      error: (err) => {
        this.notifycation.error(err.message, 'Error');
      }
    });
  }
  

  onSubmitEditar() {
    const codigo = this.editarForm.value.codigo; 
    const data = this.editarForm.value;
     
    this.pagesService.editarProducto(codigo, data).subscribe(
      (response) => {
        console.log('Producto editado correctamente:', response);
      },
      (error) => {
        console.error('Error al editar producto:', error);
      }
    );
}

}



