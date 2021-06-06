import {Level} from "./level";

export class LeaderboardMember{
  constructor(public memberId: string, public avatarUrl: string, public username: string,
              public discriminator: string, public messageCount: number, public activeVoiceMinutes: number,
              public joinedAt: Date, public currentLevel: Level,
              public nextLevel: Level, public experiencePoints: number, public roleName: string,
              public position: number) {
  }

  getExperiencePointString(): string{
    return this.getShortString(this.experiencePoints);
  }

  getMessageCountString(): string{
    return this.getShortString(this.messageCount);
  }

  getHourString(): string{
    return (this.activeVoiceMinutes / 60).toFixed(1);
  }

  getShortString(number: number): string{
    let shortString = "";

    if (number > 1000) {
      shortString = `${(number / 1000).toFixed(1)}k`
    } else {
      shortString = number.toString();
    }

    return shortString;
  }
}
