import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';

import { Area, AreaComponent } from '@entities/area';
import { ThingGroup, ThingGroupComponent } from '@entities/thing';

interface AreaWithThingGroups extends Area {
  thingGroups: ThingGroup[];
}

@Component({
  selector: 'app-areas-list',
  standalone: true,
  imports: [AreaComponent, ThingGroupComponent],
  templateUrl: './areas-list.component.html',
  styleUrl: './areas-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreasListComponent implements OnChanges {
  @Input({ required: true }) areas!: Area[];
  @Input({ required: true }) thingGroups!: ThingGroup[];

  protected parsedAreas: AreaWithThingGroups[] = [];

  ngOnChanges(): void {
    this.parsedAreas = this.areas.map(area => {
      const thingGroups = this.thingGroups.filter(
        thingGroup => thingGroup.areaId === area.id,
      );

      return {
        ...area,
        thingGroups,
      };
    });
  }
}
