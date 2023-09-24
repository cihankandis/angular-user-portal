import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { User } from 'src/app/models/user.model';

jest.useFakeTimers();

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let favoriteService: FavoriteService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [UserService, FavoriteService],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    favoriteService = TestBed.inject(FavoriteService);
    httpTestingController = TestBed.inject(HttpTestingController);

    jest.spyOn(userService, 'fetchRandomUsers').mockReturnValue(
      of([
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
      ]),
    );

    jest.spyOn(userService, 'fetchRandomUser').mockReturnValue(
      of({
        id: 3,
        email: 'randomuser@example.com',
        first_name: 'Random',
        last_name: 'User',
        avatar: 'random_avatar.jpg',
      }),
    );
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch random users and populate the data source', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.dataSource.data.length).toBe(2);
  });

  it('should fetch a random user at regular intervals', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.dataSource.data.length).toBe(2);

    jest.advanceTimersByTime(5000);
    fixture.detectChanges();

    expect(component.dataSource.data.length).toBe(4);

    jest.advanceTimersByTime(5000);
    fixture.detectChanges();

    expect(component.dataSource.data.length).toBe(6);
  });

  it('should remove data from dataSource when length exceeds 10', () => {
    const mockUsers: User[] = Array.from({ length: 11 }, (_, index) => ({
      id: index + 1,
      email: `user${index + 1}@example.com`,
      first_name: `User${index + 1}`,
      last_name: `Last${index + 1}`,
      avatar: `avatar${index + 1}.jpg`,
    }));

    jest.spyOn(userService, 'fetchRandomUsers').mockReturnValue(of(mockUsers));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.dataSource.data.length).toBe(10);

    jest.advanceTimersByTime(5000);
    fixture.detectChanges();

    expect(component.dataSource.data.length).toBe(10);
  });

  it('should handle ngOnDestroy', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.timer).toBeDefined();
  });

  it('should toggle user favorite status', () => {
    const user: User = {
      id: 1,
      email: 'john@example.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar: 'avatar-url',
    };

    const addFavoriteSpy = jest.spyOn(favoriteService, 'addFavorite');
    const removeFavoriteSpy = jest.spyOn(favoriteService, 'removeFavorite');
    const isFavoriteSpy = jest.spyOn(favoriteService, 'isFavorite');

    isFavoriteSpy.mockReturnValue(false);
    component.toggleFavorite(user);
    expect(addFavoriteSpy).toHaveBeenCalledWith(user);
    addFavoriteSpy.mockClear();

    isFavoriteSpy.mockReturnValue(true);
    component.toggleFavorite(user);
    expect(removeFavoriteSpy).toHaveBeenCalledWith(user);
    removeFavoriteSpy.mockClear();

    isFavoriteSpy.mockReturnValue(false);
    component.toggleFavorite(user);
    expect(addFavoriteSpy).toHaveBeenCalledWith(user);

    jest.restoreAllMocks();
  });
});
