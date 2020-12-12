import Head from 'next/head';
import ResultsTable from '../components/resultsTable';
import { getFares } from '../utils/getData';

export default function Search({ results, errors }) {
  return (
    <div className='container mx-auto flex justify-center py-6'>
      <Head>
        <title>Search</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className=' w-11/12 md:w-full mx-auto px-5'>
        <h2 className='text-3xl text-indigo-500 mb-5'>Choose Your Flight(s)</h2>
        {results && <ResultsTable results={results} />}
        {console.log(errors)}
        {errors && <p>Something went wrong</p>}
      </main>
    </div>
  );
}

Search.getInitialProps = async ({ query }) => {
  try {
    const data = await getFares(query);
    return { results: data.data };
  } catch (err) {
    return { error: 'Something went wrong' };
  }
};
