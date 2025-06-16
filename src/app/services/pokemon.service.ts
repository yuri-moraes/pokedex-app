import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PokeApiResponse {
  count: number;
  next: string;
  previous: null | string;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
  id: number;
  image: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
}



@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  /**
   * Busca uma lista paginada de Pokémons.
   * @param offset - O ponto de partida da lista (para paginação).
   * @param limit - O número de Pokémons a serem retornados.
   * @returns Um Observable com a lista de Pokémons.
   */
  getPokemons(offset: number = 0, limit: number = 25): Observable<PokeApiResponse> {
    const url = `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`;
    return this.http.get<PokeApiResponse>(url);
  }

  /**
   * Busca os detalhes completos de um Pokémon específico pelo seu ID.
   * @param id - O número de identificação do Pokémon.
   * @returns Um Observable com os detalhes do Pokémon.
   */
  getPokemonDetails(id: string): Observable<PokemonDetails> {
    const url = `${this.baseUrl}/pokemon/${id}`;
    return this.http.get<PokemonDetails>(url);
  }
}
