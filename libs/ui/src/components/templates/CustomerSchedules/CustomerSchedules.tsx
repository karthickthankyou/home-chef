import { useSchedulesForCustomerQuery } from '@home-chefs-org/network/src/generated'
import { useTakeSkip } from '@home-chefs-org/util'
import { Pagination } from '../../molecules/Pagination'
import { Table } from '../../organisms/Table'
import { TableCell, TableHead, TableRow } from '../../organisms/Table/Table'
import { CustomerSubscriptionRow } from './components'

export interface ICustomerSchedulesProps {}

export const CustomerSchedules = () => {
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const { loading, data, error } = useSchedulesForCustomerQuery({
    variables: { skip, take },
  })

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Item</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="center">Quantity</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Days</TableCell>
          <TableCell align="right">Status</TableCell>
          <TableCell align="right">Rating</TableCell>
        </TableRow>
      </TableHead>

      {[...(data?.schedulesForCustomer || [])]
        .sort((a, b) => a.foodItem.time.localeCompare(b.foodItem.time))
        .map((schedule) => (
          <CustomerSubscriptionRow key={schedule.id} schedule={schedule} />
        ))}

      <div className="flex justify-center">
        <Pagination
          count={data?.schedulesCount.count || 0}
          page={(skip || 0) / (take || 12)}
          rowsPerPage={take || 0}
          rowsPerPageOptions={[2, 4, 12, 24, 36, 48]}
          onPageChange={(v, c) => setSkip(c * (take || 12))}
          onRowsPerPageChange={(v) => {
            setTake(+v.target.value)
          }}
        />
      </div>
    </Table>
  )
}
