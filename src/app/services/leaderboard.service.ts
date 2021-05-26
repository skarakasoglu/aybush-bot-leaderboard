import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LeaderboardMember} from "../models/leaderboard-member";
import {Level} from "../models/level";

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  private API_URL = "https://api.aybushbot.com/v1/leaderboard";

  constructor(private httpClient: HttpClient) { }

  getLeaderboard() : Observable<any> {
    return this.httpClient.get(this.API_URL);
  }
}
