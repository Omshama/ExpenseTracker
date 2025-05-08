import React from 'react';

const CustomLegend = ({ payload }) => {
  if (!payload || !payload.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2 justify-center space-x-6">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm text-gray-700 font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
