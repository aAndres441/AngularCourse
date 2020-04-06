import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // 1-lo uso con snapshot o
    this.errorMessage = this.route.snapshot.data.mensajito;

    // lo uso por si cambian datos mientras estamos en la pagina entonces suscribirse
    this.route.data.subscribe(
      (dato: Data) => {
        this.errorMessage = dato.mensajito;
      }
    );

  }

  // 1 y 2 son lo mismo, pero saco la primera porque es para datos estaticos

}
