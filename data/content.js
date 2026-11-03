// Helper to format phone number to 08xx-xxxx-xxxx
const formatPhoneNumber = (num) => {
  let str = num.toString();
  if (str.startsWith('62')) {
    str = '0' + str.slice(2);
  }
  const match = str.match(/^(\d{4})(\d{4})(\d{4,5})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return str;
};

const meta = {
  projectName: 'Sanggar Indah Palastri',
  developer: 'Sanggar Indah Group',
  logo: '/assets/images/logo-palastri.png',
  logoGroup: '/assets/images/logo-sig-white.png',
  logoGroupDark: '/assets/images/logo-sig-dark.png',
  tagline: 'Rumah pertama, cerita baru',
  whatsapp: {
    number: '6282118992299',
    templates: {
      konsultasi: 'Halo, saya lihat informasi di website, saya ingin konsultasi & survey lokasi {project}.',
      simulasi: 'Halo, saya lihat informasi di website dan saya mau tanya simulasi cicilan {project}.',
      survey: 'Halo, saya lihat informasi di website dan saya ingin booking survey lokasi {project}.',
      type: 'Halo, saya lihat informasi di website dan saya tertarik dengan {type} di {project}. Boleh info lengkap & ketersediaan unit?',
      konsultasiForm: 'Halo, saya sudah mengisi form di website {project}, namun sistem sedang tidak tersedia. Saya ingin melanjutkan proses melalui WhatsApp.',
    },
  },
  nav: [
    { id: 'tentang', label: 'Tentang Kami' },
    { id: 'tipe', label: 'Pilihan Rumah' },
    { id: 'keunggulan', label: 'Keunggulan' },
    { id: 'faq', label: 'FAQ' },
    { id: 'kontak', label: 'Konsultasi', isCta: true },
  ],
};

export default {
  meta,

  hero: {
    eyebrow: 'Ruang untuk cerita baru',
    headline: 'Rumah pertama, cerita baru.',
    headlineLines: ['Rumah pertama,', 'cerita baru.'],
    tagline: meta.tagline,
    sub: 'Temukan tempat untuk pulang, bertumbuh, dan menciptakan lebih banyak cerita bersama orang-orang tersayang.',
    primaryTypeId: '22-60',
    primaryCta: 'Jelajahi Pilihan Rumah',
    secondaryCta: 'Kenali Palastri',
    image: '/assets/images/palastri/hero.jpg',
    caption: {
      title: 'Tempat pulang, setiap hari.',
      sub: 'Hunian nyaman untuk kehidupan yang terus tumbuh',
    },
    stamp: 'Mulai langkah baik dari rumah',
    float: {
      title: 'Ruang untuk tumbuh',
      sub: 'Lebih dari bangunan. Awal dari banyak kemungkinan.',
    },
    note: 'Bagian dari perjalanan Sanggar Indah Group',
  },

  trust: {
    label: 'Hunian yang dirancang untuk menemani langkah kehidupan.',
    items: [
      { icon: '⌂', title: 'Pilihan Hunian', sub: 'Menyesuaikan kebutuhan' },
      { icon: '✳', title: 'Lingkungan Nyaman', sub: 'Ruang untuk bertumbuh' },
      { icon: '↗', title: 'Bagian dari SIG', sub: 'Sanggar Indah Group' },
    ],
  },

  about: {
    eyebrow: 'Tentang Sanggar Indah Palastri',
    title: 'Bukan sekadar rumah. Tempat kehidupan dimulai.',
    headlineLines: ['Bukan sekadar rumah.', 'Tempat kehidupan dimulai.'],
    description: [
      { text: 'Sanggar Indah Palastri hadir sebagai pilihan hunian bagi keluarga yang ingin membangun masa depan dari tempat yang nyaman. Kami percaya, rumah yang baik bukan hanya tentang ruang dan bangunan, tetapi juga tentang kesempatan untuk tumbuh dan menciptakan kenangan.' },
    ],
    sub: 'Dikembangkan sebagai bagian dari Sanggar Indah Group, Palastri membawa semangat untuk menghadirkan hunian yang relevan dengan kebutuhan kehidupan masa kini.',
    signature: {
      mark: 'P',
      title: 'Sanggar Indah Palastri',
      subtitle: 'Hunian untuk cerita baru',
    },
    numberBadge: { number: '01', label: 'Awal cerita' },
    photos: {
      main: '/assets/images/palastri/about-main.jpg',
      small: '/assets/images/palastri/about-small.jpg',
    },
    awards: [
      { id: 'award1', year: '2000', title: 'Pelopor KPR Untuk Masyarakat', image: '/assets/images/awards/Pelopor KPR Untuk Masyarakat.webp' },
      { id: 'award2', year: '2002', title: 'Pelopor Pembangunan Rumah Sederhana Sehat', image: '/assets/images/awards/Pelopor Pembangunan Rumah Sederhana Sehat.webp' },
      { id: 'award3', year: '2012', title: 'FIABCI Indonesia - BNI Prix D\'Excellence Award', image: '/assets/images/awards/FIABCI Indonesia - BNI.webp' },
      { id: 'award4', year: '2012', title: 'BTN Property Award', image: '/assets/images/awards/BTN PROPERTY AWARD.webp' },
      { id: 'award5', year: '2015', title: 'Indonesia My Home Awards', image: '/assets/images/awards/INDONESIA MY HOME AWARDS.webp' },
      { id: 'award6', year: '2020', title: 'Gold Winner FIABCI Affordable Housing Category', image: '/assets/images/awards/GOLD WINNER FIABCI.webp' },
      { id: 'award7', year: '2023', title: 'Peringkat 1 Realisasi KPR Subsidi Terbanyak', image: '/assets/images/awards/Peringkat 1 Realisasi KPR.webp' },
    ],
  },

  why: {
    eyebrow: 'Alasan untuk memilih',
    title: 'Kenapa memulai di Palastri?',
    titleLines: ['Kenapa memulai', 'di Palastri?'],
    sub: 'Hal-hal sederhana yang membuat sebuah rumah terasa tepat untuk menjadi tempat pulang.',
    cta: 'Bicarakan kebutuhanmu',
    items: [
      {
        no: '01',
        title: 'Akses Dekat Pintu Tol',
        desc: 'Mobilitas harian lebih mudah dan cepat menuju akses tol, pusat kota, dan kawasan sentra aktivitas.',
        symbol: '⌂',
        image: '/assets/images/palastri/about-small.jpg',
      },
      {
        no: '02',
        title: 'Bebas Banjir & Udara Asri',
        desc: 'Terletak di kawasan perbukitan sejuk Arjasari dengan lanskap hijau asri dan bebas risiko genangan air.',
        symbol: '▦',
        image: '/assets/images/palastri/about-main.jpg',
      },
      {
        no: '03',
        title: 'Fasilitas Kawasan Mandiri',
        desc: 'Didukung area terbuka hijau, tempat ibadah, sarana olahraga, dan fasilitas penunjang kebutuhan keluarga.',
        symbol: '✳',
        image: '/assets/images/palastri/hero.jpg',
      },
      {
        no: '04',
        title: 'Keamanan 24 Jam & One Gate',
        desc: 'Keamanan lingkungan terjaga dengan pos jaga 24 jam dan sistem satu pintu masuk untuk kenyamanan penghuni.',
        symbol: '♡',
        image: '/assets/images/palastri/rumah/3172-3d.webp',
      },
      {
        no: '05',
        title: 'Nilai Investasi Menjanjikan',
        desc: 'Potensi kenaikan nilai properti yang terus bertumbuh seiring pesatnya perkembangan wilayah Bandung Selatan.',
        symbol: '↗',
        image: '/assets/images/palastri/rumah/2260-3d.webp',
      },
    ],
  },

  defaultSpecs: [],

  houseTypes: [
    {
      id: '31-72',
      name: 'Tipe 31/72',
      count: '01 / Hunian',
      lb: '31',
      lt: '72',
      kt: '2',
      km: '1',
      tag: 'Komersial',
      category: 'Pilihan komersial',
      headline: 'Ruang yang lebih leluasa.',
      desc: 'Pilihan hunian dengan pendekatan desain modern dan ruang yang dirancang untuk menunjang aktivitas keluarga.',
      meta: ['Desain modern', 'Untuk keluarga'],
      thumbnail: '/assets/images/palastri/rumah/3172-3d.webp',
      gallery: [
        '/assets/images/palastri/rumah/3172-denah.webp',
        '/assets/images/palastri/rumah/3172-3d.webp',
      ],
      facades: [
        { src: '/assets/images/palastri/rumah/3172-3d.webp', label: 'Perspektif' },
      ],
      specsOverride: [],
    },
    {
      id: '22-60',
      name: 'Tipe 22/60',
      count: '02 / Hunian',
      lb: '22',
      lt: '60',
      kt: '1',
      km: '1',
      tag: 'Subsidi',
      category: 'Pilihan subsidi',
      headline: 'Awal baik untuk dimiliki.',
      desc: 'Pilihan rumah yang mengutamakan fungsi dan kenyamanan, untuk membantu mewujudkan rencana memiliki rumah.',
      meta: ['Fungsional', 'Langkah pertama'],
      thumbnail: '/assets/images/palastri/rumah/2260-3d.webp',
      gallery: [
        '/assets/images/palastri/rumah/2260-denah.webp',
        '/assets/images/palastri/rumah/2260-3d.webp',
      ],
      facades: [
        { src: '/assets/images/palastri/rumah/2260-3d.webp', label: 'Perspektif' },
      ],
      specsOverride: [],
    },
  ],

  products: {
    eyebrow: 'Temukan yang paling sesuai',
    title: 'Pilihan rumah, pilihan cerita.',
    titleLines: ['Pilihan rumah,', 'pilihan cerita.'],
    subtitle: 'Setiap keluarga punya rencana dan kebutuhan yang berbeda. Temukan pilihan hunian yang paling sesuai untuk langkah berikutnya.',
    ctaLabel: 'Tanya pilihan rumah',
    ctaHref: '#kontak',
    detailCtaLabel: 'Lihat Detail',
    discussCtaLabel: 'Diskusikan',
    footnote: '*Visual dan deskripsi tipe pada mockup ini bersifat ilustrasi. Harga, tipe, spesifikasi, dan ketersediaan unit perlu disesuaikan dengan data resmi proyek.',
  },

  banks: [
    { name: 'BCA', image: '/assets/images/bank/bca.webp', imageWhite: '/assets/images/bank/bca-white.png' },
    { name: 'BTN', image: '/assets/images/bank/btn.webp', imageWhite: '/assets/images/bank/btn-white.png' },
  ],

  locationSection: {
    eyebrow: 'Temukan lokasi kami',
    title: 'Lebih dekat dengan rencana barumu.',
    titleHtml: 'Lebih dekat dengan <em class="text-[var(--green)] font-normal">rencana barumu.</em>',
    desc: 'Kenali lokasi Sanggar Indah Palastri dan rencanakan kunjungan langsung untuk melihat lingkungan serta pilihan hunian.',
    address: 'Mangunjaya, Arjasari, Kabupaten Bandung',
    mapUrl: 'https://maps.google.com/?q=Mangunjaya+Arjasari+Kabupaten+Bandung',
    embedMapUrl: 'https://maps.google.com/maps?q=Mangunjaya+Arjasari+Kabupaten+Bandung&t=&z=14&ie=UTF8&iwloc=&output=embed',
    primaryCta: 'Buka Google Maps',
    secondaryCta: 'Atur kunjungan',
  },

  faqs: [
    {
      id: 'f1',
      question: 'Apa saja pilihan rumah yang tersedia di Palastri?',
      answer: 'Palastri dirancang untuk menghadirkan pilihan hunian yang dapat disesuaikan dengan kebutuhan. Hubungi tim marketing untuk mendapatkan informasi tipe, spesifikasi, dan ketersediaan unit terbaru.',
    },
    {
      id: 'f2',
      question: 'Apa perbedaan rumah komersial dan rumah subsidi?',
      answer: 'Perbedaannya dapat mencakup harga, skema pembiayaan, spesifikasi, dan persyaratan pembeli. Tim marketing dapat membantu menjelaskan pilihan yang sesuai dengan kondisi dan kebutuhan calon pembeli.',
    },
    {
      id: 'f3',
      question: 'Bagaimana cara mengetahui harga dan promo terbaru?',
      answer: 'Harga dan promo dapat berubah mengikuti ketersediaan unit serta program yang sedang berjalan. Silakan lakukan konsultasi untuk memperoleh pricelist resmi dan informasi terbaru.',
    },
    {
      id: 'f4',
      question: 'Apakah bisa melakukan survei lokasi terlebih dahulu?',
      answer: 'Tentu. Calon pembeli dapat mengatur jadwal kunjungan bersama tim marketing agar bisa melihat lokasi, lingkungan, dan pilihan rumah secara langsung.',
    },
    {
      id: 'f5',
      question: 'Bagaimana proses pengajuan KPR?',
      answer: 'Proses dan persyaratan KPR bergantung pada jenis rumah serta kebijakan bank. Tim marketing dapat membantu memberikan gambaran tahapan dan dokumen awal yang perlu dipersiapkan.',
    },
    {
      id: 'f-awards',
      question: 'Penghargaan apa saja yang pernah diraih pengembang?',
      answer: 'Sanggar Indah Group telah meraih sejumlah penghargaan di bidang properti.',
      media: 'awards',
    },
    {
      id: 'f-projects',
      question: 'Proyek apa saja yang sudah dibangun oleh pengembang ini?',
      answer: 'Selama lebih dari 30 tahun, Sanggar Indah Group telah mendedikasikan pengalaman dan komitmennya dalam mengembangkan hunian bagi masyarakat. Berikut daftar proyek yang sudah dikembangkan:',
      media: 'projects',
    },
  ],

  projects: {
    timelineImage: '/assets/images/proyek-timeline.webp',
    timelineAlt: 'Timeline proyek Sanggar Indah Group 1996-2025',
    timelineCaption: 'Perjalanan proyek Sanggar Indah Group sejak 1996 — ketuk untuk memperbesar',
    items: [
      { id: 'p2025b', year: '2025', name: 'Grand Lituhayu' },
      { id: 'p2025a', year: '2025', name: 'Sanggar Indah Parahyangan', location: 'Kota Baru Parahyangan', types: 'Tipe 22/60 (Subsidi), 26/72 & 36/72 (Non Subsidi)' },
      { id: 'p2020', year: '2020', name: 'Alam Sanggar Indah Extension', location: 'Citapen, Cihampelas, Kab. Bandung Barat', types: 'Tipe 22/72 (Subsidi), 31/72 & 36/72 (Non Subsidi)' },
      { id: 'p2019', year: '2019', name: 'Sanggar Indah Palastri', location: 'Arjasari, Kab. Bandung', types: 'Tipe 22/60, 22/72 (Subsidi), 31/72 (Non Subsidi)', current: true },
      { id: 'p2018', year: '2018', name: 'Bumi Karya Indah Extension', location: 'Cimalaka, Sumedang' },
      { id: 'p2014', year: '2014', name: 'Platinum Residence' },
      { id: 'p2013', year: '2013', name: 'Alam Sanggar Indah', location: 'Citapen, Cihampelas, Kab. Bandung Barat', types: 'Tipe 31/75 (Non Subsidi)' },
      { id: 'p2010', year: '2010', name: 'Sanggar Indah Lestari' },
      { id: 'p2009', year: '2009', name: "D'Lapan Residence" },
      { id: 'p2006', year: '2006', name: 'Sanggar Mas Lestari' },
      { id: 'p2003', year: '2003', name: 'Damar Mas Regency' },
      { id: 'p2000', year: '2000', name: 'Bumi Karya Indah', location: 'Cimalaka, Sumedang', types: 'Tipe 25/72 (Subsidi), 31/72 (Non Subsidi)' },
      { id: 'p1996', year: '1996', name: 'Sanggar Indah Banjaran' },
    ],
    note: 'Ketersediaan unit terkini bisa ditanyakan langsung ke tim kami.',
  },

  carousel: {
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    awardsLabel: 'Penghargaan Sanggar Indah Group',
    projectsLabel: 'Proyek Sanggar Indah Group',
  },

  faqSection: {
    eyebrow: 'Punya pertanyaan?',
    title: 'Hal yang sering ditanyakan.',
    titleHtml: 'Hal yang sering <em class="text-[var(--green)] font-normal">ditanyakan.</em>',
    subtitle: 'Temukan jawaban awal sebelum melangkah lebih jauh untuk memiliki hunian di Palastri.',
    ctaIntro: 'Belum menemukan jawaban yang Anda cari? Tidak apa-apa — kami siap membantu.',
    ctaLabel: 'Tanya Tim Kami',
  },

  contactCta: {
    eyebrow: 'Mari mulai percakapan',
    title: 'Satu langkah kecil menuju rumah impian.',
    titleHtml: 'Satu langkah kecil menuju <em class="text-[#d8d3b7] font-normal">rumah impian.</em>',
    desc: 'Ceritakan kebutuhanmu. Tim kami siap membantu mengenal pilihan hunian dan merencanakan kunjungan ke Palastri.',
    ctaLabel: 'Kirim permintaan konsultasi',
    phoneDisplay: 'WhatsApp Marketing · ' + formatPhoneNumber(meta.whatsapp.number),
    options: [
      { value: 'Belum menentukan', label: 'Belum menentukan' },
      { value: 'Tipe 31/72 Komersial', label: 'Tipe 31/72 Komersial' },
      { value: 'Tipe 22/60 Subsidi', label: 'Tipe 22/60 Subsidi' },
      { value: 'Jadwal survei lokasi', label: 'Jadwal survei lokasi' },
    ],
  },

  finalCta: {
    headline: 'Wujudkan Rumah Impian Anda Sekarang',
    ctaLabel: 'Konsultasi & Survey Lokasi Sekarang →',
    phoneDisplay: 'WhatsApp Marketing · ' + formatPhoneNumber(meta.whatsapp.number),
  },

  footer: {
    developedByLabel: 'Dikembangkan oleh',
    developerShort: 'SIG',
    desc: 'Ruang untuk pulang, bertumbuh, dan menciptakan lebih banyak cerita bersama keluarga.',
    mainAddress: {
      label: 'Lokasi Proyek',
      lines: ['Mangunjaya, Arjasari', 'Kabupaten Bandung, Jawa Barat'],
    },
    secondAddress: {
      label: 'Kantor Pusat',
      lines: ['Jl. Sukahaji No.126 (GRHA Satria)', 'Kota Bandung, Jawa Barat'],
    },
    quickLinks: [
      { id: 'tentang', label: 'Tentang Kami' },
      { id: 'tipe', label: 'Pilihan Rumah' },
      { id: 'keunggulan', label: 'Keunggulan' },
      { id: 'lokasi', label: 'Lokasi' },
      { id: 'faq', label: 'FAQ' },
    ],
    email: 'sanggarindahgroup@gmail.com',
    phoneDisplay: formatPhoneNumber(meta.whatsapp.number),
  },

  kprRequirements: {
    disclaimer: 'Persyaratan yang ditampilkan merupakan dokumen umum KPR yang perlu disiapkan. Persyaratan akhir mengikuti kebijakan dan hasil analisa bank terkait.',
    consultationCta: 'Masih ragu apakah Anda memenuhi syarat?',
    consultationCtaLabel: 'Diskusikan Kondisi Anda',
    karyawan: {
      title: 'Karyawan',
      docs: [
        'Hasil SLIK OJK (suami dan istri)',
        'Foto 3×4 (suami dan istri)',
        'KTP suami dan istri',
        'Kartu Keluarga',
        'NPWP',
        'Buku Nikah',
        'Slip Gaji 3 bulan terakhir',
        'Rekening Koran Payroll 3 bulan terakhir',
        'Surat Keterangan Aktif Bekerja terbaru',
        'Surat Pengangkatan Pegawai Tetap',
        'SPT Tahunan',
        'Peta lokasi tempat bekerja (digambar, bukan foto Google Maps)',
        'Foto tempat bekerja dan aktivitas tempat bekerja',
      ],
      notes: [
        'Pegawai tetap: minimal masa kerja 1 tahun',
        'Pegawai kontrak: minimal masa kerja 2 tahun',
      ],
    },
    jointIncome: {
      title: 'Joint Income',
      intro: 'Dokumen tambahan yang diperlukan jika penghasilan dihitung bersama pasangan:',
      docs: [
        'Slip Gaji pasangan 3 bulan terakhir',
        'Rekening Koran Payroll pasangan 3 bulan terakhir',
        'Surat Keterangan Aktif Bekerja terbaru',
        'Surat Pengangkatan Pegawai Tetap',
      ],
      notes: [
        'Pegawai tetap: minimal masa kerja 1 tahun',
        'Pegawai kontrak: minimal masa kerja 2 tahun',
      ],
    },
    subsidi: {
      title: 'Unit Subsidi',
      intro: 'Batas penghasilan untuk pengajuan KPR unit subsidi:',
      limits: [
        { label: 'Single income / belum menikah', max: 'Maks. Rp8.500.000/bulan' },
        { label: 'Joint income (sudah menikah)', max: 'Maks. Rp10.000.000/bulan' },
      ],
      note: 'Batas penghasilan berlaku untuk pengajuan KPR unit subsidi. Untuk unit non-subsidi, silakan konsultasikan langsung.',
    },
  },

  consultationForm: {
    title: 'Konsultasi dengan Tim Kami',
    microcopy: 'Silakan isi data singkat di bawah ini. Tim kami akan membantu memberikan informasi yang sesuai kebutuhan Anda.',
    categories: [
      'Ingin tahu pilihan tipe rumah',
      'Ingin cek syarat KPR',
      'Ingin survey lokasi',
      'Konsultasi rumah subsidi',
      'Konsultasi rumah komersial',
      'Lainnya',
    ],
    labels: {
      name: 'Nama Lengkap',
      phone: 'Nomor WhatsApp',
      need: 'Kebutuhan saya saat ini',
      message: 'Pesan tambahan (opsional)',
    },
    placeholders: {
      name: 'Contoh: Budi Santoso',
      phone: 'Contoh: 0812xxxxxxxx',
      need: 'Pilih kebutuhan Anda',
      message: 'Ceritakan kondisi atau pertanyaan Anda...',
    },
    validation: {
      nameRequired: 'Nama wajib diisi.',
      nameMin: 'Nama terlalu singkat. Mohon masukkan nama lengkap Anda.',
      phoneRequired: 'Nomor WhatsApp wajib diisi.',
      phoneInvalid: 'Nomor WhatsApp belum sesuai. Coba masukkan nomor aktif, misalnya 0812xxxxxxxx.',
      needRequired: 'Silakan pilih kebutuhan Anda terlebih dahulu.',
    },
    messages: {
      submitting: 'Sedang mengirim...',
      success: 'Terima kasih! Data Anda sudah kami terima. Tim kami akan segera menghubungi Anda.',
      error: 'Data belum berhasil dikirim. Silakan coba lagi atau hubungi kami langsung melalui WhatsApp.',
      notConfigured: 'Form konsultasi belum dapat mengirim data secara online. Silakan hubungi kami melalui WhatsApp.',
      captchaRequired: 'Mohon selesaikan verifikasi keamanan terlebih dahulu.',
      captchaNotConfigured: 'Sistem verifikasi keamanan belum tersedia. Silakan hubungi kami melalui WhatsApp.',
      captchaStuck: 'Verifikasi tidak merespons. Ini biasanya terjadi bila domain belum didaftarkan di Google reCAPTCHA atau script Google diblokir. Anda tetap bisa mengirim pesan lewat WhatsApp.',
      captchaFailed: 'Verifikasi keamanan tidak dapat dijalankan di halaman ini. Coba muat ulang verifikasi, atau kirim pesan Anda lewat WhatsApp.',
      captchaExpired: 'Waktu verifikasi habis. Silakan centang ulang kotak verifikasi.',
      captchaRenderFailed: 'Verifikasi keamanan gagal ditampilkan. Coba muat ulang verifikasi, atau kirim pesan Anda lewat WhatsApp.',
    },
    captcha: {
      fallbackIntro: 'Verifikasi bermasalah?',
      fallbackCta: 'Kirim lewat WhatsApp',
      retry: 'Muat Ulang Verifikasi',
    },
    notConfiguredTitle: 'Belum Bisa Kirim Online',
    successCtaWa: 'Chat WhatsApp',
    successCtaClose: 'Tutup',
    errorCtaRetry: 'Coba Lagi',
    errorCtaWa: 'Hubungi via WhatsApp',
    submitLabel: 'Kirim Pesan',
    disclaimer: 'Data Anda hanya digunakan tim kami untuk keperluan konsultasi.',
  },

  memberGetMember: {
    title: 'Form Member Get Member',
    subtitle: 'Isi data singkat, tim kami segera hubungi Anda via WhatsApp.',
    labels: {
      name: 'Nama Lengkap',
      phone: 'Nomor WhatsApp',
      houseType: 'Tertarik Tipe Rumah',
    },
    placeholders: {
      name: 'Nama Anda',
      phone: '08xx xxxx xxxx',
    },
    houseTypeDefault: 'Belum tahu / masih survei',
    referral: {
      checkboxLabel: 'Saya punya kode referral',
      label: 'Kode Referral',
      placeholder: 'Masukkan kode referral',
      requiredMessage: 'Silakan masukkan kode referral Anda.',
      checkCta: 'Cek',
      checkingCta: 'Cek...',
      hint: 'Klik "Cek" untuk memastikan kode referral Anda terdaftar.',
      unverifiedMessage: 'Klik tombol "Cek" dulu untuk memverifikasi kode referral Anda.',
      invalidMessage: 'Kode referral tidak valid atau tidak ditemukan.',
      networkErrorMessage: 'Gagal memeriksa kode referral. Periksa koneksi Anda lalu coba lagi.',
      validTitle: 'Kode referral valid',
      validSubtitle: 'Perujuk: {name}',
    },
    validation: {
      nameRequired: 'Silakan masukkan nama Anda.',
      nameMin: 'Nama minimal 2 huruf.',
      phoneRequired: 'Silakan masukkan nomor WhatsApp.',
      phoneInvalid: 'Format nomor WhatsApp tidak valid. Gunakan format 08xx atau 628xx.',
    },
    submitLabel: 'Kirim Sekarang',
    disclaimer: 'Data Anda hanya digunakan tim Sanggar Indah Palastri untuk menghubungi kembali.',
    waTemplate: 'Halo tim {project}, saya tertarik program Member Get Member.',
  },

  referralWelcome: {
    eyebrow: 'Selamat Datang',
    invitedBy: 'Anda diundang oleh',
    body: 'Kode {code} sudah kami isikan di formulir Member Get Member. Tinggal lengkapi nama dan nomor WhatsApp Anda.',
    primaryCta: 'Lengkapi Data Saya',
    secondaryCta: 'Lihat-lihat Dulu',
    closeLabel: 'Tutup sambutan',
  },
};
