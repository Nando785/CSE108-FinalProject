export async function validateLogin(username, password) {
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if(data['message'] === 'Login successful'){
            return true;
        }else{
            return false;
        }

    } catch (error) {
        console.error('Login error:', error);
        console.log(data);
        return false;
    }
}
