import { Consultant } from './consultant.interface';
import { JobSeeker } from './jobseeker.interface';

export interface Appointment {
  id?: number;
  appointmentTime: Date;
  consultantId: string;
  jobSeekerId: string;
  isAccepted: boolean;
  isDeclined: boolean;
}

export interface AppointmentDetails {
  appointment: Appointment;
  consultant: Consultant;
  jobSeeker: JobSeeker;
}
