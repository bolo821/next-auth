import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const timeFromNow = (time: string) => dayjs(time).fromNow()

export default timeFromNow
