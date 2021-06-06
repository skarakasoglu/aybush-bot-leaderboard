import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constants} from "../config/constants";

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private httpClient: HttpClient, private constants: Constants) { }

  getEpisodes() : Observable<any> {
    return this.httpClient.get(`${this.constants.BASE_API_URL}/${this.constants.API_VER}/${this.constants.EPISODE_ENDPOINT}`);
  }

  getEpisodeLeaderboard(episode: number, order: number) : Observable<any> {
    return this.httpClient.get(`${this.constants.BASE_API_URL}/${this.constants.API_VER}/${this.constants.LEADERBOARD_ENDPOINT}?episode=${episode}&order=${order}`)
  }

  //DEPRECATED
  getLeaderboard() : Observable<any> {
    return this.httpClient.get(`${this.constants.BASE_API_URL}/${this.constants.API_VER}/${this.constants.LEADERBOARD_ENDPOINT}`);
  }
}
