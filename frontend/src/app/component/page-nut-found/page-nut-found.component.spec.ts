import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNutFoundComponent } from './page-nut-found.component';

describe('PageNutFoundComponent', () => {
  let component: PageNutFoundComponent;
  let fixture: ComponentFixture<PageNutFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNutFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNutFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
