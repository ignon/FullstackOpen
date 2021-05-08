import diagnoses from '../data/diagnoses';
import { Diagnosis } from '../types';

// const diagnoses: Array<Diagnosis> = diagnoses as Array<Diagnosis>;
// ^ type assertion should be done only when we are sure about data format

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};