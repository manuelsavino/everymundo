import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

export default function SearchForm({ selected }) {
  const departDate = formatDate(selected.departureDate);
  const router = useRouter();

  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      tripType: selected.tripType,
      origin: selected.origin,
      destination: selected.destination,
      departureDate: departDate,
      returnDate: '',
      passengerCount: 1,
    },
  });

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  const tripType = watch('tripType', selected.tripType);

  const handleForm = (data) => {
    const queryString = Object.keys(data)
      .map((key) => key + '=' + data[key])
      .join('&');

    router.push(`/search?${queryString}`);
  };
  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className='flex flex-col space-y-1 md:space-y-3'
    >
      <div className='flex space-x-4'>
        <label htmlFor='RoundTrip'>
          <input
            className='mr-2'
            id='tripType'
            type='radio'
            name='tripType'
            value='roundTrip'
            ref={register}
          />
          Round Trip
        </label>
        <label htmlFor='OneWay'>
          <input
            className='mr-2'
            id='tripType'
            type='radio'
            name='tripType'
            value='oneWay'
            ref={register}
          />
          One Way
        </label>
      </div>
      <div className='flex justify-between flex-col md:flex-row space-x-0 md:space-x-5  md:px-0'>
        <div className='flex flex-col w-full md:w-1/2'>
          <label className='text-xs'>From*</label>
          <input
            name='origin'
            id='origin'
            ref={register({ required: true })}
            className={`border ${
              errors.origin ? 'border-red-500' : 'border-gray-300'
            } rounded h-10`}
            type='text'
          />
        </div>
        <div className='flex flex-col w-full md:w-1/2'>
          <label className='text-xs'>To*</label>
          <input
            name='destination'
            id='destination'
            ref={register({ required: true })}
            className={`border ${
              errors.destination ? 'border-red-500' : 'border-gray-300'
            } rounded h-10`}
            type='text'
          />
        </div>
      </div>
      <div className='flex justify-between flex-col md:flex-row space-x-0 md:space-x-5  md:px-0'>
        <div className='flex flex-col w-full md:w-1/2'>
          <label className='text-xs'>Depart*</label>
          <input
            name='departureDate'
            id='departureDate'
            ref={register({ required: true })}
            className={`border ${
              errors.departureDate ? 'border-red-500' : 'border-gray-300'
            } rounded h-10`}
            type='date'
          />
        </div>
        <div className='flex flex-col w-full md:w-1/2'>
          <label className='text-xs'>Return*</label>
          <input
            disabled={tripType === 'oneWay'}
            className={`border  ${
              errors.returnDate ? 'border-red-500' : 'border-gray-300'
            } rounded h-10`}
            name='returnDate'
            id='returnDate'
            min={watch('departureDate')}
            ref={register({ required: tripType != 'oneWay' })}
            type='date'
          />
        </div>
      </div>
      <div className='flex justify-between flex-col md:flex-row space-x-0 md:space-x-5  md:px-0'>
        <div className='flex flex-col w-full md:w-1/2'>
          <label className='text-xs'>Passenger(s)</label>
          <input
            name='passengerCount'
            id='passengerCount'
            ref={register({ required: true })}
            className='border border-gray-300 rounded h-10 w-full'
            type='number'
            min='1'
            max='9'
          />
        </div>
        <div className='flex flex-col w-full md:w-1/2'>
          <label className='text-xs'>Promo Code</label>
          <input className='border border-gray-300 rounded h-10' type='text' />
        </div>
      </div>
      <button className='bg-indigo-500 text-white self-end py-1 px-2 rounded'>
        Search Flights
      </button>
    </form>
  );
}
