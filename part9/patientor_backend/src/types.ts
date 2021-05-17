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


// export enum {
  //   HealthCheck = "HealthCheck",
  //   Hospital = "Hospital",
  //   OccupationalHealthcare = "OccupationalHealthcare"
  // }
  
export interface BaseEntry {
  id: string;
  type: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export const EntryTypes = {
  HealthCheck: "HealthCheck",
  Hospital: "Hospital",
  OccupationalHealthcare: "OccupationalHealthcare"
} as const;

export type EntryType = typeof EntryTypes[keyof typeof EntryTypes];

// export const entryTypes = ["HealthCheck", "Hospital", "OccupationalHealthcare"] as const;
// export type EntryType = typeof entryTypes[number];

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface Discharge {
  date: string;
  criteria: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;