import {
  ChangeDetectionStrategy,
  Component,
  Input,
  booleanAttribute,
} from '@angular/core';
import { NgClass } from '@angular/common';

import { Thing } from '../../models/thing.model';

export type ThingColor = 'orange' | 'yellow' | 'red' | null;

@Component({
  selector: 'app-thing-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './thing-card.component.html',
  styleUrl: './thing-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThingCardComponent {
  @Input({ transform: booleanAttribute }) isConnected = false;
  @Input({ required: true }) thing!: Thing;
  @Input() color: ThingColor = null;
}
