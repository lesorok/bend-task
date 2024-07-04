import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Area } from '../../models/area.model';

@Component({
  selector: 'app-area',
  standalone: true,
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaComponent {
  @Input({ required: true }) area!: Area;
}
