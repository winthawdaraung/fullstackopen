const Header = (props) => {
    return <h1>{props.course.name}</h1>;
  };
  
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    );
  };
  
  const Content = (props) => {
    return (
      <div>
        {props.course.parts.map((part, index) => (
          <Part key={index} part={part.name} exercises={part.exercises} />
        ))}
      </div>
    );
  };
  
  const Total = (props) => {
    const total = props.course.parts.reduce((sum, part) => sum + part.exercises, 0);
    return <h4>Total of {total} exercises</h4>;
  };
const Course = (props) => {
    return (
      <div>
        {props.course.map((course, index) => (
          <div key={index}>
          <Header course={course}/>
          <Content course={course} />
          <Total course={course} />
          </div>
        ))}
      </div>
    )
  }

  export default Course;