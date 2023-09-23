import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

jest.useFakeTimers();

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [UserService],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
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
    fixture.detectChanges();
    expect(component.fetchingData).toBe(false);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.fetchingData).toBe(false);
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should fetch a random user at regular intervals', () => {
    fixture.detectChanges();
    expect(component.fetchingData).toBe(false);

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

  it('should handle ngOnDestroy', () => {
    fixture.detectChanges();
    expect(component.fetchingData).toBe(false);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.fetchingData).toBe(false);
    expect(component.timer).toBeDefined();
  });

  it('should implement toggleFavorite (TODO)', () => {
    // TODO: write tests for toggleFavorite
  });
});
