import axios from 'axios';

async function run() {
  const response = await axios.post(
    'https://api.securedocex.com/tokens',
    new URLSearchParams({
      'grant_type': 'client_credentials'
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      auth: {
        username: 'aa5a7b5d-9bad-4242-a547-fc4f9189ef75',
        password: 'r91aYCjvL7uoeGRN'
      }
    }
  );
  console.log(response.data)
  // JWT access token: response.data.access_token
}

run();