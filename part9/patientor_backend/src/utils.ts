import {
  Gender,
  NewPatientEntry,
  HealthCheckRating,
  NewEntry,
  NewBaseEntry,
  EntryType,
  EntryTypes
} from './types';


const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDate = (date: any): date is string => {
  return Boolean(Date.parse(date)); //??
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return !Object.values(Gender).includes(gender);
};


const parseGender= (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};


const parseDate = (date: unknown, fieldName=''): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date '${date}' on field ${fieldName}`);
  }
  return date;
};


const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};


const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing name: ' + ssn);
  }
  return ssn;
};


const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};


type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };


export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    ssn: parseSSN(ssn),
    name: parseName(name),
    occupation: parseOccupation(occupation),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    entries: []
  };

  return newEntry;
};


type EntryFields = {
  type: unknown,
  description: unknown,
  date: unknown,
  specialist: unknown,
  diagnosisCodes: unknown,

  healthCheckRating: unknown,

  discharge: unknown,

  employerName: unknown,
  sickLeave: unknown
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  if (typeof rating !== 'number') return false;
  return Boolean(Object.values(HealthCheckRating).includes(rating));
};


const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + rating);
  }
  return rating;
};


const parseString = (text: unknown, fieldName: string) => {
  if (typeof text !== 'string') {
    throw new Error(`${fieldName} expected string, received ${text}`);
  }
  return text;
};


const isDiagnosisCodes = (codes: unknown): codes is string[] => {
  const isNotString = (str: unknown) => !isString(str);
  return Boolean(codes && Array.isArray(codes) && !codes.some(isNotString));
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!isDiagnosisCodes(codes)) {
    throw new Error(`Incorrect or missing field diagnosisCodes: ${codes}`);
  }

  return codes;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: any) => {
  if (!discharge) {
    throw new Error('Property discharge is undefiend');
  }

  return {
    date: parseDate(discharge.date, 'discharge.date'),
    criteria: parseString(discharge.criteria, 'discharge.criteria')
  };
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (sickLeave: any) => {
  if (!sickLeave) {
    return undefined;
  }

  return {
    startDate: parseDate(sickLeave.startDate, 'sickLeave.startDate'),
    endDate: parseDate(sickLeave.endDate, 'sickLeave.endDate')
  };
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (type: any): type is EntryType => {
  // return entryTypes.includes(type);
  return Object.values(EntryTypes).includes(type);
};


const parseType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error(`Unknown type: ${type}`);
  }
  return type;
};


export const toNewEntry = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,

  healthCheckRating,
  discharge,
  employerName,
  sickLeave
}: EntryFields): NewEntry => {

    const baseEntry: NewBaseEntry = {
      type: parseType(type),
      date: parseDate(date, 'date'),
      description: parseString(description, 'description'),
      specialist: parseString(specialist, 'specialist'),
      diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
    };
    
    switch(type) {
      case EntryTypes.HealthCheck:
        return {
          ...baseEntry,
          type: EntryTypes.HealthCheck,
          healthCheckRating: parseHealthCheckRating(healthCheckRating),
        };

      case EntryTypes.OccupationalHealthcare:
        return {
          ...baseEntry,
          type: EntryTypes.OccupationalHealthcare,
          employerName: parseString(employerName, 'employerName'),
          sickLeave: parseSickLeave(sickLeave)
        };

      case EntryTypes.Hospital:
        return {
          ...baseEntry,
          type: EntryTypes.Hospital,
          discharge: parseDischarge(discharge)
        };

      default:
        throw new Error(`Unknown type: ${type}`);
    }
};


export const assertNever = ({ value }: { value: never }): never => {
  throw new Error(
    `Unhandled discriminated union member ${JSON.stringify(value)}`
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isType = (type: any): type is => {
//   return Object.values(EntryTypeValues).includes(type);
// };
  
// const parseType = (type: unknown): EntryType => {
//   if (!type || !isString(type) || !isType(type)) {
//     throw new Error(`Unknown type: ${type}`);
//   }
//   return type;
// };


// type Enum is not assignable to Enum.value