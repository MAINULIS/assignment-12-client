// get all testimonials
export const getTestimonials = async() => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/testimonials`,)
    const data = await response.json();
    return data;
}