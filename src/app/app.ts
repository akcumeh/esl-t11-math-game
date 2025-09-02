import { Component } from '@angular/core';
import { MathGameComponent } from './math-game/math-game';

@Component({
    selector: 'app-root',
    imports: [MathGameComponent],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
}