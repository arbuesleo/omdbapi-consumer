import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'everis-movie';

  constructor(private elementRef: ElementRef){

  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#000';
    this.elementRef.nativeElement.ownerDocument.body.style.color = '#fff';
    this.elementRef.nativeElement.ownerDocument.body.style.height = '95%';
  }
}
