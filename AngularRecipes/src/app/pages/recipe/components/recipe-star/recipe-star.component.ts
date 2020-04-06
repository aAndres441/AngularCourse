import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-recipe-star',
  templateUrl: './recipe-star.component.html',
  styleUrls: ['./recipe-star.component.css']
})
export class RecipeStarComponent implements OnInit , OnChanges {

  @Input() rating: number;
  starWidth: number;
  title: string;
  @Output() notifyClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.starWidth = this.rating * 86 / 5;
  }

  onVlick() {
    this.notifyClicked.emit('The rating = ' + this.rating);
  }

}

