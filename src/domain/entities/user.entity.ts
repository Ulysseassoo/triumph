export class User {
    public constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly email: string,
      public readonly password: string,
      public readonly passwordValidUntil?: Date,
      public readonly isVerified?: boolean,
      public readonly role?: string[]
    ) {}
  }
  