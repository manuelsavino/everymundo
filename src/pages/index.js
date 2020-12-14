import { useState } from 'react';
import Head from 'next/head';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';
import Card from '../components/card';
import SearchModal from '../components/modal';
import { getPopularRoutes } from '../utils/getData';

export default function Home({ results, errors }) {
  const [selected, setSelected] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <div className='container mx-auto flex justify-center py-6'>
      <Head>
        <title>Flight Search</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='w-3/4 mx-atuo '>
        <h2 className='text-3xl text-indigo-500 mb-5'>Popular Routes</h2>
        {errors && (
          <p className='text-red-500'>
            Something went wrong, please try again.
          </p>
        )}
        <div className='grid xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7'>
          {results &&
            results.map((fare) => (
              <Card
                fare={fare}
                key={uuidv4()}
                toggleModal={toggleModal}
                setSelected={setSelected}
              />
            ))}
        </div>
        <SearchModal
          isOpen={isOpen}
          toggleModal={toggleModal}
          routeOptions={selected}
        />
      </main>
    </div>
  );
}

Home.getInitialProps = async () => {
  try {
    const data = await getPopularRoutes();
    return { results: data.data };
  } catch (err) {
    return { errors: 'Something went wrong' };
  }
};
