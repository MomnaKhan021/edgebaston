import { PrismaClient } from "../src/generated/prisma";

const db = new PrismaClient();

async function main() {
  // Idempotent guard: only seed a fresh database. This runs on every Vercel
  // build, so we must never wipe content the client has already added.
  const existingCourses = await db.course.count().catch(() => 0);
  if (existingCourses > 0) {
    console.log(
      `⏭️  Database already has ${existingCourses} course(s) — skipping seed.`,
    );
    return;
  }

  console.log("🌱 Seeding database...");

  // --- Site settings (single row) ---
  await db.siteSetting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      siteName: "Edgebaston College",
      tagline: "Shaping futures through education",
      heroTitle: "Where ambition meets opportunity",
      heroSubtitle:
        "Edgebaston College is a community of learners committed to academic excellence, personal growth, and lifelong success.",
      aboutText:
        "<p>Founded on the belief that education transforms lives, <strong>Edgebaston College</strong> offers a wide range of undergraduate and professional programmes. Our experienced faculty, modern facilities, and supportive community help every student reach their full potential.</p><p>We combine rigorous academics with real-world experience, preparing graduates who are ready to lead in their chosen fields.</p>",
      email: "admissions@edgebaston.edu",
      phone: "+44 121 555 0100",
      address: "1 College Road, Edgbaston, Birmingham B15 2TT, UK",
      primaryColor: "#1e3a5f",
      accentColor: "#c9a227",
    },
  });

  // --- Courses ---
  await db.course.deleteMany();
  const courses = [
    {
      title: "BSc Computer Science",
      slug: "bsc-computer-science",
      category: "Technology",
      level: "Undergraduate",
      duration: "3 years",
      fee: "£9,250 / year",
      summary:
        "Build software, explore AI, and master the foundations of modern computing.",
      content:
        "<h2>Course overview</h2><p>Our BSc Computer Science degree gives you a deep understanding of algorithms, data structures, software engineering, and artificial intelligence. You'll work on real projects and graduate ready for a thriving tech career.</p><h3>What you'll study</h3><ul><li>Programming &amp; software design</li><li>Data structures &amp; algorithms</li><li>Machine learning &amp; AI</li><li>Databases &amp; cloud systems</li></ul>",
      imageUrl:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
      featured: true,
      order: 1,
    },
    {
      title: "BA Business Management",
      slug: "ba-business-management",
      category: "Business",
      level: "Undergraduate",
      duration: "3 years",
      fee: "£9,250 / year",
      summary:
        "Develop the leadership, strategy, and financial skills to run modern organisations.",
      content:
        "<h2>Course overview</h2><p>The BA Business Management programme blends theory with practice. Learn strategy, marketing, finance, and people management from industry-experienced tutors.</p><h3>Career paths</h3><ul><li>Management consultant</li><li>Marketing manager</li><li>Entrepreneur</li></ul>",
      imageUrl:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      featured: true,
      order: 2,
    },
    {
      title: "BSc Nursing & Healthcare",
      slug: "bsc-nursing-healthcare",
      category: "Health",
      level: "Undergraduate",
      duration: "3 years",
      fee: "£9,250 / year",
      summary:
        "Train to become a compassionate, skilled healthcare professional.",
      content:
        "<h2>Course overview</h2><p>Gain the clinical knowledge and hands-on placement experience needed to launch a rewarding career in nursing and healthcare.</p>",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      featured: true,
      order: 3,
    },
    {
      title: "BA Graphic Design",
      slug: "ba-graphic-design",
      category: "Arts",
      level: "Undergraduate",
      duration: "3 years",
      fee: "£9,250 / year",
      summary: "Turn creativity into a career across digital and print media.",
      content:
        "<h2>Course overview</h2><p>Explore typography, branding, motion, and digital design in our creative studios. Build a portfolio that gets you hired.</p>",
      imageUrl:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
      featured: false,
      order: 4,
    },
    {
      title: "Diploma in Accounting & Finance",
      slug: "diploma-accounting-finance",
      category: "Business",
      level: "Diploma",
      duration: "1 year",
      fee: "£6,500",
      summary:
        "A fast-track route into the world of accounting and financial services.",
      content:
        "<h2>Course overview</h2><p>This intensive diploma covers bookkeeping, financial reporting, and taxation — perfect for career changers and school leavers alike.</p>",
      imageUrl:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
      featured: false,
      order: 5,
    },
    {
      title: "MSc Data Science",
      slug: "msc-data-science",
      category: "Technology",
      level: "Postgraduate",
      duration: "1 year",
      fee: "£12,000",
      summary:
        "Master statistics, machine learning, and big-data engineering.",
      content:
        "<h2>Course overview</h2><p>Designed for graduates and professionals, this master's programme turns data into insight using Python, machine learning, and cloud platforms.</p>",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      featured: false,
      order: 6,
    },
  ];
  for (const c of courses) await db.course.create({ data: c });

  // --- Staff ---
  await db.staff.deleteMany();
  const staff = [
    {
      name: "Dr. Eleanor Hughes",
      role: "Principal",
      department: "Leadership",
      category: "Admin",
      email: "e.hughes@edgebaston.edu",
      bio: "<p>Dr. Hughes has led Edgebaston College for over a decade, championing inclusive, forward-thinking education.</p>",
      photoUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
      order: 1,
    },
    {
      name: "Prof. Michael Adeyemi",
      role: "Head of Computer Science",
      department: "Technology",
      category: "Faculty",
      email: "m.adeyemi@edgebaston.edu",
      bio: "<p>A researcher in artificial intelligence, Prof. Adeyemi brings cutting-edge industry experience into the classroom.</p>",
      photoUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
      order: 2,
    },
    {
      name: "Sarah Whitfield",
      role: "Head of Business School",
      department: "Business",
      category: "Faculty",
      email: "s.whitfield@edgebaston.edu",
      bio: "<p>Sarah is a former management consultant passionate about developing the next generation of business leaders.</p>",
      photoUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
      order: 3,
    },
    {
      name: "James O'Connor",
      role: "Admissions Officer",
      department: "Student Services",
      category: "Support",
      email: "admissions@edgebaston.edu",
      bio: "<p>James guides prospective students through every step of the application journey.</p>",
      photoUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
      order: 4,
    },
  ];
  for (const s of staff) await db.staff.create({ data: s });

  // --- Pages ---
  await db.page.deleteMany();
  await db.page.create({
    data: {
      title: "Admissions",
      slug: "admissions",
      showInNav: true,
      order: 1,
      content:
        "<h2>How to apply</h2><p>Applying to Edgebaston College is simple. Follow the steps below or contact our admissions team for guidance.</p><ol><li>Choose your course</li><li>Complete the online application</li><li>Attend an interview or open day</li><li>Receive your offer</li></ol><p>We welcome applications from students of all backgrounds.</p>",
    },
  });
  await db.page.create({
    data: {
      title: "Campus Life",
      slug: "campus-life",
      showInNav: true,
      order: 2,
      content:
        "<h2>Life at Edgebaston</h2><p>From sports clubs and societies to modern study spaces and a vibrant student union, there's always something happening on campus.</p>",
    },
  });

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
