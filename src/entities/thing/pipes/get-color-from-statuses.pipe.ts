import { Pipe, PipeTransform } from '@angular/core';

import { Thing } from '../models/thing.model';
import { ThingColor } from '../components/thing-card/thing-card.component';

@Pipe({
  name: 'getColorFromStatuses',
  standalone: true,
})
export class GetColorFromStatusesPipe implements PipeTransform {
  transform(things: Thing[]): ThingColor {
    const statuses = things.map(thing => thing.status);

    if (statuses.every(status => status === 'open')) return 'yellow';

    if (statuses.every(status => status === 'closed')) return 'red';

    return 'orange';
  }
}
