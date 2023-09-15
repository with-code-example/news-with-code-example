import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagFeedsComponent } from './tag-feeds.component';

describe('TagFeedsComponent', () => {
  let component: TagFeedsComponent;
  let fixture: ComponentFixture<TagFeedsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagFeedsComponent]
    });
    fixture = TestBed.createComponent(TagFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
