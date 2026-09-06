"use client";
import {
  ArticleSidebarRoot,
  ArticleSidebarHeading,
  ArticleSidebarArticle,
} from "../../registry/blocks/article-sidebar";

export default function Example() {
  return (
    <ArticleSidebarRoot>
      <ArticleSidebarHeading />
      <ArticleSidebarArticle />
    </ArticleSidebarRoot>
  );
}
