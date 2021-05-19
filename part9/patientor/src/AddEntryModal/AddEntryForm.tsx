/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, EntryTypeSelection, /*SelectField,*/ DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state/state";
import { isEntryType, isDate, isDiagnosisCodes, isDischarge, isString, isHealthCheckRating, isNonEmptyString, isSickLeave } from '../utils';
import { EntryFormValues, HealthCheckRating, EntryType, Diagnosis } from '../types';


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnosisList }] = useStateValue();
  const [entryType, setEntryType] = useState(EntryType.HealthCheck);
  const [diagnosisCodes, setDiagnosisCodes] = useState([] as Diagnosis['code'][]);

  return (
    <Formik
      initialValues={{
        type: entryType,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0,
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
        // console.log('validation: ', values);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const getError = (value: any) => {
          return (value)
            ? "Field is invalid"
            : "Field is missing";
        };

        const requiredError = "Field is missing or invalid";
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
            startDate?: string,
            endDate?: string
          }
        } = {};


        values.type = entryType;
        values.diagnosisCodes = diagnosisCodes;

        const  { type, date } = values;
        if (!isEntryType(type)) {
          errors.type = getError(type);
        }

        if (!isNonEmptyString(values.description)) {
          errors.description = requiredError;
        }

        if (!isDate(date)) {
          errors.date = getError(date);
        }

        if (!isNonEmptyString(values.specialist)) {
          errors.specialist = getError(values.specialist);
        }

        if (!isDiagnosisCodes(diagnosisCodes)) {
          errors.diagnosisCodes = requiredError;
        }

        switch(entryType) {
          case EntryType.Hospital:
            if ("discharge" in values) {
              if (!isDischarge(values.discharge)) {
                const { date, criteria } = values.discharge;
                errors.discharge = {
                  date: !isDate(date) ? getError(date) : undefined,
                  criteria: !isNonEmptyString(criteria) ? getError(criteria) : undefined
                };
              }
            }
            break;

          case EntryType.HealthCheck:
            if ("healthCheckRating" in values) {
              if (!isHealthCheckRating(values.healthCheckRating))
                errors.healthCheckRating = getError(values.healthCheckRating);
            }
            break;
          
          case EntryType.OccupationalHealthcare:
            if ("employerName" in values) {
              if (!isNonEmptyString(values.employerName)) {
                errors.employerName = requiredError;
              }
            }
            if ("sickLeave" in values && values.sickLeave) {
              if (!isSickLeave(values.sickLeave)) {
                const { startDate, endDate } = values.sickLeave;
                if (startDate || endDate) {
                  errors.sickLeave = {
                    startDate: !isDate(startDate) ? requiredError : undefined,
                    endDate: !isDate(endDate) ? requiredError : undefined
                  };
                }
              }
            }
            break;
        }
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
            <DiagnosisSelection
              diagnoses={diagnosisList}
              setFieldValue={(field, codes) => {
                setDiagnosisCodes(codes);
                console.log('diagnosisCodes', diagnosisCodes);
              }}
              setFieldTouched={() => null }
            />
            {(entryType === EntryType.HealthCheck &&
              <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            )}
            {(entryType === EntryType.OccupationalHealthcare) &&
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
            {(entryType === EntryType.Hospital) &&
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