// get all instructors
export const getInstructors = async() => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/instructors`,)
    const data = await response.json();
    return data;
}