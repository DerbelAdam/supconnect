function Profile() {
    return (
        <div>
            <section className="w-full overflow-hidden dark:bg-gray-900">
                <div className="flex flex-col">
                    <img
                        src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxlYXJ0aHxlbnwwfDB8fHwxNzQ2NTM0MzY3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="User Cover"
                        className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] h-[11rem]"
                    />

                    <div className="sm:w-[80%] w-[90%] mx-auto flex">
                        <img
                            src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxwZW9wbGV8ZW58MHwwfHx8MTcxMTExMTM4N3ww&ixlib=rb-4.0.3&q=80&w=1080"
                            alt="User Profile"
                            className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] w-[7rem] h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] bottom-[3rem]"
                        />

                        <h1 className="w-full text-left my-4 sm:mx-4 pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl text-xl font-serif">
                            Samuel Abera
                        </h1>
                    </div>

                    <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 -top-4">

                        <p className="w-fit text-gray-700 dark:text-gray-400 text-md">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit...
                        </p>

                        <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                            <div className="w-full flex sm:flex-row flex-col gap-2 justify-center">

                                {/* LEFT COLUMN */}
                                <div className="w-full">
                                    <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                        <div className="flex flex-col pb-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">First Name</dt>
                                            <dd className="text-lg font-semibold">Samuel</dd>
                                        </div>

                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Last Name</dt>
                                            <dd className="text-lg font-semibold">Abera</dd>
                                        </div>

                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Date Of Birth</dt>
                                            <dd className="text-lg font-semibold">14/05/1977</dd>
                                        </div>

                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Gender</dt>
                                            <dd className="text-lg font-semibold">Male</dd>
                                        </div>
                                    </dl>
                                </div>

                                {/* RIGHT COLUMN */}
                                <div className="w-full">
                                    <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                        <div className="flex flex-col pb-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Location</dt>
                                            <dd className="text-lg font-semibold">Ethiopia, Addis Ababa</dd>
                                        </div>

                                        <div className="flex flex-col pt-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone Number</dt>
                                            <dd className="text-lg font-semibold">+251913****30</dd>
                                        </div>

                                        <div className="flex flex-col pt-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                                            <dd className="text-lg font-semibold">samuel@example.com</dd>
                                        </div>

                                        <div className="flex flex-col pt-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Website</dt>
                                            <dd className="text-lg font-semibold hover:text-blue-500">
                                                <a href="https://techakim.com">https://www.teclick.com</a>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            {/* MAP */}
                            <div className="my-10 lg:w-[70%] md:h-[14rem] w-full h-[10rem]">
                                <h1 className="w-fit font-serif my-4 pb-1 pr-2 rounded-b-md border-b-4 border-blue-600 dark:border-yellow-600 dark:text-white lg:text-4xl md:text-3xl text-xl">
                                    My Location
                                </h1>

                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252230..."
                                    className="rounded-lg w-full h-full"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>

                        {/* SOCIAL LINKS */}
                        <div className="fixed right-2 bottom-20 flex flex-col rounded-sm bg-gray-200 text-gray-500 dark:bg-gray-200/80 dark:text-gray-700">
                            {/* LinkedIn */}
                            <a href="https://www.linkedin.com/in/samuel-abera-6593a2209/">
                                <div className="p-2 hover:text-blue-500">
                                    <svg className="lg:w-6 lg:h-6 w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="..." />
                                    </svg>
                                </div>
                            </a>

                            {/* Twitter */}
                            <a href="https://twitter.com/Samuel7Abera7">
                                <div className="p-2 hover:text-blue-500">
                                    <svg className="lg:w-6 lg:h-6 w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="..." />
                                    </svg>
                                </div>
                            </a>

                            {/* Facebook */}
                            <a href="#">
                                <div className="p-2 hover:text-blue-500">
                                    <svg className="lg:w-6 lg:h-6 w-4 h-4 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="..." />
                                    </svg>
                                </div>
                            </a>

                            {/* YouTube */}
                            <a href="https://www.youtube.com/@silentcoder7">
                                <div className="p-2 hover:text-red-600">
                                    <svg className="lg:w-6 lg:h-6 w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="..." />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Profile;
