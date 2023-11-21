import { format } from 'date-fns'

export const currentDate = () => {
  return format(new Date(), 'd MMM yyyy')
}
