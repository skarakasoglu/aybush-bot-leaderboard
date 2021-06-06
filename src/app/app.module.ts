import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import {LeaderboardService} from "./services/leaderboard.service";
import {HttpClientModule} from "@angular/common/http";
import { LeaderboardMemberComponent } from './leaderboard-member/leaderboard-member.component';
import {Constants} from "./config/constants";
import { UserInfoComponent } from './user-info/user-info.component';
import { LevelCircleComponent } from './level-circle/level-circle.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeaderboardComponent,
    LeaderboardMemberComponent,
    UserInfoComponent,
    LevelCircleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [LeaderboardService, Constants],
  bootstrap: [AppComponent]
})
export class AppModule { }
