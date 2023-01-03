import { QueryResult } from 'pg';
import db from '../../pool/pool';

class Auth {
  // register user to database without password and username
  static async registerNonLocal(
    firstname: string,
    lastname: string,
    age: number,
    email: string,
    authType: string,
    verified: string,
  ): Promise<QueryResult> {
    const query = await db.query(
      `INSERT INTO users(username, firstname, lastname, age, email, auth_type, verified) VALUES($1,$2,$3,$4,$5,$6)`,
      [firstname, lastname, age, email, authType, verified],
    );
    return query;
  }

  static async registerLocal(
    username: string,
    firstname: string,
    lastname: string,
    age: number,
    password: string,
    email: string,
    authType: string,
    verified: boolean,
    about: string,
    profileImg: string,
  ) {
    try {
      await db.query('BEGIN');
      await db.query(
        `INSERT INTO users(username, firstname, lastname, age, password, email, auth_type, verified, about, profile_img_url) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [username, firstname, lastname, age, password, email, authType, verified, about, profileImg],
      );
      await db.query('COMMIT');
      return ['Success', null];
    } catch {
      await db.query('ROLLBACK');
      return [null, 'Error'];
    }
  }

  static async registerLocalPassword(password: string): Promise<QueryResult> {
    const query = await db.query('INSERT INTO users(password) VALUES($1)', [password]);
    return query;
  }

  static async registerUsername(username: string): Promise<QueryResult> {
    const query = await db.query('INSERT INTO users(username) VALUES($1)', [username]);
    return query;
  }

  static async updateVerified(username: string | undefined, verify: boolean): Promise<QueryResult> {
    const query = await db.query(`UPDATE users SET verified = $1 WHERE username = $2`, [verify, username]);
    return query;
  }
}

export default Auth;
