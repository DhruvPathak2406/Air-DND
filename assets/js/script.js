/* ========== Theme Toggle with Smooth Transition ========== */
const root = document.documentElement;
const toggleBtn = document.getElementById("dark-toggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  root.classList.add("dark");
  root.setAttribute('data-theme', 'dark');
} else {
  root.setAttribute('data-theme', 'light');
}

// Update toggle button icon
function updateToggleIcon() {
  if (toggleBtn) {
    toggleBtn.textContent = root.classList.contains("dark") ? "☀️" : "🌙";
  }
}

updateToggleIcon();

// Toggle theme
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    root.classList.toggle("dark");
    const newTheme = root.classList.contains("dark") ? "dark" : "light";
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem("theme", newTheme);
    updateToggleIcon();
    
    // Add ripple effect
    toggleBtn.style.transform = "scale(0.9)";
    setTimeout(() => {
      toggleBtn.style.transform = "";
    }, 150);
  });
}

/* ========== Enhanced Carousel with Auto-play & Smooth Transitions ========== */
const slides = document.getElementById("slides");
const dotsWrap = document.getElementById("dots");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
let index = 0;
let autoPlayInterval;
let isTransitioning = false;

if (slides && dotsWrap) {
  const slideElements = Array.from(slides.children);
  const count = slideElements.length;

  // Build dots
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => {
      if (!isTransitioning) {
        goToSlide(i);
        resetAutoPlay();
      }
    });
    dotsWrap.appendChild(dot);
  }

  const dots = dotsWrap.querySelectorAll(".dot");

  function goToSlide(i, direction = 0) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    const previousIndex = index;
    index = (i + count) % count;
    
    // Update transform
    slides.style.transform = `translateX(-${index * 100}%)`;
    
    // Update dots
    dots.forEach((dot, j) => {
      dot.classList.toggle("active", j === index);
    });
    
    // Animate slide content
    const currentSlide = slideElements[index];
    const heroText = currentSlide.querySelector('.hero-text');
    if (heroText) {
      heroText.style.animation = 'none';
      setTimeout(() => {
        heroText.style.animation = 'fadeInUp 1s ease both';
      }, 50);
    }
    
    setTimeout(() => {
      isTransitioning = false;
    }, 700);
  }

  function nextSlide() {
    goToSlide(index + 1, 1);
  }

  function prevSlide() {
    goToSlide(index - 1, -1);
  }

  // Control buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (!isTransitioning) {
        prevSlide();
        resetAutoPlay();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (!isTransitioning) {
        nextSlide();
        resetAutoPlay();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (slides && !isTransitioning) {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoPlay();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoPlay();
      }
    }
  });

  // Auto-play functionality
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Start auto-play
  startAutoPlay();

  // Pause on hover
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  }

  // Pause when page is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });
}

/* ========== Login Form Handler ========== */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const role = document.getElementById("role")?.value;
    const username = document.getElementById("username")?.value;
    const password = document.getElementById("password")?.value;

    if (!role || !username || !password) {
      alert("Please fill in all fields");
      return;
    }
    // Sign In form submission (Database Connected)
signinForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const role = signinRoleInput.value;
  if (!role) {
    alert('Please select your role (Landlord or Tenant)');
    return;
  }

  const formData = new FormData(signinForm);
  formData.append("role", role);

  try {
    const response = await fetch("backend/login.php", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    console.log("Server Response:", result);

    if (result.status === "success") {
      alert(`Welcome back, ${result.username}!`);
      localStorage.setItem("userRole", result.role);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", result.username);

      // Redirect to role-based dashboard
      if (result.role === "landlord") {
        window.location.href = "landlord.html";
      } else {
        window.location.href = "tenant.html";
      }
    } else {
      alert("❌ " + result.message);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("⚠️ Unable to reach server. Make sure Apache & MySQL are running in XAMPP.");
  }
});
// ✅ Real Signup Logic (Full Form + Database Connected)
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const role = signupRoleInput.value;
  if (!role) {
    alert("Please select your role (Landlord or Tenant)");
    return;
  }

  const formData = new FormData(signupForm);
  formData.append("role", role);

  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("backend/register.php", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log("Signup response:", result);

    if (result.status === "success") {
      alert("✅ " + result.message);
      localStorage.setItem("userRole", result.role);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", result.username);

      if (result.role === "landlord") {
        window.location.href = "landlord.html";
      } else {
        window.location.href = "tenant.html";
      }
    } else {
      alert("❌ " + result.message);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("⚠️ Could not reach backend/register.php — check XAMPP Apache/MySQL.");
  }
});



    // Add loading state
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Signing in...";
    submitBtn.disabled = true;

    // Simulate authentication delay
    setTimeout(() => {
      // Store user role and login status
      localStorage.setItem('userRole', role);
      localStorage.setItem('isLoggedIn', 'true');
      
      // In production, validate credentials with backend
      if (role === "landlord") {
        window.location.href = "landlord.html";
      } else if (role === "tenant") {
        window.location.href = "tenant.html";
      }
    }, 800);
  });
}

/* ========== Landlord Dashboard Data ========== */
const llCardsEl = document.getElementById("ll-props");
if (llCardsEl) {
  const properties = [
    {
      id: "101",
      address: "12 Green Park Avenue",
      city: "Surat",
      tenant: "Rahul Mehta",
      rent: 15000,
      status: "Paid",
      occupancy: 100,
      dueDate: "5 Dec 2025"
    },
    {
      id: "102",
      address: "45 MG Road",
      city: "Surat",
      tenant: "Priya Shah",
      rent: 18000,
      status: "Pending",
      occupancy: 100,
      dueDate: "3 Dec 2025"
    },
    {
      id: "103",
      address: "Skyline Tower A-2",
      city: "Surat",
      tenant: "—",
      rent: 22000,
      status: "Vacant",
      occupancy: 0,
      dueDate: "—"
    },
    {
      id: "104",
      address: "Lakeview Apartment 9B",
      city: "Surat",
      tenant: "Riya Patel",
      rent: 17000,
      status: "Paid",
      occupancy: 100,
      dueDate: "8 Dec 2025"
    },
    {
      id: "105",
      address: "City Heights 3C",
      city: "Surat",
      tenant: "—",
      rent: 19500,
      status: "Vacant",
      occupancy: 0,
      dueDate: "—"
    },
    {
      id: "106",
      address: "Riverside Complex B-7",
      city: "Surat",
      tenant: "Amit Kumar",
      rent: 16000,
      status: "Paid",
      occupancy: 100,
      dueDate: "10 Dec 2025"
    }
  ];

  // Calculate statistics
  const totalProps = properties.length;
  const rented = properties.filter(p => p.occupancy === 100).length;
  const pending = properties.filter(p => p.status === "Pending").length;
  const openReq = 3; // Mock maintenance requests

  // Update stats with animation
  const animateNumber = (elementId, targetValue) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let current = 0;
    const increment = targetValue / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        element.textContent = targetValue;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 30);
  };

  // Animate stats on page load
  setTimeout(() => {
    animateNumber("ll-total-props", totalProps);
    animateNumber("ll-rented", rented);
    animateNumber("ll-pending", pending);
    animateNumber("ll-requests", openReq);
  }, 300);

  // Render property cards with staggered animation
  llCardsEl.innerHTML = properties.map((prop, idx) => {
    const statusClass = prop.status === "Paid" ? "success" : 
                       prop.status === "Pending" ? "warning" : "muted";
    
    return `
      <article class="card" style="animation-delay: ${idx * 0.1}s">
        <h3>${prop.address}</h3>
        <p class="muted">${prop.city} • ID: ${prop.id}</p>
        <div class="bar">
          <span style="width: 0%" data-width="${prop.occupancy}"></span>
        </div>
        <p><strong>Tenant:</strong> ${prop.tenant}</p>
        <p><strong>Monthly Rent:</strong> ₹${prop.rent.toLocaleString()}</p>
        <p><strong>Status:</strong> <span style="color: var(--${statusClass}); font-weight: 600">${prop.status}</span></p>
        ${prop.dueDate !== "—" ? `<p><strong>Due Date:</strong> ${prop.dueDate}</p>` : ""}
        <div class="row">
          <button class="btn" onclick="viewProperty('${prop.id}')">View</button>
          <button class="btn" onclick="editProperty('${prop.id}')">Edit</button>
          <button class="btn" onclick="maintenanceProperty('${prop.id}')">Maintenance</button>
        </div>
      </article>
    `;
  }).join("");

  // Animate occupancy bars
  setTimeout(() => {
    const bars = llCardsEl.querySelectorAll('.bar span');
    bars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = `${width}%`;
    });
  }, 500);
}

