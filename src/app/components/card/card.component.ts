import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() isSelected:Boolean = false;
  @Output() onEnter: EventEmitter<any> = new EventEmitter();
  
  constructor(){}

  ngOnInit() {}
}
