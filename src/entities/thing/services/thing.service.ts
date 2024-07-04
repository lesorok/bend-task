import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ThingGroup } from '../models/thing-group.model';
import { Thing } from '../models/thing.model';

interface ApiThing {
  id: number;
  areaId: number;
  joinedWith: number | null;
  sku: string;
  defaultSku: string;
  status: 'open' | 'closed';
}

@Injectable({
  providedIn: 'root',
})
export class ThingService {
  private readonly http = inject(HttpClient);

  getThingsGroups(): Observable<ThingGroup[]> {
    return this.http.get<ApiThing[]>('assets/things.json').pipe(
      map(things => {
        const groups: ApiThing[][] = [];
        const thingsMap = new Map<number, ApiThing[]>();

        things.forEach(thing => {
          if (!thingsMap.get(thing.joinedWith!)) {
            thingsMap.set(thing.joinedWith!, []);
          }

          thingsMap.set(thing.joinedWith!, [
            ...Array.from(thingsMap.get(thing.joinedWith!) || []),
            thing,
          ]);
        });

        things.forEach(thing => {
          if (thing.joinedWith === null) {
            groups.push(this.buildThingGroup(thing, thingsMap));
          }
        });

        const mappedGroups = groups.map(
          group =>
            new ThingGroup(
              // get unique id for group base on things ids for trackByFn
              group.map(thing => thing.id).join('-'),
              group[0].areaId,
              group.map(
                thing =>
                  new Thing(
                    thing.id,
                    thing.sku,
                    thing.defaultSku,
                    thing.status,
                  ),
              ),
            ),
        );

        return mappedGroups.sort((a, b) => b.things.length - a.things.length);
      }),
    );
  }

  private buildThingGroup(
    firstThing: ApiThing,
    thingsMap: Map<number, ApiThing[]>,
  ): ApiThing[] {
    const group: ApiThing[] = [firstThing];
    const nextThings = thingsMap.get(firstThing.id) || [];

    nextThings.forEach(thing => {
      group.push(...this.buildThingGroup(thing, thingsMap));
    });

    return group;
  }
}
