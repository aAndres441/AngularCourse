import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reusable',
  templateUrl: './reusable.component.html',
  styleUrls: ['./reusable.component.css']
})
export class ReusableComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() speaker: string;
  @Input() tags: string[];

  @Output() tagClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onTagClick(tag: string) {
    this.tagClick.emit(tag);
  }

}
