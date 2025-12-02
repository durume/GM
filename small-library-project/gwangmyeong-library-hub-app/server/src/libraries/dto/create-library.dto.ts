export class CreateLibraryDto {
    name: string;
    type: string;
    shortDescription?: string;
    description?: string;
    address: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    email?: string;
    homepageUrl?: string;
    instagramUrl?: string;
    blogUrl?: string;
    openingHours?: string;
    closedDays?: string;
    tags?: string;
    images?: string;
}
