import { Component } from '@angular/core';
import { FavoriteService } from './services/favorite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular user portal';

  constructor(private favoritesService: FavoriteService) {}

  get favoritesCount(): number {
    return this.favoritesService.getFavorites().length;
  }
}
