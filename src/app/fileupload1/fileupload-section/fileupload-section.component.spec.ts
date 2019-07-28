import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploadSectionComponent } from './fileupload-section.component';

describe('FileuploadSectionComponent', () => {
  let component: FileuploadSectionComponent;
  let fixture: ComponentFixture<FileuploadSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploadSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploadSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
