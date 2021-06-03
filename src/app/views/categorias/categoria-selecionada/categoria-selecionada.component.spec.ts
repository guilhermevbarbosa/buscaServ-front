import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaSelecionadaComponent } from './categoria-selecionada.component';

describe('CategoriaSelecionadaComponent', () => {
  let component: CategoriaSelecionadaComponent;
  let fixture: ComponentFixture<CategoriaSelecionadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaSelecionadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaSelecionadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
