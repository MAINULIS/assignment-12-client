
// get all courses
export const getAllCourses = async() => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/courses`,)
    const data = await response.json();
    return data;
}

// get all selected course for a student by email
export const getSelectedCourse = async email => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/selected?email=${email}`, {
        method: 'GET',
        headers: {
            'content-type' : 'application/json'
        },
    })
    const selected= await response.json();
    return selected;
}

// delete a selected course
export const deleteSelectedCourse = async id => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/selected/${id}`,{
        method: 'DELETE',
        headers: {
            'content-type' : 'application/json',
        },
    })
    const data = await response.json();
    return data;
}

// get a single course
export const singleCourse = async id => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/selected/${id}`,{
        method: 'GET',
        headers: {
            'content-type' : 'application/json',
        },
    })
    const data = await response.json();
    return data;
}

// update course info

