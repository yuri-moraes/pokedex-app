import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { FavoriteService } from './services/favorite.service';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private favoriteService: FavoriteService) {
    addIcons({ star, starOutline });
    this.initializeApp();
  }

  initializeApp() {
    this.favoriteService.init();
  }
}
