export type StoryChapterId = 'ch1-first-website' | 'ch2-hosting-world' | 'ch3-dns-dungeon' | 'ch4-security-shield' | 'ch5-performance-tower';

export const STORY_CHAPTERS: StoryChapterId[] = [
  'ch1-first-website',
  'ch2-hosting-world',
  'ch3-dns-dungeon',
  'ch4-security-shield',
  'ch5-performance-tower',
];

export interface Character {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
}

export interface StoryDialog {
  characterId: string;
  text: string;
  emotion?: 'happy' | 'surprised' | 'thinking' | 'excited' | 'worried' | 'proud';
}

export interface StoryScene {
  id: string;
  title: string;
  narrative: string;
  dialogs: StoryDialog[];
  learningPoints: string[];
  illustration?: string;
}

export interface StoryQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StoryChapter {
  id: StoryChapterId;
  chapterNumber: number;
  title: string;
  subtitle: string;
  description: string;
  unlockThreshold: number;
  scenes: StoryScene[];
  quiz: StoryQuizQuestion[];
  reward: {
    badge: string;
    title: string;
    description: string;
  };
}

export const storyCharacters: Character[] = [
  {
    id: 'andi',
    name: 'Andi',
    role: 'Protagonis - Pemula yang ingin bikin website',
    avatar: '🧑‍💻',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'bu-server',
    name: 'Bu Server',
    role: 'Mentor - Ahli server yang bijaksana',
    avatar: '👩‍🏫',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'domaino',
    name: 'Domaino',
    role: 'Guide - Penjaga gerbang domain',
    avatar: '🛡️',
    color: 'bg-green-100 text-green-700',
  },
  {
    id: 'hacker-jahat',
    name: 'Si Kriptik',
    role: 'Antagonis - Hacker yang suka iseng',
    avatar: '😈',
    color: 'bg-red-100 text-red-700',
  },
  {
    id: 'cdn-bot',
    name: 'CDN-Bot',
    role: 'Helper - Robot pengantar konten super cepat',
    avatar: '🤖',
    color: 'bg-cyan-100 text-cyan-700',
  },
];

