const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => {
  return(
    <p>Number of exercises {sum}</p>
  )

}

const Part = ({ part }) => {
  //console.log('Part:', part)
return(
  <p>
    {part.name} {part.exercises}
  </p>
)
  
}

const Content = ({ parts }) => {
  //console.log('Parts:', parts)

  return(
    <> 
      {parts.map((elemento, index) => (
            <Part key={index} part={elemento} />
          ))} 
    </>
  )
}

const Course = ({course}) => {
  //console.log(course.parts)
  const sum = course.parts.reduce((s,p) => s + p.exercises, 0)
  return(
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    
    </>
  )
}

export default Course