import React from 'react';

/**
 * Reusable DataTable Component (Step 56)
 * Official government-style tabular display for patients, queue, records & staff
 */
export default function DataTable({
  columns = [],
  data = [],
  emptyMessage = 'No records found',
  className = '',
  onRowClick
}) {
  return (
    <div className={`overflow-x-auto border border-gray-200 rounded ${className}`}>
      <table className="min-w-full text-left font-sans text-sm divide-y divide-gray-200">
        <thead className="bg-gray-100/80 text-ink-950 uppercase font-serif font-bold text-xs tracking-wider">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                scope="col"
                className={`px-4 py-3 border-r last:border-r-0 border-gray-200 ${col.headerClassName || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-gray-500 italic bg-gray-50/50"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={row.id || rowIdx}
                onClick={() => onRowClick && onRowClick(row)}
                className={`transition-colors ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'} ${
                  onRowClick ? 'cursor-pointer hover:bg-gray-100/60' : ''
                }`}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className={`px-4 py-3 border-r last:border-r-0 border-gray-200 whitespace-nowrap text-ink-900 ${
                      col.cellClassName || ''
                    }`}
                  >
                    {col.render ? col.render(row, rowIdx) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
