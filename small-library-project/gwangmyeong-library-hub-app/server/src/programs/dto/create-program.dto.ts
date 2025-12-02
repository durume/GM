export class CreateProgramDto {
    libraryId: string;
    title: string;
    description?: string;
    targetAge?: string;
    category?: string;
    startDate: string; // ISO Date string
    endDate?: string; // ISO Date string
    scheduleType?: string;
    status?: string;
    capacity?: number;
    fee?: number;
    contactInfo?: string;
    thumbnailUrl?: string;
}
