
import React from 'react'

const Course = ({course}) => (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
)
  
const Header = ({name}) =>
(
    <h2>{name}</h2>
)

const Total = ({parts}) => {
    const total = parts.reduce(
        (total, part) => total + part.exercises,
        0
    )

    return (
        <p><b>Total of {total} exercises</b></p>
    )
}

const Content = ({parts}) => (
<ul>
    {parts.map(part =>
    <Part part={part} key={part.id} />
    )}
</ul>
)

const Part = ({part}) => (
<li>{part.name} {part.exercises}</li>
)


  export default Course