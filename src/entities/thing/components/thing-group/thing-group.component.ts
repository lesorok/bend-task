import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ThingGroup } from '../../models/thing-group.model';
import { ThingCardComponent } from '../thing-card/thing-card.component';
import { GetColorFromStatusesPipe } from '../../pipes/get-color-from-statuses.pipe';

@Component({
  selector: 'app-thing-group',
  standalone: true,
  imports: [ThingCardComponent, GetColorFromStatusesPipe],
  templateUrl: './thing-group.component.html',
  styleUrl: './thing-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThingGroupComponent {
  @Input({ required: true }) thingGroup!: ThingGroup;
}
