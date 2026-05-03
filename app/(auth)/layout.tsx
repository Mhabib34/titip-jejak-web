export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Mobile layout: orange header + white rounded card */}
            <div className="min-h-screen lg:hidden flex flex-col bg-orange-500">
                {/* Orange header area */}
                <div className="pt-10 pb-20 flex flex-col items-center relative overflow-hidden px-5">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-[-40px] right-[-40px] w-52 h-52 rounded-full bg-white" />
                        <div className="absolute bottom-0 left-[-30px] w-36 h-36 rounded-full bg-white" />
                    </div>
                    {/* People icon */}
                    <div className="relative z-10 mb-3">
                        <svg width="52" height="52" viewBox="0 0 24 24" fill="white" opacity="0.9">
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                        </svg>
                    </div>
                    <h1 className="relative z-10 text-white font-bold text-3xl tracking-tight">TemuKan</h1>
                    <p className="relative z-10 text-orange-100 text-sm mt-1.5">Bersama, kita temukan</p>
                </div>

                {/* White card */}
                <div className="flex-1 bg-white rounded-t-3xl -mt-8 relative z-10 px-5 pt-8 pb-6 flex flex-col shadow-2xl">
                    {children}
                    <footer className="mt-auto pt-8 text-center text-xs text-stone-400">
                        Dengan melanjutkan, kamu menyetujui{" "}
                        <a href="/syarat" className="underline underline-offset-2 hover:text-stone-600">Syarat Penggunaan</a>
                        {" "}dan{" "}
                        <a href="/privasi" className="underline underline-offset-2 hover:text-stone-600">Kebijakan Privasi</a>
                    </footer>
                </div>
            </div>

            {/* Desktop layout: full width, each page renders its own split-screen */}
            <div className="hidden lg:block min-h-screen">
                {children}
            </div>
        </>
    );
}