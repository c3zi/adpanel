import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panel-blockade',
  templateUrl: './panel-blockade.component.html',
  styleUrls: ['./panel.blockade.component.scss'],
})

export class PanelBlockadeComponent {
  @Input() url: string;

  constructor() {
  }
}
