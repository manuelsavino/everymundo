import Modal from 'react-modal';
import SearchForm from '../searchForm';
import { Close } from '../icons';

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#__next');

export default function SearchModal({ isOpen, toggleModal, routeOptions }) {
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      contentLabel='Search Modal'
      style={customStyles}
    >
      <button className='absolute top-3 right-3' onClick={toggleModal}>
        <Close />
      </button>
      <div className='max-w-4xl py-5 w-96 md:w-full px-5 md:px-10'>
        <h3 className='text-3xl mb-3 text-indigo-500'>Search For Deal</h3>

        <SearchForm selected={routeOptions} />
      </div>
    </Modal>
  );
}
