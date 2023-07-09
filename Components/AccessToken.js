import axios from 'axios';

const getAccessToken = async () => {
  const clientId = '7loLWNW6q9r1GRVY7Qi7D9fiHhMPiTT4';
  const clientSecret = '1NvMj5HtGfEHAiiQ';

  try {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    throw new Error('Error retrieving access token');
  }
};

export default getAccessToken;
