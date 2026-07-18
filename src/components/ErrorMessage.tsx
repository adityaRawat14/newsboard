interface Props{

    message:string;

    onRetry:()=>void;

}

export default function ErrorMessage({

    message,

    onRetry

}:Props){

    return(

        <div className="text-center py-20">

            <h2 className="text-red-500 mb-4">

                {message}

            </h2>

            <button

                onClick={onRetry}

                className="
                bg-slate-900 cursor-pointer
                text-white
                px-5
                py-2
                rounded-lg
                "

            >

                Retry

            </button>

        </div>

    );

}