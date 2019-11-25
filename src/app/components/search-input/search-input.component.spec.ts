import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('Test Default Placeholder', () => {   

    expect(component.placeholder).toEqual('Digite sua pesquisa...');

    component.placeholder = 'Pesquisar....';

    fixture.detectChanges();

    expect(component.placeholder).toEqual('Pesquisar....');
  });

  it('Test on enter', () => {   

    spyOn(component.onEnter, 'emit');
    
    const event = new KeyboardEvent("keypress",{
      "key": "Enter"
    });

    fixture.nativeElement.querySelector('input').dispatchEvent(event);

    expect(component.onEnter.emit).toHaveBeenCalled();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
