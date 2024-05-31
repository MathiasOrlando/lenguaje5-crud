import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnoEditPage } from './alumno-edit.page';

describe('AlumnoEditPage', () => {
  let component: AlumnoEditPage;
  let fixture: ComponentFixture<AlumnoEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AlumnoEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
