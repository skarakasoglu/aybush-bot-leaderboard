import {Component, Input, OnInit} from '@angular/core';
import {LeaderboardMember} from "../models/leaderboard-member";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() member: LeaderboardMember;
  @Input() positionX;
  @Input() positionY;

  constructor() { }

  ngOnInit(): void {
  }

}
