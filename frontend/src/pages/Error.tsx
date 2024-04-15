// import { useRouteError } from "react-router-dom";

const Error = () => {
  // const error = useRouteError();
  // console.error(error);

  return (
    <div id="error-page" className='bg-secondary text-primary font-bold h-screen w-full flex flex-col gap-9 justify-center items-center'>
        <h1 className='text-7xl'>
            Oops! Error
        </h1>
        <p className="text-[22px]">Sorry, an unexpected error has occurred. ( 500 Ethernal Server Error )</p>
        {/* <p>
            <i>{error.statusText || error.message}</i>
        </p> */}
    </div>
  )
}

export default Error