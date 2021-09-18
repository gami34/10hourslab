import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04(props) {

  console.log(props.data)

  const [loading, setLoading] = useState(false)

  return (
    <>
      {!loading ?
        (<div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">{props.displyHeader}</h2>
          </header>
          {/* Chart built with Chart.js 3 */}
          {/* Change the height attribute to adjust the chart height */}
          <BarChart data={props.chartData} width={595} height={248} />
        </div>) : (<div>Loading...</div>)
      }</>
  );
}

export default DashboardCard04;
