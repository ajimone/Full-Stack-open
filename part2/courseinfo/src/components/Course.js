const ContentRender = ({ courseName, courseParts }) => {

    const exTotal = courseParts.reduce((sum, coursePart) => sum + coursePart.exercises, 0)

    return (
        <div>
            <h3>{courseName}</h3>

            {courseParts.map(partContents => <PartRender key={partContents.id} partNames={partContents.name} partExercises={partContents.exercises} />)}
            
            <h4>total of {exTotal} exercises</h4>
        </div>)
}

const PartRender = ({ partNames, partExercises }) => {
    return (
        <div>
            <p>{partNames} {partExercises}</p>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <h2>Web development curriculum</h2>
            {course.map(courseDetails => <ContentRender key={courseDetails.id} courseName={courseDetails.name} courseParts={courseDetails.parts} />)}
        </div>
    )
}

export default Course