export function downloadText(filename: string, text: string, mime = "text/plain;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([text], { type: mime }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function downloadCSV(filename: string, rows: Array<Array<string | number | boolean | null | undefined>>) {
  const csv = rows
    .map((row) =>
      row
        .map((value) => {
          const text = String(value ?? "");
          return `"${text.replaceAll("\"", "\"\"")}"`;
        })
        .join(","),
    )
    .join("\n");
  downloadText(filename, csv, "text/csv;charset=utf-8");
}
