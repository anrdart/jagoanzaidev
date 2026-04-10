export type TopicCategory = 'domain' | 'hosting' | 'vps' | 'dns' | 'security' | 'linux' | 'backup' | 'performance';
export type TopicDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Topic {
  id: string;
  title: string;
  category: TopicCategory;
  difficulty: TopicDifficulty;
  duration: number; // in minutes
  content: string[];
}

export const categoryInfo: Record<TopicCategory, { name: string; icon: string; color: string }> = {
  domain: { name: 'Domain', icon: '🌐', color: 'bg-blue-100 text-blue-700' },
  hosting: { name: 'Hosting', icon: '🏢', color: 'bg-purple-100 text-purple-700' },
  vps: { name: 'VPS', icon: '🖥️', color: 'bg-green-100 text-green-700' },
  dns: { name: 'DNS', icon: '🔍', color: 'bg-orange-100 text-orange-700' },
  security: { name: 'Security', icon: '🔒', color: 'bg-red-100 text-red-700' },
  linux: { name: 'Linux', icon: '🐧', color: 'bg-yellow-100 text-yellow-700' },
  backup: { name: 'Backup', icon: '💾', color: 'bg-cyan-100 text-cyan-700' },
  performance: { name: 'Performance', icon: '⚡', color: 'bg-pink-100 text-pink-700' },
};

