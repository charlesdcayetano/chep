/**
 * Multilingual profanity & slur detector for chat and guestbook inputs.
 * Covers Filipino (Tagalog, Hiligaynon/Ilonggo, Cebuano/Bisaya, Ilocano),
 * English, Spanish, Portuguese, French, German, Italian, Russian, Polish,
 * Indonesian/Malay, Vietnamese, Thai, Chinese, Japanese, Korean, Hindi,
 * Arabic, and Turkish — including common leetspeak and spaced-out obfuscations.
 */

// Exact whole-word matches (after normalization) to avoid Scunthorpe false positives
const EXACT_BAD_WORDS = new Set([
  // Filipino / Tagalog / Hiligaynon / Bisaya / Ilocano
  'puta',
  'putangina',
  'putanginamo',
  'tangina',
  'tanginamo',
  'taena',
  'kingina',
  'kinangina',
  'pukinangina',
  'puchangina',
  'pucha',
  'putragis',
  'putris',
  'punyeta',
  'gago',
  'gaga',
  'tanga',
  'bobo',
  'boba',
  'ulol',
  'tarantado',
  'tarantada',
  'kupal',
  'hinayupak',
  'lintik',
  'linte',
  'linti',
  'leche',
  'pakshet',
  'pakingshet',
  'pakyu',
  'kantot',
  'kantutan',
  'iyot',
  'hindot',
  'jakol',
  'salsal',
  'tamod',
  'tite',
  'titi',
  'burat',
  'bayag',
  'pekpek',
  'puke',
  'puki',
  'pokpok',
  'chupa',
  'tsupa',
  'inutil',
  'ungas',
  'engot',
  'gunggong',
  'buwisit',
  'bwisit',
  'yawa',
  'piste',
  'pisti',
  'giatay',
  'atay',
  'bilat',
  'bilatibay',
  'diputa',
  'deputa',
  'yudiputa',
  'yodeputa',
  'buang',
  'boang',
  'kayat',
  'kayata',
  'oten',
  'utin',
  'ukininam',
  'okininam',

  // English
  'fuck',
  'fucker',
  'fuckers',
  'fucking',
  'fucked',
  'fucks',
  'fck',
  'fuk',
  'fuq',
  'motherfucker',
  'motherfuckers',
  'motherfucking',
  'mofo',
  'stfu',
  'gtfo',
  'shit',
  'shits',
  'shitty',
  'shitting',
  'bullshit',
  'horseshit',
  'dipshit',
  'shithead',
  'bitch',
  'bitches',
  'bitching',
  'sonofabitch',
  'bastard',
  'bastards',
  'asshole',
  'assholes',
  'arsehole',
  'jackass',
  'dumbass',
  'fatass',
  'dick',
  'dicks',
  'dickhead',
  'cock',
  'cocks',
  'cocksucker',
  'pussy',
  'pussies',
  'cunt',
  'cunts',
  'whore',
  'whores',
  'slut',
  'sluts',
  'fag',
  'fags',
  'faggot',
  'faggots',
  'nigger',
  'niggers',
  'nigga',
  'niggas',
  'retard',
  'retards',
  'retarded',
  'wanker',
  'twat',
  'prick',
  'douche',
  'douchebag',
  'cum',
  'cumming',
  'jizz',
  'blowjob',
  'handjob',
  'dildo',
  'porn',
  'porno',
  'pornhub',
  'xnxx',
  'xvideos',
  'boobs',
  'tits',
  'titties',
  'penis',
  'vagina',

  // Spanish / Portuguese / French / German / Italian
  'puto',
  'putos',
  'putas',
  'pendejo',
  'pendeja',
  'pendejos',
  'cabron',
  'cabrona',
  'mierda',
  'chinga',
  'chingada',
  'chingar',
  'pinche',
  'verga',
  'culero',
  'cono',
  'joder',
  'gilipollas',
  'maricon',
  'hijueputa',
  'hijodeputa',
  'malparido',
  'mamaguevo',
  'caralho',
  'porra',
  'merda',
  'fodase',
  'buceta',
  'putaria',
  'arrombado',
  'viado',
  'filhodaputa',
  'merde',
  'putain',
  'connard',
  'connasse',
  'salope',
  'encule',
  'batard',
  'nique',
  'ntm',
  'fdp',
  'scheisse',
  'arschloch',
  'fotze',
  'hurensohn',
  'wichser',
  'schlampe',
  'ficken',
  'cazzo',
  'stronzo',
  'stronza',
  'vaffanculo',
  'puttana',
  'troia',
  'minchia',

  // Russian (Romanized) / Polish / Turkish
  'blyat',
  'bliad',
  'suka',
  'cyka',
  'nahui',
  'nahuy',
  'pizda',
  'mudak',
  'pidor',
  'kurwa',
  'chuj',
  'pierdole',
  'jebac',
  'skurwysyn',
  'siktir',
  'amk',
  'orospu',
  'yarrak',
  'gotveren',

  // Indonesian / Malay / Vietnamese (Romanized) / Hindi (Romanized) / Arabic (Romanized)
  'anjing',
  'bangsat',
  'kontol',
  'memek',
  'ngentot',
  'jancok',
  'bajingan',
  'goblog',
  'goblok',
  'tolol',
  'pelacur',
  'pukimak',
  'lancau',
  'madarchod',
  'bhenchod',
  'behenchod',
  'chutiya',
  'bhosdike',
  'gandu',
  'randi',
  'kosomak',
  'sharmoota',
  'caonima',
  'tamade',
  'shabi',
  'ssibal',
  'gaesaekki',
])

