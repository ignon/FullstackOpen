import patients from '../data/patients';
import { Patient, PublicPatient, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(patient => ({
      ...patient,
      ssn: undefined,
      entries: undefined
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const addPatient = (patientEntry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...patientEntry
  };
  patients.push(newPatient);
  return newPatient;
};

// if (!patient) {
//   return undefined;
// }

// const { ssn, ...nonSensitivePatient } = patient;
// return nonSensitivePatient as PatientNonSensitive;

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addPatient
};