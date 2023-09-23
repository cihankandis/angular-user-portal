import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import {
  RandomMultipleUserApiResponse,
  RandomSingleUserApiResponse,
  User,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userListApiUrl = 'https://reqres.in/api/users';
  private readonly singleUserApiUrl = 'https://reqres.in/api/users/';
  private readonly maxUserId = 12;

  constructor(private http: HttpClient) {}

  fetchRandomUsers(count: number): Observable<User[]> {
    const apiUrl = `${this.userListApiUrl}?per_page=${count}`;

    return this.http.get<RandomMultipleUserApiResponse>(apiUrl).pipe(
      map((response) => response.data),
      catchError(() => of([] as User[])),
    );
  }

  fetchRandomUser(): Observable<User> {
    const randomUserId = Math.floor(Math.random() * this.maxUserId) + 1;
    const randomUserUrl = `${this.singleUserApiUrl}${randomUserId}`;

    return this.http.get<RandomSingleUserApiResponse>(randomUserUrl).pipe(
      map((response) => response.data),
      catchError(() => of({} as User)),
    );
  }
}
