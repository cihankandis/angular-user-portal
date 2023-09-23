import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import {
  User,
  RandomMultipleUserApiResponse,
  RandomSingleUserApiResponse,
} from '../models/user.model';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should fetch random users', (done) => {
    const count = 2;
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

    userService.fetchRandomUsers(count).subscribe((users) => {
      expect(users).toEqual(mockUsers);
      done();
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
    });

    const response: RandomMultipleUserApiResponse = {
      page: 1,
      perPage: count,
      total: count,
      totalPages: 1,
      data: mockUsers,
      support: { url: '', text: '' },
    };
    req.flush(response);
  });

  it('should fetch a random user', (done) => {
    const mockUser: User = {
      id: 1,
      email: 'randomuser@example.com',
      first_name: 'Random',
      last_name: 'User',
      avatar: 'random_avatar.jpg',
    };

    userService.fetchRandomUser().subscribe((user) => {
      expect(user).toEqual(mockUser);
      done();
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
    });

    const response: RandomSingleUserApiResponse = {
      data: mockUser,
      support: { url: '', text: '' },
    };
    req.flush(response);
  });

  it('should handle HTTP error for fetchRandomUsers', (done) => {
    const errorMessage = 'HTTP Error occurred';

    userService.fetchRandomUsers(5).subscribe({
      next: (users) => {
        expect(users).toEqual([]);
        done();
      },
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
    });

    req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
  });

  it('should handle HTTP error for fetchRandomUser', (done) => {
    const errorMessage = 'HTTP Error occurred';

    userService.fetchRandomUser().subscribe({
      next: (user) => {
        expect(user).toEqual({});
        done();
      },
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
    });

    req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
  });
});
