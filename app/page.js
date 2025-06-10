import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Progress Trackers
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/day_tracker"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Daily Progress
          </Link>
          <Link
            href="/month_tracker"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Monthly Progress
          </Link>
          <Link
            href="/year_tracker"
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Yearly Progress
          </Link>
          <Link
            href="/deadline"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
          >
            Deadline Tracker
          </Link>
        </div>
      </div>
    </div>
  );
}
