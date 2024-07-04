import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Area } from '../models/area.model';

interface ApiArea {
  areaId: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private readonly http = inject(HttpClient);

  getAreas(): Observable<Area[]> {
    return this.http
      .get<ApiArea[]>('assets/areas.json')
      .pipe(map(areas => areas.map(area => new Area(area.areaId, area.name))));
  }
}
