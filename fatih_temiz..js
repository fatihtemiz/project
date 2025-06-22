(() => {
    // Homepage kontrolü - sadece anasayfada ve test.html'de çalışsın
    const path = window.location.pathname;
    if (path !== '/' && path !== '/test.html') {
        console.log('wrong page');
        return;
    }

    // Veri URL'si
    const PRODUCTS_URL =
        'https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json';

    // Ürünleri getir - önce localStorage'a bak, yoksa dosyadan çek
    async function getProducts() {
        const cached = localStorage.getItem('products');
        if (cached) {
            return JSON.parse(cached);
        }

        const response = await fetch(PRODUCTS_URL);
        const products = await response.json();
        localStorage.setItem('products', JSON.stringify(products));
        return products;
    }

    // Favorileri yönet
    function getFavorites() {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    }

    function saveFavorites(favorites) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    function toggleFavorite(productId) {
        const favorites = getFavorites();
        const index = favorites.indexOf(productId);

        if (index > -1) {
            favorites.splice(index, 1); // Favorilerden çıkar
        } else {
            favorites.push(productId); // Favorilere ekle
        }

        saveFavorites(favorites);
        return favorites;
    }

    // CSS'i oluştur
    const buildCSS = () => {
        const css = `
      @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
      

      body, html {
        overflow-x: hidden;
      }

      /* 480px - mobile  */

@media (max-width: 575px) {

    .carousel-title {
      font-size: 2.5rem !important;
      line-height: 2.7rem !important;
    }

    .carousel-wrapper {
        margin: 0px auto 0 auto !important;
      }

      .carousel-container {
        padding: 16px 0 20px 0 !important;
        max-width: 380px !important;
        margin: 0 auto !important;
        border-radius: 0 0 16px 16px !important;
        overflow-x: auto !important;
        overflow-y: hidden !important;

      }

      .carousel-track {
        gap: 12px !important;
        width: max-content !important;
        min-width: 100% !important;
        overflow-x: auto !important;
        overflow-y: hidden !important;
        margin: 0 !important;
        justify-content: flex-start !important;
        scroll-behavior: smooth !important;
        -webkit-overflow-scrolling: touch !important;
      }

      .carousel-card {
        min-width: 180px !important;
        max-width: 180px !important;
        flex: 0 0 180px !important;
        flex-shrink: 0 !important;
        border-radius: 8px !important;
        padding: 3rem !important;
      }

      .carousel-card img {
        width: 120px !important;
        height: 120px !important;
        margin-bottom: 6px !important;
      }

      .product-title {
        font-size: 9px !important;
        line-height: 11px !important;
        margin-bottom: 3px !important;
      }

      span.discount {
        font-size: 1.2rem !important;
        line-height: 1.6rem !important;
      }

      .add-to-cart {
        margin-top: 8px !important;
        padding: 6px 16px !important;
        font-size: 10px !important;
        line-height: 14px !important;
        border-radius: 20px !important;
      }
  }

/* 576px - tablet small */

@media (min-width: 576px) {

    .carousel-wrapper {
        width: 540px !important;
      }

      .carousel-container {
        padding: 20px 0 28px 0 !important;
        width: 540px !important;
        border-radius: 0 0 24px 24px !important;
        overflow: hidden !important;
      }

      .carousel-title {
        font-size: 2.7rem !important;
        line-height: 2.9rem !important;
      }

      .carousel-track {
        gap: 12px !important;
        width: 540px !important;
        overflow: hidden !important;
        margin: 0 !important;
        justify-content: flex-start !important;
      }

      .carousel-card {
        min-width: 264px !important;
        max-width: 264px !important;
        flex: 0 0 264px !important;
        flex-shrink: 0 !important;
        border-radius: 10px !important;
      }

         .carousel-card img {
        width: 170px !important;
        height: 170px !important;
      }

      .banner-title {
        width: 540px !important;
        margin: 24px auto 0 auto !important;
        border-top-left-radius: 35px !important;
        border-top-right-radius: 35px !important;
      }

        .carousel-arrow {
        display: flex !important;
        width: 36px !important;
        height: 36px !important;
      }
  }

  /* 768px - tablet */

@media (min-width: 768px) {
    .banner-title {
      width: 720px !important;
    }

      .carousel-wrapper {
        width: 720px !important;
      }

      .carousel-container {
        width: 720px !important;
      }

      .carousel-track {
        gap: 12px !important;
        width: 720px !important;
      }

      .carousel-card {
        min-width: 354px !important;
        max-width: 354px !important;
        flex: 0 0 354px !important;
      }

      .carousel-card img {
        width: 170px !important;
        height: 170px !important;
        margin-bottom: 8px !important;
      }

      .carousel-arrow {
        display: flex !important;
        width: 36px !important;
        height: 36px !important;
      }
  }

  /* 992px - desktop */

@media (min-width: 992px) {
    .banner-title {
      width: 960px !important;
    }

      .carousel-wrapper {
        width: 960px !important;
      }

      .carousel-container {
        width: 960px !important;
      }

      .carousel-container {
        width: 960px !important;
      }

      .carousel-track {
        width: 960px !important;
      }

      .carousel-card {
        min-width: 312px !important;
        max-width: 312px !important;
        flex: 0 0 312px !important;
        padding: 4rem !important;
      }

      .carousel-card img {
        width: 200px !important;
        height: 200px !important;
        margin-bottom: 12px !important;
      }

  }


/* 1280px - desktop large */

@media (min-width: 1280px) {
    .banner-title {
      width: 1180px !important;
    }


      .carousel-wrapper {
        width: 1180px !important;
      }

      .carousel-container {
        padding: 24px 0 32px 0 !important;
        width: 1180px !important;
      }

      .carousel-track {
        gap: 16px !important;
        width: 1180px !important;
      }

      .carousel-card {
        min-width: 283px !important;
        max-width: 283px !important;
        flex: 0 0 283px !important;
        padding: 4rem !important;
        }
  }


/* responsive end */

      
      .banner-title {
        background: #FEF7EB;
        padding: 3rem 6rem;
        margin: 16px auto 0 auto;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        box-sizing: border-box;
      }
      
      
      .carousel-title {
        font-family: 'Quicksand', sans-serif;
        font-weight: bold;
        font-size: 3rem;
        line-height: 22px;
        color: #F28E00;
        margin: 0;
      }
      
      .carousel-wrapper {
        margin: 0 auto;
        position: relative;
        max-width: 1180px;
      }
     
      .main-carousel-wrapper {
        max-width: 100%;
        margin: 50px auto;
        z-index: -1; // ebebek'in 'Başa Dön' butonunu ezmemesi için
      }
      
      .carousel-container {
        background: #fff;
        border-radius: 0 0 16px 16px;
        box-shadow: 0 2px 16px #0001;
        padding: 16px 0 20px 0;
        box-sizing: border-box;
      }
      

        .carousel-track {
            display: flex;
            gap: 12px;
            overflow-x: auto;
            scroll-behavior: smooth;
            align-items: stretch;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }
 
        .carousel-track::-webkit-scrollbar {
            display: none;
        }
                            .carousel-card {
        background: #fff;
        border: 1px solid #ededed;
        border-radius: 8px;
        min-width: 140px;
        max-width: 140px;
        flex: 0 0 140px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding: 4rem;
        box-sizing: border-box;
      }
      
 
       .carousel-card:hover {
         box-shadow: 0 0 0 0 #00000030,
         inset 0 0 0 3px #f28e00;
         cursor: pointer;
       }

        .fav-btn {
            position: absolute;
            top: 12px;
            right: 12px;
            background: none;
            border: none;
        }
        .fav-btn svg {
            width: 28px;
            height: 28px;
            fill: #fff;
            stroke: #ffb84d;
            stroke-width: 2px;
        }
        .fav-btn.filled svg {
            fill: #ffb84d;
        }
        .carousel-card img {
            width: 100px;
            height: 100px;
            object-fit: contain;
            margin-bottom: 6px;
        }
  
        .product-title {
        font-family: 'Poppins', sans-serif;
        font-size: 1.2rem;
        line-height: 1.6rem;
        color: #7d7d7d;
        margin-bottom: 3px;
        text-align: left;
      }
      
  
      .product-title .brand {
        font-weight: bold;
      }
      .product-title .name {
        font-weight: 500;
      }
      .product-price {
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        margin-bottom: 3px;
        text-align: left;
        width: 100%;
        min-height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
  
      .product-price .price-top {
        margin-bottom: 4px;
      }
      .product-price .original {
        text-decoration: line-through;
        color: #888;
        font-size: 13px;
        font-weight: 500;
      }
      .product-price .discount {
        color: #00a365 !important;
        font-size: 18px;
        font-weight: bold;
      }
      .product-price .price-main {
        font-size: 2.4rem;
        font-weight: 600;
        color: #7d7d7d;
      }
      
      .product-price .price-main.discount-price {
        color: #00a365 !important;
      }
      
 
    .add-to-cart {
        margin-top: 8px;
        background: #fff7ec;
        color: #f29209;
        border: none;
        border-radius: 20px;
        padding: 15px 20px;
        width: 100%;
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
        font-size: 1.4rem !important;
        line-height: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .add-to-cart:hover {
        background: #f29209;
        color: #fff;
      }
        
      
      .carousel-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: #fef6eb;
        border: none;
        border-radius: 50%;
        box-shadow: 0 2px 8px #0001;
        width: 32px;
        height: 32px;
        cursor: pointer;
        z-index: 10;
        display: none;
        align-items: center;
        justify-content: center;
      }
 
      .carousel-arrow img {
        width: 20px;
        height: 20px;
      }
      .carousel-arrow.left {
        left: -55px;
      }
      .carousel-arrow.right {
        right: -55px;
      }

        `;

        const style = document.createElement('style');
        style.className = 'carousel-style';
        style.innerHTML = css;
        document.head.appendChild(style);
    };

    // Carousel ve kartları oluştur
    function buildCarousel(products, favorites) {
        buildCSS();

        // Ana çatı container oluştur
        const mainWrapper = document.createElement('div');
        mainWrapper.className = 'main-carousel-wrapper';

        // Banner title container
        const bannerTitle = document.createElement('div');
        bannerTitle.className = 'banner-title';

        // Başlık
        const title = document.createElement('div');
        title.className = 'carousel-title';
        title.textContent = 'Beğenebileceğinizi Düşündüklerimiz';
        bannerTitle.appendChild(title);

        // Carousel wrapper (oklar için)
        const wrapper = document.createElement('div');
        wrapper.className = 'carousel-wrapper';

        // Ana carousel container
        const container = document.createElement('div');
        container.className = 'carousel-container';

        // Track
        const track = document.createElement('div');
        track.className = 'carousel-track';

        // Kartlar
        products.forEach((product) => {
            const card = document.createElement('div');
            card.className = 'carousel-card';

            // Favori butonu
            const favBtn = document.createElement('button');
            favBtn.className = 'fav-btn' + (favorites.includes(product.id) ? ' filled' : '');
            favBtn.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <path d="M12 21s-7.5-6.2-9.5-10.1C-0.2 7.2 2.6 3.5 6.5 3.5c2.1 0 4.1 1.2 5.5 3.1C13.4 4.7 15.4 3.5 17.5 3.5c3.9 0 6.7 3.7 4 7.4C19.5 14.8 12 21 12 21z"/>
                </svg>
            `;
            favBtn.onclick = (e) => {
                e.stopPropagation();
                const favs = toggleFavorite(product.id);
                favBtn.classList.toggle('filled', favs.includes(product.id));
            };
            card.appendChild(favBtn);

            // Ürün görseli
            const img = document.createElement('img');
            img.src = product.img;
            img.alt = product.name;
            card.appendChild(img);

            // Ürün başlık (brand - name)
            const title = document.createElement('div');
            title.className = 'product-title';
            title.innerHTML = `<span class="brand">${product.brand}</span> - <span class="name">${product.name}</span>`;
            card.appendChild(title);

            // Fiyat
            const price = document.createElement('div');
            price.className = 'product-price';
            if (product.price !== product.original_price) {
                price.innerHTML = `
                    <div class="price-top">
                        <span class="original">${product.original_price.toFixed(2)} TL</span>
                        <span class="discount">${Math.round((1 - product.price / product.original_price) * 100)}%</span>
                    </div>
                    <div class="price-main discount-price">${product.price.toFixed(2)} TL</div>
                `;
            } else {
                price.innerHTML = `
                    <div class="price-main">${product.price.toFixed(2)} TL</div>
                `;
            }
            card.appendChild(price);

            // Sepete ekle
            const addBtn = document.createElement('button');
            addBtn.className = 'add-to-cart';
            addBtn.textContent = 'Sepete Ekle';
            addBtn.onclick = (e) => {
                e.stopPropagation();
                alert('Sepete eklendi!');
            };
            card.appendChild(addBtn);

            // Ürün detayına git
            card.onclick = () => {
                window.open(product.url, '_blank');
            };

            track.appendChild(card);
        });

        container.appendChild(track);

        // Container'ı wrapper'a ekle
        wrapper.appendChild(container);

        // Oklar - responsive scroll distance
        const getScrollDistance = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 480) return 140 + 12; // mobile extra small: 2'li görünüm
            if (screenWidth < 576) return 228 + 12; // mobile small: 2'li görünüm
            if (screenWidth < 768) return 264 + 12; // mobile: 2'li görünüm
            if (screenWidth < 992) return 354 + 12; // tablet: 2'li görünüm
            if (screenWidth < 1280) return 310 + 16; // desktop: 3'lü görünüm
            return 283 + 16; // large desktop: 4'lü görünüm
        };

        const leftArrow = document.createElement('button');
        leftArrow.className = 'carousel-arrow left';
        leftArrow.innerHTML = '<img src="https://cdn06.e-bebek.com/assets/svg/prev.svg" alt="Önceki" />';
        leftArrow.onclick = () => {
            track.scrollBy({ left: -getScrollDistance(), behavior: 'smooth' });
        };
        wrapper.appendChild(leftArrow);

        const rightArrow = document.createElement('button');
        rightArrow.className = 'carousel-arrow right';
        rightArrow.innerHTML = '<img src="https://cdn06.e-bebek.com/assets/svg/next.svg" alt="Sonraki" />';
        rightArrow.onclick = () => {
            track.scrollBy({ left: getScrollDistance(), behavior: 'smooth' });
        };
        wrapper.appendChild(rightArrow);
        // Section1 ve Section2A arasına ekle
        const section1 = document.querySelector('cx-page-slot[position="Section1"]');
        const section2A = document.querySelector('cx-page-slot[position="Section2A"]');

        let targetElement;

        if (section1 && section2A) {
            // İki section arasına ekle
            targetElement = document.createElement('div');
            targetElement.className = 'carousel-inserted';
            targetElement.style.cssText = 'width: 100%; position: relative;';
            section1.parentNode.insertBefore(targetElement, section2A);
        } else {
            // Fallback: body'ye ekle
            targetElement = document.createElement('div');
            targetElement.className = 'carousel-inserted';
            targetElement.style.cssText = 'width: 100%; position: relative;';
            document.body.appendChild(targetElement);
        }

        // Banner title ve wrapper'ı ana container'a ekle
        mainWrapper.appendChild(bannerTitle);
        mainWrapper.appendChild(wrapper);

        // Ana container'ı sayfaya ekle
        targetElement.appendChild(mainWrapper);

        console.log('Carousel eklendi.');
    }

    // Başlatıcı
    async function init() {
        // Önceden eklenmiş carousel var mı kontrol et, varsa sil
        const existingCarousel = document.querySelector('.carousel-inserted');
        if (existingCarousel) {
            console.log('Eski carousel siliniyor...');
            existingCarousel.remove();
        }

        const products = await getProducts();
        const favorites = getFavorites();
        buildCarousel(products, favorites);
    }

    init();
})();
