// get role
export const getRole = async email => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/${email}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    })

    const user = await response.json();
    return user?.role;
}