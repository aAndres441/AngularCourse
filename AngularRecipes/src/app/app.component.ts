import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = '';
  viewPage = '';


  onNavigate(dato: string) {
    this.viewPage = dato;
  }


}
