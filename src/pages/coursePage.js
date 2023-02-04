import CourseDetails from '../components/Course/CourseDetails';
import { useLocation } from 'react-router-dom';
const coursePage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();
const course = location.state.course;
  return <CourseDetails course={course}/>;
};

export default coursePage;