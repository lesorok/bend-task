import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import { AreasListComponent } from '@features/areas-list';

import { AreaService } from '@entities/area';
import { ThingService } from '@entities/thing';

@Component({
  selector: 'app-async-page',
  standalone: true,
  imports: [AsyncPipe, AreasListComponent],
  templateUrl: './async-page.component.html',
  styleUrls: ['./async-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncPageComponent {
  private readonly thingsService = inject(ThingService);
  private readonly areasService = inject(AreaService);

  protected readonly data$ = combineLatest([
    this.thingsService.getThingsGroups(),
    this.areasService.getAreas(),
  ]).pipe(map(([things, areas]) => ({ things, areas })));
}
