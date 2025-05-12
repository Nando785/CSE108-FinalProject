export async function createNewUser(firstName, lastName, username, password) {
    try {
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName, lastName, username, password})
        });
       
        const data = await response.json();
        // if(data['message'] === 'Login successful'){
        //     return response.ok;
        // }else{
        //     return false;
        // }

    } catch (error) {
        console.error('Sign up error', error);
        return false;
    }
}