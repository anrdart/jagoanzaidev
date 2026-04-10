export type LearningMode = 'curated' | 'path' | 'story';
export type CourseLevel = 'basic' | 'fundamental' | 'jagoan';

export const COURSE_LEVELS: CourseLevel[] = ['basic', 'fundamental', 'jagoan'];

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseCard {
  id: string;
  level: CourseLevel;
  type: 'content' | 'quiz' | 'practical';
  title: string;
  content: string[];
  icon?: string;
  source?: string;
  quiz?: QuizQuestion[];
}

export interface CourseModule {
  level: CourseLevel;
  title: string;
  description: string;
  cards: CourseCard[];
  quiz: QuizQuestion[];
  unlockThreshold: number; // percentage
}

export const courseData: Record<CourseLevel, CourseModule> = {
  basic: {
    level: 'basic',
    title: 'Level Basic',
    description: 'Quick Start Practical - Belajar praktis langsung action',
    unlockThreshold: 70,
    cards: [
      {
        id: 'basic-1',
        level: 'basic',
        type: 'content',
        title: 'Apa itu Website & Kenapa Butuh Server?',
        content: [
          'Website itu seperti rumah di dunia digital. Kamu punya isinya (foto, tulisan, video), tapi biar orang bisa berkunjung, kamu butuh "tanah" buat membangun rumah itu.',
          'Nah, server itu adalah "tanah" tempat website kamu berdiri. Tanpa server, website kamu cuma jadi file di komputer sendiri, nggak bisa dilihat orang lain.',
          'Server adalah komputer yang nyala 24 jam nonstop, tersambung internet, dan menyimpan semua data website kamu.',
        ],
        icon: '🏠',
      },
      {
        id: 'basic-2',
        level: 'basic',
        type: 'content',
        title: 'Cara Cepat Beli Domain',
        content: [
          'Domain itu alamat website kamu, misalnya: namakamu.com',
          'Langkah 1: Pilih registrar domain (Niagahoster, Rumahweb, IDN Hosted)',
          'Langkah 2: Cek ketersediaan nama domain yang kamu mau',
          'Langkah 3: Tambahkan ke keranjang dan checkout',
          'Langkah 4: Verifikasi email kamu',
          'Tips: Pilih nama yang pendek, gampang diingat, dan hindari tanda hubung jika bisa.',
        ],
        icon: '🌐',
        source: 'Niagahoster Knowledge Base',
      },
      {
        id: 'basic-3',
        level: 'basic',
        type: 'content',
        title: 'Cara Pilih & Beli Hosting',
        content: [
          'Hosting adalah tempat kamu menyimpan file-file website.',
          'Untuk pemula, Shared Hosting adalah pilihan terbaik karena:',
          '• Harga terjangkau (mulai 10-30 ribu/bulan)',
          '• Mudah digunakan (ada cPanel)',
          '• Support bahasa Indonesia',
          'Provider rekomendasi: Niagahoster, IDN Hosted, Rumahweb',
        ],
        icon: '🏢',
        source: 'IDN Hosted Blog',
      },
      {
        id: 'basic-4',
        level: 'basic',
        type: 'content',
        title: 'Connect Domain ke Hosting',
        content: [
          'Setelah beli domain dan hosting, saatnya menyambungkannya:',
          'Langkah 1: Login ke cPanel hosting',
          'Langkah 2: Cari menu "Addon Domains" atau "Parked Domains"',
          'Langkah 3: Masukkan nama domain kamu',
          'Langkah 4: Copy nameserver dari hosting',
          'Langkah 5: Login ke registrar domain, ganti nameserver',
          'Tunggu 1-24 jam untuk propagasi DNS',
        ],
        icon: '🔗',
      },
      {
        id: 'basic-5',
        level: 'basic',
        type: 'content',
        title: 'Upload Website Pertamaku',
        content: [
          'Ada beberapa cara upload website:',
          '1. File Manager di cPanel (paling gampang)',
          '2. FTP dengan FileZilla',
          '3. Git (untuk developer)',
          'Untuk static file (HTML, CSS, JS), upload ke folder public_html',
          'Pastikan file utama bernama index.html',
        ],
        icon: '📤',
      },
    ],
    quiz: [
      {
        id: 'quiz-basic-1',
        question: 'Apa fungsi utama dari sebuah server?',
        options: [
          'Menyimpan data website biar bisa diakses 24 jam',
          'Membuat desain website jadi bagus',
          'Meningkatkan kecepatan internet',
        ],
        correctIndex: 0,
        explanation: 'Server menyimpan semua data website dan membuatnya bisa diakses kapan saja dari seluruh dunia.',
      },
      {
        id: 'quiz-basic-2',
        question: 'Domain itu ibarat apa?',
        options: [
          'Fasilitas kosan',
          'Alamat rumah',
          'Perabotan rumah',
        ],
        correctIndex: 1,
        explanation: 'Domain adalah alamat yang orang gunakan untuk mencari website kamu, seperti alamat rumah.',
      },
      {
        id: 'quiz-basic-3',
        question: 'Hosting tipe apa yang cocok untuk pemula?',
        options: [
          'Dedicated Server',
          'VPS',
          'Shared Hosting',
        ],
        correctIndex: 2,
        explanation: 'Shared Hosting adalah pilihan terbaik untuk pemula karena harganya terjangkau dan mudah digunakan.',
      },
      {
        id: 'quiz-basic-4',
        question: 'Berapa lama waktu propagasi DNS?',
        options: [
          '1-5 menit',
          '1-24 jam',
          '1-7 hari',
        ],
        correctIndex: 1,
        explanation: 'DNS propagation biasanya memakan waktu 1-24 jam, kadang bisa lebih cepat.',
      },
      {
        id: 'quiz-basic-5',
        question: 'File utama website harus bernama apa?',
        options: [
          'home.html',
          'index.html',
          'main.html',
        ],
        correctIndex: 1,
        explanation: 'File utama website harus bernama index.html agar otomatis dimuat saat domain diakses.',
      },
    ],
  },
  fundamental: {
    level: 'fundamental',
    title: 'Level Fundamental',
    description: 'Web Hosting Focused - Dalami jenis-jenis hosting dan kapan upgrade',
    unlockThreshold: 70,
    cards: [
      {
        id: 'fundamental-1',
        level: 'fundamental',
        type: 'content',
        title: 'Jenis-Jenis Hosting',
        content: [
          'Ada beberapa jenis hosting yang perlu kamu tahu:',
          '• Shared Hosting: Bersama pengguna lain, murah, cocok pemula',
          '• VPS (Virtual Private Server): Resources terpisah, lebih powerful',
          '• Dedicated Server: Satu server penuh untuk kamu, mahal',
          '• Cloud Hosting: Scalable, bayar sesuai pemakaian',
        ],
        icon: '🏗️',
      },
      {
        id: 'fundamental-2',
        level: 'fundamental',
        type: 'content',
        title: 'Shared Hosting Deep Dive',
        content: [
          'Shared Hosting ibarat ngekos - kamu bagi fasilitas sama "tetangga" lain.',
          'Kelebihan: Murah, mudah manage, support lengkap',
          'Kekurangan: Resources terbatas, performance terpengaruh pengguna lain',
          'Cocok untuk: Personal blog, company profile, landing page',
        ],
        icon: '🏢',
      },
      {
        id: 'fundamental-3',
        level: 'fundamental',
        type: 'content',
        title: 'Kapan Waktu Tepat Upgrade ke VPS?',
        content: [
          'Pertimbangkan upgrade ke VPS jika:',
          '• Website visitor sudah >10.000/bulan',
          '• Butuh install software spesifik',
          '• Butuh resource lebih besar',
          '• Shared hosting sering down',
          '• Butuh keamanan lebih baik',
        ],
        icon: '📈',
      },
      {
        id: 'fundamental-4',
        level: 'fundamental',
        type: 'content',
        title: 'VPS: Apa, Kenapa, Kapan',
        content: [
          'VPS adalah Virtual Private Server - server virtual yang resources-nya terpisah.',
          'Kenapa VPS? Resources dedicated, bisa custom, performa stabil',
          'Kapan butuh? Traffic tinggi, butuh custom config, eCommerce',
          'VPS butuh skill Linux command line dasar',
        ],
        icon: '🖥️',
      },
      {
        id: 'fundamental-5',
        level: 'fundamental',
        type: 'content',
        title: 'Scaling Strategy',
        content: [
          'Strategi scaling yang baik:',
          'Mulai dari Shared → VPS → Cloud/Dedicated',
          'Monitor traffic dan performance',
          'Setup backup sebelum upgrade',
          'Pilih provider yang mudah migrasi',
        ],
        icon: '🚀',
      },
    ],
    quiz: [
      {
        id: 'quiz-fundamental-1',
        question: 'Jenis hosting apa yang resources-nya terpisah?',
        options: [
          'Shared Hosting',
          'VPS',
          'Cloud Hosting',
        ],
        correctIndex: 1,
        explanation: 'VPS memiliki resources yang terpisah (dedicated) untuk setiap user.',
      },
      {
        id: 'quiz-fundamental-2',
        question: 'Shared Hosting cocok untuk website dengan visitor berapa?',
        options: [
          '> 50.000/bulan',
          '> 100.000/bulan',
          '< 10.000/bulan',
        ],
        correctIndex: 2,
        explanation: 'Shared Hosting cocok untuk website dengan visitor kurang dari 10.000 per bulan.',
      },
      {
        id: 'quiz-fundamental-3',
        question: 'Apa kekurangan utama Shared Hosting?',
        options: [
          'Harga mahal',
          'Performance terpengaruh pengguna lain',
          'Tidak ada support',
        ],
        correctIndex: 1,
        explanation: 'Karena resources dibagi, jika pengguna lain menggunakan banyak resources, website kamu ikut lambat.',
      },
      {
        id: 'quiz-fundamental-4',
        question: 'VPS butuh skill apa?',
        options: [
          'Design grafis',
          'Linux command line',
          'HTML/CSS',
        ],
        correctIndex: 1,
        explanation: 'VPS butuh skill Linux command line untuk manage server.',
      },
      {
        id: 'quiz-fundamental-5',
        question: 'Kapan saatnya upgrade dari Shared ke VPS?',
        options: [
          'Visitor baru 100/bulan',
          'Visitor >10.000/bulan atau sering down',
          'Baru mulai bikin website',
        ],
        correctIndex: 1,
        explanation: 'Upgrade ke VPS saat visitor sudah >10.000/bulan atau shared hosting sering down.',
      },
      {
        id: 'quiz-fundamental-6',
        question: 'Apa itu scaling strategy?',
        options: [
          'Mengurangi performance',
          'Strategi meningkatkan kapasitas sesuai kebutuhan',
          'Pindah hosting setiap hari',
        ],
        correctIndex: 1,
        explanation: 'Scaling strategy adalah strategi meningkatkan kapasitas hosting sesuai kebutuhan website.',
      },
      {
        id: 'quiz-fundamental-7',
        question: 'Hosting tipe apa yang resources-nya dedicated 1 server?',
        options: [
          'VPS',
          'Dedicated Server',
          'Shared Hosting',
        ],
        correctIndex: 1,
        explanation: 'Dedicated Server memberikan 1 server penuh yang hanya untuk kamu.',
      },
    ],
  },
  jagoan: {
    level: 'jagoan',
    title: 'Level Jagoan',
    description: 'Server Fundamentals - Dalami Linux, DNS, Security, dan Optimization',
    unlockThreshold: 70,
    cards: [
      {
        id: 'jagoan-1',
        level: 'jagoan',
        type: 'content',
        title: 'Server Hardware & OS',
        content: [
          'Server terdiri dari Hardware (CPU, RAM, Storage) dan OS (biasanya Linux).',
          'OS yang populer: Ubuntu, Debian, CentOS, AlmaLinux',
          'Ubuntu paling populer untuk pemula karena dokumentasi lengkap.',
          'Server tanpa GUI (Graphic) - semuanya lewat command line.',
        ],
        icon: '⚙️',
      },
      {
        id: 'jagoan-2',
        level: 'jagoan',
        type: 'content',
        title: 'Linux Command Line Dasar',
        content: [
          'Command dasar yang wajib dikuasai:',
          '• ls = list file',
          '• cd = change directory',
          '• mkdir = make directory',
          '• rm = remove file',
          '• cp = copy',
          '• mv = move',
          '• cat = view file',
          '• nano/vim = edit file',
          '• systemctl = manage services',
        ],
        icon: '💻',
      },
      {
        id: 'jagoan-3',
        level: 'jagoan',
        type: 'content',
        title: 'DNS Deep Dive',
        content: [
          'DNS (Domain Name System) menerjemahkan domain ke IP address.',
          'Record types penting:',
          '• A = domain ke IP',
          '• CNAME = domain ke domain lain',
          '• MX = email server',
          '• TXT = verifikasi, SPF, DKIM',
          'DNS propagation memakan waktu 1-24 jam.',
        ],
        icon: '🔍',
      },
      {
        id: 'jagoan-4',
        level: 'jagoan',
        type: 'content',
        title: 'Server Security',
        content: [
          'Security dasar untuk server:',
          '• SSH key based authentication',
          '• Firewall (ufw/iptables)',
          '• Fail2ban untuk anti brute force',
          '• SSL certificate (Let\'s Encrypt)',
          '• Regular update system',
          '• Jangan login sebagai root',
        ],
        icon: '🔒',
      },
      {
        id: 'jagoan-5',
        level: 'jagoan',
        type: 'content',
        title: 'Backup & Disaster Recovery',
        content: [
          'Backup adalah investasi terbaik untuk server.',
          '3-2-1 backup rule:',
          '• 3 copy data',
          '• 2 different media',
          '• 1 offsite location',
          'Tools: rsync, backup automation, snapshot VPS',
        ],
        icon: '💾',
      },
      {
        id: 'jagoan-6',
        level: 'jagoan',
        type: 'content',
        title: 'Monitoring & Troubleshooting',
        content: [
          'Tools monitoring:',
          '• htop = resource usage',
          '• df -h = disk space',
          '• netstat = network connections',
          '• journalctl = system logs',
          '• uptime = server uptime',
          'Troubleshooting start dari: check logs, check resource, check service status.',
        ],
        icon: '📊',
      },
      {
        id: 'jagoan-7',
        level: 'jagoan',
        type: 'content',
        title: 'Performance Optimization',
        content: [
          'Tips optimasi server:',
          '• Enable caching (Redis, Memcached)',
          '• CDN untuk static files',
          '• Gzip compression',
          '• Database optimization',
          '• Load balancing untuk high traffic',
          '• PHP opcache',
        ],
        icon: '⚡',
      },
    ],
    quiz: [
      {
        id: 'quiz-jagoan-1',
        question: 'OS Linux yang paling populer untuk pemula?',
        options: [
          'Ubuntu',
          'Arch Linux',
          'Gentoo',
        ],
        correctIndex: 0,
        explanation: 'Ubuntu paling populer untuk pemula karena dokumentasi lengkap dan community besar.',
      },
      {
        id: 'quiz-jagoan-2',
        question: 'Command untuk melihat list file?',
        options: [
          'cd',
          'ls',
          'mkdir',
        ],
        correctIndex: 1,
        explanation: 'ls (list) digunakan untuk melihat list file dalam directory.',
      },
      {
        id: 'quiz-jagoan-3',
        question: 'DNS record untuk menerjemahkan domain ke IP?',
        options: [
          'CNAME',
          'MX',
          'A',
        ],
        correctIndex: 2,
        explanation: 'A record menerjemahkan domain langsung ke IP address.',
      },
      {
        id: 'quiz-jagoan-4',
        question: 'Apa yang dimaksud 3-2-1 backup rule?',
        options: [
          '3 backup, 2 media, 1 offsite',
          '3 server, 2 backup, 1 restore',
          '3 hari, 2 jam, 1 menit',
        ],
        correctIndex: 0,
        explanation: '3-2-1 rule: 3 copy data, 2 different media, 1 offsite location.',
      },
      {
        id: 'quiz-jagoan-5',
        question: 'Tools untuk monitoring resource usage?',
        options: [
          'ls',
          'htop',
          'cd',
        ],
        correctIndex: 1,
        explanation: 'htop digunakan untuk monitoring CPU, RAM, dan resource usage lainnya.',
      },
      {
        id: 'quiz-jagoan-6',
        question: 'Apa fungsi SSL certificate?',
        options: [
          'Mempercepat website',
          'Mengamankan koneksi dengan HTTPS',
          'Meningkatkan SEO saja',
        ],
        correctIndex: 1,
        explanation: 'SSL certificate mengamankan koneksi antara browser dan server dengan HTTPS.',
      },
      {
        id: 'quiz-jagoan-7',
        question: 'Port default untuk SSH?',
        options: [
          '80',
          '443',
          '22',
        ],
        correctIndex: 2,
        explanation: 'SSH default port adalah 22. Best practice menggantinya untuk security.',
      },
      {
        id: 'quiz-jagoan-8',
        question: 'Command untuk manage services di Linux?',
        options: [
          'service',
          'systemctl',
          'init',
        ],
        correctIndex: 1,
        explanation: 'systemctl adalah modern command untuk manage systemd services.',
      },
      {
        id: 'quiz-jagoan-9',
        question: 'Apa fungsi CDN?',
        options: [
          'Mengamankan database',
          'Menyajikan static files dari edge server',
          'Backup otomatis',
        ],
        correctIndex: 1,
        explanation: 'CDN menyajikan static files dari server terdekat dengan user, meningkatkan kecepatan.',
      },
      {
        id: 'quiz-jagoan-10',
        question: 'Tools untuk anti brute force?',
        options: [
          'htop',
          'Fail2ban',
          'ls',
        ],
        correctIndex: 1,
        explanation: 'Fail2ban memban IP yang melakukan terlalu banyak failed login attempts.',
      },
    ],
  },
};

export const modeDescriptions = {
  curated: {
    title: 'Curated Modules',
    description: 'Pilih modul sesuai kebutuhanmu. Bebas explore topik apa saja.',
    icon: '📚',
  },
  path: {
    title: 'Learning Path',
    description: 'Jalur belajar linear, step-by-step dari dasar ke lanjut.',
    icon: '🛤️',
  },
  story: {
    title: 'Story Mode',
    description: 'Belajar sambil berpetualang. Ikuti cerita dari pemula jadi jagoan.',
    icon: '📖',
  },
};
