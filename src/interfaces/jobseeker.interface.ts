export interface JobSeeker {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  postalAddress: string;
  highestQualification: string;
  job: string;
  jobExperience: number;
  interestedCountries: string;
  interestedJobs: string;
  isActive: boolean;
}
