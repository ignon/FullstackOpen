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


export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
// export const EntryTypeValues = {
//   HealthCheck: "HealthCheck",
//   Hospital: "Hospital",
//   OccupationalHealthcare: "OccupationalHealthcare"
// } as const;

// export type EntryType = typeof EntryTypeValues[keyof typeof EntryTypeValues];

enum EntryType {
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare"
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
  type: EntryType
}

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export interface HealthCheckEntry extends BaseEntry {
  type: EntryTypeValues.HealthCheck;
  healthCheckRating: HealthCheckRating;
}
interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
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

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;