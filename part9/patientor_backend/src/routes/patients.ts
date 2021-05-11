/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

// interface PatientRequest extends Request {}

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getNonSensitiveEntries();
  res.send(patients);
});

router.get('/:id', (request, response) => {
  const patientID = request.params.id;
  const patient = patientService.findById(patientID);

  if (patient) {
    response.send(patient);
  }
  else {
    response.sendStatus(404);
  }
});


router.post('/', (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { name, dateOfBirth, ssn, gender, occupation } = (<any>request);

  const newPatientEntry = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries: []
  });


  response.json(newPatientEntry);

});

export default router;