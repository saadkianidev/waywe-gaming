import { useEffect, useState } from 'react';
import careerData from '../data/careerApplications.json';
import { getStoredItems, readJsonResponse, productionApiMessage } from '../utils/api';

export default function CareerData() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    fetch('/api/applications')
      .then(async (response) => {
        return readJsonResponse(response, productionApiMessage('Loading applications'));
      })
      .then((result) => {
        if (isActive) setApplications(result.applications ?? []);
      })
      .catch((requestError) => {
        if (isActive) {
          setApplications(getStoredItems('wayve:applications', careerData.applications ?? []));
          setError('');
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="min-h-screen bg-white px-4 pb-16 pt-28 text-gray-900 dark:bg-black dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-5 dark:border-gray-800">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Applications</p>
            <h1 className="font-gaming text-3xl font-bold sm:text-4xl">Career Data</h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{applications.length} submissions</p>
        </div>

        {isLoading ? (
          <p className="py-12 text-sm text-gray-500">Loading applications...</p>
        ) : error ? (
          <p role="alert" className="py-12 text-sm text-red-600 dark:text-red-400">{error}</p>
        ) : applications.length === 0 ? (
          <p className="py-12 text-sm text-gray-500 dark:text-gray-400">No career applications have been submitted.</p>
        ) : (
          <div className="overflow-x-auto border border-gray-200 dark:border-gray-800">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                <tr>
                  {['Submitted', 'Role', 'Name', 'Email', 'Location', 'Experience', 'Portfolio', 'Message'].map((heading) => (
                    <th key={heading} scope="col" className="px-4 py-3 font-semibold">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {applications.map((application) => (
                  <tr key={application.id} className="align-top">
                    <td className="whitespace-nowrap px-4 py-4 text-xs text-gray-500">{new Date(application.submittedAt).toLocaleString()}</td>
                    <td className="px-4 py-4">{application.role}</td>
                    <td className="px-4 py-4">{application.userName}</td>
                    <td className="px-4 py-4"><a className="text-primary hover:underline" href={`mailto:${application.email}`}>{application.email}</a></td>
                    <td className="px-4 py-4">{application.location}</td>
                    <td className="px-4 py-4">{application.experience}</td>
                    <td className="max-w-48 break-all px-4 py-4 text-primary">{application.portfolio || 'Not provided'}</td>
                    <td className="max-w-72 whitespace-pre-wrap px-4 py-4">{application.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
