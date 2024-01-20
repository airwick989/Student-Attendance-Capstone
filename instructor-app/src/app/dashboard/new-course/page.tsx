"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import CourseDetails from "@/app/components/new-course/CourseDetails";
import CourseList from "@/app/components/new-course/CourseList";
import CourseConfirm from "@/app/components/new-course/CourseConfirm";

export default function Page() {
    const router = useRouter();
    const [step, setStep] = useState(0);

    const formElements = [
        <CourseDetails setStep={setStep} key={0}/>,
        <CourseList setStep={setStep} key={1}/>,
        <CourseConfirm setStep={setStep} key={2}/>
    ];


    return (<>

        <div className="min-h-screen bg-base-200">
            <div className="flex flex-col items-center xl:px-96 lg:px-64 px-16">
                {formElements[step]}
            </div>
        </div>

    </>)




}