import React from 'react'
import { useParams } from 'react-router-dom'

const CourseDetail = () => {
    const {courseId} = useParams()
    console.log(courseId);
  return (
    <div>CourseDetail</div>
  )
}

export default CourseDetail