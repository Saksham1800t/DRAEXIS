import Link from 'next/link'
import React from 'react'

function Hero() {
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl text-blue-600">
                        AI COURSE GENERATORE
                        <strong className="font-extrabold text-black sm:block"> Custom Learning Path, Powered By AI</strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                        Unlock personalized education with our AI-powered course generator. Tailored to your learning style, courses are designed to help you reach your goals.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            className="block w-full rounded-sm bg-blue-600 px-12 py-3 font-medium text-white shadow-sm hover:bg-blue-800 focus:ring-3 focus:outline-hidden sm:w-auto"
                            href="/sign-up"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero