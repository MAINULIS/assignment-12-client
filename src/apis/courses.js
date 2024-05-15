// get all courses
export const getAllCourses = async() => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/courses`,)
    const data = await response.json();
    return data;
}