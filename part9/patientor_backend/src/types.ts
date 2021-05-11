export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  entries: Entry[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export type NewPatientEntry = Omit<Patient, 'id'>;

export type PatientNonSensitive = Omit<Patient, 'ssn'>;
// export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export interface Diagnose {
  code: string;
  name: string;
  latin?: string; // Optional!!
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}