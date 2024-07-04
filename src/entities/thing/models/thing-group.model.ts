import { Thing } from './thing.model';

export class ThingGroup {
  constructor(
    public id: string,
    public areaId: number,
    public things: Thing[],
  ) {}
}
