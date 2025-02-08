
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',

  imports: [RouterOutlet, RouterModule , FormsModule], // Deja solo RouterOutlet y RouterModule si realmente son necesarios aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'consumirApiLuisR';  // Título de la aplicación

  // Método adicional para manejar eventos (opcional)
  handleEvent(event: Event): void {
    console.log('Evento manejado:', event);
  }

  // Ejemplo de método para cambiar el título (opcional)
  changeTitle(newTitle: string): void {
    this.title = newTitle;
  }
}
