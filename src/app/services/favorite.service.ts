import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  readonly localStorageKey = 'favoriteUsers';
  favorites: User[] = [];
  readonly MAX_FAVORITES = 10;

  constructor() {
    this.loadFavoritesFromLocalStorage();
  }

  addFavorite(user: User): void {
    if (this.canAddFavorite()) {
      this.favorites.push(user);
      this.saveFavoritesToLocalStorage();
    }
  }

  removeFavorite(user: User): void {
    this.favorites = this.favorites.filter((favUser) => favUser.id !== user.id);
    this.saveFavoritesToLocalStorage();
  }

  getFavorites(): User[] {
    return this.favorites;
  }

  isFavorite(user: User): boolean {
    return this.favorites.some((favUser) => favUser.id === user.id);
  }

  private canAddFavorite(): boolean {
    return this.favorites.length < this.MAX_FAVORITES;
  }

  private loadFavoritesFromLocalStorage(): void {
    const favoritesString = localStorage.getItem(this.localStorageKey);
    if (favoritesString) {
      this.favorites = JSON.parse(favoritesString);
    }
  }

  private saveFavoritesToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.favorites));
  }
}
