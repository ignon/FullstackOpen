export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  occupation: string;
  gender: string;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string; // Optional!!
}