import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoViewerDialogComponent } from './video-viewer-dialog.component';

describe('VideoViewerDialogComponent', () => {
  let component: VideoViewerDialogComponent;
  let fixture: ComponentFixture<VideoViewerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoViewerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoViewerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
