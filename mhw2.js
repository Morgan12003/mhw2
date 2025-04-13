document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const navBottom = document.querySelector('.nav_botton');
    
    menuIcon.addEventListener('click', function() {
        navBottom.classList.toggle('show');
    });

    const watchItems = document.querySelectorAll('#details div');
    watchItems.forEach(item => {
        const watchName = item.querySelector('h1').textContent;
        item.setAttribute('data-id', watchName.toLowerCase().replace(' ', '-'));
        
        const favButton = document.createElement('button');
        favButton.textContent = '<3';
        favButton.className = 'fav-btn';
        item.appendChild(favButton);
        
        favButton.addEventListener('click', function(e) {
            e.stopPropagation();
            item.classList.toggle('favorite');
            favButton.textContent = item.classList.contains('favorite') ? '<3 Added' : '<3';
        });
    });

    watchItems.forEach(item => {
        item.addEventListener('click', function() {
            const details = this.querySelector('.watch-details');
            if (details) {
                details.remove();
            } else {
                const watchId = this.getAttribute('data-id');
                const detailsDiv = document.createElement('div');
                detailsDiv.className = 'watch-details';
                detailsDiv.innerHTML = `<p>Details about</p>`;
                this.appendChild(detailsDiv);
            }
        });
    });

    const historicalItems = document.querySelectorAll('.grid-item');
    historicalItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const originalSrc = img.src;
        
        // Usa attributo data per memorizzare sorgenti alternative
        item.setAttribute('data-alt-src', 
            index % 2 === 0 
                ? 'https://sturmanskie.com/upload/resize_cache/uf/3ba/1020_1020_1/3baf7b512a4a4b29aa7b8367d7dd1ab5.png'
                : 'https://sturmanskie.com/upload/resize_cache/uf/3ba/1020_1020_1/3baf7b512a4a4b29aa7b8367d7dd1ab5.png'
        );
        
        item.addEventListener('mouseenter', function() {
            img.src = this.getAttribute('data-alt-src');
        });
        
        item.addEventListener('mouseleave', function() {
            img.src = originalSrc;
        });
    });

    // 5. Aggiunta sezione blog dinamica
    const blogSection = document.createElement('div');
    blogSection.className = 'blog-posts';
    
    const blogData = [
        { title: 'The History of Sturmanskie', excerpt: 'Discover the rich heritage...', content: 'Full article about Sturmanskie history...' },
        { title: 'Yuri Gagarin and His Watch', excerpt: 'Learn about the first watch in space...', content: 'Full article about Gagarin\'s watch...' },
        { title: 'Modern Collections', excerpt: 'Explore our latest designs...', content: 'Full article about modern collections...' }
    ];
    
    blogData.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <button class="read-more">Read More</button>
            <div class="full-content" style="display:none;">${post.content}</div>
        `;
        blogSection.appendChild(postElement);
    });
    
    const section = document.querySelector('section');
    const lastH1 = section.querySelector('h1:last-of-type');
    section.insertBefore(blogSection, lastH1.nextSibling);
    
    //"Read More"
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('read-more')) {
            const fullContent = e.target.nextElementSibling;
            fullContent.style.display = fullContent.style.display === 'none' ? 'block' : 'none';
            e.target.textContent = fullContent.style.display === 'none' ? 'Read More' : 'Read Less';
        }
    });
});