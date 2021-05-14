import {
  NewPatientEntry,
  Gender,
  HealthCheckRating,
  EntryType,
  EntryTypeValues,
  BaseEntry,
  NewBaseEntry,
  NewEntry
} from './types';


const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: unknown): date is string => {
  return Boolean(Date.parse(date as string)); //??
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender= (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

// const parseDateOfBirth = (dateOfBirth: unknown): string => {
//   if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
//     throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
//   }

//   return dateOfBirth;
// };

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing name: ' + ssn);
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing ' + occupation);
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
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
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

  healthCheckRating?: unknown,

  discharge: {
    date: unknown,
    criteria: unknown,
  },

  employerName: unknown,
  sickLeave: {
    startDate: unknown,
    endDate: unknown,
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isString(rating) || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + rating);
  }
  return rating;
};

const parseString = (text: unknown, fieldName: string) => {
  if (typeof text !== 'string') {
    throw new Error(`${fieldName} expected string, received ${text}`)
  }
  return text;
};

const isDiagnosisCodes = (codes: unknown): codes is string[] => {
  const isNotString = (str: unknown) => !isString(str);
  return Boolean(codes && Array.isArray(codes) && codes.some(isNotString));
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!isDiagnosisCodes(codes)) {
    throw new Error('Incorrect or missing field diagnosisCodes');
  }

  return codes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (type: any): type is EntryType => {
  return Object.values(EntryTypeValues).includes(type);
};
  
const parseType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isType(type)) {
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

    const basicFields: NewBaseEntry = {
      date: parseDate(date),
      description: parseString(description, 'description'),
      specialist: parseString(specialist, 'specialist'),
      diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
    };
    
    switch(type) {
      case "HealthCheck":
        return {
          ...basicFields,
          type: "HealthCheck",
          healthCheckRating: parseHealthCheckRating(healthCheckRating),
        };

      case "OccupationalHealthcare":
        const { startDate, endDate } = sickLeave;
        return {
          ...basicFields,
          type: "OccupationalHealthcare",
          employerName: parseString(employerName, 'employerName'),
          sickLeave: {
            startDate: parseDate(startDate),
            endDate: parseDate(endDate)
          }
        };
      case "Hospital":
        const { date, criteria } = discharge;
        const entry = {
          ...basicFields,
          type: "Hospital",
          // discharge: (discharge ? { date, criteria } : null)
        };
        if (discharge) {
          entry.discharge = {
            date,
            criteria
          };
        // }
          // discharge: {
          //   date: parseDate(date),
          //   criteria: parseString(criteria, 'criteria')
          // }
      default:
        throw new Error(`Unknown type: ${type}`);
    }
};


export const assertNever = ({ value }: { value: never }): never => {
  throw new Error(
    `Unhandled discriminated union member ${JSON.stringify(value)}`
  );
};