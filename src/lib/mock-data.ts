import "server-only";
import type { Project, Testimonial, Service } from "./types";


const PROJECTS: Project[] = [
  {
    title: "Bang & Olufsen Speakers – Product Visualization",
    slug: "bang-olufsen-speakers",
    client: "Bang & Olufsen",
    industry: "Product",
    categories: ["Product"],
    description:
      "This 3D product visualization was created to showcase Bang & Olufsen speakers through a series of cinematic, photorealistic renders. The project focused on highlighting the brand's iconic Scandinavian design, premium materials, and refined craftsmanship.",
    challenge:
      "The challenge was to recreate the speakers with a high level of realism while accurately capturing their distinctive materials, elegant form, and luxury aesthetic. Every render needed to reflect the premium quality associated with the Bang & Olufsen brand.",
    solution:
      "We developed realistic materials, carefully crafted studio lighting, and clean compositions to emphasize the speakers' aluminum finishes, fabric textures, and minimalist design. The visuals were designed to resemble high-end commercial advertising while keeping the focus on the product.",
    process:
      "Gathered reference images and studied the speakers' design and materials. Modeled and refined the products with close attention to detail. Created photorealistic materials and a premium studio lighting setup. Composed cinematic camera angles to showcase the products from multiple perspectives. Rendered the final images and completed post-processing to achieve a polished, commercial-quality presentation.",
    year: 2026,
    duration: "Pending...",
    software: ["Blender", "Cycles", "After Effects"],
    services: ["3D Product Visualization", "Product Rendering", "Commercial CGI"],
    credits: [{ role: "3D & Motion Design", name: "Yusef Tharwat" }],
    thumbnail: "/projects/bang-olufsen/thumbnail.png",
    hoverVideo: "/projects/bang-olufsen/hero.mp4",
    heroVideo: "https://player.vimeo.com/video/1206959591?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
    posterImage: "/projects/bang-olufsen/thumbnail.png",
    galleryImages: [],
    behindTheScenesImages: [],
    tags: ["Product", "CGI", "Audio", "Visualization", "Bang & Olufsen"],
    featured: true,
    seoTitle: "Bang & Olufsen Speakers — Yusef Tharwat",
    seoDescription: "Premium 3D product visualization for Bang & Olufsen speakers, highlighting Scandinavian design and luxury materials with photorealistic realism.",
    publishDate: "2026-07-03",
  },
  {
    title: "Float – Comfort in Motion",
    slug: "float",
    client: "Float",
    industry: "Product",
    categories: ["Product"],
    description:
      "Float is a premium pillow brand focused on delivering exceptional comfort and relaxation. This project involved creating a cinematic 3D product animation that visually communicated the feeling of softness and weightlessness—the inspiration behind the brand's name.",
    challenge:
      "The challenge was to make viewers feel the comfort of the pillow through visuals alone. Since softness is a physical sensation, the animation needed to communicate plushness, support, and relaxation without relying on words.",
    solution:
      "We created a high-end 3D product animation that used soft lighting, realistic fabric simulation, detailed material creation, and smooth, floating camera movements to reinforce the pillow's luxurious comfort. Every visual element was designed to evoke the sensation of softness and relaxation while maintaining a clean, premium aesthetic.",
    process:
      "Researched the brand and defined the creative direction. Built the product scene and refined the pillow model. Created realistic fabric materials and soft lighting. Animated the pillow with subtle motion to emphasize comfort and weightlessness. Added cinematic camera movements, rendered the final sequence, and completed compositing and color grading for a polished commercial finish.",
    year: 2026,
    duration: "Pending...",
    software: ["Cinema 4D", "Redshift", "After Effects"],
    services: ["3D Product Visualization", "Product Animation", "Commercial CGI"],
    credits: [{ role: "3D & Motion Design", name: "Yusef Tharwat" }],
    thumbnail: "/projects/float/thumbnail.png",
    hoverVideo: "/projects/float/hero.mp4",
    videoAspectRatio: "16/9",
    heroVideo: "https://player.vimeo.com/video/1206962963?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
    posterImage: "/projects/float/thumbnail.png",
    galleryImages: [],
    behindTheScenesImages: [],
    tags: ["Product", "CGI", "Comfort", "Fabric"],
    featured: true,
    seoTitle: "Float – Comfort in Motion — Yusef Tharwat",
    seoDescription: "Cinematic 3D product animation for Float, a premium pillow brand communicating softness and weightlessness through CGI.",
    publishDate: "2026-07-03",
  },
  {
    title: "Memorug — Keep the Memory",
    slug: "memorug",
    client: "Memorug",
    industry: "Product",
    categories: ["Product"],
    description:
      "Memorug is a custom wall rug brand that transforms personal photos into beautifully carved textile artwork, turning meaningful memories into timeless home décor. This project focused on creating a premium product animation that highlighted both the craftsmanship and emotional value of the brand.",
    challenge:
      "The challenge was to showcase a highly tactile product in a way that conveyed both its premium quality and the emotional connection behind each custom-made rug, while making the visuals feel elegant and memorable.",
    solution:
      "We created a cinematic 3D product animation that emphasized the rug's texture, carving details, and personalized artwork through carefully crafted lighting, realistic materials, and smooth camera movements to reinforce the brand's premium identity.",
    process:
      "We began by studying the product and defining the visual direction, then modeled and refined the scene, developed realistic materials and lighting, animated the product and camera, and finished with rendering, compositing, and color grading to deliver a polished final film.",
    year: 2026,
    duration: "Pending...",
    software: ["Cinema 4D", "Redshift", "After Effects"],
    services: [],
    credits: [{ role: "3D & Motion Design", name: "Yusef Tharwat" }],
    thumbnail: "/projects/memorug/thumbnail.png",
    hoverVideo: "/projects/memorug/hero.mp4",
    videoAspectRatio: "9/16",
    heroVideo: "https://player.vimeo.com/video/1206963171?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
    posterImage: "/projects/memorug/thumbnail.png",
    galleryImages: [],
    behindTheScenesImages: [],
    tags: [],
    featured: true,
    seoTitle: "Memorug — 3D Visualization",
    seoDescription: "3D visualization and motion design for Memorug.",
    publishDate: "2026-07-03",
  },
  {
    title: "Arinture – Premium Furniture Showcase",
    slug: "arinture",
    client: "Arinture",
    industry: "Furniture",
    categories: ["Furniture"],
    description:
      "Arinture is a premium UK furniture brand specializing in wooden and leather furniture pieces. This project involved creating a high-end 3D promotional video that showcased the brand's craftsmanship, materials, and product elegance through cinematic visuals.",
    challenge:
      "The main challenge was to present the furniture in a way that highlighted the richness of the wood and leather materials while communicating a premium, luxury-brand aesthetic suitable for the UK market.",
    solution:
      "We created a cinematic 3D product showcase using realistic material creation, detailed lighting, and smooth camera animations. The video focused on emphasizing the natural wood textures, leather finishes, and refined product details to elevate the brand's visual identity.",
    process:
      "Studied the brand and defined the visual direction. Built and refined the 3D scene and furniture assets. Created realistic wood and leather materials. Designed cinematic lighting and camera movement. Animated the product showcase. Rendered, composited, and color graded the final video for a polished premium look.",
    year: 2026,
    duration: "Pending...",
    software: ["Blender", "After Effects", "Cycles"],
    services: ["3D Product Visualization", "Product Animation", "Commercial CGI"],
    credits: [{ role: "3D & Motion Design", name: "Yusef Tharwat" }],
    thumbnail: "/projects/arinture/thumbnail.png",
    hoverVideo: "/projects/arinture/hero.mp4",
    videoAspectRatio: "9/16",
    heroVideo: "https://player.vimeo.com/video/1206959958?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
    posterImage: "/projects/arinture/thumbnail.png",
    galleryImages: [],
    behindTheScenesImages: [],
    tags: ["Furniture", "CGI", "Luxury", "Wood", "Leather"],
    featured: true,
    seoTitle: "Arinture – Premium Furniture Showcase — Yusef Tharwat",
    seoDescription: "High-end 3D promotional video showcasing Arinture's premium wooden and leather furniture through cinematic CGI.",
    publishDate: "2026-07-03",
  },
  {
    title: "Adidas Samba – Product Visualization",
    slug: "adidas-samba",
    client: "Adidas (Not Official)",
    industry: "Product",
    categories: ["Product"],
    description:
      "This personal product visualization was created to showcase the iconic Adidas Samba through a series of premium, photorealistic 3D renders. The goal was to capture the shoe's timeless design and craftsmanship with a clean, commercial-quality presentation.",
    challenge:
      "The challenge was to recreate the Adidas Samba with a high level of realism while accurately representing its distinctive materials, proportions, and fine details. Every render needed to feel premium enough to match the visual standards of professional footwear advertising.",
    solution:
      "We focused on realistic material creation, precise lighting, and carefully composed camera angles to emphasize the leather, suede, and rubber textures. The renders were designed to highlight the product's iconic silhouette while delivering a polished, luxury-inspired aesthetic.",
    process:
      "Gathered reference images and studied the shoe's materials and construction. Modeled and refined the Adidas Samba with close attention to detail. Created realistic shaders for leather, suede, and rubber components. Designed studio lighting and camera compositions to enhance the product's form. Rendered the final images and completed post-processing to achieve a clean, commercial-quality finish.",
    year: 2026,
    duration: "Pending...",
    software: ["Cinema 4D", "Redshift", "After Effects"],
    services: ["3D Product Visualization", "Commercial CGI"],
    credits: [{ role: "3D & Motion Design", name: "Yusef Tharwat" }],
    thumbnail: "/projects/adidas/thumbnail.png",
    hoverVideo: "/projects/adidas/hero.mp4",
    videoAspectRatio: "4/5",
    heroVideo: "https://player.vimeo.com/video/1206962788?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
    posterImage: "/projects/adidas/thumbnail.png",
    galleryImages: [
      "/projects/adidas/gallery-1.png",
      "/projects/adidas/gallery-2.png",
      "/projects/adidas/gallery-3.png",
      "/projects/adidas/gallery-4.png",
      "/projects/adidas/gallery-5.png",
    ],
    behindTheScenesImages: [],
    tags: ["Product", "CGI", "Footwear", "Apparel"],
    featured: true,
    seoTitle: "Adidas Samba – Product Visualization — Yusef Tharwat",
    seoDescription: "Photorealistic 3D product visualization of the iconic Adidas Samba, showcasing premium materials and commercial lighting.",
    publishDate: "2026-07-03",
  },
  {
    title: "Ritzi Faucet – Product Showcase",
    slug: "ritzi-faucet",
    client: "Elsewedy Industries",
    industry: "Product",
    categories: ["Product"],
    description:
      "The Ritzi Faucet Animation was a premium 3D product animation created for Elsewedy Industries to showcase the design, functionality, and craftsmanship of the Ritzi faucet. The project focused on presenting the product with cinematic visuals and photorealistic quality suitable for commercial marketing.",
    challenge:
      "The challenge was to transform an everyday product into a visually engaging commercial while accurately showcasing its premium materials, elegant design, and fine details. The animation needed to communicate quality and sophistication through realistic visuals.",
    solution:
      "We created the animation using Blender Cycles for photorealistic rendering and Adobe After Effects for compositing and post-production. Realistic materials, studio lighting, fluid camera movements, and close-up product shots were used to highlight the faucet's finish, form, and craftsmanship.",
    process:
      "Studied the product and established the creative direction. Modeled and refined the faucet with attention to accurate proportions and fine details. Created realistic metal materials and studio lighting in Blender Cycles. Animated cinematic camera movements to showcase the product from multiple angles. Rendered the final sequences and completed compositing, color grading, and finishing touches in Adobe After Effects to deliver a polished commercial-quality animation.",
    year: 2026,
    duration: "Pending...",
    software: ["Blender", "Cycles", "After Effects"],
    services: ["3D Product Visualization", "Product Animation", "Commercial CGI"],
    credits: [{ role: "3D & Motion Design", name: "Yusef Tharwat" }],
    thumbnail: "/projects/ritzy-facade/thumbnail.png",
    hoverVideo: "/projects/ritzy-facade/hero.mp4",
    videoAspectRatio: "9/16",
    heroVideo: "https://player.vimeo.com/video/1184436257?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
    posterImage: "/projects/ritzy-facade/thumbnail.png",
    galleryImages: [],
    behindTheScenesImages: [],
    tags: ["Product", "CGI", "Faucet", "Visualization"],
    featured: true,
    seoTitle: "Ritzi Faucet Animation — Yusef Tharwat",
    seoDescription: "Cinematic 3D product animation for Elsewedy Industries, showcasing the premium Ritzi faucet with realistic metallic materials using Blender Cycles.",
    publishDate: "2026-07-03",
  },
  {
    title: "Nike Shoe – Product Visualization",
    slug: "nike-shoe",
    client: "Nike (Not Official)",
    industry: "Apparel",
    categories: ["Product"],
    description: "This personal 3D product visualization was created to showcase a Nike sneaker through a series of cinematic, photorealistic renders. The project focused on capturing the shoe's dynamic design, premium materials, and performance-inspired aesthetic with a commercial-quality presentation.",
    challenge: "The challenge was to recreate the sneaker with a high level of realism while accurately representing its materials, stitching, and intricate design details. The renders needed to communicate both the product's athletic performance and premium visual appeal.",
    solution: "We developed realistic materials, detailed lighting, and carefully composed camera angles to highlight the shoe's textures, silhouette, and craftsmanship. The result was a collection of high-end product renders inspired by modern footwear advertising.",
    process: "Collected reference images and analyzed the shoe's design and construction. Modeled and refined the sneaker with close attention to proportions and fine details. Created photorealistic materials for the fabric, leather, rubber, and other components. Designed premium studio lighting and cinematic compositions to emphasize the product's form. Rendered the final images and completed post-processing to achieve a polished, commercial-quality result.",
    year: 2026,
    duration: "Pending...",
    software: ["Blender", "Cycles", "After Effects"],
    services: ["3D Product Visualization", "Commercial CGI"],
    credits: [{ role: "3D & Motion Design", name: "Yusef Tharwat" }],
    thumbnail: "/projects/nike-shoe/thumbnail.png",
    hoverVideo: "/projects/nike-shoe/video1.mp4",
    heroVideo: "https://player.vimeo.com/video/1206960441?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
    stackedVideos: [
      "https://player.vimeo.com/video/1206960441?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
      "https://player.vimeo.com/video/1206960442?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
      "https://player.vimeo.com/video/1206965653?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
    ],
    stackedVideoLabels: ["Main", "VFX 1", "VFX 2"],
    stackedVideoAspectRatios: ["1920/1350", "9/16", "16/9"],
    posterImage: "/projects/nike-shoe/thumbnail.png",
    galleryImages: [],
    behindTheScenesImages: [],
    tags: ["Product", "CGI", "Apparel", "Footwear", "Nike"],
    featured: true,
    seoTitle: "Nike Shoe – Product Visualization — Yusef Tharwat",
    seoDescription: "Cinematic photorealistic 3D product visualization for a Nike sneaker showcasing athletic performance and premium materials.",
    publishDate: "2026-07-03",
  },
  {
    title: "Manilotti Kitchen Collection – 3D Product Animation",
    slug: "manilotti-collection",
    client: "Manilotti (Italian Kitchen Appliance Brand)",
    industry: "Product",
    categories: ["Product"],
    description:
      "This project was a premium 3D product animation showcasing three of Manilotti's kitchen appliances—the oven, coffee machine, and microwave—within a modern luxury apartment. The goal was to present the products in a realistic lifestyle setting that reflected the brand's Italian design philosophy and premium positioning.",
    challenge:
      "The challenge was to seamlessly integrate multiple products into a single cinematic environment while ensuring each appliance received individual attention. The animation needed to highlight both the functionality of the products and how they complemented a high-end contemporary interior.",
    solution:
      "We created a photorealistic apartment environment and used cinematic lighting, realistic materials, and smooth camera movements to naturally showcase the oven, coffee machine, and microwave. The lifestyle-focused presentation helped reinforce Manilotti's premium brand identity while demonstrating how the products fit into an elegant modern kitchen.",
    process:
      "Planned the visual concept and designed the luxury apartment environment. Modeled and refined the kitchen scene and integrated the three Manilotti appliances. Created realistic materials, lighting, and interior details to achieve a premium atmosphere. Animated cinematic camera movements that showcased each product individually and as part of the complete kitchen. Rendered the animation, completed compositing and color grading, and delivered a polished commercial-quality product showcase.",
    year: 2026,
    duration: "Pending...",
    software: ["Blender", "Cycles", "After Effects"],
    services: ["3D Product Animation", "Environment Design", "Commercial CGI"],
    credits: [{ role: "3D & Motion Design", name: "Yusef Tharwat" }],
    thumbnail: "/projects/manilotti-collection/thumbnail.png",
    hoverVideo: "/projects/manilotti-collection/hero.mp4",
    videoHoverScale: 2.50,
    videoAspectRatio: "1080/1920",
    heroVideo: "https://player.vimeo.com/video/1206984871?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
    posterImage: "/projects/manilotti-collection/thumbnail.png",
    galleryImages: [],
    behindTheScenesImages: [],
    tags: ["Product", "CGI", "Kitchen", "Visualization", "Manilotti"],
    featured: true,
    seoTitle: "Manilotti Kitchen Collection — Yusef Tharwat",
    seoDescription: "Premium 3D product animation showcasing Manilotti's kitchen appliances in a modern luxury apartment using Blender Cycles.",
    publishDate: "2026-07-03",
  },
  {
    title: "Manilotti Stand Cooker – Premium Product Showcase",
    slug: "manilotti",
    client: "Manilotti",
    industry: "Product",
    categories: ["Product"],
    description:
      "Manilotti is an Italian kitchen appliance brand known for combining elegant design with everyday functionality. This project involved creating a cinematic 3D product animation for the brand's stand cooker, showcasing its premium craftsmanship, modern aesthetics, and key product features.",
    challenge:
      "The challenge was to present the stand cooker as both a high-performance appliance and a premium lifestyle product. The animation needed to emphasize its Italian-inspired design, quality materials, and functional details while maintaining a clean, sophisticated commercial look.",
    solution:
      "We created a high-end 3D product animation using realistic materials, studio-quality lighting, and dynamic camera movements to highlight the cooker's design and features. Carefully composed close-up shots showcased the stainless-steel finish, control panel, and overall build quality, reinforcing Manilotti's premium brand identity.",
    process:
      "Studied the product and established the visual direction. Modeled and refined the stand cooker with accurate proportions and fine details. Developed realistic materials and a premium studio environment. Designed cinematic lighting and camera animations to emphasize the product's craftsmanship and functionality. Rendered the final animation, completed compositing and color grading, and delivered a polished commercial-ready product showcase.",
    year: 2026,
    duration: "Pending...",
    software: ["Blender", "Cycles", "After Effects"],
    services: ["3D Product Visualization", "Product Animation", "Commercial CGI"],
    credits: [{ role: "3D & Motion Design", name: "Yusef Tharwat" }],
    thumbnail: "/projects/manilotti/thumbnail-v2.png",
    hoverVideo: "/projects/manilotti/hero.mp4",
    videoAspectRatio: "9/16",
    heroVideo: "https://player.vimeo.com/video/1203574103?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
    posterImage: "/projects/manilotti/thumbnail-v2.png",
    galleryImages: [],
    behindTheScenesImages: [],
    tags: ["Product", "CGI", "Kitchen Appliance", "Stainless Steel"],
    featured: true,
    seoTitle: "Manilotti Stand Cooker – Premium Product Showcase — Yusef Tharwat",
    seoDescription: "Cinematic 3D product animation showcasing the premium craftsmanship and modern aesthetics of the Manilotti stand cooker.",
    publishDate: "2026-07-03",
  },
  {
    title: "Audi RS5 – Automotive Commercial",
    slug: "audi-rs5",
    client: "Personal Project",
    industry: "Automotive",
    categories: ["Product", "Motion Design"],
    description: "This personal project was our exploration into automotive animation, an area outside our usual specialization in product visualization. We created a cinematic commercial featuring the Audi RS5 to challenge ourselves, expand our skill set, and experiment with storytelling in the automotive industry.",
    challenge: "As automotive visualization is not our primary field, the challenge was to learn the unique workflows involved in creating dynamic car commercials while achieving the level of realism and cinematic quality expected from automotive advertising.",
    solution: "We applied the same attention to detail we use in product visualization, focusing on realistic materials, cinematic lighting, dynamic camera movements, and polished rendering. The result was a commercial-style animation that captured the Audi RS5's aggressive design and performance-oriented character while allowing us to explore a new creative discipline.",
    process: "Researched automotive commercial references and established the visual direction. Built and refined the scene, ensuring the vehicle and environment complemented each other. Developed realistic paint, glass, metal, and tire materials to achieve a premium look. Animated cinematic camera movements to showcase the car's design, proportions, and performance. Rendered the final animation, completed compositing and color grading, and polished the commercial to demonstrate our ability to adapt our 3D skills beyond our core specialization.",
    year: 2026,
    duration: "Pending...",
    software: ["Blender", "After Effects"],
    services: ["3D Animation", "Automotive Visualization", "Commercial CGI"],
    credits: [{ role: "3D & Motion Design", name: "Yusef Tharwat" }],
    thumbnail: "/projects/audi-rs5/thumbnail.png",
    hoverVideo: "/projects/audi-rs5/video.mp4",
    heroVideo: "https://player.vimeo.com/video/1206959692?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
    hoverStartTime: 4,
    posterImage: "/projects/audi-rs5/thumbnail.png",
    galleryImages: [],
    behindTheScenesImages: [],
    tags: ["Automotive", "CGI", "Animation", "Audi", "Commercial"],
    featured: true,
    seoTitle: "Audi RS5 Automotive Commercial — Yusef Tharwat",
    seoDescription: "A cinematic 3D automotive commercial featuring the Audi RS5, focusing on realistic materials and dynamic camera movements.",
    publishDate: "2026-07-03",
  },
  {
    title: "Egyptian Statue Invades Vélez-Blanco Castle Museum!",
    slug: "egyptian-statue",
    client: "Personal Project",
    industry: "VFX",
    categories: ["Product", "VFX"],
    description: "This VFX project reimagines an ancient Egyptian cat statue mysteriously coming to life inside the Vélez-Blanco Castle Museum. Using seamless visual effects and cinematic storytelling, the animation transforms a modern museum setting into a supernatural encounter inspired by ancient Egyptian mythology.",
    challenge: "The challenge was to create a believable transformation that blended CGI with live-action footage. The VFX needed to feel natural within the museum environment while making the ancient Egyptian cat appear as though it truly belonged in the scene.",
    solution: "We combined 3D animation, camera tracking, realistic lighting, and compositing to morph a regular cat into an ancient Egyptian-inspired statue. Careful attention was given to matching the lighting, perspective, and movement of the live-action footage, resulting in a seamless integration between the CGI and the real environment.",
    process: "Planned the transformation sequence and gathered visual references for ancient Egyptian cat statues. Tracked the live-action footage and prepared the scene for CGI integration. Modeled, textured, and animated the Egyptian cat transformation. Matched the lighting and camera movement to ensure realistic interaction with the museum environment. Composited the CGI with the live-action footage, added visual effects and color grading, and finalized the cinematic sequence for a convincing VFX result.",
    year: 2026,
    duration: "Pending...",
    software: ["Blender", "After Effects", "Camera Tracking"],
    services: ["VFX", "Compositing", "3D Animation"],
    credits: [{ role: "VFX & Compositing", name: "Yusef Tharwat" }],
    thumbnail: "/projects/egyptian-statue/thumbnail.png",
    hoverVideo: "/projects/egyptian-statue/video.mp4",
    videoAspectRatio: "9/16",
    heroVideo: "https://player.vimeo.com/video/1206960144?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
    posterImage: "/projects/egyptian-statue/thumbnail.png",
    galleryImages: [],
    behindTheScenesImages: [],
    tags: ["VFX", "Compositing", "Animation", "Egyptian", "Museum"],
    featured: true,
    seoTitle: "Egyptian Statue Invades Museum — Yusef Tharwat",
    seoDescription: "A VFX project featuring an ancient Egyptian cat statue mysteriously coming to life inside the Vélez-Blanco Castle Museum.",
    publishDate: "2026-07-03",
  },
  {
    title: "Amazon Furniture – Endless Possibilities",
    slug: "amazon-furniture",
    client: "Amazon (Concept Project)",
    industry: "Product",
    categories: ["Product", "Motion Design"],
    description:
      "This concept 3D animation follows an Amazon box as it rolls through a home, repeatedly unfolding into different fully furnished rooms. The project was designed to creatively showcase Amazon's diverse furniture collection through a seamless visual transformation that blends product advertising with cinematic storytelling.",
    challenge:
      "The challenge was to create smooth, believable transitions between multiple interior environments while keeping the Amazon box as the central visual element. Each transformation needed to feel seamless, engaging, and clearly communicate the variety of furniture available.",
    solution:
      "We developed a cinematic animation where the Amazon box acts as the visual bridge between different rooms, unfolding into new living spaces with each transition. Through dynamic camera work, realistic lighting, and carefully designed environments, the animation emphasized the breadth of Amazon's furniture offerings in a memorable and visually engaging way.",
    process:
      "Developed the concept and planned the transformation sequence between rooms. Designed and built multiple interior environments featuring different furniture styles. Animated the Amazon box to roll, unfold, and transition naturally between each space. Created realistic materials, lighting, and camera movements to maintain visual continuity. Rendered the final animation and completed compositing and color grading to achieve a polished commercial-quality concept film.",
    year: 2026,
    duration: "Pending...",
    software: ["Blender", "Cycles", "After Effects"],
    services: ["3D Animation", "Commercial CGI", "Motion Design"],
    credits: [{ role: "3D & Motion Design", name: "Yusef Tharwat" }],
    thumbnail: "/projects/amazon-furniture/thumbnail.png",
    hoverVideo: "/projects/amazon-furniture/hero.mp4",
    videoAspectRatio: "1080/1330",
    heroVideo: "https://player.vimeo.com/video/1206980186?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
    posterImage: "/projects/amazon-furniture/thumbnail.png",
    galleryImages: [],
    behindTheScenesImages: [],
    tags: ["Product", "CGI", "Furniture", "Amazon", "Animation"],
    featured: true,
    seoTitle: "Amazon Furniture – Endless Possibilities — Yusef Tharwat",
    seoDescription: "A cinematic 3D concept animation for Amazon showcasing a box unfolding into fully furnished rooms to highlight Amazon's diverse furniture collection.",
    publishDate: "2026-07-04",
  },
  {
    title: "Porsche 911 – Cloth Simulation Reveal",
    slug: "porsche-911",
    client: "Personal Project",
    industry: "Automotive",
    categories: ["Product", "Motion Design"],
    description:
      "This personal project explores the use of cloth simulation to create a cinematic reveal of the Porsche 911. A flowing fabric gradually uncovers the car, emphasizing its iconic silhouette while demonstrating realistic cloth physics and high-end automotive visualization.",
    challenge:
      "The challenge was to create a natural and convincing cloth simulation that interacted realistically with the vehicle while maintaining a smooth, cinematic reveal. The movement of the fabric needed to feel believable and enhance the anticipation of the final reveal.",
    solution:
      "Using advanced cloth simulation techniques, we animated a fabric cover that naturally draped over and revealed the Porsche 911. Realistic lighting, premium materials, and carefully choreographed camera movements worked together to create an elegant, commercial-style sequence focused on both the vehicle and the simulation itself.",
    process:
      "Planned the reveal sequence and established the cinematic direction. Prepared the Porsche 911 model and scene for cloth interaction. Simulated and refined the fabric to achieve realistic folds, movement, and collisions. Designed studio lighting and cinematic camera movements to enhance the reveal. Rendered the final animation and completed compositing and color grading to produce a polished showcase of both the automotive visualization and cloth simulation techniques.",
    year: 2026,
    duration: "Pending...",
    software: ["Blender", "Cycles", "After Effects"],
    services: ["3D Animation", "Automotive Visualization", "Cloth Simulation"],
    credits: [{ role: "3D & Motion Design", name: "Yusef Tharwat" }],
    thumbnail: "/projects/porsche-911/thumbnail.png",
    hoverVideo: "/projects/porsche-911/hero.mp4",
    videoAspectRatio: "1920/1350",
    videoMaxWidth: "max-w-3xl",
    heroVideo: "https://player.vimeo.com/video/1206985824?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
    posterImage: "/projects/porsche-911/thumbnail.png",
    galleryImages: [],
    behindTheScenesImages: [],
    tags: ["Automotive", "CGI", "Porsche", "Cloth Simulation", "Animation"],
    featured: true,
    seoTitle: "Porsche 911 – Cloth Simulation Reveal — Yusef Tharwat",
    seoDescription: "A cinematic 3D animation featuring a cloth simulation reveal of the Porsche 911, showcasing realistic fabric physics and high-end automotive visualization.",
    publishDate: "2026-07-04",
  },
  {
    title: "Qamaria Coffee Shop – Giant Coffee Machine VFX",
    slug: "qamaria-coffee",
    client: "Qamaria Coffee Shop (USA)",
    industry: "VFX",
    categories: ["VFX", "Product"],
    description:
      "This VFX commercial was created for Qamaria Coffee Shop in the USA, featuring a giant coffee machine mounted on top of the café that pours freshly brewed coffee into an oversized cup on the back of a passing truck before it drives away. The concept was designed to create a memorable, shareable advertisement by blending reality with imaginative visual effects.",
    challenge:
      "The challenge was to seamlessly integrate a massive CGI coffee machine into a real-world environment while making the interaction with the truck and oversized coffee cup feel believable. The visual effects needed to maintain realistic scale, lighting, and perspective despite the exaggerated concept.",
    solution:
      "We combined 3D animation, camera tracking, realistic compositing, and cinematic VFX techniques to bring the concept to life. Careful attention was given to matching the live-action footage, creating convincing coffee simulations, and ensuring the giant machine naturally interacted with the environment to produce a fun, eye-catching commercial.",
    process:
      "Planned the creative concept and storyboard for the commercial. Tracked the live-action footage to accurately integrate the CGI elements. Modeled, textured, and animated the giant coffee machine and oversized coffee cup. Simulated the flowing coffee and synchronized the animation with the moving truck. Composited the CGI with the live-action footage, matched lighting and color, and completed the final commercial with cinematic finishing touches.",
    year: 2026,
    duration: "Pending...",
    software: ["Blender", "After Effects", "Camera Tracking"],
    services: ["VFX", "Compositing", "3D Animation", "Commercial CGI"],
    credits: [{ role: "VFX & Compositing", name: "Yusef Tharwat" }],
    thumbnail: "/projects/qamaria-coffee/thumbnail.png",
    hoverVideo: "/projects/qamaria-coffee/hero.mp4",
    videoAspectRatio: "720/1280",
    heroVideo: "https://player.vimeo.com/video/1206987605?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1",
    posterImage: "/projects/qamaria-coffee/thumbnail.png",
    galleryImages: [],
    behindTheScenesImages: [],
    tags: ["VFX", "Compositing", "Coffee", "Commercial", "Qamaria"],
    featured: true,
    seoTitle: "Qamaria Coffee Shop – Giant Coffee Machine VFX — Yusef Tharwat",
    seoDescription: "A VFX commercial for Qamaria Coffee Shop featuring a giant CGI coffee machine pouring coffee into an oversized cup on a passing truck.",
    publishDate: "2026-07-04",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    clientName: "Elena Kovacs",
    company: "Arinture",
    country: "UK",
    review:
      "Yusef delivered imagery indistinguishable from a physical shoot, weeks before a single unit was manufactured. Our launch shipped on time because of it.",
  },
  {
    clientName: "James Whitfield",
    company: "Nordic Health",
    country: "Sweden",
    review:
      "The cutaway animation made a genuinely complex product feel simple. It's the piece our sales team reaches for most.",
  },
  {
    clientName: "Priya Raman",
    company: "Halcyon",
    country: "United States",
    review:
      "The material work was the whole pitch. Fabric, metal, light — it all held up at full screen, frame by frame.",
  },
];

