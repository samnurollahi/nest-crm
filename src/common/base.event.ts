export abstract class BaseEvnet {
  public readonly eventId: string;

  constructor(public readonly eventName: string) {
    this.eventId = crypto.randomUUID();
    this.eventName = eventName;
  }
}
