import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, InfiniteScrollCustomEvent } from '@ionic/angular';
import { RouterLink } from '@angular/router';

import { PokemonService, PokemonResult } from '../../services/pokemon.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class PokemonListPage implements OnInit {

  public pokemons: PokemonResult[] = [];
  private offset = 0;

  constructor(private pokemonService: PokemonService, public favoriteService: FavoriteService) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemons(this.offset).subscribe(response => {
      const processedResults = this.processPokemonResults(response.results);
      this.pokemons = processedResults;
    });
  }

  loadMore(event: any) {
    this.offset += 25;

    this.pokemonService.getPokemons(this.offset).subscribe(response => {
      const processedResults = this.processPokemonResults(response.results);

      this.pokemons.push(...processedResults);

      (event as InfiniteScrollCustomEvent).target.complete();

      if (!response.next) {
        (event as InfiniteScrollCustomEvent).target.disabled = true;
      }
    });
  }

  private processPokemonResults(results: PokemonResult[]): PokemonResult[] {
    return results.map(p => {
      const urlParts = p.url.split('/');
      p.id = parseInt(urlParts[urlParts.length - 2]);
      p.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`;
      return p;
    });
  }
}
