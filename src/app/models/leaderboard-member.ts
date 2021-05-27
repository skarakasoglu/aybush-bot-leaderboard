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
    let str = "";

    let hours = Math.floor(this.activeVoiceMinutes / 60);
    let minutes = Math.floor(this.activeVoiceMinutes % 60 / 6);

    str = `${hours}.${minutes} saat`;

    return str;
  }

  getShortString(number: number): string{
    let shortString = "";

    if (number > 1000) {
      let hundred = Math.floor((this.experiencePoints % 1000) / 100);
      let thousand = Math.floor(this.experiencePoints / 1000);

      shortString = `${thousand}.${hundred}k`
    } else {
      shortString = number.toString();
    }

    return shortString;
  }
}
