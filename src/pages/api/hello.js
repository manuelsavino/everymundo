// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default async (req, res) => {
  const data = await axios.post(
    'https://everymundotechnical.herokuapp.com/search/PU0534299c',
    {
      destination: 'LAS',
      origin: 'MIA',
      tripType: 'oneWay',
      departureDate: '05/26/2019',
      returnDate: '',
      passengerCount: 1,
    }
  );

  res.statusCode = 200;
  res.json(data.data);
};
