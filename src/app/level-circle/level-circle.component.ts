import {Component, Input, OnInit} from '@angular/core';
import {LeaderboardMember} from "../models/leaderboard-member";

@Component({
  selector: 'app-level-circle',
  templateUrl: './level-circle.component.html',
  styleUrls: ['./level-circle.component.css']
})
export class LevelCircleComponent implements OnInit {

  @Input() member: LeaderboardMember;
  @Input() strokeWidth: number;
  @Input() size: number;
  radius: number;
  circumference: number;

  constructor() { }

  ngOnInit(): void {
    this.radius = this.size / 2 - this.strokeWidth / 2;
    this.circumference = Math.PI * 2 * this.radius;
  }

  calculateProgress(): number{
    let wholeProgress = this.member.nextLevel.requiredExperiencePoints - this.member.currentLevel.requiredExperiencePoints;
    let memberProgress = this.member.experiencePoints - this.member.currentLevel.requiredExperiencePoints;
    let memberProgressPercentage = (memberProgress / wholeProgress) * 100;

    return ((100 - memberProgressPercentage) / 100) * this.circumference;
  }

}
