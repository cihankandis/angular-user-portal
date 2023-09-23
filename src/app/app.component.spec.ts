import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [MatToolbarModule, MatCardModule, RouterTestingModule],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title in the toolbar', () => {
    component.title = 'Angular User Portal';
    fixture.detectChanges();

    const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    const titleElement = toolbar.query(By.css('span'));

    expect(titleElement.nativeElement.textContent).toContain(
      'Angular User Portal',
    );
  });

  it('should have a mat-card in the main content', () => {
    fixture.detectChanges();

    const matCard = fixture.debugElement.query(By.css('mat-card'));

    expect(matCard).toBeTruthy();
  });
});
