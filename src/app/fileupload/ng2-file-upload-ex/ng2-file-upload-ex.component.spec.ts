import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2FileUploadExComponent } from './ng2-file-upload-ex.component';

describe('Ng2FileUploadExComponent', () => {
  let component: Ng2FileUploadExComponent;
  let fixture: ComponentFixture<Ng2FileUploadExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2FileUploadExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2FileUploadExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
