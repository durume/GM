export interface Coordinates {
  lat: number;
  lng: number;
  geocoded?: boolean;
  note?: string;
}

export interface Donor {
  id: string;
  name: string;
  type: 'Government' | 'Individual' | 'Corporate';
  primaryContact: string;
  email: string;
  phone: string;
  address: string;
  coordinates: Coordinates | null;
  preferredCommunication: string;
  notes: string;
}

export interface DonorData {
  metadata: {
    lastUpdated: string;
    totalDonors: number;
    geocodingStatus: string;
    notes: string;
  };
  donors: Donor[];
}

export type DonorType = 'Government' | 'Individual' | 'Corporate' | 'All';
