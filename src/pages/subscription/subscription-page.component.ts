import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { combineLatest } from 'rxjs';

import { AreasListComponent } from '@features/areas-list';

import { Area, AreaService } from '@entities/area';
import { ThingGroup, ThingService } from '@entities/thing';

@Component({
  selector: 'app-subscription-page',
  standalone: true,
  imports: [AreasListComponent],
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionPageComponent implements OnInit {
  private readonly thingsService = inject(ThingService);
  private readonly areasService = inject(AreaService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  protected things: ThingGroup[] = [];
  protected areas: Area[] = [];

  ngOnInit(): void {
    combineLatest([
      this.thingsService.getThingsGroups(),
      this.areasService.getAreas(),
    ]).subscribe(([things, areas]) => {
      this.things = things;
      this.areas = areas;
      this.changeDetectorRef.markForCheck();
    });
  }
}
