import {Component, Input, OnInit} from '@angular/core';
import {LeaderboardMember} from "../models/leaderboard-member";

@Component({
  selector: 'app-leaderboard-member',
  templateUrl: './leaderboard-member.component.html',
  styleUrls: ['./leaderboard-member.component.css']
})
export class LeaderboardMemberComponent implements OnInit {

  @Input() selectedOrderCriterion;
  @Input() firstMember: LeaderboardMember;
  @Input() member: LeaderboardMember;
  @Input() showUserInfo;
  @Input() progress;
  @Input() levelWidth;
  @Input() size;
  @Input() radius;
  @Input() strokeWidth;
  @Input() circumference;

  constructor() { }

  ngOnInit(): void {
  }

  calculateLevelWidth(): number{
    return (this.member[this.selectedOrderCriterion.key] / this.firstMember[this.selectedOrderCriterion.key]) * 100;
  }

}
