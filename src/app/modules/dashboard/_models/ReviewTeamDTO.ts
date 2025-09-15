export interface ReviewTeamDTO {
    totalReviews: number;
    totalNr: number;
    totalQueueActivities: number;
    totalSubsegmentos: number;
    historyReviewsMonth: HistoryReviews;
    historyReviewsYear: HistoryReviews;
}

export interface HistoryReviews {
    days: number[];
    months: number[];
    reviewsDay: number[];
    reviewsNight: number[];
    reviewsNr: number[];
}