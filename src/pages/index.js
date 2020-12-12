import { useState } from 'react';
import Head from 'next/head';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';

import Card from '../components/card';
import SearchForm from '../components/searchForm';
import { Close } from '../components/icons';

Modal.setAppElement('#__next');

export default function Home({ results }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({});

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '0',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: 'rgba(0,0,0,.5)',
    },
  };

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <div className='container mx-auto flex justify-center py-6'>
      <Head>
        <title>Flight Search</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='w-3/4 mx-atuo grid xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10'>
        {results.map((fare) => (
          <Card
            fare={fare}
            key={uuidv4()}
            toggleModal={toggleModal}
            setSelected={setSelected}
          />
        ))}
      </main>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel='My dialog'
        style={customStyles}
      >
        <button className='absolute top-3 right-3' onClick={toggleModal}>
          <Close />
        </button>
        <div className='max-w-4xl py-5 w-96 md:w-full px-5 md:px-10'>
          <h3 className='text-3xl mb-3 text-indigo-500'>Search For Deal</h3>

          <SearchForm selected={selected} />
        </div>
      </Modal>
    </div>
  );
}

Home.getInitialProps = async () => {
  const res = await fetch(
    'https://everymundotechnical.herokuapp.com/popularRoutes/PU0534299c'
  );
  const json = await res.json();
  return { results: json };
};