// Property action handlers
window.viewProperty = (id) => {
  alert(`Viewing details for property ${id}\n\nThis would open a detailed view in production.`);
};

window.editProperty = (id) => {
  alert(`Editing property ${id}\n\nThis would open an edit form in production.`);
};

window.maintenanceProperty = (id) => {
  alert(`Viewing maintenance requests for property ${id}\n\nThis would show all maintenance history in production.`);
};

/* ========== Tenant Dashboard Data - Only if cards don't exist ========== */
// This will only run if the inline script hasn't already created the cards
const tnCardsEl = document.getElementById("tn-cards");
if (tnCardsEl && tnCardsEl.children.length === 0) {
  const tenantData = [
    {
      title: "Next Rent Payment",
      desc: "₹15,000 due by 5 December 2025",
      icon: "💰",
      cta: "Pay Now",
      action: "payRent"
    },
    {
      title: "Lease Agreement",
      desc: "Lease ID: L-201 • Expires 30 June 2026",
      icon: "📄",
      cta: "View Lease",
      action: "viewLease"
    },
    {
      title: "Maintenance Requests",
      desc: "2 total requests (1 open, 1 resolved)",
      icon: "🔧",
      cta: "View Requests",
      action: "viewMaintenance"
    },
    {
      title: "Payment History",
      desc: "Download receipts and transaction history",
      icon: "📊",
      cta: "View Receipts",
      action: "viewReceipts"
    }
  ];

  tnCardsEl.innerHTML = tenantData.map((item, idx) => `
    <article class="card" style="animation-delay: ${idx * 0.1}s">
      <div style="font-size: 2.5rem; margin-bottom: 12px">${item.icon}</div>
      <h3>${item.title}</h3>
      <p class="muted">${item.desc}</p>
      <div class="row">
        <button class="btn" onclick="${item.action}()">${item.cta}</button>
      </div>
    </article>
  `).join("");
}
/* ========== Payment Modal Handler ========== */
const paymentModal = document.getElementById("payment-modal");
const payRentBtn = document.querySelector(".btn:nth-child(1)");
const closePaymentModal = document.getElementById("closePaymentModal");

if (payRentBtn && paymentModal && closePaymentModal) {
  payRentBtn.addEventListener("click", () => paymentModal.showModal());
  closePaymentModal.addEventListener("click", () => paymentModal.close());
}

/* ========== Payment Form Submission ========== */
const paymentForm = document.getElementById("paymentForm");
if (paymentForm) {
  paymentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(paymentForm);

    try {
      const response = await fetch("backend/payment_portal.php", {
        method: "POST",
        body: formData
      });
      const result = await response.json();

      if (result.status === "success") {
        alert("✅ Payment successful!");
        paymentModal.close();
        paymentForm.reset();
      } else {
        alert("❌ " + result.message);
      }
    } catch (err) {
      alert("⚠️ Error processing payment.");
      console.error(err);
    }
  });
}

/* ========== Tenant Dashboard Actions ========== */

// ✅ Fetch and Display Payment History
async function viewPaymentHistory() {
  try {
    const response = await fetch("backend/payment_history.php");
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      alert("No payment history found.");
      return;
    }

    let msg = "💳 Payment History:\n\n";
    data.forEach(p => {
      msg += `• ₹${p.amount} — ${p.status} on ${new Date(p.payment_date).toLocaleDateString()}\n`;
    });

    alert(msg);
  } catch (err) {
    console.error(err);
    alert("Error fetching payment history.");
  }
}

