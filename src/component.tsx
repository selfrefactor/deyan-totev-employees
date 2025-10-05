import { Badge } from "./shared-components/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./shared-components/table";
import { ToggleButton } from "./shared-components/toggle-button";

export function MainApp() {
	console.log(1)
  return (
    <div>
      <h1>
				<div className='text-blue-700'>123</div>
				<ToggleButton 
					label='foo'
					checked={false}
				/>
				<Badge value="dsa" /> 
			</h1>
			<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
    </div>
  )
}
