interface Props {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onClear,
}: Props) {
  return (
    <div className="relative w-full md:w-80">
      {/* Search Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        type="text"
        placeholder="Search posts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          h-12
          rounded-xl
          border-2
          border-zinc-200
          bg-zinc-50
          pl-12
          pr-12
          text-base
          font-semibold
          text-zinc-900
          placeholder:text-zinc-500
          shadow-sm
          transition-all
          duration-300
          outline-none
          hover:border-zinc-400
          hover:bg-white
          focus:border-black
          focus:bg-white
          focus:shadow-lg
        "
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          className="
            absolute
            right-3
            top-1/2
            flex
            h-8
            w-8
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-zinc-100
            text-zinc-500
            transition-all
            duration-200
            hover:bg-black
            hover:text-white
            active:scale-95
          "
        >
          ✕
        </button>
      )}
    </div>
  );
}