import Course from "./Course/Course"

const Home = () => {
    const courses = [
        {
            id: 1,
            name: "react",
            description: "react course"
        },
        {
            id: 2,
            name: "C++",
            description: "C++ course"
        },
        {
            id: 3,
            name: "Python",
            description: "python course"
        }
    ]

    return (
        courses.map(course =>
            <Course course={course} />
        )
    )
}

export default Home