import { useEffect, useState } from 'react';

export default function ContactData() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    fetch('/api/contacts')
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Unable to load contact messages.');
        return result;
      })
      .then((result) => {
        if (isActive) setContacts(result.contacts ?? []);
      })
      .catch((requestError) => {
        if (isActive) setError(requestError.message);
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
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Messages</p>
            <h1 className="font-gaming text-3xl font-bold sm:text-4xl">Contact Data</h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{contacts.length} submissions</p>
        </div>

        {isLoading ? (
          <p className="py-12 text-sm text-gray-500">Loading messages...</p>
        ) : error ? (
          <p role="alert" className="py-12 text-sm text-red-600 dark:text-red-400">{error}</p>
        ) : contacts.length === 0 ? (
          <p className="py-12 text-sm text-gray-500 dark:text-gray-400">No contact messages have been submitted.</p>
        ) : (
          <div className="overflow-x-auto border border-gray-200 dark:border-gray-800">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                <tr>
                  {['Submitted', 'Name', 'Email', 'Country', 'Phone', 'Message'].map((heading) => (
                    <th key={heading} scope="col" className="px-4 py-3 font-semibold">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="align-top">
                    <td className="whitespace-nowrap px-4 py-4 text-xs text-gray-500">{new Date(contact.submittedAt).toLocaleString()}</td>
                    <td className="px-4 py-4">{contact.name}</td>
                    <td className="px-4 py-4"><a className="text-primary hover:underline" href={`mailto:${contact.email}`}>{contact.email}</a></td>
                    <td className="px-4 py-4">{contact.country}</td>
                    <td className="px-4 py-4">{contact.phone}</td>
                    <td className="max-w-lg whitespace-pre-wrap px-4 py-4">{contact.message}</td>
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
