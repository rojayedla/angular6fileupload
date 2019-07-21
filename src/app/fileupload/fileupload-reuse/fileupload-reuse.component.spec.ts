import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploadReuseComponent } from './fileupload-reuse.component';

describe('FileuploadReuseComponent', () => {
  let component: FileuploadReuseComponent;
  let fixture: ComponentFixture<FileuploadReuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploadReuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploadReuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
