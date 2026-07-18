export default function ErrorMessage({
  message,
  retry,
}: {
  message: string;
  retry: () => void;
}) {
  return (
    <div className="text-center py-16">
      <p className="text-red-500 mb-5">{message}</p>

      <button
        onClick={retry}
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Retry
      </button>
    </div>
  );
}
