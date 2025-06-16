import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { FavoriteService } from '../../services/favorite.service';
import { PokemonService, PokemonDetails } from '../../services/pokemon.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class FavoritesPage {
  public favoritePokemons: PokemonDetails[] = [];
  public isLoading = true;

  constructor(
    public favoriteService: FavoriteService,
    private pokemonService: PokemonService
  ) {}

  ionViewWillEnter() {
    this.loadFavoritePokemons();
  }

  toggleAndReload(id: number) {
    this.favoriteService.toggleFavorite(id);
    this.loadFavoritePokemons();
  }

  loadFavoritePokemons() {
    this.isLoading = true;
    const favoriteIds = this.favoriteService.favoriteIds;

    if (favoriteIds.length === 0) {
      this.favoritePokemons = [];
      this.isLoading = false;
      return;
    }

    const requests = favoriteIds.map(id => this.pokemonService.getPokemonDetails(id.toString()));

    forkJoin(requests).subscribe({
      next: (results) => {
        this.favoritePokemons = results;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar pokémons favoritos', err);
        this.isLoading = false;
      }
    });
  }
}
