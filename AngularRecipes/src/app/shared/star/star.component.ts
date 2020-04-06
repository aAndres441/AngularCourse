import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit, OnChanges {

  rating = 3;
  starWidth: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.starWidth = this.rating * 86 / 5;
  }

}
