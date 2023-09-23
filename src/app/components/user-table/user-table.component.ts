import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  @Input() dataSource: MatTableDataSource<User> =
    new MatTableDataSource<User>();
  @Input() showEmptyMessage = false;
  @Output() toggleFavorite = new EventEmitter<User>();

  displayedColumns: string[] = [
    'id',
    'avatar',
    'first_name',
    'last_name',
    'email',
    'toggleFavorite',
  ];

  constructor(public favoriteService: FavoriteService) {}

  onToggleFavorite(user: User): void {
    this.toggleFavorite.emit(user);
  }
}
