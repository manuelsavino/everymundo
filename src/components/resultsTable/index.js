import dateFormat from 'dateformat';
import { v4 as uuidv4 } from 'uuid';
import { Arrow } from '../icons';
import { convertTime } from '../../utils/converTime';

export default function ResultsTable({ results }) {
  return results.map((flight) => (
    <div key={uuidv4()} className='w-full'>
      <h2 className='flex items-center text-2xl'>
        {flight.origin}
        <Arrow className='px-1 text-indigo-500' />
        {flight.destination}
      </h2>
      <h4>
        {flight.departureDate !== 'undefined' &&
        flight.departureDate.indexOf('/') > -1
          ? dateFormat(new Date(flight.departureDate), 'dddd, mmmm dS, yyyy')
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
            <td className='border-b border-gray-100  text-indigo-500 text-lg px-2 pt-6'>
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
                  {convertTime(routes.departureTime)}
                </td>
                <td className='border-b border-gray-100 py-3 px-0'>
                  {convertTime(routes.arrivalTime)}
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
  ));
}
