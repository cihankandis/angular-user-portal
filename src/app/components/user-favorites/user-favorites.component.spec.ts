import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { UserFavoritesComponent } from './user-favorites.component';
import { FavoriteService } from '../../services/favorite.service';
import { User } from 'src/app/models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UserFavoritesComponent', () => {
  let component: UserFavoritesComponent;
  let fixture: ComponentFixture<UserFavoritesComponent>;
  let favoriteService: FavoriteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFavoritesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatTableModule],
      providers: [FavoriteService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFavoritesComponent);
    component = fixture.componentInstance;
    favoriteService = TestBed.inject(FavoriteService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the dataSource with favorite users', () => {
    const favorites: User[] = [
      {
        id: 1,
        email: 'john@example.com',
        first_name: 'John',
        last_name: 'Doe',
        avatar: 'avatar1.jpg',
      },
      {
        id: 2,
        email: 'jane@example.com',
        first_name: 'Jane',
        last_name: 'Smith',
        avatar: 'avatar2.jpg',
      },
    ];

    jest.spyOn(favoriteService, 'getFavorites').mockReturnValue(favorites);

    fixture.detectChanges();

    expect(component.dataSource.data).toEqual(
      new MatTableDataSource<User>(favorites).data,
    );
  });

  it('should remove a favorite user', () => {
    const userToRemove: User = {
      id: 1,
      email: 'john@example.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar: 'avatar1.jpg',
    };
    const remainingFavorites: User[] = [
      {
        id: 2,
        email: 'jane@example.com',
        first_name: 'Jane',
        last_name: 'Smith',
        avatar: 'avatar2.jpg',
      },
    ];

    jest
      .spyOn(favoriteService, 'getFavorites')
      .mockReturnValue(remainingFavorites);

    fixture.detectChanges();

    component.removeFavorite(userToRemove);

    expect(component.dataSource.data).toEqual(
      new MatTableDataSource<User>(remainingFavorites).data,
    );
  });
});
