---
title: Home Page
templateKey: page
content:
  - backgroundimage: /assets/front-page-1.jpg
    sectionid: hero
    sectiontitle: My Hero Section
    sectionvalue:
      - markdown: My simple hero section markdown
        type: markdown
    type: section
  - backgroundcolor: '#C3FCF2'
    sectionid: recentposts
    sectiontitle: Recent Blog Posts
    sectionvalue:
      - markdown: My simple markdown in same section
        type: markdown
      - entitytype: blog
        limit: '2'
        type: entitylist
    type: section
---

