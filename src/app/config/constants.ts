import {Injectable} from "@angular/core";

@Injectable()
export class Constants {
  public readonly BASE_API_URL = "https://aybushbot.com:9000";
  public readonly API_VER = "v1";
  public readonly EPISODE_ENDPOINT = "episode";
  public readonly LEADERBOARD_ENDPOINT = "leaderboard";
}
