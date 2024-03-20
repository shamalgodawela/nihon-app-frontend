import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { SpinnerImg } from '../../loader/Loader'; // Import loading spinner

const ProductdateList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading to true when fetching starts
        const response = await axios.get('https://nihon-inventory.onrender.com/api/dateProducts');
        setData(response.data);
        setIsLoading(false); // Set loading to false when fetching completes
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set loading to false in case of error
      }
    };
    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'GPN Date',
        accessor: 'GpnDate',
      },
      {
        Header: 'GPN Number',
        accessor: 'GpnNumber',
      },
      {
        Header: 'Product Name',
        accessor: 'productName',
      },
      {
        Header: 'Product Code',
        accessor: 'category',
      },
      {
        Header: 'Unit Price(RS/=)',
        accessor: 'unitPrice',
      },
      {
        Header: 'Number of Units',
        accessor: 'numberOfUnits',
      },
      {
        Header: 'Pack Size',
        accessor: 'packsize',
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div>
      <button type="button" className="btn btn-outline-primary" disabled><a href="/dateproduct" >Add Product</a></button>
      {isLoading ? ( // Show loading spinner if isLoading is true
        <SpinnerImg />
      ) : (
        <table {...getTableProps()} style={{ border: 'solid 1px blue', borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} style={{ background: '#f1f1f1' }}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} style={{ padding: '8px', border: 'solid 1px gray' }}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} style={{ background: row.index % 2 === 0 ? '#fff' : '#f1f1f1' }}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()} style={{ padding: '8px', border: 'solid 1px gray' }}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductdateList;
