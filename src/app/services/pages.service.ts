import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";


interface DataProductos{
    codigo: number;
    nombre: string;
    stock: number;
    precio: number;
}

@Injectable({
    providedIn: 'root'
  })
  export class PagesService {
   
    productoAndRedirectToabout(value: Partial<{ codigo: number | null; nombre: string | null; stock: number | null; precio: number}>) {
      throw new Error('Method not implemented.');
    }
    // 
    private httpService = inject(HttpClient);
    // 
    private pages_end_point = 'http://localhost:3000';
    constructor() { }


    productos(data: DataProductos): Observable<any> {
        return this.httpService.post(this.pages_end_point+'/registrar_producto', { ...data });
      }

    obtenerProductos(): Observable<any[]> {
      return this.httpService.get<any[]>(this.pages_end_point+'/obtener_productos'); // Ejemplo de URL de la API para obtener productos
    }

    eliminarProducto(codigo: number): Observable<any> {
      return this.httpService.delete(`${this.pages_end_point}/eliminar_producto/:codigo${codigo}`);
    }
    
    editarProducto(id: number, data: any): Observable<any> {
      return this.httpService.put(`${this.pages_end_point}/editar/${id}`, data);
    }
    
    


}  