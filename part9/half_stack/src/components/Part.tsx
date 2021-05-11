import React from 'react';
import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {

  const { name, exerciseCount } = part;
  
  switch(part.type) {
    case "normal":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <i>{(part.description ? part.description : null)}</i>
        </div>
      )
    
    case "groupProject":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{`Project exercises: ${part.groupProjectCount}`}</p>
        </div>
      )
    
    case "submission":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <i>{(part.description ? part.description : null)}</i>
          <p>{ `Submit to ${part.exerciseSubmissionLink}`}</p>
        </div>
      )

    case "special":
      return (
        <div>
          <h3>{name} {exerciseCount}</h3>
          <i>{(part.description)}</i>
          {part.requirements.join(', ')}
        </div>
      )
    
    default:
      return assertNever(part);
  }
}

const assertNever = ({ value }: { value: never }): never => {
  throw new Error(
    `Unhandled discriminated union member ${JSON.stringify(value)}`
  )
}

export default Part;