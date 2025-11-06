// Course Cost Calculator
document.addEventListener('DOMContentLoaded', function() {
    const courseSelect = document.getElementById('course-select');
    const studentCount = document.getElementById('student-count');
    const totalCost = document.getElementById('total-cost');
    
    if (courseSelect && studentCount && totalCost) {
        function calculateTotal() {
            const coursePrice = parseFloat(courseSelect.value) || 0;
            const students = parseInt(studentCount.value) || 0;
            
            if (coursePrice > 0 && students > 0) {
                const total = coursePrice * students;
                totalCost.textContent = `R${total.toFixed(2)}`;
            } else {
                totalCost.textContent = 'R0.00';
            }
        }
        
        courseSelect.addEventListener('change', calculateTotal);
        studentCount.addEventListener('input', calculateTotal);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without refreshing
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
    
    // Highlight active navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // Animation for stats counting
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const stats = document.querySelectorAll('.stat h3');
        let counted = false;
        
        function countStats() {
            if (counted) return;
            
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 20);
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        stat.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(count) + '+';
                    }
                }, 20);
            });
            
            counted = true;
        }
        
        // Intersection Observer to trigger counting when stats section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    countStats();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
});