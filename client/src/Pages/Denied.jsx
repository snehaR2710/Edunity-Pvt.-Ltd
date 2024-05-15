import { useNavigate } from "react-router-dom";

export function Denied() {

    const navigate = useNavigate();

    return(
        <main className="h-screen w-full flex flex-col items-center justify-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">403</h1>
            <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">Access denied</div>
            <button onClick={() => navigate(-1)} className="mt-5">
                <span className="relative block px-8 py-3 border border-current rounded-sm bg-[#1A2238]">Go back</span>
            </button>
        </main>
    )
}