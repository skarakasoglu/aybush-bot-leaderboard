import {Level} from "./level";

export class LeaderboardMember{
  constructor(public memberId: string, public avatarUrl: string, public username: string,
              public discriminator: string, public joinedAt: Date, public currentLevel: Level,
              public nextLevel: Level, public experiencePoints: number, public roleName: string,
              public position: number) {
  }

  getExperiencePointString(): string{
    let xpString = "";

    if (this.experiencePoints > 1000) {
        let hundred = Math.round((this.experiencePoints % 1000) / 100);
        let thousand = Math.round(this.experiencePoints / 1000);

        xpString = `${thousand}.${hundred}k`
    } else {
      xpString = this.experiencePoints.toString();
    }

    return xpString;
  }
}
