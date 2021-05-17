/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, EntryTypeSelection, /*SelectField,*/ DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state/state";
import {
  // HealthCheck,
  EntryFormValues, HealthCheckRating, EntryType
} from '../types';



console.log(EntryTypes);


// import { Diagnosis } from "../types";
// export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnosisList }] = useStateValue();
  const [entryType, setEntryType] = useState(EntryTypes.Hospital as EntryType);

  console.log(
    // 0, Object.values(HealthCheckRating)
    'entry type:',
    entryType
  );

  const initialType = EntryTypes.Hospital as EntryType;
  
  console.log('DiagnosisList:', diagnosisList);
  return (
    <Formik
      initialValues={{
        type: entryType,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 3,
        discharge: {
          date: "",
          criteria: ""
        },
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        console.log('validation: ', values);

        const requiredError = "Field is required";
        const errors: {
          type?: string,
          description?: string,
          date?: string,
          specialist?: string,
          diagnosisCodes?: string,
          healthCheckRating?: string,
          discharge?: {
            date?: string,
            criteria?: string
          },
          employerName?: string,
          sickLeave?: {
            startDate: string,
            endDate: string
          }
        } = {};
        values.type = entryType;
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }

        
        // Ongelmat
        // 1. Virheilmoitus
        // 2. Errors['obj.value'] ...
        // 3. Initial values with different types
        
        // 1. Tyyppi ei päivity
        // 2. EntryTypeSelection-komponentti ei palauta arvoa?
        // 3. Entäs muut selection componentit?
        console.log('type: ', values.type);
        errors.discharge = {};

        switch(entryType) {
          case EntryTypes.Hospital:
            // alert('type hospital');
            if (!values.discharge?.date) {
              console.log('discharge.date not defined');
              errors.discharge.date = requiredError;
            }
            if (!values.discharge?.criteria) {
              console.log('criteria not defined');
              errors.discharge.criteria = requiredError;
            }
            break;
          case EntryTypes.OccupationalHealthcare:
            break;
          case EntryTypes.HealthCheck:
            // if (!values.healthCheckRating) {
            //   errors.healthCheckRating = requiredError;
            // }
            break;
        }
        console.log('errors: ', errors);
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <EntryTypeSelection
              defaultValue={entryType}
              setFieldValue={(_field, val) => {
                console.log('val:', val);
                setEntryType(val);
              }
            }
              setFieldTouched={() => null }
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            {/* <Field
              label="Diagnosis codes"
              placeholder="M13 etc..."
              name="diagnosisCodes"
              component={TextField}
            /> */}
            <DiagnosisSelection
              diagnoses={diagnosisList}
              setFieldValue={() => null }
              setFieldTouched={() => null }
            />
            {(entryType === EntryTypes.HealthCheck &&
              <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            )}
            {(entryType === EntryTypes.OccupationalHealthcare) &&
              <div>
                <Field
                  label="Employer name"
                  placeholder="Employer name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick leave start date (optional)"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick leave end date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </div>
            }
            {(entryType === EntryTypes.Hospital) &&
              <div>
                <Field
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge criteria"
                  placeholder="criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </div>
            }
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;