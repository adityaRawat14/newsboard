import { useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="text-4xl font-bold">
        Post Details
      </h2>

      <p className="mt-4 text-gray-500">
        Selected Post ID: {id}
      </p>
    </div>
  );
}