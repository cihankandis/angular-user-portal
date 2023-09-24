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
  private readonly maxUsersCount = 10;
  users: User[] = [];
  timer: number | undefined;

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  fetchingData = false;

  constructor(
    private userService: UserService,
    private favoriteService: FavoriteService,
  ) {}

  ngOnInit() {
    this.fetchingData = true;
    this.userService
      .fetchRandomUsers(this.maxUsersCount)
      .subscribe((users: User[]) => {
        this.dataSource.data = users.slice(0, this.maxUsersCount);
        this.fetchingData = false;
      });

    this.timer = window.setInterval(() => {
      this.userService.fetchRandomUser().subscribe((user) => {
        if (this.dataSource.data.length >= this.maxUsersCount) {
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
