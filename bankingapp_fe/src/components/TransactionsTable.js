import React, { useMemo } from 'react'
import { useState, useEffect } from 'react';
import { Grid, Segment } from "semantic-ui-react";
import MOCK_DATA from './MOCK_DATA.json'
import { useTable, useSortBy, usePagination} from 'react-table'
import { COLUMNS } from './columns'


export const TransactionsTable = ({respData}) => {
  
  const columns = useMemo(() => COLUMNS, [])
  const data = respData
  


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow,
    gotoPage,
    pageCount,
    setPageSize
  } = useTable({
    columns,
    data,
  },
    useSortBy,
    usePagination)

  const {pageIndex, pageSize}=state
  

 
  return (
    <>
    <semantic_header><div style={{marginLeft:"30%"}}><h1>Transaction History</h1></div></semantic_header>
      <table className="content-table"{...getTableProps()}>
        <thead >
          {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                    <span>
                    {column.isSorted ? (column.isSortedDesc ? 'down' : 'up') : ''}
                    </span>
                  </th>
                ))}
                </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  }
                    )}</tr>
              )
            })
          }
          <tr>
            <td></td>
          </tr>
        </tbody>
        </table>
        <div>
        <span>
          
            Page{' '}
            <strong>
            {pageIndex+1} of {pageOptions.length } 
            </strong>
          </span>
          <span>
           {' '} | Go to page: {' '}
            <input className="existingPayments" style={{background:'#ffffff', borderRadius:"4px"}} type="number" defaultValue={pageIndex + 1} onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
              style={{width:'70px'}}/>
          </span>
          <select className="existingPayments" style={{background:'#ffffff', borderRadius:"4px"}}
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}>
            {[10, 20, 25].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                  </option>
                
              ))
  
          }
         
          </select>
          <button  className="btn" onClick={() => gotoPage(0)} disabled={!canPreviousPage}> {'<< '}</button>
        <button className="btn" onClick={()=> previousPage()} disabled={!canPreviousPage}>Previous</button>
          <button className="btn" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
          <button  className="btn" onClick={() => gotoPage(pageCount-1)} disabled={!canNextPage}> {' >>'}</button>
        </div>
      </>
    )
}

export default TransactionsTable
