import React from 'react';

function DashboardCard07(props) {
  console.log(props.data)
  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">All Accounts within specified Date Range</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">ID</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">First Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Last Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Created At</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Updated At</div>
                </th>
              </tr>

            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100">
              {/* Row */}
              {props.data.map((obj, index) => {
                return (<tr key={index}>
                  {obj.id && <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-gray-800">{obj.id}</div>
                    </div>
                  </td>}
                  {obj.first_name && <td className="p-2">
                    <div className="text-left">{obj.first_name}</div>
                  </td>}
                  {obj.last_name && <td className="p-2">
                    <div className="text-left text-green-500">{obj.last_name}</div>
                  </td>}
                  {obj.created_at && <td className="p-2">
                    <div className="text-left">{new Date(obj.created_at).toDateString()}</div>
                  </td>}
                  {obj.type && <td className="p-2">
                    <div className="text-left text-light-blue-500">{obj.type}</div>
                  </td>}
                </tr>)
              })
              }

            </tbody>
          </table>

        </div>
      </div>
    </div >
  );
}

export default DashboardCard07;
