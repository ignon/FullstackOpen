export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  entries: Entry[];
}


export type NewPatientEntry = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
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

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare"
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}
interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  };
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;