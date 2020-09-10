import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesFavoritasComponent } from './series-favoritas.component';

describe('SeriesFavoritasComponent', () => {
  let component: SeriesFavoritasComponent;
  let fixture: ComponentFixture<SeriesFavoritasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesFavoritasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesFavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
