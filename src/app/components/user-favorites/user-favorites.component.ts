import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
})
export class UserFavoritesComponent implements OnInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  noFavoriteMessage = 'There is no favorite user.';

  constructor(public favoriteService: FavoriteService) {}

  ngOnInit() {
    this.dataSource.data = this.favoriteService.getFavorites();
  }

  removeFavorite(user: User): void {
    this.favoriteService.removeFavorite(user);
    this.dataSource.data = this.favoriteService.getFavorites();
  }
}
