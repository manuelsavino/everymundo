import { Arrow, Caret } from '../icons';

export default function Card({ fare, toggleModal, setSelected }) {
  return (
    <div className='border flex justify-center items-center flex-col border-gray-200 rounded-lg cursor-pointer hover:shadow-md'>
      <div
        className='w-full h-44 bg-cover bg-center rounded-tr-lg rounded-tl-lg'
        style={{ backgroundImage: `url(./${fare.destination}.jpg)` }}
      />
      <div className='flex justify-start flex-col items-star w-full p-5'>
        <h5 className='flex items-center text-xl font-medium'>
          {fare.origin}
          <Arrow className='px-1 text-indigo-500' />
          {fare.destination}
        </h5>

        <p className='text-xs'>{fare.departureDate}</p>
        <div className=' border-t-2 border-indigo-500 mt-3'>
          <div className='flex flex-col  w-20 pt-2'>
            <p className='text-xs leading-none'>Fares From</p>
            <p className='text-3xl leading-none'>
              <sup className='text-base font-semibold'>$</sup>
              {fare.priceUSD}
            </p>
            <p className='text-xs leading-none capitalize'>
              {fare.tripType.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}
            </p>
          </div>
          <button
            onClick={() => {
              toggleModal();
              setSelected(fare);
            }}
            className='bg-indigo-500 hover:bg-indigo-700 rounded py-2 px-5 flex items-center justify-center text-white mt-4 self-start'
          >
            View Deal <Caret />
          </button>
        </div>
      </div>
    </div>
  );
}