const TESTIMONIALS_AR: Testimonial[] = [
  {
    clientName: "إيلينا كوفاكس",
    company: "Arinture",
    country: "UK",
    review:
      "يوسف قدملنا صور صعب تفرقها عن التصوير الحقيقي، وقبل أسابيع من تصنيع أي قطعة. إطلاق منتجنا تم في ميعاده بسببه.",
  },
  {
    clientName: "جيمس ويتفيلد",
    company: "Nordic Health",
    country: "السويد",
    review:
      "فيديو الثري دي خلى منتج معقد جداً يبدو بسيط. ده أكتر فيديو فريق المبيعات بيعتمد عليه.",
  },
  {
    clientName: "بريا رامان",
    company: "Halcyon",
    country: "الولايات المتحدة",
    review:
      "شغل الخامات كان هو اللي باع المشروع. القماش، المعدن، الإضاءة — كل حاجة كانت متقنة فريم بفريم.",
  },
];

const SERVICES: Service[] = [
  { title: "3D Product Visualization", description: "Photoreal stills built from CAD or reference, ready for hero imagery, retail, and print." },
  { title: "Product Animation", description: "Cinematic product films that reveal form, function, and material with intent." },
  { title: "Motion Design", description: "Typographic and abstract motion for brand, campaign, and social contexts." },
  { title: "Commercial CGI", description: "End-to-end CGI campaigns replacing or extending traditional photography and film." },
  { title: "VFX", description: "Compositing, simulation, and integration work for hybrid live-action and CGI pieces." },
  { title: "Creative Direction", description: "Concept and art direction across a project, from mood to final frame." },
];

