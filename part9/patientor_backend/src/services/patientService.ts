import patients from '../data/patients';
import { Patient, PublicPatient, NewPatientEntry, NewEntry } from '../types';
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

const addEntry = (patientID: string, newEntry: NewEntry): Patient => {
  const patient = patients.find(patient => patient.id === patientID);

  if (!patient) {
    throw new Error('No user with corresponding id exists');
  }

  const entry = { ...newEntry, id: uuid() };
  patient.entries.push(entry);

  return patient;
};
// response.status(400).json({
//   error: "No patient with corresponding id exists"
// });

// if (!patient) {
//   return undefined;
// }

// const { ssn, ...nonSensitivePatient } = patient;
// return nonSensitivePatient as PatientNonSensitive;

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addPatient,
  addEntry
};