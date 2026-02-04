document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".repo-card");
  if (!cards.length) return;

  const starFormatter = new Intl.NumberFormat("en", { notation: "compact" });
  const dateFormatter = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const updateCard = (card, data) => {
    const description = card.querySelector(".repo-card__desc");
    if (description) {
      description.textContent = data.description || "No description available yet.";
    }

    const stars = card.querySelector(".repo-card__stars");
    if (stars) {
      stars.textContent = starFormatter.format(data.stargazers_count || 0);
    }

    const language = card.querySelector(".repo-card__lang");
    if (language) {
      language.textContent = data.language || "N/A";
    }

    const updated = card.querySelector(".repo-card__updated");
    if (updated) {
      const updatedAt = data.pushed_at || data.updated_at;
      updated.textContent = updatedAt ? dateFormatter.format(new Date(updatedAt)) : "N/A";
    }

    if (data.html_url) {
      card.setAttribute("href", data.html_url);
    }

    card.dataset.loaded = "true";
  };

  const fetchRepo = async (fullName) => {
    const response = await fetch(`https://api.github.com/repos/${fullName}`, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return response.json();
  };

  cards.forEach((card) => {
    const repo = card.dataset.repo;
    if (!repo) return;

    fetchRepo(repo)
      .then((data) => updateCard(card, data))
      .catch(() => {
        card.dataset.loaded = "false";
      });
  });
});
