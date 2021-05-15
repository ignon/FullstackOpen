import React, { useEffect } from 'react';
import axios from 'axios';
import { Patient, Entry } from '../types';
import { useStateValue } from '../state';
import { apiBaseUrl } from "../constants";
import { Button, Icon, Rating } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import { updateLocalPatientData } from '../state/reducer';
import { assertNever } from '../utils';
import { Card } from 'semantic-ui-react';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
// import HealthRatingBar from '../components/HealthRatingBar';

type patientID = string | null | undefined;

const PatientPage = ({ patientID }: { patientID: patientID | undefined }) => {
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  
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
    
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patientID}/entries`,
        values
      );
      dispatch(addPatient(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={() => null}
        error={error}
        onClose={closeModal}
      />
      <br />
      <Button onClick={() => openModal()}>New entry</Button> 
    </div>
  );
};

const EntryField = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type, description, date, specialist, diagnosisCodes } = entry;

  const getEntryIcon = (type: Entry['type']) => {
    switch(type) {
      case "HealthCheck": return "user md";
      case "Hospital": return "hospital";
      case "OccupationalHealthcare": return "stethoscope";
      default: assertNever(type);
    }
  };

  const entryIconName = getEntryIcon(entry.type);
  console.log(entryIconName);

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {date}
        <Icon name={entryIconName} />
        </Card.Header>
        <Card.Description>
          {description}
          <ul>
            {diagnosisCodes?.map(code =>
              <li key={code}>{code} {diagnoses[code]?.name}</li>
            )}
          </ul>
          <EntryDetails entry={entry} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};
// {<Rating icon="heart" disabled rating={4 - rating} maxRating={4} />}

const EntryDetails = ({ entry }: { entry: Entry }) => {

  switch(entry.type) {
    case "Hospital":
      const { discharge: { date, criteria }} = entry;
      return (
        <div>
          Discharge: {date} {criteria}
        </div>
      );
    case "HealthCheck":
      const rating = entry.healthCheckRating + 1;
      return (
        <div>
          <Rating icon="heart" disabled rating={rating} maxRating={rating} />
        </div>
      );
    case "OccupationalHealthcare":
      const { employerName, sickLeave } = entry;
      if (!sickLeave) {
        return <div>Employer: {employerName}</div>;
      }
      return (
        <div>
          Employer: {employerName}
          <br />
          SickLeave: {sickLeave.startDate} - {sickLeave.endDate}
        </div>
      );

    default:
      return assertNever(entry);
  }
};




export default PatientPage;