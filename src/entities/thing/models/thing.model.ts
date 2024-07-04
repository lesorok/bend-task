export type ThingStatus = 'open' | 'closed';

export class Thing {
  constructor(
    public id: number,
    public sku: string,
    public defaultSku: string,
    public status: ThingStatus,
  ) {}
}
