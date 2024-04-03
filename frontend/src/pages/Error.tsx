import { useRouteError } from "react-router-dom";

export const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className='bg-secondary text-primary font-bold h-screen w-full flex flex-col gap-9 justify-center items-center'>
        <h1 className='text-6xl'>
            Oops! Error
        </h1>
        <p>Sorry, an unexpected error has occurred.</p>
        {/* <p>
            <i>{error.statusText || error.message}</i>
        </p> */}
    </div>
  )
}
