   import React from "react";
    import ActionButton from "../components/ActionButton";
    import HeroSectionBlog from "../components/HeroSectionBlog";
    import HeroCategoryList from "../components/ReadingBlog";
    import RelatedBlog from "../components/RelatedBlog";
    import Marketing from "../components/Marketing";
   
   
   function BlogPage() {
        return(
            <div>
            <div>
                <HeroSectionBlog />
            </div>
            <div>
              <HeroCategoryList />
                </div>
                <div>
                  <RelatedBlog/>
                </div>
                <div>
                  <Marketing/>
                </div>
            </div>
        
            
        ) 
    }
    export default BlogPage;
