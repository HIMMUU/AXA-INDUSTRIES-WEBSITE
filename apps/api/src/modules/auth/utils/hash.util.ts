import * as bcrypt from 'bcrypt';

export class HashUtil {
  private static readonly BCRYPT_ROUNDS = 12;

  static async hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.BCRYPT_ROUNDS);
  }

  static async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
