import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, filter, from, last, throwError } from 'rxjs';
import { Challenge } from './models';
export { Challenge } from './models';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private http: HttpClient) {}

  /**
   * Retrieve all Challenges in the system.
   * 
   * @returns an observable array of Challenge objects.
   */
  getAllChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>("/api/challenges");
  }

  /**
   * Retrieve current weChallenge.
   * 
   * @returns a the most recent weChallenge.
   */
  getCurrentChallenge(): Observable<Challenge> {
    return this.http.get<Challenge>("api/current")
  }

  /**
   * Retrieve all weChallenges.
   * 
   * @returns an observable array of Challenge objects.
   */
  getWeChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>("/api/wechallenges");
  }

  /**
   * Retrieve all meChallenges.
   * 
   * @returns an observable array of Challenge objects.
   */
  getMeChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>("/api/mechallenges");
  }

  /**
   * Retrieve all meChallenges.
   * 
   * @returns an observable array of Challenge objects.
   */
  createChallenge(challenge: Challenge, options: Array<String>): Observable<Challenge> {
    console.log(options)
    console.log(challenge)
    return this.http.post<Challenge>("/api/challenges", 
      {
        "challenge": challenge,
        "options": [options[0], options[1], options[2], options[3], options[4], options[5]]
      }
    );
  }

}
