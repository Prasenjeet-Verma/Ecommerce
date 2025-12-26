
  function toggleFav(icon) {
    const isActive = icon.classList.toggle("active");

    if (isActive) {
      console.log("Added to favourites ❤️");
    } else {
      console.log("Removed from favourites 🤍");
    }
  }

