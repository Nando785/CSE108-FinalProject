export async function createNewUser(firstName, lastName, username, password) {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName, lastName, username, password})
        });
    } catch (error) {
        console.error('Sign up error', error);
        return false;
    }
}