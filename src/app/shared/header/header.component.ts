import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  currentHour: string = '';
  currentMinute: string = '';
  currentSecond: string = '';
  currentDate: string = '';

  constructor() { }

  ngOnInit(): void {
    // Actualiza la hora cada segundo 
    setInterval(() => {
      this.updateTime();
    }, 1000);

    setInterval(() => {
      this.updateDate();
    }, 1000);

    // Llama a updateTime() para inicializar la hora
    this.updateTime();
    this.updateDate();
  }

  private updateTime(): void {
    const now = new Date();
    this.currentHour = this.padWithZero(now.getHours());
    this.currentMinute = this.padWithZero(now.getMinutes());
    this.currentSecond = this.padWithZero(now.getSeconds());
  }

  private updateDate(): void {
    const now = new Date();
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dayOfWeek = days[now.getDay()];
    const month = months[now.getMonth()];
    const dayOfMonth = now.getDate();
    const year = now.getFullYear();
    this.currentDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
  }

  private padWithZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }


}
