import re
import csv

text = """
• URL: /product/P512469?icid2=nars_explicitlip_cgt_shared_080124_fy243391&amp;icid2=nars_explicitlip_cgt_shared_080124_fy243391
• Image Source: https://www.sephora.com/contentimages/2024-8-1-nars-explicit-lipstick-site-desktop-mobile-content-grid-tile-en-us-can.jpg?imwidth=250
• Alt Text: NEW FROM NARS | Meet the Explicit Lipstick: a luxurious, refillable formula that lasts all day. SHOP NOW >
• Price: $16.00
• URL: /product/anastasia-beverly-hills-matte-satin-velvet-lipstick-P480576?skuId=2650992&amp;icid2=products grid:p480576:product
• Image Source: https://www.sephora.com/productimages/sku/s2650992-main-zoom.jpg?imwidth=175
• Alt Text: Anastasia Beverly Hills - Long-Wearing Matte &amp; Satin Velvet Lipstick
• Price: $23.00
• URL: /product/k-i-s-s-i-n-g-lipstick-P433531?skuId=2736056&amp;icid2=products grid:p433531:product
• Image Source: https://www.sephora.com/productimages/sku/s2736056-main-zoom.jpg?imwidth=175
• Alt Text: Charlotte Tilbury - K.I.S.S.I.N.G Satin Shine Lipstick
• Price: $35.00 - $38.00
• URL: /product/fenty-beauty-rihanna-gloss-bomb-stix-high-shine-gloss-stick-P511572?skuId=2787497&amp;icid2=products grid:p511572:product
• Image Source: https://www.sephora.com/productimages/sku/s2787497-main-zoom.jpg?imwidth=175
• Alt Text: Fenty Beauty by Rihanna - Gloss Bomb Stix High-Shine Gloss Stick
• Price: $25.00
• URL: /product/matte-revolution-lipstick-P433530?skuId=2736098&amp;icid2=products grid:p433530:product
• Image Source: https://www.sephora.com/productimages/sku/s2736098-main-zoom.jpg?imwidth=175
• Alt Text: Charlotte Tilbury - Matte Revolution Hydrating Lipstick
• Price: $35.00 - $38.00
• URL: /product/satin-hydrating-lipstick-P501496?skuId=2564474&amp;icid2=products grid:p501496:product
• Image Source: https://www.sephora.com/productimages/sku/s2564474-main-zoom.jpg?pb=2023-03-sephora-value-2023&amp;imwidth=175
• Alt Text: SEPHORA COLLECTION - Satin Hydrating Lipstick
• Price: $16.00
• URL: /product/dior-dior-addict-refillable-shine-lipstick-P481969?skuId=2767093&amp;icid2=products grid:p481969:product
• Image Source: https://www.sephora.com/productimages/sku/s2767093-main-zoom.jpg?imwidth=175
• Alt Text: DIOR - Dior Addict Shine Lipstick
• Price: $32.00 - $46.00
• URL: /product/love-shine-lip-oil-stick-P377710?skuId=2751592&amp;icid2=products grid:p377710:product
• Image Source: https://www.sephora.com/productimages/sku/s2751592-main-zoom.jpg?pb=allure-2024-bestofbeauty&amp;imwidth=175
• Alt Text: Yves Saint Laurent - YSL Loveshine Lip Oil Stick
• Price: $45.00
• URL: /product/kind-words-matte-lipstick-P500637?skuId=2798262&amp;icid2=products grid:p500637:product
• Image Source: https://www.sephora.com/productimages/sku/s2798262-main-zoom.jpg?imwidth=175
• Alt Text: Rare Beauty by Selena Gomez - Kind Words Matte Lipstick
• Price: $20.00
• URL: /product/matte-velvet-lipstick-P506548?skuId=2666840&amp;icid2=products grid:p506548:product
• Image Source: https://www.sephora.com/productimages/sku/s2666840-main-zoom.jpg?pb=2023-03-sephora-value-2023&amp;imwidth=175
• Alt Text: SEPHORA COLLECTION - Matte Velvet Lipstick
• Price: $16.00
• URL: /product/sc-rouge-lacquer-P511209?skuId=2730158&amp;icid2=products grid:p511209:product
• Image Source: https://www.sephora.com/productimages/sku/s2730158-main-zoom.jpg?pb=2023-03-sephora-value-2023&amp;imwidth=175
• Alt Text: SEPHORA COLLECTION - About That Shine Lacquer Shine Lipstick
• Price: $16.00
• URL: /product/almost-lipstick-P122751?skuId=70680&amp;icid2=products grid:p122751:product
• Image Source: https://www.sephora.com/productimages/sku/s70680-main-zoom.jpg?imwidth=175
• Alt Text: CLINIQUE - Almost Lipstick
• Price: $25.00
• URL: /product/makeup-by-mario-supersatin-lipstick-P509305?skuId=2731636&amp;icid2=products grid:p509305:product
• Image Source: https://www.sephora.com/productimages/sku/s2731636-main-zoom.jpg?imwidth=175
• Alt Text: MAKEUP BY MARIO - SuperSatin® Lipstick
• Price: $28.00
• URL: /product/merit-signature-lip-lightweight-matte-lipstick-P510442?skuId=2759793&amp;icid2=products grid:p510442:product
• Image Source: https://www.sephora.com/productimages/sku/s2759793-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: MERIT - Signature Lip Lightweight Matte Lipstick
• Price: $26.00
• URL: /product/glossier-ultralip-high-shine-lipstick-with-hyaluronic-acid-P504823?skuId=2636728&amp;icid2=products grid:p504823:product
• Image Source: https://www.sephora.com/productimages/sku/s2636728-main-zoom.jpg?imwidth=175
• Alt Text: Glossier - Ultralip High Shine Lipstick with Hyaluronic Acid
• Price: $22.00
• URL: /product/merit-signature-lip-lightweight-lipstick-P481403?skuId=2792802&amp;icid2=products grid:p481403:product
• Image Source: https://www.sephora.com/productimages/sku/s2792802-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: MERIT - Signature Lip Lightweight Satin Lipstick
• Price: $26.00
• URL: /product/rouge-pur-couture-lipstick-collection-P400701?skuId=2695971&amp;icid2=products grid:p400701:product
• Image Source: https://www.sephora.com/productimages/sku/s2695971-main-zoom.jpg?imwidth=175
• Alt Text: Yves Saint Laurent - Rouge Pur Couture Caring Satin Lipstick with Ceramides
• Price: $48.00
• URL: /product/vice-lipstick-P409523?skuId=2481943&amp;icid2=products grid:p409523:product
• Image Source: https://www.sephora.com/productimages/sku/s2481943-main-zoom.jpg?imwidth=175
• Alt Text: Urban Decay - Vice Hydrating Lipstick
• Price: $21.00
• URL: /product/sephora-collection-about-that-shine-sheer-shine-P511183?skuId=2729986&amp;icid2=products grid:p511183:product
• Image Source: https://www.sephora.com/productimages/sku/s2729986-main-zoom.jpg?pb=2023-03-sephora-value-2023&amp;imwidth=175
• Alt Text: SEPHORA COLLECTION - About That Shine Sheer Shine Lipstick
• Price: $16.00
• URL: /product/dior-rouge-dior-lipstick-P467760?skuId=2750966&amp;icid2=products grid:p467760:product
• Image Source: https://www.sephora.com/productimages/sku/s2750966-main-zoom.jpg?imwidth=175
• Alt Text: DIOR - Rouge Dior Refillable Lipstick
• Price: $49.00
• URL: /product/nars-explicit-refillable-satin-lipstick-P512469?skuId=2797124&amp;icid2=products grid:p512469:product
• Image Source: https://www.sephora.com/productimages/sku/s2797124-main-zoom.jpg?imwidth=175
• Alt Text: NARS - Explicit Refillable Satin Lipstick
• Price: $24.00 - $40.00
• URL: /product/prada-beauty-monochrome-soft-matte-refillable-lipstick-P509660?skuId=2754125&amp;icid2=products grid:p509660:product
• Image Source: https://www.sephora.com/productimages/sku/s2754125-main-zoom.jpg?imwidth=175
• Alt Text: Prada Beauty - Prada Monochrome Soft Matte Blur Lipstick
• Price: $40.00 - $50.00
• URL: /product/rare-beauty-by-selena-gomez-lip-souffle-matte-cream-lipstick-P87987897?skuId=2629392&amp;icid2=products grid:p87987897:product
• Image Source: https://www.sephora.com/productimages/sku/s2629392-main-zoom.jpg?imwidth=175
• Alt Text: Rare Beauty by Selena Gomez - Lip Soufflé Matte Cream Lipstick
• Price: $20.00
• URL: /product/nars-afterglow-sensual-shine-lipstick-P505364?skuId=2740322&amp;icid2=products grid:p505364:product
• Image Source: https://www.sephora.com/productimages/sku/s2740322-main-zoom.jpg?imwidth=175
• Alt Text: NARS - Afterglow Sensual Shine Hydrating Lipstick
• Price: $32.00
• URL: /product/dior-rouge-dior-forever-liquid-transfer-proof-lipstick-P472977?skuId=2571453&amp;icid2=products grid:p472977:product
• Image Source: https://www.sephora.com/productimages/sku/s2571453-main-zoom.jpg?imwidth=175
• Alt Text: DIOR - Rouge Dior Forever Liquid Transfer-Proof Lipstick
• Price: $47.00
• URL: /product/make-up-for-ever-rouge-artist-forever-lipstick-P512254?skuId=2797504&amp;icid2=products grid:p512254:product
• Image Source: https://www.sephora.com/productimages/sku/s2797504-main-zoom.jpg?imwidth=175
• Alt Text: MAKE UP FOR EVER - Rouge Artist For Ever Satin &amp; Matte Lipstick
• Price: $28.00
• URL: /product/westman-atelier-lip-suede-hydrating-matte-lipstick-P510431?skuId=2845725&amp;icid2=products grid:p510431:product
• Image Source: https://www.sephora.com/productimages/sku/s2845725-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: Westman Atelier - Lip Suede Hydrating Matte Lipstick with Hyaluronic Acid
• Price: $50.00
• URL: /product/makeup-by-mario-ultra-suede-lipstick-P477837?skuId=2502433&amp;icid2=products grid:p477837:product
• Image Source: https://www.sephora.com/productimages/sku/s2502433-main-zoom.jpg?imwidth=175
• Alt Text: MAKEUP BY MARIO - Ultra Suede® Lipstick
• Price: $28.00
• URL: /product/ilia-lip-sketch-hydrating-crayon-P510654?skuId=2749687&amp;icid2=products grid:p510654:product
• Image Source: https://www.sephora.com/productimages/sku/s2749687-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: ILIA - Lip Sketch Hydrating Lipstick + Lip Liner Crayon
• Price: $26.00
• URL: /product/nars-powermatte-lipstick-P501583?skuId=2756088&amp;icid2=products grid:p501583:product
• Image Source: https://www.sephora.com/productimages/sku/s2756088-main-zoom.jpg?imwidth=175
• Alt Text: NARS - Powermatte Long-Lasting Lipstick
• Price: $34.00
• URL: /product/kosas-wet-stick-moisture-lip-shine-P505694?skuId=2681799&amp;icid2=products grid:p505694:product
• Image Source: https://www.sephora.com/productimages/sku/s2681799-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: Kosas - Wet Stick Moisturizing Shiny Sheer Lipstick with Ceramides
• Price: $24.00
• URL: /product/powermatte-high-intensity-long-lasting-lip-pencil-P507545?skuId=2756104&amp;icid2=products grid:p507545:product
• Image Source: https://www.sephora.com/productimages/sku/s2756104-main-zoom.jpg?imwidth=175
• Alt Text: NARS - Powermatte High-Intensity Long-Lasting Lip Pencil
• Price: $30.00
• URL: /product/stunna-lip-paint-P39787544?skuId=1925114&amp;icid2=products grid:p39787544:product
• Image Source: https://www.sephora.com/productimages/sku/s1925114-main-zoom.jpg?imwidth=175
• Alt Text: Fenty Beauty by Rihanna - Stunna Lip Paint Longwear Fluid Lip Color
• Price: $29.00
• URL: /product/weightless-lip-color-P441883?skuId=2686343&amp;icid2=products grid:p441883:product
• Image Source: https://www.sephora.com/productimages/sku/s2686343-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: Kosas - Weightless Lip Color Nourishing Satin Lipstick
• Price: $26.00
• URL: /product/lawless-forget-filler-lip-plumping-line-smoothing-tinted-lip-balm-P504609?skuId=2787851&amp;icid2=products grid:p504609:product
• Image Source: https://www.sephora.com/productimages/sku/s2787851-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: LAWLESS - Forget the Filler Lip-Plumping Line-Smoothing Tinted Lip Balm
• Price: $26.00
• URL: /product/giorgio-armani-beauty-lip-power-lipstick-P471221?skuId=2644599&amp;icid2=products grid:p471221:product
• Image Source: https://www.sephora.com/productimages/sku/s2644599-main-zoom.jpg?imwidth=175
• Alt Text: Armani Beauty - Lip Power Long Lasting Lipstick
• Price: $45.00
• URL: /product/valentino-spike-buttery-matte-lipstick-P512637?skuId=2788883&amp;icid2=products grid:p512637:product
• Image Source: https://www.sephora.com/productimages/sku/s2788883-main-zoom.jpg?imwidth=175
• Alt Text: Valentino - Spike Valentino Buttery Matte Lipstick
• Price: $48.00
• URL: /product/mattetrance-lipstick-P421813?skuId=2012706&amp;icid2=products grid:p421813:product
• Image Source: https://www.sephora.com/productimages/sku/s2012706-main-zoom.jpg?imwidth=175
• Alt Text: PAT McGRATH LABS - MatteTrance™ Lipstick
• Price: $39.00
• URL: /product/crushed-lip-color-P422224?skuId=2417459&amp;icid2=products grid:p422224:product
• Image Source: https://www.sephora.com/productimages/sku/s2417459-main-zoom.jpg?imwidth=175
• Alt Text: Bobbi Brown - Crushed Lip Color Moisturizing Lipstick
• Price: $33.00
• URL: /product/heirloom-satin-lipstick-P507664?skuId=2699080&amp;icid2=products grid:p507664:product
• Image Source: https://www.sephora.com/productimages/sku/s2699080-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: Kulfi - Heirloom Satin Lipstick
• Price: $30.00
• URL: /product/tom-ford-lip-color-lipstick-P513666?skuId=2806420&amp;icid2=products grid:p513666:product
• Image Source: https://www.sephora.com/productimages/sku/s2806420-main-zoom.jpg?imwidth=175
• Alt Text: TOM FORD - Lip Color Lipstick
• Price: $62.00
• URL: /product/hourglass-unlocked-tm-satin-creme-lipstick-P504297?skuId=2637510&amp;icid2=products grid:p504297:product
• Image Source: https://www.sephora.com/productimages/sku/s2637510-main-zoom.jpg?imwidth=175
• Alt Text: Hourglass - Unlocked™ Satin Crème Lipstick
• Price: $38.00
• URL: /product/charlotte-tilbury-hyaluronic-happi-kiss-color-lip-balm-P468347?skuId=2420503&amp;icid2=products grid:p468347:product
• Image Source: https://www.sephora.com/productimages/sku/s2420503-main-zoom.jpg?imwidth=175
• Alt Text: Charlotte Tilbury - Hyaluronic Happikiss Lipstick Balm
• Price: $35.00
• URL: /product/gucci-gucci-rouge-a-levres-mat-matte-lipstick-P453273?skuId=2749372&amp;icid2=products grid:p453273:product
• Image Source: https://www.sephora.com/productimages/sku/s2749372-main-zoom.jpg?imwidth=175
• Alt Text: Gucci - Velvet Matte Lipstick
• Price: $47.00 - $49.00
• URL: /product/rouge-forever-stick-lipstick-P500997?skuId=2695187&amp;icid2=products grid:p500997:product
• Image Source: https://www.sephora.com/productimages/sku/s2695187-main-zoom.jpg?imwidth=175
• Alt Text: DIOR - Rouge Dior Forever Transfer-Proof Lipstick
• Price: $47.00
• URL: /product/freck-beauty-makeout-club-soft-blur-lipstick-P502850?skuId=2590149&amp;icid2=products grid:p502850:product
• Image Source: https://www.sephora.com/productimages/sku/s2590149-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: Freck Beauty - MAKEOUT CLUB Soft Blur Lipstick
• Price: $24.00
• URL: /product/power-bullet-matte-lipstick-P441880?skuId=2198505&amp;icid2=products grid:p441880:product
• Image Source: https://www.sephora.com/productimages/sku/s2198505-main-zoom.jpg?imwidth=175
• Alt Text: HUDA BEAUTY - Power Bullet Matte Lipstick
• Price: $27.00
• URL: /product/liquid-lipstick-P404831?skuId=2036408&amp;icid2=products grid:p404831:product
• Image Source: https://www.sephora.com/productimages/sku/s2036408-main-zoom.jpg?imwidth=175
• Alt Text: Anastasia Beverly Hills - Smudge-Proof Matte Liquid Lipstick
• Price: $20.00
• URL: /product/color-block-high-impact-lipstick-P436270?skuId=2128650&amp;icid2=products grid:p436270:product
• Image Source: https://www.sephora.com/productimages/sku/s2128650-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: ILIA - Color Block High Impact Lipstick
• Price: $28.00
• URL: /product/spike-valentino-shimmer-lipstick-P515087?skuId=2849826&amp;icid2=products grid:p515087:product
• Image Source: https://www.sephora.com/productimages/sku/s2849826-main-zoom.jpg?imwidth=175
• Alt Text: Valentino - Spike Valentino Shimmer Lipstick
• Price: $48.00
• URL: /product/soft-matte-easy-liqud-lipstick-P506541?skuId=2667061&amp;icid2=products grid:p506541:product
• Image Source: https://www.sephora.com/productimages/sku/s2667061-main-zoom.jpg?pb=2023-03-sephora-value-2023&amp;imwidth=175
• Alt Text: SEPHORA COLLECTION - Soft Matte &amp; Easy Liquid Lipstick
• Price: $16.00
• URL: /product/forget-filler-lip-plumping-line-smoothing-satin-cream-lipstick-P506812?skuId=2694552&amp;icid2=products grid:p506812:product
• Image Source: https://www.sephora.com/productimages/sku/s2694552-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: LAWLESS - Forget the Filler Lip-Plumping Line-Smoothing Satin Cream Lipstick
• Price: $28.00
• URL: /product/glossier-generation-g-sheer-matte-lipstick-P504802?skuId=2717965&amp;icid2=products grid:p504802:product
• Image Source: https://www.sephora.com/productimages/sku/s2717965-main-zoom.jpg?imwidth=175
• Alt Text: Glossier - Generation G Sheer Matte Lipstick
• Price: $20.00
• URL: /product/gucci-rouge-agrave-l-egrave-vres-voile-sheer-lipstick-P452737?skuId=2660140&amp;icid2=products grid:p452737:product
• Image Source: https://www.sephora.com/productimages/sku/s2660140-main-zoom.jpg?imwidth=175
• Alt Text: Gucci - Sheer Lipstick
• Price: $49.00
• URL: /product/prada-beauty-monochrome-hyper-matte-refillable-lipstick-P509658?skuId=2754083&amp;icid2=products grid:p509658:product
• Image Source: https://www.sephora.com/productimages/sku/s2754083-main-zoom.jpg?imwidth=175
• Alt Text: Prada Beauty - Monochrome Hyper Matte Refillable Lipstick
• Price: $40.00 - $50.00
• URL: /product/le-monster-lip-crayon-lipstick-P500284?skuId=2659985&amp;icid2=products grid:p500284:product
• Image Source: https://www.sephora.com/productimages/sku/s2659985-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: HAUS LABS BY LADY GAGA - Le Monster Lip Crayon Vegan Lipstick and Lip Liner
• Price: $24.00
• URL: /product/kvd-vegan-beauty-everlasting-hyperlight-vegan-transfer-resistant-liquid-lipstick-P501592?skuId=2599439&amp;icid2=products grid:p501592:product
• Image Source: https://www.sephora.com/productimages/sku/s2599439-main-zoom.jpg?imwidth=175
• Alt Text: KVD Beauty - Everlasting Hyperlight Vegan Transfer-Proof Liquid Lipstick
• Price: $13.00 - $23.00
• URL: /product/powermatte-lip-pigment-P421485?skuId=2482727&amp;icid2=products grid:p421485:product
• Image Source: https://www.sephora.com/productimages/sku/s2482727-main-zoom.jpg?pb=allure-best-2021-badge&amp;imwidth=175
• Alt Text: NARS - Powermatte Lip Pigment
• Price: $32.00
• URL: /product/lip-blush-P507174?skuId=2686269&amp;icid2=products grid:p507174:product
• Image Source: https://www.sephora.com/productimages/sku/s2686269-main-zoom.jpg?imwidth=175
• Alt Text: REFY - Lip Blush
• Price: $24.00
• URL: /product/tarte-maracuja-juicy-lip-vinyl-P509396?skuId=2737112&amp;icid2=products grid:p509396:product
• Image Source: https://www.sephora.com/productimages/sku/s2737112-main-zoom.jpg?imwidth=175
• Alt Text: tarte - maracuja juicy lip vinyl
• Price: $26.00
• URL: /product/givenchy-le-rouge-sheer-velvet-matte-lipstick-P474948?skuId=2484715&amp;icid2=products grid:p474948:product
• Image Source: https://www.sephora.com/productimages/sku/s2484715-main-zoom.jpg?imwidth=175
• Alt Text: Givenchy - Le Rouge Sheer Velvet Matte Lipstick
• Price: $44.00
• URL: /product/patrick-ta-major-headlines-matte-suede-lipstick-P458748?skuId=2699320&amp;icid2=products grid:p458748:product
• Image Source: https://www.sephora.com/productimages/sku/s2699320-main-zoom.jpg?imwidth=175
• Alt Text: PATRICK TA - Major Headlines Matte Suede Lipstick
• Price: $32.00
• URL: /product/cocoa-bold-cream-lipstick-P501036?skuId=2600948&amp;icid2=products grid:p501036:product
• Image Source: https://www.sephora.com/productimages/sku/s2600948-main-zoom.jpg?imwidth=175
• Alt Text: Too Faced - Cocoa Bold Cream Lipstick
• Price: $29.00
• URL: /product/gucci-rouge-de-beaut-eacute-brillant-glow-care-lipstick-P471239?skuId=2448934&amp;icid2=products grid:p471239:product
• Image Source: https://www.sephora.com/productimages/sku/s2448934-main-zoom.jpg?imwidth=175
• Alt Text: Gucci - Glow &amp; Care Shine Lipstick
• Price: $49.00
• URL: /product/fenty-beauty-rihanna-gloss-bomb-heat-universal-lip-luminizer-plumper-P473708?skuId=2656254&amp;icid2=products grid:p473708:product
• Image Source: https://www.sephora.com/productimages/sku/s2656254-main-zoom.jpg?imwidth=175
• Alt Text: Fenty Beauty by Rihanna - Gloss Bomb Heat Universal Lip Luminizer + Plumper
• Price: $26.00
• URL: /product/charlotte-tilbury-superstar-lips-lipstick-pillow-talk-collection-P455322?skuId=2244606&amp;icid2=products grid:p455322:product
• Image Source: https://www.sephora.com/productimages/sku/s2244606-main-zoom.jpg?imwidth=175
• Alt Text: Charlotte Tilbury - Superstar Lips Lipstick - Pillow Talk Collection
• Price: $35.00
• URL: /product/danessa-myricks-colorfix-24-hour-cream-color-P468353?skuId=2798239&amp;icid2=products grid:p468353:product
• Image Source: https://www.sephora.com/productimages/sku/s2798239-main-zoom.jpg?imwidth=175
• Alt Text: Danessa Myricks Beauty - Colorfix - Multi-Use Eye, Cheek &amp; Lip Waterproof Liquid Pigment
• Price: $20.00
• URL: /product/mini-dramatique-mega-lip-pencil-duo-P514912?skuId=2840080&amp;icid2=products grid:p514912:product
• Image Source: https://www.sephora.com/productimages/sku/s2840080-main-zoom.jpg?imwidth=175
• Alt Text: PAT McGRATH LABS - Mini Dramatique Mega Lip Pencil Set
• Price: $32.00
• URL: /product/hot-lips-lipstick-2-0-P446609?skuId=2244564&amp;icid2=products grid:p446609:product
• Image Source: https://www.sephora.com/productimages/sku/s2244564-main-zoom.jpg?imwidth=175
• Alt Text: Charlotte Tilbury - Hot Lips Lipstick 2
• Price: $38.00
• URL: /product/hourglass-unlocked-tm-soft-matte-lipstick-P510553?skuId=2738946&amp;icid2=products grid:p510553:product
• Image Source: https://www.sephora.com/productimages/sku/s2738946-main-zoom.jpg?imwidth=175
• Alt Text: Hourglass - Unlocked™ Soft Matte Lipstick
• Price: $38.00
• URL: /product/vice-lip-bond-longwear-liquid-lipstick-P501181?skuId=2589653&amp;icid2=products grid:p501181:product
• Image Source: https://www.sephora.com/productimages/sku/s2589653-main-zoom.jpg?imwidth=175
• Alt Text: Urban Decay - Vice Lip Bond Glossy Longwear Liquid Lipstick
• Price: $28.00
• URL: /product/sarah-creal-speak-for-yourself-hydrating-lipstick-P513257?skuId=2823839&amp;icid2=products grid:p513257:product
• Image Source: https://www.sephora.com/productimages/sku/s2823839-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: Sarah Creal - Speak For Yourself Hydrating Lipstick
• Price: $50.00
• URL: /product/valentino-rosso-valentino-refillable-lipstick-P479501?skuId=2734366&amp;icid2=products grid:p479501:product
• Image Source: https://www.sephora.com/productimages/sku/s2734366-main-zoom.jpg?imwidth=175
• Alt Text: Valentino - Rosso Valentino High Pigment Refillable Lipstick
• Price: $30.00 - $45.00
• URL: /product/multi-stick-P411848?skuId=2564359&amp;icid2=products grid:p411848:product
• Image Source: https://www.sephora.com/productimages/sku/s2564359-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: ILIA - Multi-Stick Cream Blush + Highlighter + Lip Tint
• Price: $36.00
• URL: /product/le-rouge-P377755?skuId=2595296&amp;icid2=products grid:p377755:product
• Image Source: https://www.sephora.com/productimages/sku/s2595296-main-zoom.jpg?imwidth=175
• Alt Text: Givenchy - Rouge Interdit Intense Silk Satin Matte Lipstick
• Price: $33.00 - $46.00
• URL: /product/lys-beauty-speak-love-lipstick-collection-P503938?skuId=2654986&amp;icid2=products grid:p503938:product
• Image Source: https://www.sephora.com/productimages/sku/s2654986-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: LYS Beauty - Speak Love Moisture Matte Lipstick
• Price: $20.00
• URL: /product/laura-mercier-caviar-smoothing-matte-lipstick-P512645?skuId=2793362&amp;icid2=products grid:p512645:product
• Image Source: https://www.sephora.com/productimages/sku/s2793362-main-zoom.jpg?imwidth=175
• Alt Text: Laura Mercier - Caviar Smoothing Matte Lipstick
• Price: $45.00
• URL: /product/pat-mcgrath-labs-dramatique-mega-lip-pencil-P511701?skuId=2766814&amp;icid2=products grid:p511701:product
• Image Source: https://www.sephora.com/productimages/sku/s2766814-main-zoom.jpg?imwidth=175
• Alt Text: PAT McGRATH LABS - Dramatique Mega Lip Pencil
• Price: $29.00
• URL: /product/gucci-rouge-agrave-l-egrave-vres-satin-lipstick-P452736?skuId=2749489&amp;icid2=products grid:p452736:product
• Image Source: https://www.sephora.com/productimages/sku/s2749489-main-zoom.jpg?imwidth=175
• Alt Text: Gucci - Long Lasting Satin Lipstick
• Price: $45.00 - $49.00
• URL: /product/guerlain-kisskiss-bee-glow-lipstick-balm-P483450?skuId=2511186&amp;icid2=products grid:p483450:product
• Image Source: https://www.sephora.com/productimages/sku/s2511186-main-zoom.jpg?pb=allure-2022-bestofbeauty-badge&amp;imwidth=175
• Alt Text: GUERLAIN - KissKiss Bee Glow Lipstick Balm
• Price: $40.00
• URL: /product/charlotte-tilbury-k-i-s-s-i-n-g-lipstick-and-lip-gloss-duos-P511724?skuId=2765865&amp;icid2=products grid:p511724:product
• Image Source: https://www.sephora.com/productimages/sku/s2765865-main-zoom.jpg?imwidth=175
• Alt Text: Charlotte Tilbury - K.I.S.S.I.N.G Lipstick and Lip Gloss Duos
• Price: $27.00
• URL: /product/l-absolu-rouge-P244911?skuId=2494037&amp;icid2=products grid:p244911:product
• Image Source: https://www.sephora.com/productimages/sku/s2494037-main-zoom.jpg?imwidth=175
• Alt Text: Lancôme - L\'Absolu Rouge Cream Lipstick
• Price: $35.00
• URL: /product/huda-beauty-power-bullet-cr-egrave-me-glow-lipstick-P471244?skuId=2419711&amp;icid2=products grid:p471244:product
• Image Source: https://www.sephora.com/productimages/sku/s2419711-main-zoom.jpg?imwidth=175
• Alt Text: HUDA BEAUTY - Power Bullet Cream Glow Hydrating Lipstick
• Price: $27.00
• URL: /product/natasha-denona-i-need-rose-cream-lipstick-voluptuous-creamy-lip-color-P481728?skuId=2512515&amp;icid2=products grid:p481728:product
• Image Source: https://www.sephora.com/productimages/sku/s2512515-main-zoom.jpg?imwidth=175
• Alt Text: NATASHA DENONA - I Need A Rose Cream Lipstick
• Price: $27.00
• URL: /product/nars-air-matte-liquid-lipstick-P474358?skuId=2490902&amp;icid2=products grid:p474358:product
• Image Source: https://www.sephora.com/productimages/sku/s2490902-main-zoom.jpg?imwidth=175
• Alt Text: NARS - Air Matte Liquid Lipstick
• Price: $28.00
• URL: /product/lancome-l-absolu-rouge-intimate-blushing-nudes-lipstick-P510861?skuId=2744548&amp;icid2=products grid:p510861:product
• Image Source: https://www.sephora.com/productimages/sku/s2744548-main-zoom.jpg?imwidth=175
• Alt Text: Lancôme - L\'Absolu Rouge Intimatte Buildable Soft Matte Lipstick
• Price: $35.00
• URL: /product/tom-ford-soleil-sunlit-rose-lip-balm-P509462?skuId=2503381&amp;icid2=products grid:p509462:product
• Image Source: https://www.sephora.com/productimages/sku/s2503381-main-zoom.jpg?imwidth=175
• Alt Text: TOM FORD - Soleil Sunlit Rose Lip Balm
• Price: $35.00 - $62.00
• URL: /product/givenchy-le-rouge-interdit-satin-P512684?skuId=2788438&amp;icid2=products grid:p512684:product
• Image Source: https://www.sephora.com/productimages/sku/s2788438-main-zoom.jpg?imwidth=175
• Alt Text: Givenchy - Le Rouge Interdit Satin Hydrating Lipstick
• Price: $44.00
• URL: /product/ami-cole-blush-desert-cream-blush-lip-multistick-P504779?skuId=2660868&amp;icid2=products grid:p504779:product
• Image Source: https://www.sephora.com/productimages/sku/s2660868-main-zoom.jpg?pb=allure-2023-bestofbeauty-badge&amp;imwidth=175
• Alt Text: Ami Colé - Desert Date Cream Blush &amp; Lip Multistick
• Price: $22.00
• URL: /product/luxe-lip-color-P400625?skuId=2595718&amp;icid2=products grid:p400625:product
• Image Source: https://www.sephora.com/productimages/sku/s2595718-main-zoom.jpg?imwidth=175
• Alt Text: Bobbi Brown - Luxe Lipstick
• Price: $43.00
• URL: /product/superstar-lips-lipstick-P446610?skuId=2369080&amp;icid2=products grid:p446610:product
• Image Source: https://www.sephora.com/productimages/sku/s2369080-main-zoom.jpg?imwidth=175
• Alt Text: Charlotte Tilbury - Superstar Lips Lipstick
• Price: $35.00
• URL: /product/bareminerals-mineralist-hydra-smoothing-lipstick-P455324?skuId=2308872&amp;icid2=products grid:p455324:product
• Image Source: https://www.sephora.com/productimages/sku/s2308872-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: bareMinerals - Mineralist Hydra-Smoothing Lipstick
• Price: $22.00
• URL: /product/hourglass-unlocked-satin-creme-lipstick-red-0-P504339?skuId=2637718&amp;icid2=products grid:p504339:product
• Image Source: https://www.sephora.com/productimages/sku/s2637718-main-zoom.jpg?imwidth=175
• Alt Text: Hourglass - Unlocked Satin Creme Lipstick- Red 0
• Price: $38.00
• URL: /product/patrick-ta-major-headlines-precision-lip-crayon-P458749?skuId=2363810&amp;icid2=products grid:p458749:product
• Image Source: https://www.sephora.com/productimages/sku/s2363810-main-zoom.jpg?imwidth=175
• Alt Text: PATRICK TA - Major Headlines Precision Lip Crayon
• Price: $26.00
• URL: /product/ultra-shine-lip-color-P429018?skuId=2756203&amp;icid2=products grid:p429018:product
• Image Source: https://www.sephora.com/productimages/sku/s2756203-main-zoom.jpg?imwidth=175
• Alt Text: TOM FORD - Ultra Shine Lip Color
• Price: $62.00
• URL: /product/westman-atelier-mini-petite-baby-cheeks-lip-cheek-cream-blush-stick-P506281?skuId=2764017&amp;icid2=products grid:p506281:product
• Image Source: https://www.sephora.com/productimages/sku/s2764017-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: Westman Atelier - Mini Petite Baby Cheeks Lip + Cheek Cream Blush Stick
• Price: $26.00
• URL: /product/rouge-artist-for-ever-matte-24hr-longwear-liquid-lipstick-P500992?skuId=2714251&amp;icid2=products grid:p500992:product
• Image Source: https://www.sephora.com/productimages/sku/s2714251-main-zoom.jpg?imwidth=175
• Alt Text: MAKE UP FOR EVER - Rouge Artist For Ever Matte 24HR Longwear Liquid Lipstick
• Price: $28.00
• URL: /product/kaja-jelly-charm-lip-blush-glazed-stain-with-keychain-P504365?skuId=2646545&amp;icid2=products grid:p504365:product
• Image Source: https://www.sephora.com/productimages/sku/s2646545-main-zoom.jpg?imwidth=175
• Alt Text: Kaja - Jelly Charm Glazed Lip Stain &amp; Blush With Keychain
• Price: $25.00
• URL: /product/petal-soft-lip-crayon-P501504?skuId=2306959&amp;icid2=products grid:p501504:product
• Image Source: https://www.sephora.com/productimages/sku/s2306959-main-zoom.jpg?imwidth=175
• Alt Text: Laura Mercier - Petal Soft Lipstick Crayon
• Price: $35.00
• URL: /product/pat-mcgrath-labs-liquidlust-legendary-wear-matte-lipstick-P468398?skuId=2458800&amp;icid2=products grid:p468398:product
• Image Source: https://www.sephora.com/productimages/sku/s2458800-main-zoom.jpg?imwidth=175
• Alt Text: PAT McGRATH LABS - LiquiLUST™: Legendary Wear Matte Lipstick
• Price: $34.00
• URL: /product/tatcha-the-kissu-lip-tint-spf-25-hydrating-tinted-lip-sunscreen-P510516?skuId=2762177&amp;icid2=products grid:p510516:product
• Image Source: https://www.sephora.com/productimages/sku/s2762177-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: Tatcha - The Kissu Lip Tint SPF 25 Hydrating Tinted Lip Sunscreen
• Price: $34.00
• URL: /product/fashion-fair-iconic-lipstick-P476493?skuId=2476448&amp;icid2=products grid:p476493:product
• Image Source: https://www.sephora.com/productimages/sku/s2476448-main-zoom.jpg?imwidth=175
• Alt Text: Fashion Fair - Iconic Lipstick
• Price: $29.00
• URL: /product/power-bullet-matte-lipstick-P450511?skuId=2198661&amp;icid2=products grid:p450511:product
• Image Source: https://www.sephora.com/productimages/sku/s2198661-main-zoom.jpg?imwidth=175
• Alt Text: HUDA BEAUTY - Power Bullet Matte Lipstick - Throwback Collection
• Price: $27.00
• URL: /product/my-dream-lipstick-creamy-lip-color-P502442?skuId=2597656&amp;icid2=products grid:p502442:product
• Image Source: https://www.sephora.com/productimages/sku/s2597656-main-zoom.jpg?imwidth=175
• Alt Text: NATASHA DENONA - My Dream Lipstick - Creamy Lip Color
• Price: $27.00
• URL: /product/hourglass-confession-trade-ultra-slim-high-intensity-refillable-lipstick-red-0-P469476?skuId=2390284&amp;icid2=products grid:p469476:product
• Image Source: https://www.sephora.com/productimages/sku/s2390284-main-zoom.jpg?imwidth=175
• Alt Text: Hourglass - Confession™ Ultra Slim High Intensity Refillable Lipstick - Red 0
• Price: $39.00
• URL: /product/confession-ultra-slim-high-intensity-refillable-lipstick-P420411?skuId=2303204&amp;icid2=products grid:p420411:product
• Image Source: https://www.sephora.com/productimages/sku/s2303204-main-zoom.jpg?imwidth=175
• Alt Text: Hourglass - Confession™ Ultra Slim High Intensity Refillable Lipstick
• Price: $39.00
• URL: /product/intense-matte-lip-cheek-pencil-P405290?skuId=1783794&amp;icid2=products grid:p405290:product
• Image Source: https://www.sephora.com/productimages/sku/s1783794-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: NUDESTIX - Intense Matte Lip Pencil + Cheek
• Price: $27.00
• URL: /product/one-size-by-patrick-starrr-lip-snatcher-hydrating-liquid-lipstick-lip-gloss-duo-P504363?skuId=2648178&amp;icid2=products grid:p504363:product
• Image Source: https://www.sephora.com/productimages/sku/s2648178-main-zoom.jpg?imwidth=175
• Alt Text: ONE/SIZE by Patrick Starrr - Lip Snatcher Hydrating Liquid Lipstick and Lip Gloss Duo
• Price: $28.00
• URL: /product/le-rouge-deep-velvet-lipstick-P448881?skuId=2691319&amp;icid2=products grid:p448881:product
• Image Source: https://www.sephora.com/productimages/sku/s2691319-main-zoom.jpg?imwidth=175
• Alt Text: Givenchy - Le Rouge Deep Velvet Matte Lipstick
• Price: $44.00
• URL: /product/too-faced-lip-injection-extreme-lip-shaper-plumping-lip-liner-P505390?skuId=2795631&amp;icid2=products grid:p505390:product
• Image Source: https://www.sephora.com/productimages/sku/s2795631-main-zoom.jpg?imwidth=175
• Alt Text: Too Faced - Lip Injection Extreme Lip Shaper Plumping Lip Liner
• Price: $24.00
• URL: /product/fara-homidi-essential-lip-refillable-compact-P511748?skuId=2791002&amp;icid2=products grid:p511748:product
• Image Source: https://www.sephora.com/productimages/sku/s2791002-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: Fara Homidi - Essential Lip Refillable Compact
• Price: $48.00 - $88.00
• URL: /product/westman-atelier-lip-suede-P468435?skuId=2471241&amp;icid2=products grid:p468435:product
• Image Source: https://www.sephora.com/productimages/sku/s2471241-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: Westman Atelier - Lip Suede Lipstick Palette
• Price: $85.00
• URL: /product/lip-color-matte-lipstick-P416222?skuId=2358513&amp;icid2=products grid:p416222:product
• Image Source: https://www.sephora.com/productimages/sku/s2358513-main-zoom.jpg?imwidth=175
• Alt Text: TOM FORD - Lip Color Matte Lipstick
• Price: $62.00
• URL: /product/rouge-pur-couture-matte-slim-lipstick-P436506?skuId=2341519&amp;icid2=products grid:p436506:product
• Image Source: https://www.sephora.com/productimages/sku/s2341519-main-zoom.jpg?imwidth=175
• Alt Text: Yves Saint Laurent - Rouge Pur Couture The Slim Matte Lipstick
• Price: $48.00
• URL: /product/pat-mcgrath-labs-mini-nude-venus-lip-trio-mattetrance-edition-P509294?skuId=2714608&amp;icid2=products grid:p509294:product
• Image Source: https://www.sephora.com/productimages/sku/s2714608-main-zoom.jpg?imwidth=175
• Alt Text: PAT McGRATH LABS - Mini Nude Venus Lip Trio: Mattetrance Edition
• Price: $29.00
• URL: /product/rouge-interdit-vinyl-color-enhancing-lipstick-P405231?skuId=2672046&amp;icid2=products grid:p405231:product
• Image Source: https://www.sephora.com/productimages/sku/s2672046-main-zoom.jpg?imwidth=175
• Alt Text: Givenchy - Le Rouge Interdit pH Reactive Hydrating Universal Black Lip Balm
• Price: $41.00
• URL: /product/the-multiple-P2866?skuId=1017920&amp;icid2=products grid:p2866:product
• Image Source: https://www.sephora.com/productimages/sku/s1017920-main-zoom.jpg?imwidth=175
• Alt Text: NARS - The Multiple Cream Blush, Lip and Eye Stick
• Price: $39.00
• URL: /product/supergoop-lipshade-100-mineral-spf-30-hydrating-lipstick-P506182?skuId=2677821&amp;icid2=products grid:p506182:product
• Image Source: https://www.sephora.com/productimages/sku/s2677821-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: Supergoop! - Lipshade 100% Mineral SPF 30 Hydrating Lipstick
• Price: $24.00
• URL: /product/le-rouge-interdit-cream-velvet-lipstick-P507785?skuId=2691236&amp;icid2=products grid:p507785:product
• Image Source: https://www.sephora.com/productimages/sku/s2691236-main-zoom.jpg?imwidth=175
• Alt Text: Givenchy - Le Rouge Interdit Cream Velvet Lipstick
• Price: $44.00
• URL: /product/g-suit-soft-touch-lip-creme-P505873?skuId=2670255&amp;icid2=products grid:p505873:product
• Image Source: https://www.sephora.com/productimages/sku/s2670255-main-zoom.jpg?imwidth=175
• Alt Text: Glossier - G Suit Soft Touch Matte Liquid Lip Crème
• Price: $24.00
• URL: /product/pot-rouge-for-lips-cheeks-P270553?skuId=1418078&amp;icid2=products grid:p270553:product
• Image Source: https://www.sephora.com/productimages/sku/s1418078-main-zoom.jpg?imwidth=175
• Alt Text: Bobbi Brown - Pot Rouge Blush for Lips and Cheeks
• Price: $36.00
• URL: /product/pop-liquid-matte-lip-colour-P411531?skuId=1860220&amp;icid2=products grid:p411531:product
• Image Source: https://www.sephora.com/productimages/sku/s1860220-main-zoom.jpg?imwidth=175
• Alt Text: CLINIQUE - Clinique Pop Liquid™ Matte Lip Colour + Primer Lipstick
• Price: $19.50
• URL: /product/velvet-blur-matte-lipbalm-P503349?skuId=2782654&amp;icid2=products grid:p503349:product
• Image Source: https://www.sephora.com/productimages/sku/s2782654-main-zoom.jpg?imwidth=175
• Alt Text: SIMIHAZE BEAUTY - Velvet Blur Matte Lipstick Balm
• Price: $36.00
• URL: /product/lips-metal-sheer-metallic-balm-P515447?skuId=2855351&amp;icid2=products grid:p515447:product
• Image Source: https://www.sephora.com/productimages/sku/s2855351-main-zoom.jpg?imwidth=175
• Alt Text: ISAMAYA - Lips Metal- Sheer Metallic Balm
• Price: $32.00
• URL: /product/pat-mcgrath-labs-mattetrance-lipstick-divine-rose-collection-P458775?skuId=2458743&amp;icid2=products grid:p458775:product
• Image Source: https://www.sephora.com/productimages/sku/s2458743-main-zoom.jpg?imwidth=175
• Alt Text: PAT McGRATH LABS - MatteTrance™ Lipstick - Divine Rose Collection
• Price: $39.00
• URL: /product/benefit-cosmetics-playtint-lip-cheek-stain-P473850?skuId=2465128&amp;icid2=products grid:p473850:product
• Image Source: https://www.sephora.com/productimages/sku/s2465128-main-zoom.jpg?imwidth=175
• Alt Text: Benefit Cosmetics - Playtint Lip &amp; Cheek Stain
• Price: $26.00
• URL: /product/too-faced-lip-injection-power-plumping-cream-liquid-lipstick-P475179?skuId=2478808&amp;icid2=products grid:p475179:product
• Image Source: https://www.sephora.com/productimages/sku/s2478808-main-zoom.jpg?imwidth=175
• Alt Text: Too Faced - Lip Injection Power Plumping Cream Liquid Lipstick
• Price: $29.00
• URL: /product/givenchy-givenchy-le-rouge-inte-intense-silk-n502-hy24-P512562?skuId=2803260&amp;icid2=products grid:p512562:product
• Image Source: https://www.sephora.com/productimages/sku/s2803260-main-zoom.jpg?imwidth=175
• Alt Text: Givenchy - Holiday Rouge Interdit Intense Silk Satin Matte Lipstick
• Price: $46.00
• URL: /product/makeup-by-mario-ultra-suede-trade-cozy-lip-creme-P481720?skuId=2548485&amp;icid2=products grid:p481720:product
• Image Source: https://www.sephora.com/productimages/sku/s2548485-main-zoom.jpg?imwidth=175
• Alt Text: MAKEUP BY MARIO - Ultra Suede™️ Cozy Lip Creme
• Price: $26.00
• URL: /product/crushed-liquid-lip-P439913?skuId=2182806&amp;icid2=products grid:p439913:product
• Image Source: https://www.sephora.com/productimages/sku/s2182806-main-zoom.jpg?imwidth=175
• Alt Text: Bobbi Brown - Crushed Liquid Lipstick
• Price: $33.00
• URL: /product/luxe-matte-lipstick-P434383?skuId=2088607&amp;icid2=products grid:p434383:product
• Image Source: https://www.sephora.com/productimages/sku/s2088607-main-zoom.jpg?imwidth=175
• Alt Text: Bobbi Brown - Luxe Matte Lipstick
• Price: $41.00
• URL: /product/magnetic-matte-lip-color-P416774?skuId=1897354&amp;icid2=products grid:p416774:product
• Image Source: https://www.sephora.com/productimages/sku/s1897354-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: NUDESTIX - Magnetic Matte Lip Pencil
• Price: $26.00 - $27.00
• URL: /product/super-slick-lip-balm-P503350?skuId=2633949&amp;icid2=products grid:p503350:product
• Image Source: https://www.sephora.com/productimages/sku/s2633949-main-zoom.jpg?imwidth=175
• Alt Text: SIMIHAZE BEAUTY - Mini Super Slick Tinted Lip Balm
• Price: $24.00
• URL: /product/fashion-fair-lip-teasers-P502223?skuId=2591808&amp;icid2=products grid:p502223:product
• Image Source: https://www.sephora.com/productimages/sku/s2591808-main-zoom.jpg?imwidth=175
• Alt Text: Fashion Fair - Lip Teasers Lip Gloss
• Price: $28.00
• URL: /product/nude-plumping-lip-glace-P444920?skuId=2228773&amp;icid2=products grid:p444920:product
• Image Source: https://www.sephora.com/productimages/sku/s2228773-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: NUDESTIX - Nude Plumping Lip Glace
• Price: $28.00
• URL: /product/lips-balm-sheer-lipstick-balm-with-vitamin-e-P515457?skuId=2855476&amp;icid2=products grid:p515457:product
• Image Source: https://www.sephora.com/productimages/sku/s2855476-main-zoom.jpg?imwidth=175
• Alt Text: ISAMAYA - Lips Balm- Sheer Lipstick Balm with Vitamin E
• Price: $32.00
• URL: /product/hy-power-eye-cheek-lip-pigment-paint-P500298?skuId=2572378&amp;icid2=products grid:p500298:product
• Image Source: https://www.sephora.com/productimages/sku/s2572378-main-zoom.jpg?pb=clean-at-sephora&amp;imwidth=175
• Alt Text: HAUS LABS BY LADY GAGA - Hy-Power Eye, Cheek &amp; Lip Pigment Paint
• Price: $24.00
"""

# Regular expression to extract products
product_pattern = re.findall(r"• URL: (.+?)\n• Image Source: (.+?)\n• Alt Text: (.+?)\n• Price: (.+?)(?:\n|$)", text)

# Parse the extracted data
products = []
for product in product_pattern:
    url, image_source, alt_text, price = product
    price = price.split("-")[0].strip().replace("$", "")  # Take the lowest price if range exists
    products.append([url, image_source, alt_text, float(price)])

# Save to CSV
csv_filename = "products.csv"
with open(csv_filename, "w", newline="", encoding="utf-8") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["URL", "Image Source", "Alt Text", "Price"])
    writer.writerows(products)

print(f"Saved {len(products)} products to {csv_filename}")

