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

export interface DataLogs{
  tipo_movimiento: string;
  codigo_producto: string;
  nombre:string
  cantidad: number;
  fecha_movimiento: Date;
  detalles: string;
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


  agregarStock(codigo: number, cantidad: number, detalles: string): Observable<any> {
    const body = { codigo, cantidad, detalles };
    return this.httpService.post<any>(`${this.pages_end_point}/agregar_stock`, body);
  }

  quitarStock(codigo: number, cantidad: number, detalles: string): Observable<any> {
    const body = { codigo, cantidad, detalles };
    return this.httpService.post<any>(`${this.pages_end_point}/quitar_stock`, body);
  } 

  buscarProducto(codigo: number | null, nombre: string | null): Observable<any[]> {
    let params = new HttpParams();
    if (codigo !== null) {
      params = params.append('codigo', codigo.toString());
    }
    if (nombre !== null) {
      params = params.append('nombre', nombre);
    }
    return this.httpService.get<any[]>(`${this.pages_end_point}/buscar_producto`, { params: params });
  }

  obtenerLogs(): Observable<any[]> {
    return this.httpService.get<any[]>(`${this.pages_end_point}/obtener_logs`);
  }

  filtrarLogs(fechaOtipo: string | null): Observable<any[]> {
    let params = new HttpParams();
    if (fechaOtipo !== null) {
      if (!isNaN(Date.parse(fechaOtipo))) {
        // Si el valor proporcionado es una fecha válida, establece el parámetro 'fecha_movimiento'
        params = params.append('fecha_movimiento', fechaOtipo);
      } else {
        // Si no es una fecha válida, asume que es un tipo de movimiento y establece el parámetro 'tipo_movimiento'
        params = params.append('tipo_movimiento', fechaOtipo);
      }
    }
    return this.httpService.get<any[]>(`${this.pages_end_point}/filtrar_logs`, { params: params });
  }
}

  



  

    
    


