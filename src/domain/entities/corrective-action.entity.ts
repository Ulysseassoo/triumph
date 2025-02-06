export class CorrectiveAction {
  constructor(
    public readonly id: string,
    public readonly reparationId: string,
    public readonly description: string,
    public readonly date: Date,
  ) {}
}