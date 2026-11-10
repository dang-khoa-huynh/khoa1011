const products = [
    // =====================================
    // T-SHIRTS
    // =====================================
    {
        id: 101,
        name: "Vintage Graphic Oversized Tee",
        img: "https://mindarcade.pl/cdn/shop/files/mind_arcade_blank_black.webp?v=1760285266",
        alt: "Áo thun oversized màu đen",
        price: 399000,
        originalPrice: 500000,
        category: "tops",
        gender: "unisex",
        collection: "cyber-street",
        badge: "SALE",
        description: "Áo thun graphic form rộng với họa tiết cá tính, chất cotton 2 chiều định lượng 250gsm."
    },
    {
        id: 102,
        name: "Rage Oversized T-Shirt",
        img: "https://down-ph.img.susercontent.com/file/id-11134207-7r98x-lqn2z584egvs23",
        alt: "Áo thun oversized màu trắng",
        price: 345000,
        originalPrice: 460000,
        category: "tops",
        gender: "unisex",
        collection: "cyber-street",
        badge: "SALE",
        description: "Áo thun form rộng, phong cách streetwear hiện đại, thấm hút mồ hôi vượt trội."
    },
    {
        id: 103,
        name: "Streetwear Graphic Tee",
        img: "https://down-tw.img.susercontent.com/file/tw-11134207-7rbk1-m9g295gtnt9i1b",
        alt: "Áo thun oversized màu xám",
        price: 350000,
        category: "tops",
        gender: "unisex",
        collection: "cyber-street",
        description: "Áo thun graphic mang phong cách streetwear hiện đại."
    },

    // =====================================
    // JEANS & CARGO PANTS
    // =====================================
    {
        id: 104,
        name: "Multi-Pocket Wide Leg Jeans",
        img: "https://wearhouse.com.au/cdn/shop/files/5830_STRAIGHT_JEAN_WASHED_BLUE.jpg?v=1759823028&width=1024",
        alt: "Quần jeans xanh",
        price: 550000,
        originalPrice: 690000,
        category: "bottoms",
        gender: "unisex",
        collection: "cargo-denim",
        badge: "SALE",
        description: "Quần jeans baggy ống rộng với phong cách vintage wash xanh cổ điển."
    },
    {
        id: 105,
        name: "Baggy Cargo Jeans",
        img: "https://asset.solebox.com/images/f_auto%2Cq_100/02406413_1/Carhartt-WIP-Regular-Cargo-Pant-black",
        alt: "Quần cargo màu đen",
        price: 750000,
        category: "bottoms",
        gender: "unisex",
        collection: "cargo-denim",
        description: "Quần cargo form rộng với nhiều chi tiết túi hộp tiện dụng."
    },

    // =====================================
    // JACKETS
    // =====================================
    {
        id: 106,
        name: "Varsity Bomber Jacket",
        img: "https://www.game-apparel.com/cdn/shop/files/5000-varsity_jacket_front_114_black_white_black_sleeves.jpg?v=1755019671&width=1200",
        alt: "Áo khoác varsity đen trắng",
        price: 799000,
        originalPrice: 950000,
        category: "outerwear",
        gender: "unisex",
        collection: "cyber-street",
        badge: "SALE",
        description: "Áo khoác varsity mang phong cách college streetwear phối tay da cao cấp."
    },
    {
        id: 107,
        name: "Classic Varsity Jacket",
        img: "https://www.forever21.com/cdn/shop/files/841854_source_1669743094_d6bfb5eb-1f4b-4ef1-bf25-cd439f7768c2.jpg?v=1745961444",
        alt: "Áo khoác bomber màu đen",
        price: 990000,
        category: "outerwear",
        gender: "unisex",
        collection: "cyber-street",
        description: "Áo khoác phong cách cổ điển, giữ ấm tốt và dễ phối đồ."
    },
    {
        id: 108,
        name: "Urban Bomber Jacket",
        img: "https://tektonla.com/cdn/shop/products/sdfrgUntitled-1.png?crop=center&height=1500&v=1644106673&width=1500",
        alt: "Áo hoodie màu đen",
        price: 900000,
        originalPrice: 1200000,
        category: "outerwear",
        gender: "unisex",
        collection: "cyber-street",
        badge: "SALE",
        description: "Trang phục oversized mang phong cách urban hiện đại, cản gió chống thấm nhẹ."
    },

    // =====================================
    // SHORTS
    // =====================================
    {
        id: 109,
        name: "Nylon Streetwear Shorts",
        img: "https://www.shopwss.com/cdn/shop/files/1805457BLK_1.jpg?v=1715308658",
        alt: "Quần short nylon màu đen",
        price: 399000,
        originalPrice: 500000,
        category: "bottoms",
        gender: "unisex",
        collection: "cargo-denim",
        badge: "SALE",
        description: "Quần short nylon rộng rãi, thoáng mát, phù hợp phong cách casual năng động."
    },
    {
        id: 110,
        name: "Black Utility Shorts",
        img: "https://www.arbetskladerna.se/media/catalog/product/cache/1/image/2200x/9df78eab33525d08d6e5fb8d27136e95/e/u/eu_104201_blk_f.jpg",
        alt: "Quần short utility màu đen",
        price: 490000,
        category: "bottoms",
        gender: "unisex",
        collection: "cargo-denim",
        description: "Quần short utility với thiết kế túi hộp phong cách đường phố."
    },

    // =====================================
    // ADDITIONAL PRODUCTS
    // =====================================
    {
        id: 201,
        name: "Áo Hoodie Wash Big Size Nam",
        category: "tops",
        gender: "men",
        collection: "cyber-street",
        price: 399000,
        originalPrice: 500000,
        badge: "HOT",
        img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRYfacGzgtUDvPqzUE6QYCnNS0RJw3KJ_GrFgAYgoDJKiXBhWwMHwprjgvTFdZmMIRKA7ONdn_0pe-KsUltqHQNV_IhdmifQs5kPmdSvJsRatHiD0sWKddeelaBJ_2anjNSXissgs4&usqp=CAc",
        description: "Áo Hoodie Wash Big Size Nam: Chất nỉ bông dày dặn giặt wash cá tính, form rộng thoải mái, mang phong cách streetwear bụi bặm và năng động."
    },
    {
        id: 202,
        name: "Áo hoodie nữ hình chú gấu thu đông",
        category: "tops",
        gender: "women",
        collection: "cyber-street",
        price: 549000,
        originalPrice: 690000,
        badge: "TRENDING",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIVWZ7s_m2vRrPyIN1OpAxPZnE55r6SmNwqiLrik9Iog&s=10",
        description: "Áo Hoodie Nữ Hình Chú Gấu Thu Đông: Chất nỉ mềm mịn ấm áp, thiết kế dễ thương với hình in chú gấu và điểm nhấn đan dây độc đáo ở tay áo."
    },
    {
        id: 203,
        name: "Áo thun màu đen",
        category: "tops",
        gender: "unisex",
        collection: "cyber-street",
        price: 750000,
        badge: "HOT",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrxbFP5PyabOtKFhTTJm4j__DCgAs9GeY2mnWOb6EuFQ&s=10",
        description: "Áo thun màu đen: Áo thun đen form rộng cá tính, điểm nhấn hình in graphic độc đáo ở mặt sau, năng động và dễ phối đồ."
    },
    {
        id: 204,
        name: "Quần Jeans Lưng Thun Nam",
        category: "bottoms",
        gender: "men",
        collection: "cargo-denim",
        price: 699000,
        originalPrice: 890000,
        badge: "HOT",
        img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTUv_Bh4M0_2QD7itU5Op6Vxsj8nsPaejxUnmhi3AVkRKDp_uP2o6a5lYo3IuKPjZH_zz0RFcGee2IsSF3um28QuqtFuuinuMY-i-DGTeasviuNtPNGC_9uEGiiXvE239-4MZw-Cg&usqp=CAc",
        description: "Quần Jeans Lưng Thun Nam: Quần jeans ống suông thiết kế lưng thun co giãn thoải mái, mang phong cách street style hiện đại."
    },
    {
        id: 205,
        name: "Quần Short Kaki Nam",
        img: "https://thoitrangbigsize.vn/wp-content/uploads/2025/04/Mau-kaki-5.jpg",
        alt: "Quần short Kaki màu be",
        price: 380000,
        category: "bottoms",
        gender: "men",
        collection: "cargo-denim",
        description: "Quần short phong cách Hàn Quốc, chất vải dày vừa mềm co giãn nhẹ."
    },
    {
        id: 206,
        name: "Cyber Acid-Wash Zip Hoodie",
        img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=80",
        alt: "Áo khoác hoodie khóa kéo wash xám đen",
        price: 649000,
        originalPrice: 790000,
        category: "outerwear",
        gender: "unisex",
        collection: "cyber-street",
        badge: "NEW",
        description: "Áo hoodie khóa kéo 2 chiều xử lý wash acid thủ công, chất nỉ 420gsm đứng form cực chuẩn."
    },
    {
        id: 207,
        name: "Distressed Heavyweight Boxy Tee",
        img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80",
        alt: "Áo thun boxy đen dày dặn",
        price: 399000,
        originalPrice: 490000,
        category: "tops",
        gender: "unisex",
        collection: "cyber-street",
        badge: "TRENDING",
        description: "Áo thun phom Boxy hiện đại tôn dáng, bo cổ dày 3cm chống giãn cùng chi tiết rách nhẹ nghệ thuật."
    },
    {
        id: 208,
        name: "Future Matrix Longsleeve Tee",
        img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80",
        alt: "Áo thun tay dài streetwear",
        price: 450000,
        category: "tops",
        gender: "unisex",
        collection: "cyber-street",
        badge: "NEW",
        description: "Áo thun tay dài in họa tiết typographic dọc cánh tay, chất cotton mềm mịn thoáng khí."
    },
    {
        id: 209,
        name: "Techwear Windbreaker Shell Jacket",
        img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80",
        alt: "Áo khoác gió techwear chống nước",
        price: 899000,
        originalPrice: 1090000,
        category: "outerwear",
        gender: "men",
        collection: "cyber-street",
        badge: "HOT",
        description: "Áo khoác gió Techwear 2 lớp trượt nước, tích hợp túi ngực khóa ép nhiệt và mũ trùm điều chỉnh."
    },
    {
        id: 210,
        name: "Parachute Drawstring Track Pants",
        img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80",
        alt: "Quần dù ống rộng dây rút",
        price: 520000,
        originalPrice: 650000,
        category: "bottoms",
        gender: "unisex",
        collection: "cargo-denim",
        badge: "TRENDING",
        description: "Quần dù Parachute ống rộng có chốt rút điều chỉnh gấu quần, nhẹ thoáng và cực dễ phối sneaker."
    },
    {
        id: 211,
        name: "Vintage Black Acid-Wash Baggy Jeans",
        img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
        alt: "Quần jeans baggy đen wash khói",
        price: 720000,
        category: "bottoms",
        gender: "unisex",
        collection: "cargo-denim",
        badge: "NEW",
        description: "Quần jeans ống suông rộng màu đen khói, chất denim 13oz bền bỉ tạo độ rủ tự nhiên khi di chuyển."
    },
    {
        id: 212,
        name: "Raw Denim Carpenter Shorts",
        img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1000&q=80",
        alt: "Quần short jean ống rộng túi hộp",
        price: 449000,
        originalPrice: 550000,
        category: "bottoms",
        gender: "men",
        collection: "cargo-denim",
        badge: "SALE",
        description: "Quần short denim qua gối phom Carpenter rộng rãi, thêu logo VYBE nổi bật ở túi sau."
    },

    // =====================================
    // FOOTWEAR (GIÀY)
    // =====================================
    {
        id: 301,
        name: "VYBE Chunky Platform Sneaker",
        img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
        alt: "Giày sneaker chunky phong cách streetwear",
        price: 999000,
        originalPrice: 1250000,
        category: "shoes",
        gender: "unisex",
        collection: "urban-gear",
        badge: "HOT",
        description: "Sneaker đế chunky hầm hố, đệm khí êm ái, tông màu tối giản phối lưới thoáng khí."
    },
    {
        id: 302,
        name: "Retro High-Top Streetwear Sneaker",
        img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
        alt: "Giày cổ cao phong cách retro",
        price: 1390000,
        category: "shoes",
        gender: "unisex",
        collection: "urban-gear",
        badge: "NEW",
        description: "Thiết kế sneaker cổ cao kinh điển kết hợp chất liệu da cao cấp và phối màu vintage."
    },
    {
        id: 303,
        name: "VYBE Monochrome Low-Top Skate Shoe",
        img: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1000&q=80",
        alt: "Giày trượt ván cổ thấp trắng đen",
        price: 900000,
        originalPrice: 1200000,
        category: "shoes",
        gender: "unisex",
        collection: "urban-gear",
        badge: "HOT",
        description: "Giày Skate cổ thấp phối da lộn chống mài mòn, lưỡi gà dày êm ái và đế cao su bám đường."
    },
    {
        id: 304,
        name: "Cyber Runner Reflective Sneaker",
        img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
        alt: "Giày thể thao phản quang",
        price: 1290000,
        category: "shoes",
        gender: "unisex",
        collection: "urban-gear",
        badge: "NEW",
        description: "Sneaker phom chạy bộ tương lai kết hợp dải phản quang 3M phát sáng nổi bật vào ban đêm."
    },

    // =====================================
    // BAGS & BACKPACKS (BALO & TÚI)
    // =====================================
    {
        id: 401,
        name: "Tactical Multi-Pocket Backpack",
        img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
        alt: "Balo tactical nhiều ngăn đa năng",
        price: 495000,
        originalPrice: 660000,
        category: "bags",
        gender: "unisex",
        collection: "urban-gear",
        badge: "TRENDING",
        description: "Balo phong cách utility với vải chống nước bền bỉ, ngăn chống sốc laptop 15.6 inch."
    },
    {
        id: 402,
        name: "Streetwear Crossbody Sling Bag",
        img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
        alt: "Túi đeo chéo streetwear",
        price: 399000,
        originalPrice: 500000,
        category: "bags",
        gender: "unisex",
        collection: "urban-gear",
        badge: "HOT",
        description: "Túi đeo chéo nhỏ gọn, khóa gài kim loại chịu lực, tiện lợi cho outfit dạo phố."
    },
    {
        id: 403,
        name: "Urban Tech Messenger Tote Bag",
        img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80",
        alt: "Túi đeo vai tote messenger chống thấm",
        price: 459000,
        originalPrice: 580000,
        category: "bags",
        gender: "unisex",
        collection: "urban-gear",
        badge: "TRENDING",
        description: "Túi đeo vai cỡ lớn vải Cordura chống thấm, dây đeo bản rộng có đệm vai êm ái."
    },

    // =====================================
    // WOMEN'S STREETWEAR (THỜI TRANG NỮ — TÁCH NỀN STUDIO)
    // =====================================
    {
        id: 501,
        name: "VYBE Cropped Baby Tee Streetwear Nữ",
        img: "/images/women-baby-tee.jpg",
        alt: "Áo thun croptop baby tee streetwear nữ",
        price: 315000,
        originalPrice: 420000,
        category: "tops",
        gender: "women",
        collection: "cyber-street",
        badge: "HOT",
        description: "Áo Baby Tee dáng lửng ôm nhẹ tôn dáng, chất thun gân co giãn 4 chiều kết hợp in họa tiết ngôi sao Cyber cá tính."
    },
    {
        id: 502,
        name: "Quần Jeans Nữ Ống Rộng High-Waist Baggy",
        img: "/images/women-baggy-jeans.jpg",
        alt: "Quần jeans nữ cạp cao ống rộng baggy",
        price: 599000,
        originalPrice: 750000,
        category: "bottoms",
        gender: "women",
        collection: "cargo-denim",
        badge: "TRENDING",
        description: "Quần jeans nữ cạp cao túi hộp Cargo hack dáng cực đỉnh, ống suông rộng che khuyết điểm phối wash xanh vintage."
    },
    {
        id: 503,
        name: "Áo Khoác Cropped Varsity Bomber Nữ",
        img: "/images/women-cropped-varsity.jpg",
        alt: "Áo khoác bomber dáng ngắn nữ",
        price: 675000,
        originalPrice: 900000,
        category: "outerwear",
        gender: "women",
        collection: "cyber-street",
        badge: "NEW",
        description: "Áo khoác Varsity dáng Cropped trẻ trung dành cho nữ, phối tay da mềm và bo gấu dệt kim năng động."
    },
    {
        id: 504,
        name: "Giày Sneaker Nữ Đế Độ Chunky Cream",
        img: "/images/women-chunky-sneaker.jpg",
        alt: "Giày sneaker nữ đế cao màu kem",
        price: 890000,
        originalPrice: 1120000,
        category: "shoes",
        gender: "women",
        collection: "urban-gear",
        badge: "HOT",
        description: "Sneaker nữ tông kem phối da lộn beige thanh lịch, đế độn 5cm tôn chiều cao và lót đệm êm ái cả ngày."
    },
    {
        id: 505,
        name: "Túi Kẹp Nách Mini Y2K Shoulder Bag Nữ",
        img: "/images/women-y2k-bag.jpg",
        alt: "Túi đeo vai kẹp nách Y2K nữ",
        price: 360000,
        originalPrice: 480000,
        category: "bags",
        gender: "women",
        collection: "urban-gear",
        badge: "NEW",
        description: "Túi kẹp nách phong cách Y2K Streetwear da PU đen mờ chống thấm, điểm nhấn khóa kim loại bạc cá tính."
    },

    // =====================================
    // NEW ARRIVALS — STUDIO PACKSHOTS (10 SẢN PHẨM BỔ SUNG)
    // =====================================
    {
        id: 601,
        name: "Áo Polo Boxy Streetwear Phối Cổ Dệt Kim Nam",
        img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=1000&q=80",
        alt: "Áo polo boxy streetwear nam",
        price: 420000,
        originalPrice: 520000,
        category: "tops",
        gender: "men",
        collection: "cyber-street",
        badge: "NEW",
        description: "Áo Polo phom Boxy rộng rãi hiện đại, chất thun cá sấu Cotton 260gsm thoáng mát phối bo cổ dệt kim sắc nét."
    },
    {
        id: 602,
        name: "Áo Sweater Nỉ Cổ Tròn Minimalist Nữ",
        img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80",
        alt: "Áo sweater nỉ cổ tròn nữ",
        price: 460000,
        originalPrice: 580000,
        category: "tops",
        gender: "women",
        collection: "cyber-street",
        badge: "TRENDING",
        description: "Áo Sweater cổ tròn chất nỉ bông mềm mịn, phom suông trẻ trung dễ dàng phối cùng quần jeans hoặc chân váy."
    },
    {
        id: 603,
        name: "Quần Kaki Túi Hộp Workwear Cargo Nam",
        img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80",
        alt: "Quần kaki túi hộp workwear nam",
        price: 620000,
        originalPrice: 780000,
        category: "bottoms",
        gender: "men",
        collection: "cargo-denim",
        badge: "HOT",
        description: "Quần Kaki Workwear ống suông rộng chất vải Kaki chéo dày dặn, thiết kế 6 túi hộp tiện dụng và bền bỉ."
    },
    {
        id: 604,
        name: "Quần Jeans Nữ Ống Suông Straight-Leg Wash Sáng",
        img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80",
        alt: "Quần jeans nữ ống suông xanh sáng",
        price: 560000,
        originalPrice: 700000,
        category: "bottoms",
        gender: "women",
        collection: "cargo-denim",
        badge: "NEW",
        description: "Quần Jeans nữ cạp cao ống đứng màu xanh wash sáng trẻ trung, tôn vòng eo và kéo dài đôi chân."
    },
    {
        id: 605,
        name: "Áo Khoác Denim Trucker Wash Khói Unisex",
        img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80",
        alt: "Áo khoác jean denim trucker unisex",
        price: 850000,
        originalPrice: 1050000,
        category: "outerwear",
        gender: "unisex",
        collection: "cyber-street",
        badge: "HOT",
        description: "Áo khoác Denim Trucker phom rộng chất vải Jean 14oz dày dặn, cúc đồng khắc nổi logo VYBE sang trọng."
    },
    {
        id: 606,
        name: "Áo Khoác Phao Puffer Gilet Streetwear",
        img: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=80",
        alt: "Áo khoác phao streetwear",
        price: 780000,
        originalPrice: 950000,
        category: "outerwear",
        gender: "unisex",
        collection: "cyber-street",
        badge: "TRENDING",
        description: "Áo khoác chần bông siêu nhẹ giữ ấm vượt trội, dễ dàng layer bên ngoài áo Hoodie hoặc Sweater mùa lạnh."
    },
    {
        id: 607,
        name: "Giày Sneaker Nam Suede Skate Classic",
        img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80",
        alt: "Giày sneaker nam cổ điển",
        price: 960000,
        originalPrice: 1200000,
        category: "shoes",
        gender: "men",
        collection: "urban-gear",
        badge: "SALE",
        description: "Giày Sneaker nam thiết kế tối giản năng động, đế cao su lưu hóa chống trơn trượt và đệm lót OrthoLite êm chân."
    },
    {
        id: 608,
        name: "Giày Sneaker Nữ Pastel Retro Runner",
        img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
        alt: "Giày sneaker nữ phối màu retro",
        price: 880000,
        originalPrice: 1100000,
        category: "shoes",
        gender: "women",
        collection: "urban-gear",
        badge: "NEW",
        description: "Giày Sneaker nữ phối màu Retro trẻ trung, trọng lượng siêu nhẹ giúp di chuyển thoải mái suốt ngày dài."
    },
    {
        id: 609,
        name: "Balo Canvas Minimalist Đựng Laptop 15.6 Inch",
        img: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=1000&q=80",
        alt: "Balo canvas minimalist streetwear",
        price: 480000,
        originalPrice: 600000,
        category: "bags",
        gender: "unisex",
        collection: "urban-gear",
        badge: "HOT",
        description: "Balo vải Canvas dày dặn chống bám bụi, phom hộp đứng cứng cáp kèm ngăn chống sốc bảo vệ Laptop 15.6 inch."
    },
    {
        id: 610,
        name: "Túi Tote Da Mềm Streetwear Đeo Vai Nữ",
        img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
        alt: "Túi tote đeo vai nữ",
        price: 420000,
        originalPrice: 540000,
        category: "bags",
        gender: "women",
        collection: "urban-gear",
        badge: "TRENDING",
        description: "Túi Tote đeo vai nữ phom rộng đựng vừa iPad và tài liệu, chất liệu da tổng hợp mềm mại kèm khóa kéo an toàn."
    }
];

