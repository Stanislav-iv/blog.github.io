import { format, parseISO } from 'date-fns'

const DateFns = (date) => format(parseISO(date), 'MMMM dd, yyyy')

export default DateFns
