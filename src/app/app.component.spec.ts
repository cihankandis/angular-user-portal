import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { FavoriteService } from './services/favorite.service';
import { User } from './models/user.model';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let favoriteService: FavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        MatToolbarModule,
        MatBadgeModule,
        MatCardModule,
        RouterTestingModule,
      ],
      providers: [FavoriteService],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    favoriteService = TestBed.inject(FavoriteService);
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

  it('should render User List link', () => {
    fixture.detectChanges();
    const userListLink: HTMLAnchorElement = fixture.nativeElement.querySelector(
      'a[routerLink="/user-list"]',
    );
    expect(userListLink).toBeTruthy();
    expect(userListLink.textContent).toContain('User List');
  });

  it('should render Favorites link with badge', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        email: 'user1@example.com',
        first_name: 'User',
        last_name: 'One',
        avatar: 'avatar1.jpg',
      },
      {
        id: 2,
        email: 'user2@example.com',
        first_name: 'User',
        last_name: 'Two',
        avatar: 'avatar2.jpg',
      },
    ];
    jest.spyOn(favoriteService, 'getFavorites').mockReturnValue(mockUsers);

    fixture.detectChanges();
    const favoritesLink: HTMLAnchorElement =
      fixture.nativeElement.querySelector('a[routerLink="/user-favorites"]');
    expect(favoritesLink).toBeTruthy();
    expect(favoritesLink.textContent).toContain('Favorites');

    const badgeElement: HTMLElement =
      fixture.nativeElement.querySelector('.mat-badge-content');
    expect(badgeElement).toBeTruthy();
    expect(badgeElement.textContent).toContain(mockUsers.length.toString());
  });
});
