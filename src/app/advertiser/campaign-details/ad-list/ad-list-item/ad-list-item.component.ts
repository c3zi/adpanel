import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ad-list-item',
  templateUrl: './ad-list-item.component.html',
  styleUrls: ['./ad-list-item.component.scss'],
})
export class AdListItemComponent implements OnInit {
  @Input() ad;

  constructor() { }

  ngOnInit() {
  }

}