// Unambiguous multi-word phrases & non-Latin script profanity substrings
const SUBSTRING_BAD_PATTERNS = [
  // Multi-word phrases (Latin)
  'anak ng puta',
  'hayop ka',
  'animal ka',
  'fuck you',
  'fuck off',
  'son of a bitch',
  'piece of shit',
  'putang ina',
  'tang ina',
  'pukinang ina',
  'king ina',
  'hijo de puta',
  'filho da puta',
  'va te faire foutre',
  'ta gueule',

  // Russian / Cyrillic
  'блять',
  'блядь',
  'сука',
  'хуй',
  'пизд',
  'ебать',
  'ебан',
  'мудак',
  'гандон',
  'пидор',
  'шлюха',

  // Chinese (Simplified & Traditional & Cantonese)
  '操你妈',
  '肏你妈',
  '他妈的',
  '妈逼',
  '傻逼',
  '煞笔',
  '草泥马',
  '贱人',
  '婊子',
  '鸡巴',
  '冚家铲',
  '扑街',
  '屌你',
  '幹你娘',
  '靠北',
  '機掰',

  // Japanese
  '死ね',
  'バカ野郎',
  '馬鹿野郎',
  'ちんこ',
  'まんこ',
  'やりまん',
  'ファック',
  'きちがい',

  // Korean
  '씨발',
  '시발',
  '병신',
  '개새끼',
  '미친놈',
  '꺼져',
  '보지',
  '자지',

  // Thai
  'ควย',
  'สัส',
  'เหี้ย',
  'กะหรี่',
  'เย็ด',

  // Hindi (Devanagari)
  'मादरचोद',
  'बहनचोद',
  'चूतिया',
  'भोसड़ीके',
  'रंडी',

  // Arabic
  'شرموطة',
  'قحبة',
  'منيوك',
  'كس امك',
  'يلعن',

  // Vietnamese with tonal marks
  'đụ má',
  'địt mẹ',
  'vãi lồn',
  'con đĩ',
  'đầu buồi',
]

// High-confidence compound roots (catches e.g. "motherfcker", "putanginangyan", "gagoka")
const COMPOUND_PREFIX_OR_CONTAINS = [
  'putangina',
  'tangina',
  'pukinangina',
  'motherfuck',
  'bullshit',
  'dickhead',
  'cocksuck',
  'yudiputa',
  'hijueputa',
  'hurensohn',
  'vaffanculo',
]

const LEET_MAP: Record<string, string> = {
  '@': 'a',
  '4': 'a',
  '3': 'e',
  '1': 'i',
  '!': 'i',
  '|': 'i',
  '0': 'o',
  '$': 's',
  '5': 's',
  '7': 't',
  '+': 't',
  'ß': 'ss',
}

function stripZeroWidth(input: string): string {
  return input.replace(/[\u200B-\u200D\uFEFF\u00AD]/g, '')
}

