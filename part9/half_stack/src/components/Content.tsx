import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map(part => 
        <div key={part.name}>
          <Part part={part} />
          <br />
        </div>
      )}
    </div>
  )
}

export default Content;