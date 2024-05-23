export function filterItems<T extends {}>(
  items: T[],
  filterText: string,
  actualColumn?: string,
) {
  if (actualColumn) {
    return items.filter((item) => {
      return String(item[actualColumn as keyof T])
        .toLowerCase()
        .includes(filterText.toLowerCase());
    });
  }

  return items.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase()),
    ),
  );
}
