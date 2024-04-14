
const Loading = () => {
  return (
    <div className='bg-primary h-screen w-full grid place-items-center'>
        <div className='flex gap-5'>
            <span className="loading loading-ring loading-lg"></span>
            <span className="loading loading-ring loading-lg"></span>
            <span className="loading loading-ring loading-lg"></span>
            <span className="loading loading-ring loading-lg"></span>
            <span className="loading loading-ring loading-lg"></span>
        </div>
    </div>
  )
}

export default Loading