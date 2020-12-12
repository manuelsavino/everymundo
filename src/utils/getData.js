// export const getFlights = (async() = {});
import axios from 'axios';

export const getFares = async (query) => {
  try {
    const data = await axios.post(
      'https://everymundotechnical.herokuapp.com/search/PU0534299c',
      {
        destination: query.destination,
        origin: query.origin,
        tripType: query.tripType,
        departureDate: query.departureDate,
        returnDate: query.returnDate || '',
        passengerCount: parseInt(query.passengerCount),
      }
    );
    return data;
  } catch (err) {
    throw new Error('Something Went Wrong');
  }
};

export const getPopularRoutes = async () => {
  try {
    const data = await axios.get(
      'https://everymundotechnical.herokuapp.com/popularRoutes/PU0534299c'
    );
    return data;
  } catch (err) {
    throw new Error('Unable to get a token.');
  }
};
