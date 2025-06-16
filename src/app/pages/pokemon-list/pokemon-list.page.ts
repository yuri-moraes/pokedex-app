import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() { this.loadPokemons(); }

  loadPokemons() {
    this.pokemonService.getPokemons().subscribe(response => {
      const processedResults = response.results.map(p => {
        const urlParts = p.url.split('/');
        p.id = parseInt(urlParts[urlParts.length - 2]);

        p.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`;

        return p;
      });

      this.pokemons = processedResults;
    });
  }
}
