import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathGame } from './math-game';

describe('MathGame', () => {
  let component: MathGame;
  let fixture: ComponentFixture<MathGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MathGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MathGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
