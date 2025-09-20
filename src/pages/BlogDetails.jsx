    import React from "react";
    import ActionButton from "../components/ActionButton";
    import HeroSectionBlogDetails from "../components/HeroSectionBlogDetails";
    import BlogArticle from "../components/BlogArticle";
    import RelatedDetails from "../components/RelatedDetails";
    function BlogDetails() {
        return(
            <div>
            <div>
                <ActionButton/>
            </div>
            <div>
                <HeroSectionBlogDetails/>
            </div>
            <div>
                <BlogArticle/>
            </div>
            <div>
                <RelatedDetails/>
            </div>
            </div>
        )
    }
    export default BlogDetails;