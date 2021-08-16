import React, { Component } from 'react';
import RecommendPost from "@/components/Sidebars/RecommendPost.js";
import CategoryTab from "@/components/Sidebars/CategoryTab.js";
import RelatedPost from "@/components/Sidebars/RelatedPost.js";

const SidebarTab = () => {
    return (
        <div>
            <h6 className="text-muted">Category</h6>
            <CategoryTab/>
            <h6 className="text-muted">Related</h6>
            <RelatedPost/>
            <h6 className="text-muted">Recommend</h6>
            <RecommendPost/>
        </div>
    );
};

export default SidebarTab;
