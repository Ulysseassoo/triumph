export class Piece {
    public constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly type: string,
      public readonly cost: number,
      public readonly quantity: number,
      public readonly alertLimit: number
    ) {}
  }
  