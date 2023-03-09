import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarateQuizComponent } from './karate-quiz.component';

describe('KarateQuizComponent', () => {
  let component: KarateQuizComponent;
  let fixture: ComponentFixture<KarateQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KarateQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KarateQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
