import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const FAVORITES_KEY = 'my-favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private _storage: Storage | null = null;
  private favorites: number[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    this.favorites = await this._storage.get(FAVORITES_KEY) || [];
  }

  isFavorite(pokemonId: number): boolean {
    return this.favorites.includes(pokemonId);
  }

  toggleFavorite(pokemonId: number) {
    const index = this.favorites.indexOf(pokemonId);

    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(pokemonId);
    }

    this._storage?.set(FAVORITES_KEY, this.favorites);
  }
}
