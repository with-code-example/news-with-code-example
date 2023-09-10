import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFeedsComponent } from './my-feeds.component';

describe('HomeComponent', () => {
  let component: MyFeedsComponent;
  let fixture: ComponentFixture<MyFeedsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyFeedsComponent]
    });
    fixture = TestBed.createComponent(MyFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