// ✅ Fetch and Display Lease Details
async function viewLease() {
  try {
    const response = await fetch("backend/fetch_lease_details.php");
    const data = await response.json();

    if (data.error) {
      alert("No lease data found for this tenant.");
      return;
    }

    alert(`🏠 Lease Details:\n\nProperty: ${data.address}, ${data.city}\nStart: ${data.start_date}\nEnd: ${data.end_date}\nRent Due: ${data.rent_due_date}\nDeposit: ₹${data.deposit_amount}`);
  } catch (err) {
    console.error(err);
    alert("Error fetching lease details.");
  }
}

// ✅ Pay Rent (modal or redirect fallback)
function payRent() {
  if (paymentModal) {
    paymentModal.showModal();
  } else {
    alert("Payment portal opening...");
    window.location.href = "backend/payment_portal.php";
  }
}

/* ========== Maintenance Modal Handler (Enhanced) ========== */
const modal = document.getElementById("maint-modal");
const openMaintBtn = document.getElementById("open-maint");
const maintForm = document.getElementById("maintForm");

if (openMaintBtn && modal) {
  openMaintBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.showModal();
  });
}

if (maintForm && modal) {
  maintForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const property = document.getElementById("m-prop")?.value;
    const description = document.getElementById("m-desc")?.value;
    const priority = document.getElementById("m-priority")?.value;

    if (!property || !description) {
      alert("⚠️ Please fill in all required fields!");
      return;
    }

    modal.close();

    setTimeout(() => {
      alert(`✅ Maintenance Request Submitted Successfully!\n\nProperty: ${property}\nPriority: ${priority ? priority.toUpperCase() : 'MEDIUM'}\n\nYou will receive updates via email within 24-48 hours.`);
      maintForm.reset();
    }, 300);
  });

  modal.addEventListener("click", (e) => {
    const modalCard = modal.querySelector('.modal-card');
    if (modalCard && !modalCard.contains(e.target)) {
      modal.close();
      maintForm.reset();
    }
  });
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-ghost') && modal && modal.open) {
    e.preventDefault();
    modal.close();
    if (maintForm) maintForm.reset();
  }
});

/* ========== Contact Form Handler ========== */
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("✅ Message sent successfully!\n\nWe'll get back to you within 24 hours.");
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

/* ========== Dynamic Navigation Based on User Role ========== */
document.addEventListener('DOMContentLoaded', () => {
  const userRole = localStorage.getItem('userRole');
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const nav = document.getElementById('mainNav');

  if (isLoggedIn && userRole && nav) {
    const links = nav.querySelectorAll('.nav-link');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === 'landlord.html' || href === 'tenant.html') {
        link.remove();
      }
    });

    const dashboardLink = document.createElement('a');
    dashboardLink.className = 'nav-link';
    dashboardLink.href = userRole === 'landlord' ? 'landlord.html' : 'tenant.html';
    dashboardLink.innerHTML = `<span>${userRole === 'landlord' ? 'My Properties' : 'My Dashboard'}</span>`;

    const logoutBtn = document.createElement('a');
    logoutBtn.className = 'nav-link';
    logoutBtn.href = '#';
    logoutBtn.innerHTML = '<span>Logout</span>';
    logoutBtn.onclick = (e) => {
      e.preventDefault();
      localStorage.clear();
      window.location.href = 'login.html';
    };

    const toggleBtn = nav.querySelector('.toggle');
    if (toggleBtn) {
      nav.insertBefore(dashboardLink, toggleBtn);
      nav.insertBefore(logoutBtn, toggleBtn);
    }
  }
});

/* ========== Preselected Role from Home Page ========== */
window.goToLoginAs = function (role) {
  localStorage.setItem('preselectedRole', role);
  window.location.href = 'login.html';
  return false;
}

/* ========== Smooth Scroll for Anchor Links ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

/* ========== Add Loading Animation ========== */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 50);
});

/* ========== Intersection Observer for Scroll Animations ========== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

setTimeout(() => {
  document.querySelectorAll('.card, .feature-card, .highlight, .panel').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}, 100);
