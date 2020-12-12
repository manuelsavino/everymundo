import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Arrow } from '../components/icons';
import dateFormat from 'dateformat';

export default function Search({ results }) {
  return (
    <div className='container mx-auto flex justify-center py-6'>
      <Head>
        <title>Search</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className=' w-11/12 md:w-full mx-auto px-5'>
        {console.log(results)}
        <h2 className='text-3xl text-indigo-500 mb-5'>Choose Your Flight(s)</h2>
        {results.map((flight) => (
          <div key={uuidv4()} className='w-full'>
            <h2 className='flex items-center text-2xl'>
              {flight.origin}
              <Arrow className='px-1 text-indigo-500' />
              {flight.destination}
            </h2>
            <h4>
              {flight.departureDate !== 'undefined' &&
              flight.departureDate.indexOf('/') > -1
                ? dateFormat(
                    new Date(flight.departureDate),
                    'dddd, mmmm dS, yyyy'
                  )
                : dateFormat(
                    new Date(flight.departureDate + 'T00:00:00'),
                    'dddd, mmmm dS, yyyy'
                  )}
            </h4>
            <table className='border-t-2 border-indigo-500 mt-2 table-auto w-5/6 mb-10'>
              <thead>
                <tr>
                  <td className='border-b border-gray-100  text-indigo-500 text-lg pl-2 pt-6'>
                    Departure
                  </td>
                  <td className='border-b border-gray-100  text-indigo-500 text-lg pl-2 pt-6'>
                    Arrival
                  </td>
                  <td className='border-b border-gray-100 hidden md:table-cell text-indigo-500 text-lg pl-2 pt-6'>
                    Class
                  </td>
                  <td className='border-b border-gray-100  text-indigo-500 text-lg pl-2 pt-6'>
                    Price
                  </td>
                  <td className='border-b border-gray-100 '></td>
                </tr>
              </thead>
              <tbody>
                {flight.routes.map((routes) => {
                  return (
                    <tr key={uuidv4()} className='pt-5'>
                      <td className='border-b border-gray-100 py-3 pl-2'>
                        {routes.departureTime}
                      </td>
                      <td className='border-b border-gray-100 py-3 pl-2'>
                        {routes.arrivalTime}
                      </td>
                      <td className='border-b border-gray-100 hidden md:table-cell py-3 pl-2'>
                        {flight.fareClass}
                      </td>
                      <td className='border-b border-gray-100 py-3 pl-2'>
                        ${routes.priceUSD}
                      </td>
                      <td className='border-b border-gray-100 py-3'>
                        <button className='border checked:bg-blue-600 border-indigo-500 text-indigo-500 py-1 px-4 rounded'>
                          Select
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </main>
    </div>
  );
}

Search.getInitialProps = async ({ query }) => {
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

  return { results: data.data };
};
