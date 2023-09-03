export interface Consultant {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  postalAddress: string;
  morningAvailabilityStartTime: Date | null;
  morningAvailabilityEndTime: Date | null;
  eveningAvailabilityStartTime: Date | null;
  eveningAvailabilityEndTime: Date | null;
  experience: number;
  educationalQualification: string;
  specializedCountries: string;
}
