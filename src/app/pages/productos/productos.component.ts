import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { PagesService, DataProductos } from '../../services/pages.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  private toolsForm = inject(FormBuilder);
  private notifycation = inject(ToastrService);
  private pagesService = inject(PagesService);

  formProductos = this.toolsForm.group({
    'codigo': ['', [Validators.required, Validators.minLength(10)]],
    'nombre': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    'detalles': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    'stock': ['', [Validators.required, Validators.min(0)]],
    'precio': ['', [Validators.required, Validators.min(0)]],
    'imagen': ['']
  });

  savedProducts: any[] = [];
  editarForm: any;
  productos: any[] = [];
  filteredProducts: any[] = [];
  filtro: string = '';
  selectedFile: File | undefined;

  ngOnInit() {
    this.getSavedProducts(); // Obtener productos al inicializar el componente
  }

  onSubmit() {
    if (this.formProductos.invalid) {
      this.notifycation.error('Debes completar todos los campos', 'Error');
      return;
    }
    const formData = new FormData();
    formData.append('codigo', this.formProductos.get('codigo')?.value ?? '');
    formData.append('nombre', this.formProductos.get('nombre')?.value ?? '');
    formData.append('detalles', this.formProductos.get('detalles')?.value ?? '');
    formData.append('stock', this.formProductos.get('stock')?.value ?? '');
    formData.append('precio', this.formProductos.get('precio')?.value ?? '');
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile,this.selectedFile.name)
    }
    this.pagesService.productos(formData).subscribe({
      next: (value) => {
        this.notifycation.success(value, 'Exito');
        this.getSavedProducts();
        this.formProductos.reset();
      },
      error: (err) => {
        let errorMessage = 'Error al guardar el producto. Por favor, inténtalo de nuevo más tarde.';
        if (err && err.message) {
          errorMessage = err.message;
        }
        this.notifycation.error(errorMessage, 'Error');
      }
    })
  }

  getSavedProducts() {
    this.pagesService.obtenerProductos().subscribe(
      (products: any[]) => {
        this.savedProducts = products;
        this.filtrarProductos();
      },
      (error: any) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  imageUrl(productos: DataProductos): string {
    return `http://localhost:3000/uploads/${productos.imagen}`;
  }

  filtrarProductos(): void {
    this.filteredProducts = this.savedProducts.filter((product: any) => {
      const nombre = product.nombre ? product.nombre.toLowerCase() : '';
      const codigo = product.codigo ? product.codigo.toString() : '';
      return nombre.includes(this.filtro.toLowerCase()) || codigo.includes(this.filtro);
    });
  }

  eliminarProducto(codigo: number) {
    this.pagesService.eliminarProducto(codigo).subscribe({
      next: (value) => {
        this.notifycation.success(value, 'Éxito');
        this.getSavedProducts(); // Vuelve a cargar la lista de productos después de eliminar uno
      },
      error: (err) => {
        this.notifycation.error(err.message, 'Error');
      }
    });
  }

  editarProducto(codigo: number, data: any) {
    this.pagesService.editarProducto(codigo, data).subscribe({
      next: (value) => {
        this.notifycation.success(value, 'Éxito');
        this.getSavedProducts(); // Vuelve a cargar la lista de productos después de editar uno
      },
      error: (err) => {
        console.error('Error al editar el producto:', err);
        // Maneja el error según sea necesario
      }
    });
  }
}

  





