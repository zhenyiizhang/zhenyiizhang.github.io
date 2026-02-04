---
layout: page
permalink: /repositories/
title: Repositories
description: 
nav: true
nav_order: 4
---

{% if site.data.repositories.github_repos %}

<div class="repositories-page">
  <div class="repos-hero">
    <div class="repos-hero__eyebrow">Research Code Collection</div>
    <h2 class="repos-hero__title">Code Repositories</h2>
    <p class="repos-hero__subtitle">A curated list of implementations and experiment configurations for our publications and projects. Click a card to open the GitHub repository.</p>
    <div class="repos-hero__meta">
      <span>{{ site.data.repositories.github_repos | size }} repositories</span>
      <span>Updated regularly</span>
    </div>
  </div>

  <h2 class="repos-section-title">GitHub Repositories</h2>
  <div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% for repo in site.data.repositories.github_repos %}
      {% include repository/repo.liquid repository=repo index=forloop.index0 %}
    {% endfor %}
  </div>
</div>

<script defer src="{{ '/assets/js/repositories.js' | relative_url | bust_file_cache }}"></script>
{% endif %}
