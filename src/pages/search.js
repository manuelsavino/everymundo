import Head from 'next/head';
import ResultsTable from '../components/resultsTable';
import { getFares } from '../utils/getData';
import Link from 'next/link';

export default function Search({ results, errors }) {
  return (
    <div className='container mx-auto flex justify-center py-6'>
      <Head>
        <title>Search</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className=' w-11/12 md:w-full mx-auto px-0'>
        <Link href='/'>
          <a className="inline bg-indigo-500 hover:bg-indigo-700 rounded py-2 px-5  items-center justify-center text-white mt-4 self-start'">
            Go Back
          </a>
        </Link>
        <h2 className='text-3xl text-indigo-500 my-5'>Choose Your Flight(s)</h2>
        {results && <ResultsTable results={results} />}
        {errors && (
          <p className='text-red-500'>
            Something went wrong, please try again.
          </p>
        )}
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