const SERVICES_AR: Service[] = [
  { title: "تخيل منتج 3D", description: "صور واقعية مبنية من ملفات CAD أو مراجع، جاهزة للحملات والمطبوعات." },
  { title: "أنيميشن منتج", description: "أفلام سينمائية للمنتجات بتبرز شكلها ووظيفتها وخاماتها بصورة متعوب عليها." },
  { title: "موشن ديزاين", description: "حركة وتايبوجرافي للبراندات والحملات الإعلانية ومواقع التواصل." },
  { title: "إعلانات CGI", description: "حملات CGI متكاملة ممكن تغني عن التصوير التقليدي أو تكمله." },
  { title: "مؤثرات بصرية (VFX)", description: "شغل كومبوزيتنج ودمج بين التصوير الحي والـ CGI." },
  { title: "إدارة إبداعية", description: "بمسك المشروع من أول الفكرة وتحديد المود لحد ما نسلم الفايلات." },
];

// Arabic translations for project content (keyed by slug)
const PROJECTS_AR_OVERRIDES: Record<string, Partial<Project>> = {
  "audi-rs5": {
    title: "أودي RS5 – إعلان عربيات 3D",
    description: "المشروع الشخصي ده كان تجربة ليا في مجال أنيميشن العربيات، وده مجال بره تخصصي المعتاد في تصوير المنتجات. عملت إعلان سينمائي لأودي RS5 عشان أتحدى نفسي، أطور مهاراتي، وأجرب سرد القصص في عالم العربيات.",
    challenge: "بما إن تصوير العربيات مش مجالي الأساسي، التحدي كان إني أتعلم أساليب الشغل الخاصة بعمل إعلانات عربيات ديناميكية، مع الحفاظ على مستوى الواقعية والجودة السينمائية اللي بتتميز بيها إعلانات العربيات المحترفة.",
    solution: "استخدمت نفس الاهتمام بالتفاصيل اللي بطبقه في تصوير المنتجات، وركزت على الخامات الواقعية، الإضاءة السينمائية، حركات الكاميرا السريعة، وجودة الريندر. النتيجة كانت إعلان 3D بيبرز تصميم الـ RS5 الهجومي وأدائها الرياضي، وسمحلي أستكشف مساحة إبداعية جديدة.",
    process: "جمعت مراجع لإعلانات العربيات وحددت الاتجاه البصري. بنيت المشهد وجهزت العربية والبيئة حواليها. عملت خامات واقعية لدهان العربية، الإزاز، المعدن، والكاوتش عشان تطلع فخمة. حركت الكاميرا بأسلوب سينمائي يبرز تصميم العربية وأبعادها. وفي النهاية عملت الريندر والكومبوزيتنج وتصحيح الألوان عشان أطلع بإعلان احترافي.",
  },
  "egyptian-statue": {
    title: "تمثال مصري يغزو متحف قلعة فيليز-بلانكو!",
    description: "مشروع VFX بيعيد تصور تمثال قطة فرعوني بيصحى فجأة جوه متحف قلعة فيليز-بلانكو. استخدمت دمج سلس للمؤثرات البصرية وسرد سينمائي عشان أحول مشهد متحف عادي لمواجهة خارقة للطبيعة مستوحاة من الأساطير المصرية القديمة.",
    challenge: "التحدي كان إني أعمل تحول مقنع يدمج الـ CGI مع التصوير الحي بسلاسة. المؤثرات كانت لازم تبان طبيعية جوه بيئة المتحف وتخلي القط الفرعوني يبان كأنه جزء حقيقي من المشهد.",
    solution: "دمجت بين الأنيميشن الثري دي، الـ Camera Tracking، إضاءة واقعية، وكومبوزيتنج عشان أحول قطة عادية لتمثال فرعوني. ركزت جداً في تطابق الإضاءة، المنظور، والحركة مع الفيديو الأصلي عشان تطلع النتيجة طبيعية.",
    process: "خططت لمشهد التحول وجمعت مراجع لتماثيل القطط الفرعونية. عملت تتبع (Tracking) للفيديو الأصلي وجهزت المشهد لدمج الـ CGI. صممت الموديل والخامات وحركت القطة. طابقت الإضاءة وحركة الكاميرا وفي النهاية عملت الكومبوزيتنج وتصحيح الألوان للمشهد.",
  },
  "nike-shoe": {
    title: "حذاء نايك – عرض منتج 3D",
    description: "المشروع ده عبارة عن لقطات 3D سينمائية واقعية لعرض كوتشي نايك. التركيز كان على إبراز التصميم، الخامات، والشكل الرياضي.",
    challenge: "التحدي كان إبراز تفاصيل الخياطة والخامات المختلفة بدقة عالية، مع الحفاظ على روح الأداء الرياضي للكوتشي.",
    solution: "عملت خامات واقعية للجلد والقماش والمطاط، واستخدمت إضاءة وزوايا كاميرا مدروسة عشان أطلع المنتج بأفضل صورة إعلانية.",
    process: "جمعت مراجع، صممت الكوتشي بتفاصيله، ضبطت الخامات والإضاءة في الاستوديو، وفي النهاية عملت الريندر والكومبوزيتنج.",
  },
  "bang-olufsen-speakers": {
    title: "سماعات Bang & Olufsen – تصوير منتج 3D",
    description: "المشروع ده عبارة عن لقطات 3D سينمائية واقعية لعرض سماعات Bang & Olufsen. التركيز كان على إبراز التصميم الاسكندنافي الأيقوني، الخامات الفخمة، والتفاصيل الدقيقة.",
    challenge: "التحدي كان إننا نطلع السماعات بواقعية شديدة جداً مع الحفاظ على شكلها الأنيق وروح البراند الفخمة.",
    solution: "طورت خامات واقعية، وضبطت إضاءة الاستوديو، واخترت زوايا كاميرا مدروسة عشان نبرز تفاصيل الألمنيوم، أنسجة القماش، والتصميم البسيط.",
    process: "جمعت صور ودرست التصميم كويس. عملت الموديلنج والخامات، وضبطت إضاءة الاستوديو. أخدت لقطات سينمائية، وخلصت الريندر والبوست برودكشن عشان نطلع بصور جاهزة للحملات الإعلانية.",
  },
  "manilotti-collection": {
    title: "مجموعة مطبخ مانيلوتي – أنيميشن منتج 3D",
    description: "المشروع ده كان أنيميشن 3D فاخر بيعرض تلات أجهزة من أجهزة مطبخ مانيلوتي — الفرن، مكنة القهوة، والميكروويف — في شقة مودرن راقية.",
    challenge: "التحدي كان في دمج الأجهزة دي كلها في بيئة سينمائية واحدة مع التأكيد على إن كل جهاز ياخد حقه في العرض.",
    solution: "بنيت بيئة شقة واقعية واستخدمت إضاءة سينمائية وخامات ممتازة مع حركات كاميرا ناعمة عشان أعرض الأجهزة التلاتة بشكل طبيعي وفخم.",
    process: "خططت للفكرة وصممت الشقة. عملت الموديلنج للمطبخ ودمجت الأجهزة جواه. ضبطت الخامات والإضاءة. حركت الكاميرا بأسلوب سينمائي، وخلصت الريندر والـ Color Grading لحد التسليم.",
  },
  "ritzi-faucet": {
    title: "صنبور ريتزي – عرض منتج 3D",
    description: "أنيميشن ريتزي كان فيديو 3D اتعمل لشركة السويدي عشان نعرض من خلاله التصميم، الوظايف، والتفاصيل المتقنة للصنبور.",
    challenge: "التحدي كان إزاي نحول منتج يومي عادي لإعلان بصري جذاب، مع إبراز الخامات المعدنية الفخمة وتفاصيله الدقيقة.",
    solution: "عملت الأنيميشن بـ Blender Cycles عشان نطلع بصورة واقعية، واستخدمت After Effects في الكومبوزيتنج عشان نبرز لمعة المعدن وشكل المنتج.",
    process: "درست المنتج وحددت المود الإبداعي. صممت الصنبور بتفاصيله الدقيقة. جهزت خامات المعدن وإضاءة الاستوديو. حركت الكاميرا وطلعت الريندر، وبعدها فنشت الألوان في الآفتر إيفكتس.",
  },
  "adidas-samba": {
    title: "أديداس سامبا – تصوير منتج 3D",
    description: "المشروع ده كان تصوير شخصي لكوتشي أديداس سامبا الأيقوني من خلال صور 3D واقعية. الهدف كان إبراز تصميمه وتفاصيله بشكل احترافي ينفع للإعلانات.",
    challenge: "التحدي الأساسي كان إعادة تصميم الكوتشي بكل خاماته (الجلد، الشامواه، والمطاط) وخياطته عشان يطلع شبه الحقيقي بالظبط.",
    solution: "ركزت جداً على صناعة الخامات والإضاءة، واخترت زوايا كاميرا تبرز ملمس الجلد والشامواه عشان الإعلان يبان واقعي وفخم.",
    process: "جمعت مراجع وصور للكوتشي. عملت موديلنج دقيق، وبعدها شيدرز واقعية للخامات. ضبطت الإضاءة في الاستوديو وعملت الريندر والبوست برودكشن عشان نوصل للفينش النهائي.",
  },
  "manilotti": {
    title: "بوتاجاز مانيلوتي – إعلان منتج 3D",
    description: "مانيلوتي براند إيطالي معروف بالتصميم الأنيق والعملي. المشروع ده كان أنيميشن سينمائي 3D للبوتاجاز بتاعهم، عشان نبرز تصميمه العصري ومميزاته.",
    challenge: "التحدي كان عرض البوتاجاز كمنتج قوي عملياً وفي نفس الوقت قطعة فنية فاخرة في المطبخ.",
    solution: "عملت فيديو 3D جودته عالية، ركزت فيه على استخدام خامات واقعية وإضاءة استوديو مع حركات كاميرا ديناميكية تبرز جمال التصميم.",
    process: "درست البوتاجاز وحددت الاتجاه البصري. عملت الموديلنج بنسب دقيقة. جهزت الخامات وبيئة الاستوديو. ضبطت الكاميرا والأنيميشن وخلصت الريندر والـ Color Grading.",
  },
  "float": {
    title: "فلوت – الراحة في حركة",
    description: "فلوت براند مخدات فاخر بيهتم بتقديم راحة استثنائية. المشروع كان أنيميشن 3D سينمائي بينقل إحساس النعومة والخفة من غير ما نستخدم ولا كلمة.",
    challenge: "التحدي الأكبر كان إزاي نخلي اللي بيتفرج يحس براحة المخدة ونعومتها من خلال الصورة بس.",
    solution: "استخدمت إضاءة ناعمة جداً، محاكاة قماش واقعية، وحركة كاميرا بطيئة وهادية عشان نوصل إحساس الاسترخاء والفخامة في نفس الوقت.",
    process: "عملت بحث عن البراند وحددت المود. بنيت المشهد وظبطت موديل المخدة. عملت خامات القماش الناعمة وحركت المخدة بهدوء. خلصت الريندر والبوست برودكشن.",
  },
  "arinture": {
    title: "أرينتشر – عرض أثاث 3D",
    description: "أرينتشر براند بريطاني للأثاث الراقي، متخصص في الخشب والجلد. المشروع كان فيديو ترويجي 3D بيبرز جمال الخامات وجودة التصنيع.",
    challenge: "التحدي كان تقديم العفش بطريقة تبرز تفاصيل الخشب والجلد وجمالهم، وتوصل إحساس الفخامة للمشاهد.",
    solution: "عملت عرض سينمائي ركزت فيه على الملامس الحقيقية للخشب والجلد مع إضاءة دقيقة وحركة كاميرا سموث جداً.",
    process: "درست البراند، جهزت الأصول والمشهد. صممت خامات الخشب والجلد. حطيت الإضاءة وحركت الكاميرا. ريندر، كومبوزيتنج، وتظبيط ألوان للفيديو النهائي.",
  },
  "memorug": {
    title: "ميموراج - انميشن ثري دي",
    description: "ميموراج براند سجاد حائط كاستم بيحول الصور الشخصية لقطع فنية منسوجة. المشروع ركز على عمل أنيميشن فاخر للمنتج يبرز الشغل اليدوي والقيمة المعنوية وراه.",
    challenge: "التحدي كان عرض منتج ملموس زي السجاد بطريقة تحسسك بجودته وتوصل المشاعر اللي ورا كل سجادة بتتعمل مخصوص.",
    solution: "عملت فيديو 3D ركز على نسيج السجادة، التفاصيل المحفورة، والصورة المخصصة من خلال إضاءة متوظفة صح وحركات كاميرا سلسة.",
    process: "درست المنتج في البداية. بنيت المشهد وظبطت خامات النسيج. ضبطت الإضاءة، حركت الكاميرا، وخلصت الريندر لحد الفينش الأخير للفيديو.",
  },
};

