import {Component, Input} from '@angular/core';
import {Article} from "../../interfaces/article/article.interface";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() article!: Article
}
