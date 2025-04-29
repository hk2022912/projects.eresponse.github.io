// E-Response - Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const menuDropdownBtn = document.getElementById('menu-dropdown-btn');
    const menuDropdown = document.getElementById('menu-dropdown');
  
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
      });
    }
  
    if (menuDropdownBtn) {
      menuDropdownBtn.addEventListener('click', function(e) {
        // Prevent this click from closing the dropdown immediately via body click handler
        e.stopPropagation();
        menuDropdown.classList.toggle('show');
      });
    }
  
    // Close dropdown when clicking outside
    document.body.addEventListener('click', function() {
      if (menuDropdown && menuDropdown.classList.contains('show')) {
        menuDropdown.classList.remove('show');
      }
    });
  
    // Prevent clicks inside dropdown from closing it
    if (menuDropdown) {
      menuDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  });
  
  // Earthquake News API Function
  async function fetchEarthquakeNews() {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = "<div class='loading'>Loading earthquake data...</div>";
    
    const endpoint = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";
  
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      newsContainer.innerHTML = "";
      
      if (data.features.length === 0) {
        newsContainer.innerHTML = "<div class='loading'>No significant earthquakes reported this week.</div>";
        return;
      }
  
      data.features.forEach(eq => {
        const magnitude = eq.properties.mag;
        let magnitudeClass = 'low';
        
        if (magnitude >= 6.0) {
          magnitudeClass = 'high';
        } else if (magnitude >= 5.0) {
          magnitudeClass = 'medium';
        }
        
        const date = new Date(eq.properties.time);
        const formattedDate = date.toLocaleString();
        
        const item = document.createElement('div');
        item.className = 'news-item';
        item.innerHTML = `
          <h3>${eq.properties.title}</h3>
          <p><strong>Magnitude:</strong> <span class="magnitude ${magnitudeClass}">${magnitude}</span></p>
          <p><strong>Location:</strong> ${eq.properties.place}</p>
          <p><strong>Time:</strong> ${formattedDate}</p>
          <a href="${eq.properties.url}" target="_blank">View Details</a>
        `;
        newsContainer.appendChild(item);
      });
    } catch (error) {
      console.error("Error fetching earthquake data:", error);
      newsContainer.innerHTML = "<div class='loading'>Failed to load earthquake data. Please try again later.</div>";
    }
  }