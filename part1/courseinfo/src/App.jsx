const Header = (props) => {

  return(
    <>
      <h1>{props.course.name}</h1>
    </>
  )

}

const Content = (props) => {

  console.log(props)

  return (
    <>
      {/* <Part part={props.content[0]} exercises={props.content[1]}/>
      <Part part={props.content[2]} exercises={props.content[3]}/>
      <Part part={props.content[4]} exercises={props.content[5]}/> */}

      {props.content.parts.map(value => (
        <Part key={value.name} part={value.name} exercises={value.exercises} />
      ))}
      
    </>
  )
}

const Total = (props) => {

  let totalExcer = 0

  props.total.parts.map(value => (
    totalExcer = totalExcer + value.exercises
  ))

  console.log(totalExcer)

  return (
    <>
      <p>Number of exercises {totalExcer}</p>
    </>
  )
}

const Part = (props) => {
  return(
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}


const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }



  return (
    <div>
      <Header course={course}/>
      
      <Content content={course}/>

      <Total total={course}/>
    </div>
  )
}

export default App
