import type { SortKey } from "../types/repo";

type SortDropdownProps = {
  value: SortKey;
  onChange: (value: SortKey) => void;
};

export function SortDropdown({
  value,
  onChange,
}: SortDropdownProps) {
  return (
    <div className="sort-wrapper">
      <label htmlFor="sort">Sort by</label>

      <select
        id="sort"
        value={value}
        onChange={(event) =>
          onChange(event.target.value as SortKey)
        }
      >
        <option value="stars">Most Stars</option>
        <option value="recent">Recently Updated</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}