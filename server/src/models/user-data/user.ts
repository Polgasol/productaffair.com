import { QueryResult } from 'pg';
import db from '../../pool/pool';

class User {
  static async createNewGoogleUser(
    firstname: string,
    lastname: string,
    googleId: string,
    authType: string,
    email: string,
  ): Promise<QueryResult> {
    const newUser = await db.query(
      `INSERT INTO users(firstname,lastname,google_id,auth_type,email,verified) VALUES($1,$2,$3,$4,$5)`,
      [firstname, lastname, googleId, authType, email],
    );
    return newUser;
  }

  static async updateVerified(verified: boolean, email: string) {
    try {
      await db.query('BEGIN');
      await db.query(
        `UPDATE users SET verified=$1 WHERE email=$2`, // execute when user is verified through email
        [verified, email],
      );
      await db.query('COMMIT');
      return ['Success', null];
    } catch (e) {
      await db.query('ROLLBACK');
      return [null, 'Error'];
    }
  }

  static async updateUnverifiedUser(
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
        `UPDATE users SET username=$1, firstname=$2, lastname=$3, age=$4, password=$5, email=$6, auth_type=$7, verified=$8, about=$9, profile_img_url=$10 WHERE email=$11`,
        [username, firstname, lastname, age, password, email, authType, verified, about, profileImg, email],
      );
      await db.query('COMMIT');
      return ['Success', null];
    } catch (e) {
      await db.query('ROLLBACK');
      return [null, 'Error'];
    }
  }

  static async userEmailVerified(email: string): Promise<QueryResult> {
    const userVerified = await db.query(`SELECT verified FROM users WHERE email = $1`, [email]);
    return userVerified;
  }

  static async googleVerified(id: string): Promise<QueryResult> {
    const userVerified = await db.query(`SELECT verified FROM users WHERE google_id = $1`, [id]);
    return userVerified;
  }

  static async userUsernameVerified(username: string): Promise<QueryResult> {
    const userVerified = await db.query(`SELECT verified FROM users WHERE username = $1`, [username]);
    return userVerified;
  }

  static async googleUsername(username: string): Promise<QueryResult> {
    const googleUsername = await db.query(`SELECT username FROM users WHERE username = $1`, [username]);
    return googleUsername;
  }

  static async googleId(id: string): Promise<QueryResult> {
    const googleId = await db.query(`SELECT google_id FROM users WHERE google_id = $1`, [id]);
    return googleId;
  }

  static async googleEmail(email: string): Promise<QueryResult> {
    const googleEmail = await db.query(`SELECT email FROM users WHERE email = $1`, [email]);
    return googleEmail;
  }

  static async localIdExist(id: string): Promise<QueryResult> {
    const localId = await db.query(`SELECT pk_users_id FROM users WHERE pk_users_id = $1`, [id]);
    return localId;
  }

  static async getUsernameByUsername(username: string): Promise<QueryResult> {
    const userName = await db.query(`SELECT username FROM users WHERE username = $1`, [username]);
    return userName;
  }

  static async getEmailByEmail(email: string): Promise<QueryResult> {
    const userEmail = await db.query(`SELECT email FROM users WHERE email = $1`, [email]);
    return userEmail;
  }

  static async getUsernameByEmail(email: string): Promise<QueryResult> {
    const username = await db.query(`SELECT username FROM users WHERE email = $1`, [email]);
    return username;
  }

  static async getEmailByUsername(username: string): Promise<QueryResult> {
    const email = await db.query(`SELECT email FROM users WHERE username = $1`, [username]);
    return email;
  }

  // change password by email
  static async getPasswordByEmail(email: string): Promise<QueryResult> {
    const password = await db.query(`SELECT password FROM users WHERE email = $1`, [email]);
    return password;
  }

  // change password by email
  static async getPasswordByUsername(username: string): Promise<QueryResult> {
    const password = await db.query(`SELECT password FROM users WHERE username = $1`, [username]);
    return password;
  }

  static async passportDeserialize(id: string): Promise<QueryResult> {
    const password = await db.query(`SELECT password FROM users WHERE pk_users_id = $1`, [id]);
    return password;
  }

  static async getIdByEmail(email: string | undefined): Promise<QueryResult> {
    const id = await db.query(`SELECT pk_users_id FROM users WHERE email = $1`, [email]);
    return id;
  }

  static async getIdByUsername(username: string): Promise<QueryResult> {
    const id = await db.query(`SELECT pk_users_id FROM users WHERE username = $1`, [username]);
    return id;
  }

  static async getDateById(id: string): Promise<QueryResult> {
    const date = await db.query(`SELECT date_created FROM users WHERE pk_users_id = $1`, [id]);
    return date;
  }
}

export default User;
