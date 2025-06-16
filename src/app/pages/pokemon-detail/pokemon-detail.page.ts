// src/app/pages/pokemon-detail/pokemon-detail.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PokemonService, PokemonDetails } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PokemonDetailPage implements OnInit {
  public pokemon: PokemonDetails | null = null;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.loadPokemonDetails();
  }

  loadPokemonDetails() {
    const pokemonId = this.route.snapshot.paramMap.get('id');

    if (pokemonId) {
      this.pokemonService.getPokemonDetails(pokemonId).subscribe(details => {
        this.pokemon = details;
        console.log('Detalhes recebidos:', this.pokemon);
      });
    }
  }
}
