"use client";
import Postit from "./Postit";
import Image from "next/image";

export default function Loading({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center mt-16">
            <Postit>
                <div className="flex justify-center">
                    <Image src={'/lab_animated.svg'} alt="Lab logo" width={128} height={128} className="mb-4" loading="eager" />
                </div>
                {children}
            </Postit>
        </div>
    );
}