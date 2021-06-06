import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LeaderboardMember} from "../models/leaderboard-member";
import {LeaderboardService} from "../services/leaderboard.service";
import {Level} from "../models/level";
import {delay} from "rxjs/operators";
import {Episode} from "../models/episode";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  loading = false;
  strokeWidth: number = 3;
  size: number = 70;
  radius: number;
  circumference: number;

  firstMember: LeaderboardMember;
  members: LeaderboardMember[] = [];
  @Output() selectedMemberEmitter: EventEmitter<LeaderboardMember> = new EventEmitter<LeaderboardMember>();
  selectedMember: LeaderboardMember;
  memberInfoX: number;
  memberInfoY: number;

  orderByCriteria = [
    {'value': 0, 'name': 'tp', 'key': "experiencePoints"},
    {'value': 1, 'name': 'mesaj', 'key': 'messageCount'},
    {'value': 2, 'name': 'saat', 'key': 'activeVoiceMinutes'},
  ]
  selectedOrderCriterion = {'value': -1, 'name': ''};

  episodes: Episode[] = [];
  selectedEpisode: Episode;

  constructor(private leaderboardService: LeaderboardService) {
  }

  ngOnInit(): void {
    this.radius = this.size / 2 - this.strokeWidth / 2;
    this.circumference = Math.PI * 2 * this.radius;
    this.selectedOrderCriterion = this.orderByCriteria[0];

    this.getEpisodes();

    this.selectedMemberEmitter.subscribe(val => {
      this.selectedMember = val;
    })
  }

  changeSelectedOrderCriterion(criterion) {
    this.selectedOrderCriterion = criterion;
    this.updateLeaderboard(this.selectedEpisode.id, this.selectedOrderCriterion.value);
  }

  changeSelectedEpisode(episode: Episode) {
    this.selectedEpisode = episode;
    this.updateLeaderboard(this.selectedEpisode.id, this.selectedOrderCriterion.value);
  }

  getEpisodes() {
    this.leaderboardService.getEpisodes().subscribe((observer: any) => {
      observer.episodes.forEach(eps => {
        let episode = new Episode(eps.id, eps.name, eps.start_timestamp, eps.end_timestamp);
        this.episodes.push(episode);
      });

      this.selectedEpisode = this.episodes[0];
      this.updateLeaderboard(this.selectedEpisode.id, this.selectedOrderCriterion.value);
    });
  }

  updateLeaderboard(episode: number, order: number) {
    this.loading = true;
    this.leaderboardService.getEpisodeLeaderboard(episode, order).subscribe((observer : any) => {
      this.members = [];
      observer.leaderboard.forEach(ml => {
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

      this.loading = false;
    }, error => {
      console.log(error);
    });
  }

  showUserInfo = (event, member: LeaderboardMember) => {
    this.selectedMemberEmitter.emit(member);
    this.memberInfoX = event.pageX;
    this.memberInfoY = event.pageY;
  }

  closeMemberInfo = () => {
    this.selectedMemberEmitter.emit(undefined);
  }


}
