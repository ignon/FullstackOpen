import patients from '../data/patients';
import { Patient, PatientNonSensitive, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): PatientNonSensitive[] => {
  return patients.map(patient => ({
      ...patient,
      ssn: undefined
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

// const findById(id: string): Patient | undefined => {
//   return patients.find(patient => patient.id === id);
// }

// if (!patient) {
//   return undefined;
// }

// const { ssn, ...nonSensitivePatient } = patient;
// return nonSensitivePatient as PatientNonSensitive;

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  findById,
  addPatient
};