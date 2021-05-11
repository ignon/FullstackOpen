import diagnoses from '../data/diagnoses';
import { Diagnose } from '../types';

// const diagnoses: Array<Diagnose> = diagnoses as Array<Diagnose>;
// ^ type assertion should be done only when we are sure about data format

const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};