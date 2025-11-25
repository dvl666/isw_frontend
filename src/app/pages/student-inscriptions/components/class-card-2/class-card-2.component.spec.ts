import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCard2Component } from './class-card-2.component';

describe('ClassCard2Component', () => {
  let component: ClassCard2Component;
  let fixture: ComponentFixture<ClassCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassCard2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
