import React, { useEffect } from 'react';
import axios from 'axios';
import { Patient, Entry } from '../types';
import { useStateValue } from '../state';
import { apiBaseUrl } from "../constants";
import { Icon } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import { updateLocalPatientData } from '../state/reducer';


type patientID = string | null | undefined;

const PatientPage = ({ patientID }: { patientID: patientID | undefined }) => {
  const [{ patients }, dispatch] = useStateValue();

  
  useEffect(() => {
    if (!patientID) return;
    if (typeof patientID !== 'string') return;
    const patient = patients[patientID];
    if (patient?.ssn && patient?.entries) return;
    
    const fetchPatientList = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientID}`
          );
          console.log(patientData);
          dispatch(updateLocalPatientData(patientData));
        } catch (e) {
          console.error(e);
        }
      };
    void fetchPatientList();
  }, [dispatch, patientID]);
    
  if (!patientID) return <div>Undefined patient id.</div>;

  const patient = patients[patientID];
  if (!patient) return null;
  // return <pre>Patient view: {JSON.stringify(patient, null, 4)}</pre>;

  const { name, dateOfBirth, gender, occupation, ssn, entries } = patient;

  const getGenderIcon = (gender: string): SemanticICONS | undefined  => {
    switch(gender) {
      case "male": return "male";
      case "female": return "female";
      case "other": return "other gender";
      default: return undefined;
    }
  };

  const genderIconName = getGenderIcon(gender);


  return (
    <div>
      <h2>{name} <Icon name={genderIconName} /></h2>
      <div>
        ssn: {ssn}
        <br />
        occupation: {occupation}
        <br />
        date of birth: {dateOfBirth}
        <br />
        <h3>Entries</h3> {entries?.map(entry =>
          <EntryField key={entry.id} entry={entry} />
        )}
      </div>
    </div>
  );
};

const EntryField = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type, description, date, specialist, diagnosisCodes } = entry;

  // switch(type) {
  //   case "HealthCheck":
  //     return <div></div>;
  //   case "Hospital":
  //     return <div></div>;
  //   case "OccupationalHealthcare":
  //     return <div></div>;
  //   default:
  //     ///// NEVER!!!
  //     return null;
  // }

  return (
    <div>
      {date} {description} <br />
      <ul>
        {diagnosisCodes?.map(code =>
          <li key={code}>{code} {diagnoses[code]?.name}</li>
        )}
      </ul>
    </div>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const { type } = entry;

  switch(type) {
    case "Hospital":
      const { discharge: { date, criteria }} = entry;
      return (
        <div>
          Discharge: {discharge.date} {discharge.criteria}
        </div>
      );
  }
};
export default PatientPage;