function localizeProjects(locale: "en" | "ar"): Project[] {
  if (locale === "en") return PROJECTS;
  return PROJECTS.map((p) => {
    const overrides = PROJECTS_AR_OVERRIDES[p.slug];
    if (!overrides) return p;
    return { ...p, ...overrides };
  });
}

const delay = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getAllProjects(locale: "en" | "ar" = "en"): Promise<Project[]> {
  await delay();
  return [...localizeProjects(locale)].sort((a, b) => b.year - a.year);
}

export async function getFeaturedProjects(locale: "en" | "ar" = "en"): Promise<Project[]> {
  await delay();
  return localizeProjects(locale).filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string, locale: "en" | "ar" = "en"): Promise<Project | undefined> {
  await delay();
  return localizeProjects(locale).find((p) => p.slug === slug);
}

export async function getRelatedProjects(current: Project, limit = 3): Promise<Project[]> {
  await delay();
  return PROJECTS.filter(
    (p) =>
      p.slug !== current.slug &&
      p.categories.some((c) => current.categories.includes(c))
  ).slice(0, limit);
}

export async function getNextProject(current: Project): Promise<Project> {
  await delay();
  const ordered = [...PROJECTS].sort((a, b) => b.year - a.year);
  const index = ordered.findIndex((p) => p.slug === current.slug);
  return ordered[(index + 1) % ordered.length];
}

export async function getAllProjectSlugs(): Promise<string[]> {
  await delay();
  return PROJECTS.map((p) => p.slug);
}

export async function getTestimonials(locale: "en" | "ar" = "en"): Promise<Testimonial[]> {
  await delay();
  return locale === "ar" ? TESTIMONIALS_AR : TESTIMONIALS;
}

export async function getServices(locale: "en" | "ar" = "en"): Promise<Service[]> {
  await delay();
  return locale === "ar" ? SERVICES_AR : SERVICES;
}

