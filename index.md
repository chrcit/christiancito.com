---
layout: default
---


<div class="index-cols clearfix">
  <div class='index-col'>
    <h1>Reviews & Summaries</h1>
    <ul class="clearfix">
    {% for post in site.posts %}
        <li>
          <a href="{{ post.url }}">{{ post.title }}</a>
        </li>
    {% endfor %}
    </ul>
  </div>
  <div class='index-col'>
    <h1>Essays</h1>
    <ul class="clearfix">
    {% for post in site.posts %}
        <li>
          <a href="{{ post.url }}">{{ post.title }}</a>
        </li>
    {% endfor %}
    </ul>
  </div>
  <div class='index-col'>
    <h1>Case Studies</h1>
    <ul class="clearfix">
    {% for post in site.posts %}
        <li>
          <a href="{{ post.url }}">{{ post.title }}</a>
        </li>
    {% endfor %}
    </ul>
  </div>
</div>

<!--
You can use HTML elements in Markdown, such as the comment element, and they won't be affected by a markdown parser. However, if you create an HTML element in your markdown file, you cannot use markdown syntax within that element's contents.
-->
