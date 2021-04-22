import { format } from 'date-fns'



export const COLUMNS = [
{
    Header: 'Tranaction Date',
    accessor: 'creationDate',
    Cell: ({value})=>{return format(new Date(value), 'mm/dd/yyyy')}
  },
  {
    Header: 'Reference Number',
    accessor: 'txnRefNo'
  },
  {
    Header: 'Account Number',
    accessor: 'account'
  },
  {
    Header: 'Transaction Type',
    accessor: 'txnType',
    
  },
  {
    Header: 'Description',
    accessor: 'txnDesc'
  },
  {
    Header: 'Amount',
    accessor: 'amount'
  }
]