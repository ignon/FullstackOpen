/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';


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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.post('/', (request: any, response) => {
  console.log(request.body);

  try {
    const newPatientEntry = toNewPatientEntry(request.body);
    patientService.addPatient(newPatientEntry);
    response.json(newPatientEntry);
  }
  catch(e) {
    response.json({ error: e.message }).status(400);
  }



});

export default router;