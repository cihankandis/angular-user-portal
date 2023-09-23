import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss'],
})
export class UserFavoritesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'email',
    'first_name',
    'last_name',
    'avatar',
    'removeFavorite',
  ];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  constructor(public favoriteService: FavoriteService) {}

  ngOnInit() {
    this.dataSource.data = this.favoriteService.getFavorites();
  }

  removeFavorite(user: User): void {
    this.favoriteService.removeFavorite(user);
    this.dataSource.data = this.favoriteService.getFavorites();
  }
}
