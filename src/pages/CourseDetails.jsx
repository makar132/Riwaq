import React from "react";
import HeroSectionCourseDetails from "../components/HeroSectionCourse";
import CombainDetails from "../components/CombainDetails";
import CourseMarketingArticles from "../components/CourseMarketingArticles";
import PhysicalClassRoom from "../components/PhysicalClassRoom";
import EducationDetails from "../components/EducationDetails";

function CourseDetails() {
    return (
        <div>
            <div>
                <HeroSectionCourseDetails/>
            </div>
            <div>
                <CombainDetails />
            </div>
            <div>
                <CourseMarketingArticles />
            </div>
            <div>
                <PhysicalClassRoom />
            </div>
            <div>
                <EducationDetails />
            </div>
        </div>
    )
}
export default CourseDetails;