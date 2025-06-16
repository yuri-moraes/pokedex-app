import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, InfiniteScrollCustomEvent } from '@ionic/angular';
import { RouterLink } from '@angular/router';

import { PokemonService, PokemonResult } from '../../services/pokemon.service';

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

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.loadPokemons();
  }

  /**
   * Carrega a leva inicial de pokémons.
   */
  loadPokemons() {
    this.pokemonService.getPokemons(this.offset).subscribe(response => {
      const processedResults = this.processPokemonResults(response.results);
      this.pokemons = processedResults;
    });
  }

  /**
   * Este método é chamado pelo evento (ionInfinite) do nosso HTML.
   * Ele carrega a próxima leva de pokémons.
   * @param event O evento disparado pelo ion-infinite-scroll.
   */
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

  /**
   * Centraliza a lógica de processamento dos resultados da API.
   * @param results A lista de pokémons vinda da API.
   * @returns A lista de pokémons com ID e imagem.
   */
  private processPokemonResults(results: PokemonResult[]): PokemonResult[] {
    return results.map(p => {
      const urlParts = p.url.split('/');
      p.id = parseInt(urlParts[urlParts.length - 2]);
      p.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`;
      return p;
    });
  }
}
