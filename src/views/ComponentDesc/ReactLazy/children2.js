import Day from 'dayjs'

function MyOrder () {
  return (<div>
    <h1>This is my orders</h1>
    <div>Today is {Day().format('YYYY-MM-DD')}</div>
  </div>)
}
export default MyOrder
