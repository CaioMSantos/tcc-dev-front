import { RankingDTO } from "./RankingDTO";
import { ReviewTeamDTO } from "./ReviewTeamDTO";

export interface DashboardDTO {
    ranking: RankingDTO[];
    myRanking: RankingDTO;
    reviewTeam: ReviewTeamDTO;
}