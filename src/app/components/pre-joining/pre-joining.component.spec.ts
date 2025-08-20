import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreJoiningComponent } from './pre-joining.component';

describe('PreJoiningComponent', () => {
  let component: PreJoiningComponent;
  let fixture: ComponentFixture<PreJoiningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreJoiningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreJoiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
