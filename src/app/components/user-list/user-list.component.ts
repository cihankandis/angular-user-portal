import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  timer: number | undefined;

  displayedColumns: string[] = [
    'id',
    'email',
    'first_name',
    'last_name',
    'avatar',
    'addFavorite',
  ];

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  fetchingData = false;

  constructor(
    private userService: UserService,
    private favoriteService: FavoriteService,
  ) {}

  ngOnInit() {
    this.fetchingData = true;
    this.userService.fetchRandomUsers(10).subscribe((users: User[]) => {
      this.dataSource.data = users;
      this.fetchingData = false;
    });

    this.timer = window.setInterval(() => {
      this.userService.fetchRandomUser().subscribe((user) => {
        if (this.dataSource.data.length >= 10) {
          this.dataSource.data.pop();
        }
        this.dataSource.data.unshift(user);
        this.dataSource._updateChangeSubscription();
      });
    }, 5000);
  }

  toggleFavorite(user: User): void {
    if (this.favoriteService.isFavorite(user)) {
      this.favoriteService.removeFavorite(user);
    } else {
      this.favoriteService.addFavorite(user);
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