function normalizeLatinToken(token: string): string {
  // Replace common leetspeak characters when mixed with letters or symbols
  let out = ''
  for (const ch of token.toLowerCase()) {
    if (LEET_MAP[ch]) {
      out += LEET_MAP[ch]
    } else if (ch === '*' || ch === '#' || ch === '_' || ch === '-') {
      // Censoring characters inside a word: test common vowels handled in wildcard check below
      out += '*'
    } else {
      out += ch
    }
  }

  // Strip Latin diacritics (e.g. ñ -> n, é -> e, ü -> u)
  out = out.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // Collapse 3+ repeated identical letters down to 1 (e.g. "fuuuuck" -> "fuck", "gagoooo" -> "gago")
  out = out.replace(/([a-z])\1{2,}/g, '$1')

  return out
}

function matchesWildcardToken(normalizedWithStars: string): boolean {
  if (!normalizedWithStars.includes('*')) return false
  // Only test single/double-asterisk masked words of length >= 4 (e.g. f*ck, sh*t, p*tangina, g*go)
  const cleanLen = normalizedWithStars.replace(/\*/g, '').length
  if (cleanLen < 2) return false

  const vowels = ['a', 'e', 'i', 'o', 'u']
  const starCount = (normalizedWithStars.match(/\*/g) || []).length
  if (starCount > 2) return false

  const candidates = new Set<string>()
  if (starCount === 1) {
    for (const v of vowels) {
      candidates.add(normalizedWithStars.replace('*', v))
    }
    candidates.add(normalizedWithStars.replace('*', ''))
  } else if (starCount === 2) {
    for (const v1 of vowels) {
      for (const v2 of vowels) {
        candidates.add(normalizedWithStars.replace('*', v1).replace('*', v2))
      }
    }
  }

  for (const cand of candidates) {
    if (EXACT_BAD_WORDS.has(cand)) return true
    for (const root of COMPOUND_PREFIX_OR_CONTAINS) {
      if (cand.includes(root)) return true
    }
  }
  return false
}

/**
 * Returns `true` if `text` contains profanity, slurs, or obfuscated swear words
 * in Filipino, English, or major international languages.
 */
export function containsProfanity(text: string): boolean {
  if (!text || !text.trim()) return false

  const cleaned = stripZeroWidth(text)
  const lowerRaw = cleaned.toLowerCase()

  // 1. Direct non-Latin & multi-word phrase check
  for (const pattern of SUBSTRING_BAD_PATTERNS) {
    if (lowerRaw.includes(pattern)) {
      return true
    }
  }

  // Also check diacritic-stripped multi-word phrases
  const foldedPhraseText = lowerRaw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')

  for (const pattern of SUBSTRING_BAD_PATTERNS) {
    if (/^[a-z\s]+$/.test(pattern) && foldedPhraseText.includes(pattern)) {
      return true
    }
  }

  // 2. Check spaced-out single-letter evasions (e.g. "f u c k", "g a g o", "p.u.t.a", "s-h-i-t")
  const collapsedSingleLetters = foldedPhraseText.replace(
    /\b([a-z])(?:[\s._-]+([a-z])){2,}\b/g,
    (match) => match.replace(/[\s._-]+/g, '')
  )

  const rawTokens = collapsedSingleLetters.split(/[^a-z0-9*@!$+|#_-]+/).filter(Boolean)

  for (const rawToken of rawTokens) {
    // Skip pure numbers (e.g. "1080", "2025", "40")
    if (/^\d+$/.test(rawToken)) continue

    const norm = normalizeLatinToken(rawToken)
    if (!norm) continue

    // Wildcard masked profanity (e.g. "f*ck", "p*tangina", "sh*t", "g*go")
    if (matchesWildcardToken(norm)) {
      return true
    }

    const lettersOnly = norm.replace(/[^a-z]/g, '')
    if (!lettersOnly) continue

    if (EXACT_BAD_WORDS.has(lettersOnly)) {
      return true
    }

    // Also check collapsing double letters (e.g. "fuuck" -> "fuck", "boboo" -> "bobo")
    const collapsedDoubles = lettersOnly.replace(/([a-z])\1+/g, '$1')
    if (collapsedDoubles.length >= 4 && EXACT_BAD_WORDS.has(collapsedDoubles)) {
      return true
    }

    for (const root of COMPOUND_PREFIX_OR_CONTAINS) {
      if (lettersOnly.includes(root) || collapsedDoubles.includes(root)) {
        return true
      }
    }
  }

  return false
}