export const curatedTopics: Topic[] = [
  // DASAR (6 topics)
  {
    id: 'domain-website-server-basics',
    title: 'Apa itu Website & Server?',
    category: 'domain',
    difficulty: 'beginner',
    duration: 5,
    content: [
      'Website adalah kumpulan halaman web yang dapat diakses melalui internet',
      'Server adalah komputer yang menyimpan dan menyajikan website kepada pengunjung',
      'Setiap website membutuhkan server untuk dapat diakses online 24/7',
      'Web server software seperti Nginx atau Apache menangani permintaan dari browser',
      'Hosting adalah layanan penyewaan ruang di server untuk website Anda'
    ]
  },
  {
    id: 'buying-first-domain',
    title: 'Cara Beli Domain Pertama Kali',
    category: 'domain',
    difficulty: 'beginner',
    duration: 8,
    content: [
      'Pilih nama domain yang pendek, mudah diingat, dan relevan dengan brand Anda',
      'Pilih ekstensi domain yang tepat: .com untuk internasional, .id untuk Indonesia',
      'Cek ketersediaan domain melalui registrar seperti Niagahoster, Domainesia, atau GoDaddy',
      'Buat akun di domain registrar dan lengkapi data diri dengan benar',
      'Lakukan pembayaran dan verifikasi kontak email',
      'Domain biasanya aktif dalam 1-24 jam setelah pembayaran'
    ]
  },
  {
    id: 'choosing-hosting-beginners',
    title: 'Cara Pilih Hosting untuk Pemula',
    category: 'hosting',
    difficulty: 'beginner',
    duration: 6,
    content: [
      'Shared Hosting cocok untuk pemula dengan traffic rendah',
      'Perhatikan spesifikasi: storage, bandwidth, dan number of websites',
      'Cek uptime guarantee (minimal 99.9%)',
      'Pastikan ada support 24/7 melalui live chat atau WhatsApp',
      'Bandirngkan harga dan fitur dari beberapa provider',
      'Pilih yang menyediakan cPanel untuk kemudahan pengelolaan'
    ]
  },
  {
    id: 'connecting-domain-hosting',
    title: 'Cara Koneksi Domain ke Hosting',
    category: 'domain',
    difficulty: 'beginner',
    duration: 7,
    content: [
      'Dapatkan nameserver dari hosting provider (misal: ns1.niagahoster.com)',
      'Login ke dashboard domain Anda',
      'Cari menu "Nameservers" atau "DNS Management"',
      'Ubah nameserver default ke nameserver dari hosting Anda',
      'Simpan perubahan dan tunggu propagasi DNS (1-48 jam)',
      'Verifikasi domain sudah pointing ke hosting dengan ping domain'
    ]
  },
  {
    id: 'understanding-dns-propagation',
    title: 'Mengerti DNS & Propagasi',
    category: 'dns',
    difficulty: 'beginner',
    duration: 5,
    content: [
      'DNS (Domain Name System) menerjemahkan domain ke IP address',
      'DNS propagation adalah proses update DNS di server di seluruh dunia',
      'Propagasi biasanya memakan waktu 1-48 jam',
      'Selama propagasi, website mungkin tidak bisa diakses di beberapa lokasi',
      'Gunakan tools seperti whatsmydns.net untuk cek status propagasi',
      'TTL (Time To Live) mempengaruhi seberapa cepat propagasi terjadi'
    ]
  },
  {
    id: 'uploading-files-cpanel',
    title: 'Cara Upload File dengan cPanel',
    category: 'hosting',
    difficulty: 'beginner',
    duration: 10,
    content: [
      'Login ke cPanel melalui URL: domainanda.com/cpanel',
      'Cari dan buka "File Manager"',
      'Navigate ke folder "public_html" untuk domain utama',
      'Klik "Upload" untuk mengupload file dari komputer',
      'Atau gunakan "Upload" dari menu setelah memilih file',
      'Pastikan file utama bernama "index.html" atau "index.php"',
      'File langsung aktif setelah selesai diupload'
    ]
  },

  // HOSTING (6 topics)
  {
    id: 'shared-hosting-pros-cons',
    title: 'Shared Hosting: Kelebihan & Kekurangan',
    category: 'hosting',
    difficulty: 'beginner',
    duration: 5,
    content: [
      'Kelebihan: Murah (Rp 20-100 ribu/bulan), mudah digunakan, tidak perlu technical knowledge',
      'Kelebihan: Sudah termasuk cPanel, backup, dan support',
      'Kekurangan: Resource terbatas dan dibagi dengan pengguna lain',
      'Kekurangan: Performa bisa terpengaruh oleh website lain di server yang sama',
      'Kekurangan: Security risk jika salah satu website dihack',
      'Cocok untuk: Personal blog, company profile, website dengan traffic < 10,000/hari'
    ]
  },
  {
    id: 'vps-what-when-why',
    title: 'VPS: Apa, Kapan, Kenapa?',
    category: 'vps',
    difficulty: 'intermediate',
    duration: 8,
    content: [
      'VPS (Virtual Private Server) adalah server virtual di dalam physical server',
      'VPS punya resource dedicated: CPU, RAM, dan storage terpisah',
      'Kenapa VPS: Performa lebih stabil, kontrol penuh, bisa install software apapun',
      'Kapan butuh VPS: Traffic > 10,000/hari, butuh custom software, e-commerce',
      'Kapan butuh VPS: Website dengan resource-intensive application',
      'Perbedaan utama: Shared sharing resource, VPS dedicated resource',
      'VPS butuh technical knowledge untuk setup dan management'
    ]
  },
  {
    id: 'cloud-vs-dedicated',
    title: 'Cloud Hosting vs Dedicated Server',
    category: 'hosting',
    difficulty: 'intermediate',
    duration: 7,
    content: [
      'Cloud Hosting: Resource dari multiple server, scalable, pay-as-you-go',
      'Dedicated Server: Satu physical server penuh untuk Anda',
      'Cloud Hosting: Auto scaling, mudah upgrade resource',
      'Dedicated Server: Resource tetap, perlu hardware upgrade untuk scale up',
      'Cloud Hosting: Cocok untuk startup dan traffic yang fluktuatif',
      'Dedicated Server: Cocok untuk enterprise dengan traffic stabil dan besar',
      'Harga Cloud mulai Rp 200 ribu/bulan, Dedicated mulai Rp 2 juta/bulan'
    ]
  },
  {
    id: 'upgrade-shared-to-vps',
    title: 'Cara Upgrade Shared ke VPS',
    category: 'vps',
    difficulty: 'intermediate',
    duration: 10,
    content: [
      'Backup semua file dan database dari shared hosting',
      'Beli VPS dengan spesifikasi yang lebih tinggi dari shared hosting',
      'Pilih OS: Ubuntu 20.04/22.04 LTS atau Debian 11',
      'Install web server: Nginx atau Apache',
      'Install PHP dan extensions yang diperlukan',
      'Install MySQL/MariaDB',
      'Upload backup files ke VPS',
      'Import database ke VPS',
      'Update DNS domain ke IP address VPS',
      'Test website sebelum mengubah DNS'
    ]
  },
  {
    id: 'cpanel-plesk-directadmin',
    title: 'cPanel vs Plesk vs DirectAdmin',
    category: 'hosting',
    difficulty: 'intermediate',
    duration: 6,
    content: [
      'cPanel: Paling populer, interface intuitive, dokumentasi lengkap',
      'cPanel: Harga mahal ($15-25/bulan), mostly untuk Linux',
      'Plesk: Cross-platform (Linux & Windows), interface modern',
      'Plesk: Support Docker dan Git integration, harga $10-20/bulan',
      'DirectAdmin: Lebih murah ($5-15/bulan), ringan dan cepat',
      'DirectAdmin: Interface sederhana, fewer features',
      'Pilihan: cPanel untuk user baru, Plesk untuk advanced user, DirectAdmin untuk budget'
    ]
  },
  {
    id: 'unlimited-hosting-myth',
    title: 'Unlimited Hosting: Mitos atau Fakta?',
    category: 'hosting',
    difficulty: 'intermediate',
    duration: 5,
    content: [
      'Mitos: "Unlimited" berarti tanpa batasan',
      'Fakta: Ada batasan lain: inode count, CPU usage, RAM usage',
      'Inode limit: Biasanya maksimal 200,000-500,000 files',
      'CPU/RAM limit: Biasanya max 25% server resource untuk beberapa detik',
      'Fair Usage Policy: Hosting bisa suspend website yang overuse',
      'Unlimited storage realistis untuk website biasa: 5-20 GB',
      'Lebih baik pilih hosting dengan jelas jumlah storage-nya'
    ]
  },

  // VPS/SERVER (6 topics)
  {
    id: 'choose-os-ubuntu-debian-centos',
    title: 'Pilih OS: Ubuntu vs Debian vs CentOS',
    category: 'linux',
    difficulty: 'intermediate',
    duration: 7,
    content: [
      'Ubuntu: User-friendly, dokumentasi lengkap, update 6 bulan sekali',
      'Ubuntu: LTS (Long Term Support) release setiap 2 tahun, support 5 tahun',
      'Debian: Sangat stabil, minimal dependencies, security update cepat',
      'Debian: Cocok untuk production server, release cycle lambat',
      'CentOS: Berbasis Red Hat Enterprise Linux, enterprise grade',
      'CentOS: Support lama, namun CentOS 8 dihentikan, diganti Rocky/AlmaLinux',
      'Rekomendasi: Ubuntu 22.04 LTS untuk pemula, Debian 11 untuk stability'
    ]
  },
  {
    id: 'install-webserver-nginx-apache',
    title: 'Cara Install Web Server (Nginx/Apache)',
    category: 'vps',
    difficulty: 'intermediate',
    duration: 12,
    content: [
      'Update system: sudo apt update && sudo apt upgrade',
      'Install Nginx: sudo apt install nginx',
      'Install Apache: sudo apt install apache2',
      'Start service: sudo systemctl start nginx',
      'Enable service: sudo systemctl enable nginx',
      'Check status: sudo systemctl status nginx',
      'Configure firewall: sudo ufw allow "Nginx Full"',
      'Test: Buka IP address di browser',
      'Nginx lebih hemat resource, Apache lebih fleksibel dengan .htaccess',
      'Konfigurasi file: /etc/nginx/sites-available/ untuk Nginx'
    ]
  },
  {
    id: 'install-ssl-letsencrypt',
    title: 'Cara Install SSL Certificate (Let\'s Encrypt)',
    category: 'security',
    difficulty: 'intermediate',
    duration: 10,
    content: [
      'Install Certbot: sudo apt install certbot python3-certbot-nginx',
      'Untuk Nginx: sudo certbot --nginx -d domainanda.com -d www.domainanda.com',
      'Untuk Apache: sudo certbot --apache -d domainanda.com -d www.domainanda.com',
      'Follow prompts: Enter email, agree ToS, pilih redirect HTTP ke HTTPS',
      'SSL akan otomatis terinstall dan terconfigure',
      'Test SSL: Kunjungi https://www.ssllabs.com/ssltest/',
      'Auto-renew: Certbot akan otomatis renew SSL sebelum expired',
      'Manual renew test: sudo certbot renew --dry-run',
      'SSL valid selama 90 hari, namun bisa di-renew otomatis'
    ]
  },
  {
    id: 'setup-firewall-ufw',
    title: 'Cara Setup Firewall dengan UFW',
    category: 'security',
    difficulty: 'intermediate',
    duration: 8,
    content: [
      'UFW (Uncomplicated Firewall) adalah firewall management tool untuk Ubuntu',
      'Install UFW: sudo apt install ufw',
      'Set default rules: sudo ufw default deny incoming, sudo ufw default allow outgoing',
      'Allow SSH: sudo ufw allow ssh atau sudo ufw allow 22',
      'Allow HTTP: sudo ufw allow 80',
      'Allow HTTPS: sudo ufw allow 443',
      'Enable firewall: sudo ufw enable',
      'Check status: sudo ufw status verbose',
      'Allow specific IP: sudo ufw allow from 192.168.1.100',
      'Delete rule: sudo ufw delete allow 80'
    ]
  },
  {
    id: 'monitoring-resource-server',
    title: 'Cara Monitoring Resource Server',
    category: 'vps',
    difficulty: 'intermediate',
    duration: 7,
    content: [
      'Check CPU usage: top atau htop',
      'Check memory: free -h atau vmstat',
      'Check disk usage: df -h',
      'Check disk inodes: df -i',
      'Real-time monitoring: htop (install dengan sudo apt install htop)',
      'Network monitoring: nethogs (install dengan sudo apt install nethogs)',
      'Process monitoring: ps aux',
      'System information: neofetch (untuk tampilan cantik)',
      'Log monitoring: tail -f /var/log/syslog',
      'Advanced monitoring: Install Netdata untuk dashboard monitoring lengkap'
    ]
  },
  {
    id: 'backup-restore-vps',
    title: 'Cara Backup & Restore VPS',
    category: 'backup',
    difficulty: 'intermediate',
    duration: 10,
    content: [
      'Backup files: tar -czf backup.tar.gz /var/www/html',
      'Backup database (MySQL): mysqldump -u root -p database_name > backup.sql',
      'Backup database (PostgreSQL): pg_dump database_name > backup.sql',
      'Automated backup dengan cron: 0 2 * * * /path/to/backup-script.sh',
      'Backup ke offsite: scp backup.tar.gz user@remote:/backup/',
      'Restore files: tar -xzf backup.tar.gz -C /var/www/html',
      'Restore database: mysql -u root -p database_name < backup.sql',
      'Snapshot VPS: Gunakan fitur snapshot dari VPS provider',
      'Test backup secara berkala untuk memastikan bisa direstore',
      'Simpan backup di lokasi berbeda (3-2-1 rule)'
    ]
  },

  // DNS (6 topics)
  {
    id: 'types-of-dns-records',
    title: 'Mengerti Jenis DNS Record',
    category: 'dns',
    difficulty: 'beginner',
    duration: 8,
    content: [
      'A Record: Menghubungkan domain ke IPv4 address',
      'AAAA Record: Menghubungkan domain ke IPv6 address',
      'CNAME: Alias dari satu domain ke domain lain (www ke @)',
      'MX Record: Mengarahkan email ke mail server',
      'TXT Record: Text untuk verification, SPF, DKIM',
      'NS Record: Nameserver yang mengelola DNS domain',
      'SRV Record: Service location untuk spesifik service',
      'CAA Record: Certificate Authority Authorization',
      'TTL: Time To Live, berapa lama DNS di-cache',
      'Priority: Untuk MX record, semakin kecil semakin prioritas'
    ]
  },
  {
    id: 'setting-subdomain',
    title: 'Cara Setting Subdomain',
    category: 'dns',
    difficulty: 'beginner',
    duration: 6,
    content: [
      'Login ke DNS management dashboard',
      'Add new record: CNAME',
      'Name: blog (untuk blog.domainanda.com)',
      'Value: @ (untuk pointing ke root domain)',
      'Atau A record untuk pointing ke IP address spesifik',
      'TTL: Default (3600 atau 1 jam)',
      'Tunggu propagasi DNS (1-48 jam)',
      'Di web server, buat virtual host untuk subdomain',
      'Restart web server setelah konfigurasi',
      'Test: ping blog.domainanda.com'
    ]
  },
  {
    id: 'redirect-http-to-https',
    title: 'Cara Redirect HTTP ke HTTPS',
    category: 'security',
    difficulty: 'beginner',
    duration: 5,
    content: [
      'Install SSL certificate terlebih dahulu',
      'Untuk Nginx: Add return 301 https://$server_name$request_uri; di server block port 80',
      'Untuk Apache: Add Redirect permanent / https://domainanda.com/ di VirtualHost port 80',
      'Untuk WordPress: Edit wp-config.php, add define(\'FORCE_SSL_ADMIN\', true);',
      'Untuk WordPress: Install plugin Really Simple SSL',
      'Test redirect: Kunjungi http://domainanda.com',
      'Redirect harus aktif dan otomatis ke HTTPS',
      'Check mixed content: Semua resource harus HTTPS',
      'Update .htaccess jika menggunakan Apache'
    ]
  },
  {
    id: 'setting-cloudflare-cdn',
    title: 'Cara Setting Cloudflare CDN',
    category: 'performance',
    difficulty: 'intermediate',
    duration: 8,
    content: [
      'Buat akun gratis di Cloudflare.com',
      'Add site: Masukkan domain Anda',
      'Cloudflare akan scan existing DNS records',
      'Pilih plan: Free (cukup untuk kebanyakan website)',
      'Update nameserver domain ke nameserver Cloudflare',
      'Tunggu propagasi (1-24 jam)',
      'Set active di Cloudflare dashboard',
      'Configure SSL/TLS: Full atau Full (strict)',
      'Enable Auto Minify untuk CSS, JS, HTML',
      'Enable Brotli compression untuk transfer lebih cepat'
    ]
  },
  {
    id: 'troubleshooting-dns-problems',
    title: 'Troubleshooting DNS Problem',
    category: 'dns',
    difficulty: 'intermediate',
    duration: 7,
    content: [
      'Check DNS propagation: whatsmydns.net',
      'Check DNS records: dig domainanda.com atau nslookup domainanda.com',
      'Check nameserver: whois domainanda.com',
      'Clear local DNS cache: ipconfig /flushdns (Windows) atau sudo systemd-resolve --flush-caches (Linux)',
      'Check local DNS: cat /etc/resolv.conf',
      'Try different DNS: Google DNS (8.8.8.8) atau Cloudflare DNS (1.1.1.1)',
      'Check firewall: Pastikan port 53 terbuka',
      'Verify DNS configuration: MXToolbox.com',
      'Check for typos in DNS records',
      'Wait for full propagation (24-48 jam)'
    ]
  },
  {
    id: 'dns-propagation-time',
    title: 'DNS Propagation Berapa Lama?',
    category: 'dns',
    difficulty: 'beginner',
    duration: 4,
    content: [
      'Biasanya 1-24 jam untuk sebagian besar lokasi',
      'Full propagation: 24-48 jam ke seluruh dunia',
      'Faktor yang mempengaruhi: TTL setting',
      'TTL default: 3600 (1 jam) atau 14400 (4 jam)',
      'TTL rendah (300): Propagasi lebih cepat (5 menit)',
      'Lower TTL sebelum mengubah DNS records',
      'Check propagation per region: whatsmydns.net',
      'ISP caching: Beberapa ISP cache DNS lebih lama',
      'Force refresh: Flush DNS cache di komputer'
    ]
  },

  // SECURITY (6 topics)
  {
    id: 'ssh-key-authentication',
    title: 'Cara Buat SSH Key Authentication',
    category: 'security',
    difficulty: 'intermediate',
    duration: 10,
    content: [
      'Generate SSH key di local computer: ssh-keygen -t rsa -b 4096',
      'Tekan Enter untuk default location (~/.ssh/id_rsa)',
      'Optional: Enter passphrase untuk extra security',
      'Copy public key ke server: ssh-copy-id user@server_ip',
      'Atau manual: cat ~/.ssh/id_rsa.pub | ssh user@server "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"',
      'Set permissions: chmod 700 ~/.ssh dan chmod 600 ~/.ssh/authorized_keys',
      'Test SSH: ssh user@server_ip',
      'Jika berhasil, tidak perlu password lagi',
      'Disable password authentication setelah SSH key berfungsi',
      'Backup private key: Jangan sampai hilang'
    ]
  },
  {
    id: 'disable-root-login',
    title: 'Cara Disable Root Login',
    category: 'security',
    difficulty: 'intermediate',
    duration: 6,
    content: [
      'Buat user baru dengan sudo privileges terlebih dahulu',
      'Add user: adduser username',
      'Add to sudo group: usermod -aG sudo username',
      'Login ke server dengan user baru',
      'Edit SSH config: sudo nano /etc/ssh/sshd_config',
      'Cari "PermitRootLogin yes" dan ubah ke "PermitRootLogin no"',
      'Optional: "PasswordAuthentication no" untuk force SSH key only',
      'Restart SSH: sudo systemctl restart sshd',
      'Test: Jangan logout dari root sebelum test login dengan user baru',
      'Root login sekarang sudah disabled'
    ]
  },
  {
    id: 'install-fail2ban',
    title: 'Cara Install Fail2ban Anti Brute Force',
    category: 'security',
    difficulty: 'intermediate',
    duration: 8,
    content: [
      'Fail2ban memonitor log dan block IP yang gagal login berkali-kali',
      'Install: sudo apt install fail2ban',
      'Copy config: sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local',
      'Edit config: sudo nano /etc/fail2ban/jail.local',
      'Setting penting: maxretry (default 5), findtime (10 min), bantime (10 min)',
      'Enable jails: [sshd], [nginx-http-auth], [php-url-fopen]',
      'Start service: sudo systemctl start fail2ban',
      'Enable on boot: sudo systemctl enable fail2ban',
      'Check status: sudo fail2ban-client status sshd',
      'Unban IP: sudo fail2ban-client set sshd unbanip IP_ADDRESS'
    ]
  },
  {
    id: 'setup-two-factor-auth',
    title: 'Cara Setup Two-Factor Authentication',
    category: 'security',
    difficulty: 'advanced',
    duration: 10,
    content: [
      'Install Google Authenticator: sudo apt install libpam-google-authenticator',
      'Run setup: google-authenticator untuk user yang ingin di-2FA',
      'Scan QR code dengan Google Authenticator app',
      'Save emergency codes di tempat aman',
      'Configure SSH: Edit /etc/pam.d/sshd, add: auth required pam_google_authenticator.so',
      'Edit /etc/ssh/sshd_config: ChallengeResponseAuthentication yes',
      'Restart SSH: sudo systemctl restart sshd',
      'Test: SSH akan meminta verification code setelah password',
      '2FA sangat penting untuk remote access',
      'Backup codes penting untuk jika kehilangan akses ke authenticator app'
    ]
  },
  {
    id: 'scan-malware-clamav',
    title: 'Cara Scan Malware dengan ClamAV',
    category: 'security',
    difficulty: 'intermediate',
    duration: 7,
    content: [
      'Install ClamAV: sudo apt install clamav clamav-daemon',
      'Update virus database: sudo freshclam',
      'Scan specific folder: clamscan /var/www/html/',
      'Scan recursively: clamscan -r /var/www/html/',
      'Scan dan remove infected: clamscan -r --remove /var/www/html/',
      'Scan ke log file: clamscan -r /var/www/html/ > scan_report.txt',
      'Scheduled scan dengan cron: 0 3 * * * clamscan -r /var/www/html/',
      'Check scan status: sudo systemctl status clamav-daemon',
      'Quarantine: clamscan -r --move=/quarantine /var/www/html/',
      'Review hasil scan di log file'
    ]
  },
  {
    id: 'best-practice-password',
    title: 'Best Practice Password Security',
    category: 'security',
    difficulty: 'beginner',
    duration: 5,
    content: [
      'Minimal 12 karakter untuk password yang kuat',
      'Gunakan kombinasi: huruf besar, kecil, angka, dan simbol',
      'Jangan gunakan password yang sama untuk multiple accounts',
      'Gunakan password manager: Bitwarden, 1Password, atau LastPass',
      'Enable two-factor authentication (2FA) dimanapun available',
      'Jangan share password via email atau chat',
      'Ganti password secara berkala (3-6 bulan)',
      'Avoid common patterns: password123, qwerty, tanggal lahir',
      'Use passphrase: "Correct-Horse-Battery-Staple" lebih kuat dari "Tr0ub4dor&3"',
      'Check password strength: haveibeenpwned.com'
    ]
  },

  // LINUX (6 topics)
  {
    id: '15-basic-linux-commands',
    title: '15 Perintah Linux Dasar Wajib Tahu',
    category: 'linux',
    difficulty: 'beginner',
    duration: 10,
    content: [
      'ls - List files di current directory',
      'cd - Change directory',
      'pwd - Print working directory',
      'mkdir - Make directory',
      'rm - Remove file atau folder',
      'cp - Copy file atau folder',
      'mv - Move atau rename file',
      'cat - View file content',
      'nano atau vim - Text editor',
      'chmod - Change file permissions',
      'chown - Change file owner',
      'top atau htop - Monitor processes',
      'ps - List running processes',
      'kill - Terminate process',
      'systemctl - Manage services'
    ]
  },
  {
    id: 'manage-files-folders',
    title: 'Cara Manage File & Folder',
    category: 'linux',
    difficulty: 'beginner',
    duration: 8,
    content: [
      'Navigate: cd /var/www/html',
      'List all files: ls -la',
      'Create directory: mkdir folder_name',
      'Create nested directory: mkdir -p parent/child/grandchild',
      'Remove empty directory: rmdir folder_name',
      'Remove file: rm file.txt',
      'Remove directory recursively: rm -r folder_name',
      'Copy file: cp source.txt destination.txt',
      'Copy directory: cp -r source_dir/ destination_dir/',
      'Move/rename: mv old_name.txt new_name.txt',
      'View file: cat file.txt',
      'Search file: find /path -name "filename"'
    ]
  },
  {
    id: 'view-monitor-logs',
    title: 'Cara View & Monitor Logs',
    category: 'linux',
    difficulty: 'intermediate',
    duration: 9,
    content: [
      'System log: /var/log/syslog atau /var/log/messages',
      'Auth log: /var/log/auth.log (SSH login attempts)',
      'Apache access log: /var/log/apache2/access.log',
      'Apache error log: /var/log/apache2/error.log',
      'Nginx access log: /var/log/nginx/access.log',
      'Nginx error log: /var/log/nginx/error.log',
      'View log live: tail -f /var/log/syslog',
      'View last 50 lines: tail -n 50 /var/log/syslog',
      'Search log: grep "error" /var/log/syslog',
      'Journalctl untuk systemd: journalctl -u nginx -f',
      'Rotate log: logrotate untuk manage log size',
      'Clear log untuk free space: > /var/log/syslog (use with caution)'
    ]
  },
  {
    id: 'manage-services-systemctl',
    title: 'Cara Manage Service (systemctl)',
    category: 'linux',
    difficulty: 'intermediate',
    duration: 7,
    content: [
      'Start service: sudo systemctl start nginx',
      'Stop service: sudo systemctl stop nginx',
      'Restart service: sudo systemctl restart nginx',
      'Reload config: sudo systemctl reload nginx',
      'Enable on boot: sudo systemctl enable nginx',
      'Disable on boot: sudo systemctl disable nginx',
      'Check status: sudo systemctl status nginx',
      'Check if active: systemctl is-active nginx',
      'Check if enabled: systemctl is-enabled nginx',
      'View logs: journalctl -u nginx',
      'List all services: systemctl list-units --type=service',
      'Failed services: systemctl --failed'
    ]
  },
  {
    id: 'install-software',
    title: 'Cara Install Software (apt, yum)',
    category: 'linux',
    difficulty: 'beginner',
    duration: 6,
    content: [
      'Update package list: sudo apt update',
      'Upgrade packages: sudo apt upgrade',
      'Install package: sudo apt install package_name',
      'Remove package: sudo apt remove package_name',
      'Remove with config: sudo apt purge package_name',
      'Search package: apt search keyword',
      'Show package info: apt show package_name',
      'List installed packages: apt list --installed',
      'For CentOS/RHEL: sudo yum install package_name',
      'For Fedora: sudo dnf install package_name',
      'Add repository: sudo add-apt-repository ppa:repository',
      'Clean cache: sudo apt clean'
    ]
  },
  {
    id: 'troubleshoot-linux',
    title: 'Cara Troubleshooting Linux',
    category: 'linux',
    difficulty: 'intermediate',
    duration: 8,
    content: [
      'Check system resources: top, htop, free -h, df -h',
      'Check running processes: ps aux, pstree',
      'Check disk usage: du -sh * di directory',
      'Check network connection: ping, traceroute, mtr',
      'Check open ports: netstat -tlnp atau ss -tlnp',
      'Check logs: /var/log/syslog, /var/log/auth.log',
      'Check service status: systemctl status service_name',
      'Check firewall rules: sudo ufw status',
      'Check SELinux status: sestatus (untuk CentOS)',
      'Test DNS resolution: nslookup domain.com',
      'Check hardware info: lshw, lspci, lsusb',
      'Reboot jika perlu: sudo reboot'
    ]
  },

  // BACKUP & PERFORMANCE (6 topics)
  {
    id: '3-2-1-backup-strategy',
    title: 'Strategy Backup 3-2-1 yang Benar',
    category: 'backup',
    difficulty: 'beginner',
    duration: 8,
    content: [
      '3: Buat minimal 3 copy data (1 original + 2 backup)',
      '2: Simpan di 2 different media types (HDD, SSD, Cloud)',
      '1: Simpan 1 copy offsite (lokal berbeda atau cloud)',
      'Primary: Data aktif di server/hosting',
      'Backup 1: Local backup di server (daily)',
      'Backup 2: Remote backup ke lokasi berbeda (weekly)',
      'Backup 3: Cloud storage untuk long-term retention',
      'Test backup secara berkala',
      'Document restore procedure',
      'Monitor backup success/failure',
      'Backup critical data lebih sering (real-time untuk database)',
      'Encrypt backup untuk sensitive data'
    ]
  },
  {
    id: 'setup-automated-backup',
    title: 'Cara Setup Automated Backup',
    category: 'backup',
    difficulty: 'intermediate',
    duration: 10,
    content: [
      'Buat backup script: #!/bin/bash di file /backup/backup.sh',
      'Add commands: tar -czf /backup/website-$(date +%Y%m%d).tar.gz /var/www/html',
      'Database backup: mysqldump -u root -pPASSWORD db > /backup/db-$(date +%Y%m%d).sql',
      'Make executable: chmod +x /backup/backup.sh',
      'Setup cron job: crontab -e',
      'Schedule daily jam 2 pagi: 0 2 * * * /backup/backup.sh',
      'Add logging: >> /var/log/backup.log 2>&1',
      'Upload ke cloud: AWS S3, Google Cloud Storage, atau rsync ke remote server',
      'Cleanup old backup: find /backup -name "*.tar.gz" -mtime +7 -delete',
      'Test backup dengan restore: tar -xzf backup.tar.gz',
      'Monitor cron log: grep CRON /var/log/syslog'
    ]
  },
  {
    id: 'restore-from-backup',
    title: 'Cara Restore dari Backup',
    category: 'backup',
    difficulty: 'intermediate',
    duration: 7,
    content: [
      'Download backup file dari storage (local atau cloud)',
      'Extract backup: tar -xzf backup.tar.gz',
      'Restore files: cp -r extracted_files/* /var/www/html/',
      'Set permissions: chown -R www-data:www-data /var/www/html/',
      'Restore database: mysql -u root -p database_name < backup.sql',
      'Verify files: ls -la /var/www/html/',
      'Test website: Buka di browser',
      'Check logs untuk error: tail -f /var/log/apache2/error.log',
      'Jika gagal, restore ke temporary location dulu',
      'Document restore procedure',
      'Practice restore secara berkala',
      'Keep backup setelah restore sampai confirm sukses'
    ]
  },
  {
    id: 'optimize-mysql',
    title: 'Cara Optimize MySQL Database',
    category: 'performance',
    difficulty: 'advanced',
    duration: 8,
    content: [
      'Enable slow query log: slow_query_log = ON di my.cnf',
      'Analyze slow queries: mysqldumpslow /var/log/mysql/slow.log',
      'Optimize queries: Gunakan EXPLAIN sebelum SELECT',
      'Add indexes: CREATE INDEX idx_name ON table(column)',
      'Optimize existing indexes: OPTIMIZE TABLE table_name',
      'Tune my.cnf: innodb_buffer_pool_size = 70% dari RAM',
      'Tune query_cache_size: 64M-256M tergantung usage',
      'Use connection pooling: Untuk reduce connection overhead',
      'Partition large tables: Untuk tables dengan jutaan rows',
      'Archive old data: Pindahkan data lama ke archive tables',
      'Use read replicas: Untuk distribute read queries',
      'Monitor performance: MySQLTuner perl script'
    ]
  },
  {
    id: 'enable-gzip-compression',
    title: 'Cara Enable Gzip Compression',
    category: 'performance',
    difficulty: 'intermediate',
    duration: 6,
    content: [
      'Untuk Nginx: Add di nginx.conf atau server block',
      'gzip on; gzip_types text/plain text/css application/json application/javascript text/xml;',
      'gzip_min_length 1000; gzip_comp_level 6;',
      'Untuk Apache: Enable mod_deflate: sudo a2enmod deflate',
      'Add di .htaccess: <IfModule mod_deflate.c> ... </IfModule>',
      'Untuk WordPress: Install plugin seperti WP Rocket atau W3 Total Cache',
      'Test compression: tools like giraffe.tools or checkgzipcompression.com',
      'Gzip bisa reduce size hingga 70-80%',
      'Compress: text, HTML, CSS, JS, XML, JSON',
      'Jangan compress: images, videos (sudah compressed)',
      'Browser support: Semua modern browser support gzip',
      'Use Brotli untuk compression lebih baik (jika supported)'
    ]
  },
  {
    id: 'setup-redis-cache',
    title: 'Cara Setup Redis Cache',
    category: 'performance',
    difficulty: 'advanced',
    duration: 10,
    content: [
      'Install Redis: sudo apt install redis-server',
      'Enable Redis: sudo systemctl enable redis-server',
      'Configure Redis: Edit /etc/redis/redis.conf',
      'Set memory: maxmemory 256mb',
      'Set policy: maxmemory-policy allkeys-lru',
      'Restart Redis: sudo systemctl restart redis-server',
      'Install PHP Redis extension: sudo apt install php-redis',
      'Untuk WordPress: Install plugin Redis Object Cache',
      'Configure wp-config.php: define(\'WP_REDIS_HOST\', \'127.0.0.1\');',
      'Untuk Laravel: CACHE_DRIVER=redis di .env',
      'Test Redis: redis-cli ping, harus return PONG',
      'Monitor: redis-cli info stats',
      'Redis bisa cache database queries, sessions, dan objects'
    ]
  },

  // ADVANCED (6 topics)
  {
    id: 'load-balancing',
    title: 'Load Balancing: Apa & Cara Setup',
    category: 'performance',
    difficulty: 'advanced',
    duration: 12,
    content: [
      'Load balancer distribute traffic ke multiple servers',
      'Algoritma: Round robin, Least connections, IP hash',
      'Benefits: High availability, scalability, redundancy',
      'Hardware load balancer: F5, A10 (expensive)',
      'Software load balancer: HAProxy, Nginx, Traefik',
      'Cloud load balancer: AWS ELB, Google Cloud Load Balancing',
      'Setup Nginx load balancer: upstream backend { server 10.0.0.1; server 10.0.0.2; }',
      'Health check: Untuk detect down server',
      'Session persistence: Sticky session untuk user tetap di server yang sama',
      'SSL termination: Decrypt SSL di load balancer',
      'Layer 4 vs Layer 7: Transport vs Application layer',
      'Monitoring: Graphana, Prometheus untuk metrics'
    ]
  },
  {
    id: 'setup-auto-scaling',
    title: 'Cara Setup Auto Scaling',
    category: 'performance',
    difficulty: 'advanced',
    duration: 10,
    content: [
      'Auto scaling menambah/kurangi server berdasarkan traffic',
      'Components: Launch template, Auto Scaling Group, Scaling policy',
      'Metric-based scaling: CPU > 70% untuk scale up',
      'Schedule-based scaling: Scale up di jam sibuk',
      'Cloud provider: AWS Auto Scaling, Google Cloud Autoscaler',
      'Setup AWS Auto Scaling: Create launch template dengan AMI',
      'Create Auto Scaling Group dengan min/max/desired capacity',
      'Configure scaling policy: Target tracking untuk CPU',
      'Scale up cooldown: 5-10 menit sebelum bisa scale lagi',
      'Scale down policy: Kurangi server jika traffic turun',
      'Consider cost: Jangan scale terlalu agresif',
      'Monitor: CloudWatch metrics untuk scaling activity'
    ]
  },
  {
    id: 'docker-for-beginners',
    title: 'Container: Docker untuk Pemula',
    category: 'vps',
    difficulty: 'advanced',
    duration: 15,
    content: [
      'Docker adalah containerization platform',
      'Container lebih ringan dari VM, share kernel host',
      'Install Docker: curl -sSL https://get.docker.com/ | sh',
      'Dockerfile: Instruction untuk build image',
      'Docker image: Template untuk container',
      'Docker container: Running instance dari image',
      'Basic commands: docker build, docker run, docker ps',
      'Docker Compose: Define multi-container apps',
      'docker-compose.yml: Define services, networks, volumes',
      'Volume: Persist data di container',
      'Network: Bridge, host, overlay untuk container communication',
      'Docker Hub: Registry untuk public images',
      'Best practice: Use official images, scan vulnerabilities'
    ]
  },
  {
    id: 'cicd-automation',
    title: 'CI/CD: Automasi Deployment',
    category: 'performance',
    difficulty: 'advanced',
    duration: 12,
    content: [
      'CI (Continuous Integration): Automate testing dan build',
      'CD (Continuous Deployment): Automate deployment ke production',
      'Tools: Jenkins, GitLab CI, GitHub Actions, CircleCI',
      'GitHub Actions: Define workflow di .github/workflows/',
      'Pipeline stages: Build, Test, Deploy',
      'Trigger: Push ke branch, pull request, manual',
      'Deploy strategy: Blue-green, Canary, Rolling',
      'Blue-green: Deploy ke idle environment, switch traffic',
      'Canary: Deploy ke subset users, gradual rollout',
      'Rolling: Update instance by instance',
      'Rollback: Quick revert jika deployment gagal',
      'Monitoring: Alerts untuk failed deployment',
      'Security: Scan untuk vulnerabilities sebelum deploy'
    ]
  },
  {
    id: 'grafana-monitoring',
    title: 'Server Monitoring dengan Grafana',
    category: 'performance',
    difficulty: 'advanced',
    duration: 10,
    content: [
      'Grafana adalah visualization tool untuk metrics',
      'Install Grafana: sudo apt install grafana',
      'Data source: Prometheus, InfluxDB, Graphite',
      'Prometheus: Scrap metrics dari applications',
      'Install Node Exporter: Untuk system metrics (CPU, RAM, disk)',
      'Dashboard: Visualisasi metrics dengan graphs',
      'Alerting: Notifikasi via Slack, Email, PagerDuty',
      'Import dashboard: Dari Grafana community (100+ templates)',
      'Key metrics: CPU usage, Memory usage, Disk I/O, Network traffic',
      'Uptime monitoring: Blackbox exporter',
      'Application metrics: Custom metrics di aplikasi',
      'Log aggregation: ELK Stack atau Loki',
      'Retention: Simpan metrics data untuk jangka waktu tertentu'
    ]
  },
  {
    id: 'disaster-recovery',
    title: 'Disaster Recovery Planning',
    category: 'security',
    difficulty: 'advanced',
    duration: 10,
    content: [
      'Disaster Recovery (DR): Plan untuk recover dari disaster',
      'RTO (Recovery Time Objective): Target waktu untuk recover',
      'RPO (Recovery Point Objective): Maksimal data loss acceptable',
      'Disaster types: Hardware failure, natural disaster, cyber attack',
      'DR strategy: Active-active, Active-passive, Pilot light',
      'Active-active: Kedua site aktif, load balancing',
      'Active-passive: Site utama aktif, standby siap take over',
      'Pilot light: Minimal critical services di standby',
      'Backup location: Minimal 50 km dari production',
      'Document DR procedure: Step-by-step recovery',
      'Test DR plan: Quarterly atau biannually',
      'Communication plan: Inform stakeholders saat disaster',
      'Insurance: Untuk financial loss dari extended downtime',
      'Review dan update DR plan: Annually'
    ]
  }
];

export const topicsByCategory: Record<TopicCategory, Topic[]> = {
  domain: curatedTopics.filter(t => t.category === 'domain'),
  hosting: curatedTopics.filter(t => t.category === 'hosting'),
  vps: curatedTopics.filter(t => t.category === 'vps'),
  dns: curatedTopics.filter(t => t.category === 'dns'),
  security: curatedTopics.filter(t => t.category === 'security'),
  linux: curatedTopics.filter(t => t.category === 'linux'),
  backup: curatedTopics.filter(t => t.category === 'backup'),
  performance: curatedTopics.filter(t => t.category === 'performance'),
};