// =====================================
// CATEGORY LABEL
// =====================================

export const CATEGORY_LABEL = {
    tops: "Áo",
    bottoms: "Quần",
    outerwear: "Áo khoác",
    shoes: "Giày",
    bags: "Balo & Túi"
};

// =====================================
// GENDER LABEL
// =====================================

export const GENDER_LABEL = {
    men: "Nam",
    women: "Nữ",
    unisex: "Unisex"
};

// =====================================
// COLLECTION DATA (BỘ SƯU TẬP)
// =====================================

export const COLLECTIONS = [
    {
        id: "cyber-street",
        tag: "DROP 01 / 2026",
        title: "CYBER STREETWEAR",
        subtitle: "Oversized Tees, Washed Hoodies & Varsity Jackets",
        description: "Sự giao thoa giữa phom dáng rộng phóng khoáng và chất liệu nỉ/cotton nặng đô kết hợp họa tiết graphic tương lai.",
        image: "/images/banner_vybe.png"
    },
    {
        id: "cargo-denim",
        tag: "DROP 02 / 2026",
        title: "CARGO & RAW DENIM",
        subtitle: "Multi-Pocket Pants, Baggy Jeans & Utility Shorts",
        description: "Thiết kế thực dụng (Utility) với nhiều túi hộp, đường may gia cố chắc chắn và hiệu ứng wash bụi bặm cho nhịp sống đô thị.",
        image: "/images/drop-cargo-denim.jpg"
    },
    {
        id: "urban-gear",
        tag: "DROP 03 / 2026",
        title: "URBAN FOOTWEAR & GEAR",
        subtitle: "Chunky Sneakers, High-Tops & Tactical Bags",
        description: "Hoàn thiện outfit đường phố với những đôi sneaker đế chunky êm ái cùng balo/túi đeo chéo chống thấm nước.",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85"
    }
];

// =====================================
// FORMAT PRICE
// =====================================

export const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
};

// =====================================
// TÍNH PHẦN TRĂM GIẢM GIÁ
// =====================================

export const getDiscountPercent = (product) => {
    if (!product?.originalPrice || product.originalPrice <= product.price) {
        return 0;
    }
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
};

// =====================================
// GET PRODUCT BY ID
// =====================================

export const getProductById = (id) => {
    return products.find((product) => product.id === Number(id));
};

// =====================================
// EXPORT DEFAULT & NAMED
// =====================================

export { products };
export default products;
