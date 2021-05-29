import { Component, OnInit } from '@angular/core';
import {LeaderboardMember} from "../models/leaderboard-member";
import {LeaderboardService} from "../services/leaderboard.service";
import {Level} from "../models/level";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  strokeWidth: number = 3;
  size: number = 70;
  radius: number;
  circumference: number;

  firstMember: LeaderboardMember;
  members: LeaderboardMember[] = [];

  constructor(private leaderboardService: LeaderboardService) {
  }

  ngOnInit(): void {
    this.radius = 25;
    this.circumference = Math.PI * 2 * this.radius;

    this.leaderboardService.getLeaderboard().subscribe((observer : any) => {
      observer.member_levels.forEach(ml => {
        let member = new LeaderboardMember(ml.member_id, ml.avatar_url, ml.username, ml.discriminator,
          ml.message_count, ml.active_voice_minutes,
          ml.joined_at, new Level(ml.current_level.level, ml.current_level.required_experience_points),
          new Level(ml.next_level.level, ml.next_level.required_experience_points),
          ml.experience_points, ml.role_name, ml.position);
        if (member.position == 1) {
          this.firstMember = member;
        }

        this.members.push(member);
      });

    }, error => {
      console.log(error);
    });
  }

  calculateProgress(member: LeaderboardMember): number{
    let wholeProgress = member.nextLevel.requiredExperiencePoints - member.currentLevel.requiredExperiencePoints;
    let memberProgress = member.experiencePoints - member.currentLevel.requiredExperiencePoints;
    let memberProgressPercentage = (memberProgress / wholeProgress) * 100;

    return ((100 - memberProgressPercentage) / 100) * this.circumference;
  }

  calculateLevelWidth(member: LeaderboardMember): number{
    return (member.experiencePoints / this.firstMember.experiencePoints) * 100;
  }


}
