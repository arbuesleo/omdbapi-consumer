import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Input() placeholder:String;
  @Input() hasFocus:Boolean;
  @Output() onEnter: EventEmitter<any> = new EventEmitter();

  @ViewChild('input', {static: false}) input:ElementRef;

  constructor() { }

  ngOnInit() {
    if(this.placeholder === undefined) this.placeholder = 'Digite sua pesquisa...';    
  }

  onKeyPress($event){
    if($event.key === 'Enter' && this.onEnter != undefined){
      this.onEnter.emit({value: $event.target.value, target: $event.target});
    }
  }

}
