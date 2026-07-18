export type SortOption =
  | "default"
  | "title-asc"
  | "title-desc"
  | "likes-desc"
  | "likes-asc";

interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative w-56">
      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value as SortOption)
        }
        className="
          w-full
          h-12
          appearance-none
          rounded-xl
          border-2
          border-zinc-200
          bg-zinc-50
          px-4
          pr-11
          text-base
          font-semibold
          text-zinc-900
          shadow-sm
          transition-all
          duration-300
          outline-none
          cursor-pointer
          hover:border-zinc-400
          hover:bg-white
          focus:border-black
          focus:bg-white
          focus:shadow-lg
        "
      >
        <option value="default">Default</option>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
        <option value="likes-desc">Likes High → Low</option>
        <option value="likes-asc">Likes Low → High</option>
      </select>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="
          pointer-events-none
          absolute
          right-4
          top-1/2
          h-5
          w-5
          -translate-y-1/2
          text-zinc-500
          transition-colors
          duration-200
        "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}