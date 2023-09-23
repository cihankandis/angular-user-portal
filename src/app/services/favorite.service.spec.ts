import { FavoriteService } from './favorite.service';
import { User } from '../models/user.model';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(() => {
    service = new FavoriteService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a favorite user', () => {
    const user: User = {
      id: 1,
      email: 'john@example.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar: 'avatar-url',
    };
    service.addFavorite(user);
    expect(service.getFavorites()).toEqual([user]);
  });

  it('should remove a favorite user', () => {
    const user1: User = {
      id: 1,
      email: 'john@example.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar: 'avatar-url',
    };
    const user2: User = {
      id: 2,
      email: 'alice@example.com',
      first_name: 'Alice',
      last_name: 'Smith',
      avatar: 'avatar-url',
    };

    service.addFavorite(user1);
    service.addFavorite(user2);

    service.removeFavorite(user1);
    expect(service.getFavorites()).toEqual([user2]);
  });

  it('should check if a user is a favorite', () => {
    const user1: User = {
      id: 1,
      email: 'john@example.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar: 'avatar-url',
    };
    const user2: User = {
      id: 2,
      email: 'alice@example.com',
      first_name: 'Alice',
      last_name: 'Smith',
      avatar: 'avatar-url',
    };

    service.addFavorite(user1);

    expect(service.isFavorite(user1)).toBeTruthy();
    expect(service.isFavorite(user2)).toBeFalsy();
  });

  it('should not add more than MAX_FAVORITES', () => {
    const user: User = {
      id: 1,
      email: 'john@example.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar: 'avatar-url',
    };
    for (let i = 0; i < service.MAX_FAVORITES + 1; i++) {
      service.addFavorite(user);
    }

    expect(service.getFavorites().length).toBe(service.MAX_FAVORITES);
  });

  it('should load favorites from localStorage', () => {
    const user: User = {
      id: 1,
      email: 'john@example.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar: 'avatar-url',
    };
    const favorites = [user];

    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(favorites));

    const newService = new FavoriteService();

    expect(newService.getFavorites()).toEqual(favorites);
  });

  it('should save favorites to localStorage', () => {
    const user: User = {
      id: 1,
      email: 'john@example.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar: 'avatar-url',
    };
    const favorites = [user];

    service.addFavorite(user);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      service.localStorageKey,
      JSON.stringify(favorites),
    );
  });
});
