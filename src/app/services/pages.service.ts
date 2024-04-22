import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";


export interface DataProductos{
    codigo: number;
    nombre: string;
    detalles:string;
    stock: number;
    precio: number;
    imagen:string;
}
@Injectable({
    providedIn: 'root'
  })
  export class PagesService {
   
    productoAndRedirectToabout(value: Partial<{ codigo: number | null; nombre: string | null ; detalles: string | null; stock: number | null; precio: number |  null; imagen: string}>) {
      throw new Error('Method not implemented.');
    }
    // 
    private httpService = inject(HttpClient);
    // 
    private pages_end_point = 'http://localhost:3000';
    constructor() { }


    productos(DataProductos:FormData): Observable<any> {
        return this.httpService.post(this.pages_end_point+'/registrar_producto', DataProductos);
      }

    obtenerProductos(): Observable<any[]> {
      return this.httpService.get<any[]>(this.pages_end_point+'/obtener_productos'); // Ejemplo de URL de la API para obtener productos
    }

    eliminarProducto(codigo: number): Observable<any> {
      return this.httpService.delete<any>(`${this.pages_end_point}/eliminar_producto/${codigo}`);
    }

    editarProducto(codigo: number, data: any): Observable<any> {
    return this.httpService.put(`${this.pages_end_point}/editar/${codigo}`, data);
  }
  
  filtrarProductos(codigo: number | null, nombre: string | null): Observable<any[]> {
    let params = new HttpParams();
    if (codigo !== null) {
        params = params.append('codigo', codigo.toString());
    }
    if (nombre !== null) {
        params = params.append('nombre', nombre);
    }
    return this.httpService.get<any[]>(`${this.pages_end_point}/filtrarProducto`, { params: params });
}

  
}
    
    