export const storyData: Record<StoryChapterId, StoryChapter> = {
  'ch1-first-website': {
    id: 'ch1-first-website',
    chapterNumber: 1,
    title: 'Hari Pertama Andi',
    subtitle: 'Petualangan dimulai!',
    description: 'Andi baru saja punya ide cemerlang untuk bikin website portfolio. Tapi... dari mana mulainya?',
    unlockThreshold: 70,
    scenes: [
      {
        id: 'ch1-scene-1',
        title: 'Ide yang Menggebu',
        narrative: 'Suatu hari di kafe favoritnya, Andi tengah scroll LinkedIn. Banyak teman-temannya yang punya website keren sendiri. "Gue juga harus punya!" gumam Andi dalam hati. Ia membuka laptop dan... bingung. Website itu kan cuma file HTML, tapi kok teman-temannya bisa diakses dari mana saja?',
        dialogs: [
          { characterId: 'andi', text: 'Hmm... file website gue cuma ada di laptop. Gimana caranya biar orang lain bisa akses?', emotion: 'thinking' },
        ],
        learningPoints: [
          'Website tanpa server cuma bisa diakses dari komputer kamu sendiri',
          'Server adalah komputer yang online 24/7 untuk menyajikan website',
        ],
        illustration: 'laptop',
      },
      {
        id: 'ch1-scene-2',
        title: 'Pertemuan dengan Bu Server',
        narrative: 'Andi memutuskan untuk mencari tahu di internet. Di sebuah forum, ia menemukan postingan dari "Bu Server" yang menjelaskan konsep server dengan bahasa yang super mudah dipahami. Andi langsung DM dan meminta bimbingan.',
        dialogs: [
          { characterId: 'bu-server', text: 'Selamat datang di dunia server, Andi! Aku akan jadi mentormu. Pertama-tama, bayangkan server itu seperti rumah toko. Kamu butuh ALAMAT (domain) dan TANAH (hosting).', emotion: 'happy' },
          { characterId: 'andi', text: 'Oh jadi domain itu alamatnya, hosting itu tanahnya! Kalau begitu gue harus beli dua-duanya dong?', emotion: 'surprised' },
          { characterId: 'bu-server', text: 'Tepat sekali! Mari kita mulai dari domain - alamat website kamu di internet.', emotion: 'proud' },
        ],
        learningPoints: [
          'Domain = alamat website (contoh: andi.com)',
          'Hosting = tempat menyimpan file website',
          'Keduanya harus dibeli dan disambungkan',
        ],
        illustration: 'meeting',
      },
      {
        id: 'ch1-scene-3',
        title: 'Gerbang Domain',
        narrative: 'Bu Server mengantar Andi ke Gerbang Domain, tempat semua domain dijual. Di sana, mereka bertemu Domaino - penjaga gerbang yang ramah.',
        dialogs: [
          { characterId: 'domaino', text: 'Selamat datang di Gerbang Domain! Aku Domaino, penjaga gerbang. Kamu mau pilih nama apa untuk website kamu?', emotion: 'happy' },
          { characterId: 'andi', text: 'Gue mau nama yang pendek dan gampang diingat... andi.dev kayaknya keren!', emotion: 'excited' },
          { characterId: 'domaino', text: 'Pilihan yang bagus! Tapi ingat 3 tips penting: pendek, mudah diingat, dan hindari tanda hubung. Oh ya, pilih ekstensi yang tepat juga - .com untuk global, .dev untuk developer!', emotion: 'thinking' },
          { characterId: 'bu-server', text: 'Betul. Untuk belajar, .com atau .id sudah cukup. Nanti kalau sudah jago, bisa pakai ekstensi lain.', emotion: 'happy' },
        ],
        learningPoints: [
          'Pilih nama domain: pendek, mudah diingat, tanpa tanda hubung',
          'Ekstensi populer: .com (global), .id (Indonesia), .dev (developer)',
          'Beli domain di registrar: Niagahoster, Domainesia, GoDaddy',
          'Domain aktif dalam 1-24 jam setelah pembayaran',
        ],
        illustration: 'gate',
      },
      {
        id: 'ch1-scene-4',
        title: 'Menyambungkan Titik-Titik',
        narrative: 'Setelah membeli domain dan hosting, Andi harus menyambungkannya. Bu Server mengajarkan cara menghubungkan nameserver.',
        dialogs: [
          { characterId: 'bu-server', text: 'Sekarang saatnya menyambungkan domain ke hosting. Ini seperti mengarahkan papan nama toko ke lokasi toko yang benar.', emotion: 'thinking' },
          { characterId: 'andi', text: 'Caranya gimana bu?', emotion: 'surprised' },
          { characterId: 'bu-server', text: 'Gampang! Ambil nameserver dari hosting (misal ns1.niagahoster.com), lalu masukkan di pengaturan domain. Tunggu 1-48 jam untuk propagasi DNS.', emotion: 'happy' },
          { characterId: 'andi', text: 'Wah gampang juga ya! Gue langsung coba!', emotion: 'excited' },
        ],
        learningPoints: [
          'Nameserver menghubungkan domain ke hosting',
          'Dapatkan nameserver dari dashboard hosting',
          'Masukkan di pengaturan domain registrar',
          'DNS propagation memakan waktu 1-48 jam',
          'Gunakan whatsmydns.net untuk cek status propagasi',
        ],
        illustration: 'connect',
      },
      {
        id: 'ch1-scene-5',
        title: 'Website Pertama Online!',
        narrative: 'Setelah menunggu propagasi DNS, akhirnya website Andi berhasil online! Ia berhasil upload file index.html melalui cPanel dan website-nya bisa diakses oleh siapa saja.',
        dialogs: [
          { characterId: 'andi', text: 'BU SERVER! GUE BERHASIL! Website gue online!!!', emotion: 'excited' },
          { characterId: 'bu-server', text: 'Selamat Andi! Ini baru awal perjalananmu. Tapi sekarang, hosting yang kamu pakai masih shared hosting. Ada banyak jenis hosting lain yang perlu kamu ketahui...', emotion: 'proud' },
          { characterId: 'andi', text: 'Wah masih banyak yang harus dipelajari ya. Ayo lanjut!', emotion: 'excited' },
        ],
        learningPoints: [
          'Upload file ke folder public_html via cPanel',
          'File utama harus bernama index.html',
          'Shared hosting cocok untuk pemula',
          'Masih banyak jenis hosting lain untuk dipelajari',
        ],
        illustration: 'celebration',
      },
    ],
    quiz: [
      {
        id: 'story-ch1-q1',
        question: 'Apa fungsi utama server?',
        options: [
          'Menyimpan dan menyajikan website 24/7',
          'Membuat desain website',
          'Meningkatkan kecepatan WiFi',
        ],
        correctIndex: 0,
        explanation: 'Server menyimpan semua file website dan membuatnya bisa diakses dari seluruh dunia selama 24 jam.',
      },
      {
        id: 'story-ch1-q2',
        question: 'Domain itu ibarat apa menurut analogi Bu Server?',
        options: [
          'Fasilitas kosan',
          'Alamat rumah toko',
          'Interior toko',
        ],
        correctIndex: 1,
        explanation: 'Domain adalah alamat yang digunakan orang untuk menemukan website, seperti alamat rumah toko.',
      },
      {
        id: 'story-ch1-q3',
        question: 'Apa yang dimaksud nameserver?',
        options: [
          'Nama pengguna server',
          'Server yang menerjemahkan domain ke hosting',
          'Password untuk akses server',
        ],
        correctIndex: 1,
        explanation: 'Nameserver adalah penghubung antara domain dan hosting, seperti mengarahkan alamat ke lokasi yang benar.',
      },
      {
        id: 'story-ch1-q4',
        question: 'Berapa lama DNS propagation?',
        options: [
          '1-5 menit',
          '1-48 jam',
          '1-7 hari',
        ],
        correctIndex: 1,
        explanation: 'DNS propagation memakan waktu 1-48 jam karena perlu menyebar ke seluruh server DNS di dunia.',
      },
      {
        id: 'story-ch1-q5',
        question: 'File utama website harus bernama?',
        options: [
          'home.html',
          'main.html',
          'index.html',
        ],
        correctIndex: 2,
        explanation: 'File utama website harus bernama index.html agar otomatis dimuat saat domain diakses.',
      },
    ],
    reward: {
      badge: '🏠',
      title: 'Web Pioneer',
      description: 'Berhasil membuat website pertama dan memahami dasar domain & hosting!',
    },
  },

  'ch2-hosting-world': {
    id: 'ch2-hosting-world',
    chapterNumber: 2,
    title: 'Dunia Hosting',
    subtitle: 'Shared, VPS, Cloud - Pilih yang mana?',
    description: 'Website Andi makin populer! Tapi shared hosting mulai kekurangan. Saatnya mempelajari jenis-jenis hosting.',
    unlockThreshold: 70,
    scenes: [
      {
        id: 'ch2-scene-1',
        title: 'Traffic Melonjak!',
        narrative: 'Website portfolio Andi ternyata viral di Twitter. Pengunjungnya meledak dari 100/hari jadi 15.000/hari. Shared hosting-nya mulai lemot dan sering down.',
        dialogs: [
          { characterId: 'andi', text: 'Aaa website gue down lagi! Padahal banyak yang lagi mau lihat portfolio gue. Apa yang salah?', emotion: 'worried' },
          { characterId: 'bu-server', text: 'Andi, shared hosting kamu sudah kelebihan beban. Resources-nya dibagi dengan pengguna lain. Kalau traffic udah di atas 10.000/hari, waktunya upgrade!', emotion: 'thinking' },
          { characterId: 'andi', text: 'Upgrade ke apa bu? Apa yang lebih bagus dari shared hosting?', emotion: 'surprised' },
        ],
        learningPoints: [
          'Shared hosting resources dibagi dengan pengguna lain',
          'Traffic > 10.000/hari = saatnya upgrade',
          'Shared hosting bisa down karena pengguna lain overuse',
        ],
        illustration: 'traffic',
      },
      {
        id: 'ch2-scene-2',
        title: 'Pasar Hosting',
        narrative: 'Bu Server membawa Andi ke Pasar Hosting - sebuah tempat di mana semua jenis hosting dipajang. Andi bisa melihat dan membandingkan setiap jenis hosting.',
        dialogs: [
          { characterId: 'bu-server', text: 'Di Pasar Hosting ini ada 4 jenis utama. Lihat baik-baik ya Andi!', emotion: 'happy' },
          { characterId: 'bu-server', text: '1. Shared Hosting - Ibarat kosan, fasilitas dipakai bareng. Murah (Rp 20-100rb/bln) tapi resource terbatas.\n2. VPS - Ibarat apartemen, resource dedicated tapi tetap di satu gedung.\n3. Dedicated Server - Satu gedung penuh untuk kamu saja. Mahal tapi powerful.\n4. Cloud Hosting - Fleksibel, scalable, bayar sesuai pemakaian.', emotion: 'thinking' },
          { characterId: 'andi', text: 'Hmm... untuk traffic gue sekarang, kayaknya VPS yang paling cocok ya bu?', emotion: 'thinking' },
          { characterId: 'bu-server', text: 'Pintar! VPS memberikan resource dedicated dengan harga yang masih terjangkau. Cocok untuk level pertumbuhanmu sekarang.', emotion: 'proud' },
        ],
        learningPoints: [
          'Shared Hosting: Murah, resource terbatas, cocok pemula',
          'VPS: Resource dedicated, lebih stabil, butuh skill Linux',
          'Dedicated Server: Satu server penuh, mahal, untuk enterprise',
          'Cloud Hosting: Scalable, pay-as-you-go, untuk traffic fluktuatif',
        ],
        illustration: 'market',
      },
      {
        id: 'ch2-scene-3',
        title: 'Mengenal VPS Lebih Dalam',
        narrative: 'Andi memutuskan untuk bermigrasi ke VPS. Bu Server mengajarkannya cara memilih spesifikasi VPS yang tepat dan OS yang sesuai.',
        dialogs: [
          { characterId: 'bu-server', text: 'VPS itu ibarat apartemen sendiri. Kamu punya kontrol penuh, tapi juga tanggung jawab penuh. Kamu harus install semuanya sendiri.', emotion: 'thinking' },
          { characterId: 'andi', text: 'Berarti gue harus install web server sendiri ya? OS apa yang bagus bu?', emotion: 'surprised' },
          { characterId: 'bu-server', text: 'Untuk pemula, aku rekomendasikan Ubuntu 22.04 LTS. User-friendly, dokumentasi lengkap, dan community-nya besar. Kalau mau yang lebih stabil, Debian 11.', emotion: 'happy' },
          { characterId: 'andi', text: 'Oke! Ubuntu 22.04 LTS gue pilih. Terus web servernya? Nginx atau Apache?', emotion: 'excited' },
          { characterId: 'bu-server', text: 'Nginx lebih hemat resource dan cepat. Apache lebih fleksibel dengan .htaccess. Untuk VPS, Nginx biasanya pilihan terbaik.', emotion: 'proud' },
        ],
        learningPoints: [
          'VPS = Virtual Private Server, resource dedicated',
          'Ubuntu 22.04 LTS: User-friendly, docs lengkap',
          'Debian 11: Sangat stabil, cocok production',
          'Nginx: Hemat resource, performa tinggi',
          'Apache: Fleksibel, support .htaccess',
        ],
        illustration: 'vps',
      },
      {
        id: 'ch2-scene-4',
        title: 'Migrasi yang Menegangkan',
        narrative: 'Andi mulai proses migrasi dari shared hosting ke VPS. Ia mengikuti langkah-langkah yang diajarkan Bu Server dengan teliti.',
        dialogs: [
          { characterId: 'andi', text: 'Bu, gue sudah backup semua file dan database. Langkah selanjutnya apa?', emotion: 'thinking' },
          { characterId: 'bu-server', text: 'Bagus! Sekarang: 1) Install Nginx di VPS, 2) Upload backup files, 3) Import database, 4) Setup SSL, 5) Test sebelum ubah DNS. Jangan lupa test dulu sebelum switch DNS!', emotion: 'happy' },
          { characterId: 'andi', text: 'Wah banyak juga ya step-nya. Tapi gue akan ikuti satu per satu. Yang penting backup dulu!', emotion: 'excited' },
          { characterId: 'bu-server', text: 'Itu benar Andi! Backup adalah investasi terbaik. Ingat aturan 3-2-1: 3 copy, 2 media berbeda, 1 offsite.', emotion: 'proud' },
        ],
        learningPoints: [
          'Backup SEMUA file dan database sebelum migrasi',
          'Install web server di VPS (Nginx/Apache)',
          'Upload files dan import database ke VPS',
          'Test website sebelum mengubah DNS',
          'Rule 3-2-1 backup: 3 copy, 2 media, 1 offsite',
        ],
        illustration: 'migration',
      },
      {
        id: 'ch2-scene-5',
        title: 'VPS Baru, Performa Baru!',
        narrative: 'Setelah migrasi berhasil, website Andi berjalan jauh lebih cepat. Dedicated resource VPS membuat website-nya stabil meski traffic tinggi.',
        dialogs: [
          { characterId: 'andi', text: 'Cepet banget! Website gue sekarang loading dalam hitungan milidetik! Thanks Bu Server!', emotion: 'excited' },
          { characterId: 'bu-server', text: 'Selamat Andi! Tapi perjalananmu belum selesai. Ada sesuatu yang menghubungkan domain dan server kamu... sesuatu yang bernama DNS.', emotion: 'thinking' },
          { characterId: 'andi', text: 'DNS? Itu kan yang tadi kita ubah pas pertama kali ya bu? Ada yang lebih dalam lagi?', emotion: 'surprised' },
          { characterId: 'bu-server', text: 'Oh, DNS itu dunia yang sangat dalam dan menarik. Nanti kamu akan masuk ke Dungeon DNS...', emotion: 'happy' },
        ],
        learningPoints: [
          'VPS memberikan performa yang stabil dan konsisten',
          'Dedicated resource = tidak terpengaruh pengguna lain',
          'DNS adalah topik yang sangat penting dan dalam',
          'Pemahaman DNS penting untuk troubleshooting',
        ],
        illustration: 'success',
      },
    ],
    quiz: [
      {
        id: 'story-ch2-q1',
        question: 'Jenis hosting apa yang resource-nya dedicated?',
        options: [
          'Shared Hosting',
          'VPS',
          'Free Hosting',
        ],
        correctIndex: 1,
        explanation: 'VPS (Virtual Private Server) memiliki resource dedicated - CPU, RAM, dan storage yang terpisah dari pengguna lain.',
      },
      {
        id: 'story-ch2-q2',
        question: 'OS Linux apa yang direkomendasikan untuk pemula?',
        options: [
          'Arch Linux',
          'Ubuntu 22.04 LTS',
          'Gentoo',
        ],
        correctIndex: 1,
        explanation: 'Ubuntu 22.04 LTS paling direkomendasikan untuk pemula karena user-friendly, dokumentasi lengkap, dan community besar.',
      },
      {
        id: 'story-ch2-q3',
        question: 'Web server mana yang lebih hemat resource?',
        options: [
          'Apache',
          'Nginx',
          'IIS',
        ],
        correctIndex: 1,
        explanation: 'Nginx lebih hemat resource dibanding Apache karena arsitekturnya yang event-driven.',
      },
      {
        id: 'story-ch2-q4',
        question: 'Apa aturan backup 3-2-1?',
        options: [
          '3 backup, 2 hari, 1 bulan',
          '3 copy, 2 media berbeda, 1 offsite',
          '3 server, 2 backup, 1 restore',
        ],
        correctIndex: 1,
        explanation: 'Rule 3-2-1: 3 copy data, 2 jenis media berbeda, 1 copy disimpan di lokasi offsite.',
      },
      {
        id: 'story-ch2-q5',
        question: 'Kapan saatnya upgrade dari shared hosting ke VPS?',
        options: [
          'Visitor baru 50/hari',
          'Visitor > 10.000/hari atau sering down',
          'Baru pertama kali buat website',
        ],
        correctIndex: 1,
        explanation: 'Upgrade ke VPS saat visitor sudah > 10.000/hari atau shared hosting sering down karena kelebihan beban.',
      },
    ],
    reward: {
      badge: '🖥️',
      title: 'Server Master',
      description: 'Berhasil migrasi ke VPS dan memahami semua jenis hosting!',
    },
  },

  'ch3-dns-dungeon': {
    id: 'ch3-dns-dungeon',
    chapterNumber: 3,
    title: 'Dungeon DNS',
    subtitle: 'Memecahkan misteri DNS records',
    description: 'Andi memasuki Dungeon DNS - labirin record-record yang membingungkan. Domaino akan membantunya menemukan jalan.',
    unlockThreshold: 70,
    scenes: [
      {
        id: 'ch3-scene-1',
        title: 'Gerbang Dungeon',
        narrative: 'Di depan Andi berdiri sebuah gerbang besar bertuliskan "DNS DUNGEON". Domaino sudah menunggu di sana.',
        dialogs: [
          { characterId: 'domaino', text: 'Andi! Kamu datang! Selamat datang di Dungeon DNS. Di sini kamu akan belajar tentang DNS records - pintu-pintu rahasia yang menghubungkan domain ke berbagai layanan.', emotion: 'excited' },
          { characterId: 'andi', text: 'Domaino! Wah dungeon ini terlihat seram. Apa yang ada di dalam?', emotion: 'surprised' },
          { characterId: 'domaino', text: 'Tenang! Dungeon ini penuh pengetahuan. Aku akan jadi guidemu. DNS itu singkatan dari Domain Name System - sistem yang menerjemahkan nama domain ke IP address.', emotion: 'happy' },
        ],
        learningPoints: [
          'DNS = Domain Name System',
          'DNS menerjemahkan domain ke IP address',
          'Tanpa DNS, kita harus menghafal IP address untuk mengakses website',
        ],
        illustration: 'dungeon',
      },
      {
        id: 'ch3-scene-2',
        title: 'Ruang A Record',
        narrative: 'Ruangan pertama di dungeon dipenuhi dengan papan-papan yang bertuliskan alamat IP. Ini adalah Ruang A Record.',
        dialogs: [
          { characterId: 'domaino', text: 'Ini adalah Ruang A Record. A Record menghubungkan nama domain langsung ke IPv4 address. Misalnya: andi.com → 192.168.1.1', emotion: 'thinking' },
          { characterId: 'andi', text: 'Oh jadi kalau gue ketik andi.com, browser cek A Record dulu buat nemuin IP addressnya!', emotion: 'excited' },
          { characterId: 'domaino', text: 'Tepat! Dan ada juga AAAA Record untuk IPv6. Tapi A Record yang paling sering dipakai.', emotion: 'proud' },
        ],
        learningPoints: [
          'A Record: Domain → IPv4 address',
          'AAAA Record: Domain → IPv6 address',
          'A Record adalah record DNS paling fundamental',
        ],
        illustration: 'a-record',
      },
      {
        id: 'ch3-scene-3',
        title: 'Labirin CNAME & MX',
        narrative: 'Di ruangan berikutnya, Andi menemukan dua jalur: CNAME Path dan MX Corridor.',
        dialogs: [
          { characterId: 'domaino', text: 'Di sini ada dua jalur penting. CNAME Path mengarahkan satu domain ke domain lain. Misalnya: blog.andi.com → andi.com. MX Corridor mengarahkan email ke mail server.', emotion: 'thinking' },
          { characterId: 'andi', text: 'Jadi CNAME itu kayak redirect ya? Dan MX buat email?', emotion: 'surprised' },
          { characterId: 'domaino', text: 'Bukan redirect biasa! CNAME itu alias. Browser tetap menampilkan blog.andi.com tapi mengambil konten dari andi.com. Dan MX Record menentukan ke mana email dikirim - tanpa MX, kamu nggak bisa terima email!', emotion: 'happy' },
          { characterId: 'andi', text: 'Wah penting banget! Gue harus setup MX Record kalau mau bikin email profesional!', emotion: 'excited' },
        ],
        learningPoints: [
          'CNAME: Alias dari satu domain ke domain lain',
          'MX Record: Mengarahkan email ke mail server',
          'TXT Record: Verifikasi, SPF, DKIM untuk email security',
          'NS Record: Nameserver yang mengelola DNS domain',
        ],
        illustration: 'labyrinth',
      },
      {
        id: 'ch3-scene-4',
        title: 'Troubleshooting Room',
        narrative: 'Di ruangan terakhir dungeon, Andi menemukan alat-alat troubleshooting DNS. Kadang DNS bisa bermasalah dan perlu diperbaiki.',
        dialogs: [
          { characterId: 'domaino', text: 'Ruangan ini penting! DNS kadang bermasalah. Kamu perlu tahu cara mengecek dan memperbaikinya.', emotion: 'thinking' },
          { characterId: 'andi', text: 'Apa yang biasa bikin DNS bermasalah?', emotion: 'surprised' },
          { characterId: 'domaino', text: 'Propagasi yang lama, salah input record, cache yang kadaluarsa. Tools yang berguna: dig, nslookup, whatsmydns.net. Kalau DNS stuck, coba flush cache: ipconfig /flushdns di Windows.', emotion: 'happy' },
          { characterId: 'andi', text: 'Noted! Flush DNS cache, cek propagasi, dan pastikan record benar. Gue catat semua!', emotion: 'excited' },
        ],
        learningPoints: [
          'DNS propagation: 1-48 jam ke seluruh dunia',
          'Cek propagasi: whatsmydns.net',
          'Flush DNS cache: ipconfig /flushdns (Windows)',
          'Cek DNS: dig domain.com atau nslookup domain.com',
          'TTL (Time To Live) mempengaruhi kecepatan propagasi',
        ],
        illustration: 'troubleshoot',
      },
      {
        id: 'ch3-scene-5',
        title: 'Keluar dari Dungeon',
        narrative: 'Andi berhasil melewati Dungeon DNS dengan bantuan Domaino. Ia kini memahami semua jenis DNS record dan cara troubleshooting-nya.',
        dialogs: [
          { characterId: 'domaino', text: 'Andi berhasil melewati semua ruangan! Kamu sekarang mengerti A Record, CNAME, MX, TXT, dan cara troubleshooting DNS. Bagus sekali!', emotion: 'proud' },
          { characterId: 'andi', text: 'Thanks Domaino! Ternyata DNS nggak serumit yang gue kira. Tapi Bu Server tadi sebut sesuatu tentang keamanan server...', emotion: 'thinking' },
          { characterId: 'domaino', text: 'Ah ya! Server security. Itu wilayahnya Shield of Security. Hati-hati, di sana ada Si Kriptik yang suka mencari celah keamanan...', emotion: 'worried' },
        ],
        learningPoints: [
          'DNS adalah fondasi penting untuk website',
          'Pahami semua jenis record untuk setup yang benar',
          'Troubleshooting DNS adalah skill wajib',
          'Security adalah langkah selanjutnya yang krusial',
        ],
        illustration: 'exit',
      },
    ],
    quiz: [
      {
        id: 'story-ch3-q1',
        question: 'Apa fungsi A Record?',
        options: [
          'Mengarahkan email',
          'Menghubungkan domain ke IPv4',
          'Mengamankan website',
        ],
        correctIndex: 1,
        explanation: 'A Record menghubungkan nama domain ke IPv4 address, misalnya andi.com → 192.168.1.1.',
      },
      {
        id: 'story-ch3-q2',
        question: 'DNS record apa yang digunakan untuk email?',
        options: [
          'CNAME',
          'TXT',
          'MX',
        ],
        correctIndex: 2,
        explanation: 'MX Record (Mail Exchange) mengarahkan email ke mail server. Tanpa MX, tidak bisa menerima email.',
      },
      {
        id: 'story-ch3-q3',
        question: 'Apa bedanya CNAME dengan redirect?',
        options: [
          'Tidak ada bedanya',
          'CNAME membuat alias, browser tetap menampilkan domain asli',
          'CNAME lebih lambat dari redirect',
        ],
        correctIndex: 1,
        explanation: 'CNAME membuat alias - browser tetap menampilkan domain asli (blog.andi.com) tapi mengambil konten dari target (andi.com).',
      },
      {
        id: 'story-ch3-q4',
        question: 'Berapa lama DNS propagation?',
        options: [
          '1-5 menit',
          '1-48 jam',
          '1 minggu',
        ],
        correctIndex: 1,
        explanation: 'DNS propagation memakan waktu 1-48 jam karena harus menyebar ke seluruh DNS server di dunia.',
      },
      {
        id: 'story-ch3-q5',
        question: 'Perintah apa untuk flush DNS cache di Windows?',
        options: [
          'dns clear',
          'ipconfig /flushdns',
          'reset dns',
        ],
        correctIndex: 1,
        explanation: 'ipconfig /flushdns adalah perintah untuk menghapus DNS cache di Windows.',
      },
    ],
    reward: {
      badge: '🔍',
      title: 'DNS Explorer',
      description: 'Berhasil menavigasi Dungeon DNS dan menguasai semua jenis DNS record!',
    },
  },

  'ch4-security-shield': {
    id: 'ch4-security-shield',
    chapterNumber: 4,
    title: 'Shield of Security',
    subtitle: 'Melindungi server dari ancaman',
    description: 'Si Kriptik mulai mengincar server Andi! Saatnya memasang perisai keamanan dan belajar server security.',
    unlockThreshold: 70,
    scenes: [
      {
        id: 'ch4-scene-1',
        title: 'Serangan Pertama',
        narrative: 'Suatu malam, Andi menerima notifikasi bahwa ada ratusan login gagal ke SSH server-nya. Si Kriptik sedang mencoba brute force password!',
        dialogs: [
          { characterId: 'andi', text: 'BU SERVER! Ada yang coba masuk ke server gue! Ratusan kali login gagal!', emotion: 'worried' },
          { characterId: 'bu-server', text: 'Tenang Andi! Itu brute force attack. Si Kriptik sedang mencoba menebak password kamu. Tapi ini bisa kita cegah!', emotion: 'thinking' },
          { characterId: 'hacker-jahat', text: 'Hehehe... password admin123 kan? Atau password123? Aku coba semua!', emotion: 'happy' },
          { characterId: 'bu-server', text: 'Pertama, kita ganti login dari password ke SSH Key. Jauh lebih aman!', emotion: 'happy' },
        ],
        learningPoints: [
          'Brute force attack: Menebak password secara otomatis',
          'SSH Key authentication jauh lebih aman dari password',
          'Selalu monitor log untuk mendeteksi serangan',
        ],
        illustration: 'attack',
      },
      {
        id: 'ch4-scene-2',
        title: 'Membuat SSH Key',
        narrative: 'Bu Server mengajarkan Andi cara membuat SSH Key dan menggunakannya untuk login ke server.',
        dialogs: [
          { characterId: 'bu-server', text: 'SSH Key itu seperti kunci rumah yang unik. Tidak bisa ditebak oleh Si Kriptik. Cara buatnya: ssh-keygen -t rsa -b 4096', emotion: 'thinking' },
          { characterId: 'andi', text: 'Gue udah buat key-nya. Terus gimana cara masukin ke server?', emotion: 'surprised' },
          { characterId: 'bu-server', text: 'Gunakan ssh-copy-id user@server_ip. Setelah itu, kamu bisa login tanpa password! Terakhir, disable password login di sshd_config.', emotion: 'happy' },
          { characterId: 'andi', text: 'Keren! Sekarang Si Kriptik nggak bisa brute force lagi!', emotion: 'excited' },
        ],
        learningPoints: [
          'Generate SSH Key: ssh-keygen -t rsa -b 4096',
          'Copy key ke server: ssh-copy-id user@server_ip',
          'Set permissions: chmod 700 ~/.ssh, chmod 600 ~/.ssh/authorized_keys',
          'Disable password login: PermitRootLogin no di sshd_config',
        ],
        illustration: 'ssh-key',
      },
      {
        id: 'ch4-scene-3',
        title: 'Pasang Fail2ban',
        narrative: 'Meski sudah pakai SSH Key, Bu Server menyarankan untuk memasang Fail2ban sebagai tambahan pertahanan.',
        dialogs: [
          { characterId: 'bu-server', text: 'Fail2ban itu seperti security guard yang jaga 24/7. Kalau ada IP yang gagal login 5 kali, otomatis diblokir!', emotion: 'happy' },
          { characterId: 'andi', text: 'Otomatis? Jadi gue nggak perlu monitor terus?', emotion: 'surprised' },
          { characterId: 'bu-server', text: 'Tepat! Install: sudo apt install fail2ban. Setting: maxretry 5, findtime 10 menit, bantime 10 menit. Bisa di-custom kok.', emotion: 'proud' },
          { characterId: 'hacker-jahat', text: 'Apa?! IP gue ke-ban?! Ah sial...', emotion: 'worried' },
        ],
        learningPoints: [
          'Fail2ban memonitor log dan memblokir IP mencurigakan',
          'Install: sudo apt install fail2ban',
          'Konfigurasi: maxretry, findtime, bantime',
          'Check status: sudo fail2ban-client status sshd',
        ],
        illustration: 'fail2ban',
      },
      {
        id: 'ch4-scene-4',
        title: 'SSL Certificate',
        narrative: 'Andi menyadari website-nya masih menggunakan HTTP. Bu Server mengajarkannya cara memasang SSL certificate gratis dari Let\'s Encrypt.',
        dialogs: [
          { characterId: 'andi', text: 'Bu, website gue kan masih HTTP. Browser nanti bakal warning "Not Secure". Gimana cara bikin HTTPS?', emotion: 'thinking' },
          { characterId: 'bu-server', text: 'Mudah! Gunakan Let\'s Encrypt - gratis! Install Certbot, lalu jalankan: sudo certbot --nginx -d domainanda.com. SSL akan otomatis terpasang dan auto-renew!', emotion: 'happy' },
          { characterId: 'andi', text: 'Gratis?! Dan auto-renew pula? Mantap!', emotion: 'excited' },
          { characterId: 'bu-server', text: 'SSL valid 90 hari, tapi Certbot akan otomatis renew sebelum expired. Website kamu sekarang aman dengan gembok hijau!', emotion: 'proud' },
        ],
        learningPoints: [
          'SSL/HTTPS mengamankan data antara browser dan server',
          "Let's Encrypt: SSL gratis, valid 90 hari",
          'Install Certbot dan jalankan untuk Nginx/Apache',
          'Auto-renew: Certbot otomatis memperbarui sebelum expired',
        ],
        illustration: 'ssl',
      },
      {
        id: 'ch4-scene-5',
        title: 'Server Terlindungi!',
        narrative: 'Dengan SSH Key, Fail2ban, Firewall, dan SSL, server Andi sekarang terlindungi. Si Kriptik harus mencari target lain.',
        dialogs: [
          { characterId: 'hacker-jahat', text: 'SSH Key? Gagal. Brute force? Di-ban Fail2ban. Firewall? Port cuma 80, 443, 22. Ugh, server ini terlalu kuat!', emotion: 'worried' },
          { characterId: 'andi', text: 'Haha! Coba lagi deh Kriptik! Server gue sekarang super aman!', emotion: 'excited' },
          { characterId: 'bu-server', text: 'Bagus Andi! Tapi keamanan itu proses berkelanjutan. Update sistem rutin, monitoring log, dan backup tetap harus dilakukan. Oh ya, ada satu hal lagi yang perlu kamu kuasai...', emotion: 'thinking' },
          { characterId: 'andi', text: 'Apa lagi bu?', emotion: 'surprised' },
          { characterId: 'bu-server', text: 'Performance optimization! Website cepat itu pengalaman user yang baik. Nanti kamu akan naik ke Performance Tower!', emotion: 'happy' },
        ],
        learningPoints: [
          'Security adalah proses berkelanjutan',
          'Update sistem secara rutin',
          'Monitor log untuk deteksi dini',
          'Backup tetap penting meski server aman',
          'Performance optimization adalah langkah selanjutnya',
        ],
        illustration: 'shield',
      },
    ],
    quiz: [
      {
        id: 'story-ch4-q1',
        question: 'Apa itu brute force attack?',
        options: [
          'Serangan DDoS',
          'Menebak password secara otomatis',
          'Menghapus semua data server',
        ],
        correctIndex: 1,
        explanation: 'Brute force attack adalah metode menebak password secara otomatis dengan mencoba semua kombinasi yang mungkin.',
      },
      {
        id: 'story-ch4-q2',
        question: 'Apa keuntungan SSH Key dibanding password?',
        options: [
          'Lebih murah',
          'Tidak bisa ditebak, jauh lebih aman',
          'Lebih mudah diingat',
        ],
        correctIndex: 1,
        explanation: 'SSH Key menggunakan enkripsi kriptografi, membuatnya virtually impossible untuk ditebak.',
      },
      {
        id: 'story-ch4-q3',
        question: 'Apa fungsi Fail2ban?',
        options: [
          'Mempercepat server',
          'Memblokir IP yang gagal login berkali-kali',
          'Backup otomatis',
        ],
        correctIndex: 1,
        explanation: 'Fail2ban memonitor log dan secara otomatis memblokir IP address yang gagal login melebihi batas tertentu.',
      },
      {
        id: 'story-ch4-q4',
        question: 'SSL certificate dari mana yang gratis?',
        options: [
          'PremiumSSL',
          "Let's Encrypt",
          'FreeSSL Pro',
        ],
        correctIndex: 1,
        explanation: "Let's Encrypt menyediakan SSL certificate gratis untuk semua orang, valid 90 hari dengan auto-renew.",
      },
      {
        id: 'story-ch4-q5',
        question: 'Port default untuk SSH?',
        options: [
          '80',
          '443',
          '22',
        ],
        correctIndex: 2,
        explanation: 'Port default SSH adalah 22. Best practice: ganti ke port lain dan disable root login.',
      },
    ],
    reward: {
      badge: '🔒',
      title: 'Security Guardian',
      description: 'Server terlindungi dari ancaman! Menguasai SSH Key, Fail2ban, Firewall, dan SSL!',
    },
  },

  'ch5-performance-tower': {
    id: 'ch5-performance-tower',
    chapterNumber: 5,
    title: 'Performance Tower',
    subtitle: 'Website super cepat!',
    description: 'Andi naik ke puncak Performance Tower. Ia akan belajar caching, CDN, compression, dan monitoring untuk membuat website-nya super cepat.',
    unlockThreshold: 70,
    scenes: [
      {
        id: 'ch5-scene-1',
        title: 'Masuk ke Menara',
        narrative: 'Di puncak Performance Tower, Andi disambut oleh CDN-Bot - robot kecil yang super cepat dan selalu antusias.',
        dialogs: [
          { characterId: 'cdn-bot', text: 'BEEP BOOP! Selamat datang di Performance Tower! Aku CDN-Bot, asisten optimasi! Kamu mau website cepat? AKU BISA BANTU!', emotion: 'excited' },
          { characterId: 'andi', text: 'Halo CDN-Bot! Iya, website gue udah lumayan cepat pakai VPS, tapi masih bisa lebih cepat lagi kan?', emotion: 'thinking' },
          { characterId: 'cdn-bot', text: 'BISA! BISA! Ada 4 rahasia website super cepat: Caching, CDN, Compression, dan Monitoring! Aku jelaskan satu-satu!', emotion: 'excited' },
        ],
        learningPoints: [
          '4 pilar optimasi: Caching, CDN, Compression, Monitoring',
          'Website cepat = pengalaman user yang baik',
          'Google memberi ranking lebih tinggi untuk website cepat',
        ],
        illustration: 'tower',
      },
      {
        id: 'ch5-scene-2',
        title: 'Lantai Caching',
        narrative: 'Lantai pertama tower didedikasikan untuk caching. CDN-Bot menjelaskan bagaimana caching bisa mengurangi beban server secara drastis.',
        dialogs: [
          { characterId: 'cdn-bot', text: 'LANTAI 1: CACHING! Bayangkan ini seperti photocopy halaman buku. Daripada bikin halaman baru setiap kali ada yang baca, fotokopi saja!', emotion: 'excited' },
          { characterId: 'andi', text: 'Jadi caching itu nyimpen hasil proses biar nggak perlu proses ulang?', emotion: 'surprised' },
          { characterId: 'cdn-bot', text: 'TEPAT! Redis bisa cache database queries. Browser cache bisa cache static files. PHP OPcache bisa cache kode PHP. BEEP! Semua bikin website LEBIH CEPAT!', emotion: 'excited' },
          { characterId: 'bu-server', text: 'CDN-Bot benar. Redis adalah cache yang paling populer. Install: sudo apt install redis-server. Set maxmemory 256mb. Website kamu akan terasa jauh lebih responsif.', emotion: 'proud' },
        ],
        learningPoints: [
          'Redis: Cache untuk database queries dan objects',
          'Browser cache: Cache static files di browser user',
          'PHP OPcache: Cache compiled PHP code',
          'Install Redis: sudo apt install redis-server',
          'Set maxmemory: 256mb, policy: allkeys-lru',
        ],
        illustration: 'caching',
      },
      {
        id: 'ch5-scene-3',
        title: 'Lantai CDN',
        narrative: 'Lantai kedua adalah wilayah CDN-Bot. Di sini, CDN (Content Delivery Network) bekerja mendistribusikan konten ke seluruh dunia.',
        dialogs: [
          { characterId: 'cdn-bot', text: 'LANTAI 2: CDN! INI WILAYAHKU! Aku punya klon di seluruh dunia! Kalau user dari Surabaya, aku antar dari server Jakarta. Kalau dari London, dari server London!', emotion: 'excited' },
          { characterId: 'andi', text: 'Wah jadi konten disalin ke banyak server di seluruh dunia?', emotion: 'surprised' },
          { characterId: 'cdn-bot', text: 'TEPAT! Cloudflare CDN gratis! Setup: tambah domain, ubah nameserver, enable auto minify dan Brotli compression. Website kamu bisa 70% lebih cepat!', emotion: 'excited' },
          { characterId: 'andi', text: '70% lebih cepat?! Serius?! Gue langsung setup Cloudflare!', emotion: 'excited' },
        ],
        learningPoints: [
          'CDN menyajikan konten dari server terdekat dengan user',
          'Cloudflare: CDN gratis, setup mudah',
          'Auto Minify: Kompres CSS, JS, HTML',
          'Brotli compression: Kompresi lebih baik dari Gzip',
          'CDN bisa mengurangi beban server hingga 70%',
        ],
        illustration: 'cdn',
      },
      {
        id: 'ch5-scene-4',
        title: 'Lantai Compression & Database',
        narrative: 'Lantai ketiga tower mengajarkan Gzip compression dan database optimization.',
        dialogs: [
          { characterId: 'bu-server', text: 'Lantai ini tentang Gzip Compression dan Database Optimization. Gzip bisa mengurangi ukuran file hingga 70-80%!', emotion: 'thinking' },
          { characterId: 'andi', text: 'Gzip itu kompresi kan? Kayak zip file?', emotion: 'surprised' },
          { characterId: 'bu-server', text: 'Mirip! Tapi otomatis. Nginx bisa enable Gzip dengan konfigurasi sederhana. Yang perlu dikompres: text, HTML, CSS, JS. JANGAN kompres images dan videos - sudah compressed.', emotion: 'happy' },
          { characterId: 'cdn-bot', text: 'Oh dan DATABASE! Enable slow query log, gunakan EXPLAIN sebelum SELECT, add INDEX, dan atur innodb_buffer_pool_size = 70% RAM! BEEP BEEP!', emotion: 'excited' },
        ],
        learningPoints: [
          'Gzip: Kompresi transfer, kurangi ukuran 70-80%',
          'Kompres: text, HTML, CSS, JS, XML, JSON',
          'Jangan kompres: images, videos (sudah compressed)',
          'Slow query log: Deteksi query lambat',
          'Add index: Percepat query database',
        ],
        illustration: 'compression',
      },
      {
        id: 'ch5-scene-5',
        title: 'Puncak Menara',
        narrative: 'Di puncak Performance Tower, Andi bisa melihat seluruh infrastruktur yang sudah ia bangun. Bu Server dan semua karakter berkumpul.',
        dialogs: [
          { characterId: 'bu-server', text: 'Andi, kamu sudah sampai di puncak! Dari sini kamu bisa lihat semua yang sudah kamu pelajari: Domain, Hosting, VPS, DNS, Security, dan Performance.', emotion: 'proud' },
          { characterId: 'domaino', text: 'Dulu kamu cuma bisa bingung lihat DNS records. Sekarang kamu bisa troubleshooting DNS sendiri!', emotion: 'proud' },
          { characterId: 'cdn-bot', text: 'WEBSITE KAMU SEKARANG SUPER CEPAT! BEEP BEEP! Aku bangga!', emotion: 'excited' },
          { characterId: 'hacker-jahat', text: 'Hmm... server ini keamanannya kok kuat ya. Dan cepat pula. Ah, mungkin gue cari target lain aja deh.', emotion: 'worried' },
          { characterId: 'andi', text: 'Terima kasih semuanya! Dari cuma bisa bikin HTML di laptop, sekarang gue bisa manage server sendiri! Perjalanan yang luar biasa!', emotion: 'excited' },
          { characterId: 'bu-server', text: 'Perjalananmu belum selesai Andi. Teknologi terus berkembang. Ada Docker, CI/CD, Load Balancing, dan masih banyak lagi. Tapi fondasi yang kamu punya sekarang sudah sangat kuat. Terus belajar!', emotion: 'happy' },
        ],
        learningPoints: [
          'Website cepat = pengalaman user baik + SEO tinggi',
          'Monitoring: Gunakan tools seperti Netdata atau Grafana',
          'Backup tetap penting meski semua sudah optimal',
          'Terus belajar: Docker, CI/CD, Load Balancing',
          'Fondasi yang kuat adalah kunci untuk berkembang',
        ],
        illustration: 'summit',
      },
    ],
    quiz: [
      {
        id: 'story-ch5-q1',
        question: 'Apa fungsi utama Redis?',
        options: [
          'Mengamankan server',
          'Cache data untuk akses lebih cepat',
          'Backup database',
        ],
        correctIndex: 1,
        explanation: 'Redis adalah in-memory cache yang menyimpan data frequently accessed agar bisa diambil lebih cepat tanpa query database.',
      },
      {
        id: 'story-ch5-q2',
        question: 'Apa fungsi CDN?',
        options: [
          'Mengamankan database',
          'Menyajikan konten dari server terdekat dengan user',
          'Backup otomatis',
        ],
        correctIndex: 1,
        explanation: 'CDN (Content Delivery Network) menyajikan konten dari edge server terdekat dengan user, mengurangi latency.',
      },
      {
        id: 'story-ch5-q3',
        question: 'Gzip bisa mengurangi ukuran file sampai berapa persen?',
        options: [
          '10-20%',
          '30-50%',
          '70-80%',
        ],
        correctIndex: 2,
        explanation: 'Gzip compression bisa mengurangi ukuran file text-based (HTML, CSS, JS) hingga 70-80%.',
      },
      {
        id: 'story-ch5-q4',
        question: 'Apa yang sebaiknya TIDAK dikompres dengan Gzip?',
        options: [
          'HTML dan CSS',
          'JavaScript',
          'Images dan Videos',
        ],
        correctIndex: 2,
        explanation: 'Images (JPEG, PNG) dan videos (MP4) sudah menggunakan kompresi sendiri. Mengompres ulang tidak memberikan manfaat.',
      },
      {
        id: 'story-ch5-q5',
        question: 'Apa yang harus dilakukan untuk mendeteksi query database lambat?',
        options: [
          'Restart server',
          'Enable slow query log',
          'Tambah RAM',
        ],
        correctIndex: 1,
        explanation: 'Slow query log mencatat query yang memakan waktu lebih dari threshold tertentu, membantu identifikasi query yang perlu dioptimasi.',
      },
    ],
    reward: {
      badge: '👑',
      title: 'Performance King',
      description: 'Menguasai semua aspek server management! Website super cepat dan aman!',
    },
  },
};
