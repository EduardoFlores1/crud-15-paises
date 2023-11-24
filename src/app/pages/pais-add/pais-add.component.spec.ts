import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisAddComponent } from './pais-add.component';

describe('PaisAddComponent', () => {
  let component: PaisAddComponent;
  let fixture: ComponentFixture<PaisAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PaisAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaisAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
