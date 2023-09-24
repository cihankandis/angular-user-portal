import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { FavoriteService } from '../../services/favorite.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit, OnDestroy {
  private readonly maxUsersCount = 10;
  users: User[] = [];
  timer: number | undefined;
  timerEnabled = false;
  randomIntervalSeconds = 5;

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  constructor(
    private userService: UserService,
    private favoriteService: FavoriteService,
  ) {}

  ngOnInit() {
    this.userService
      .fetchRandomUsers(this.maxUsersCount)
      .subscribe((users: User[]) => {
        this.dataSource.data = users.slice(0, this.maxUsersCount);
      });
  }

  toggleTimer(toggleChange: MatSlideToggleChange) {
    this.timerEnabled = toggleChange.checked;
    if (this.timerEnabled) {
      this.timer = window.setInterval(() => {
        this.userService.fetchRandomUser().subscribe((user) => {
          if (this.dataSource.data.length >= this.maxUsersCount) {
            this.dataSource.data.pop();
          }
          this.dataSource.data.unshift(user);
          this.dataSource._updateChangeSubscription();
        });
      }, this.randomIntervalSeconds * 1000);
    } else {
      clearInterval(this.timer);
    }
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
