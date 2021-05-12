/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect } from "react";
import axios from "axios";
import { Route, Link, Switch, useRouteMatch, useHistory } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Diagnose, Patient } from "./types";

import PatientPage from './PatientPage';
import PatientListPage from "./PatientListPage";
import { setPatientList, setDiagnoses } from "./state/reducer";

const App = () => {
  const [, dispatch] = useStateValue();
  
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    
    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
          );
          dispatch(setPatientList(patientListFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatientList();
    }, [dispatch]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnose[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoses(diagnoses));
      }
      catch(e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, [dispatch]);
    
  type PatientMatch = { id?: string };
  const match = useRouteMatch<PatientMatch>('/patients/:id');
  const patientID = match ? match.params.id : null;

  return (
    <div className="App">
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />

          <Switch>
            <Route exact path="/">
              <PatientListPage />
            </Route>
            <Route path="/patients/:id">
              <PatientPage patientID={patientID} />
            </Route>
          </Switch>

        </Container>
    </div>
  );
};

export default App;
