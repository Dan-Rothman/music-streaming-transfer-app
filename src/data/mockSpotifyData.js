// Mock Spotify Data for Testing
// 100 songs total:
// - 50 songs that are liked (30 also in playlists, 20 only liked)
// - 20 songs in playlists but NOT liked
// - 30 songs neither liked nor in playlists

const generateISRC = (index) => {
  const country = 'US';
  const registrant = 'TST';
  const year = '24';
  const designation = String(index).padStart(5, '0');
  return `${country}${registrant}${year}${designation}`;
};

export const mockSpotifySongs = [
  // Songs 1-20: Liked only (not in playlists)
  {
    id: 'mock-1',
    title: 'Midnight Dreams',
    artist: 'Luna Rivera',
    album: 'Nocturnal Reflections',
    isrc: generateISRC(1),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-2',
    title: 'Electric Sunrise',
    artist: 'The Solar Waves',
    album: 'Dawn Chronicles',
    isrc: generateISRC(2),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-3',
    title: 'Wandering Soul',
    artist: 'Marcus Stone',
    album: 'Journey Within',
    isrc: generateISRC(3),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-4',
    title: 'Neon Lights',
    artist: 'Cyber Dreams',
    album: 'Digital Paradise',
    isrc: generateISRC(4),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-5',
    title: 'Ocean Breeze',
    artist: 'Coastal Harmony',
    album: 'Seaside Melodies',
    isrc: generateISRC(5),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-6',
    title: 'Mountain Peak',
    artist: 'Alpine Echo',
    album: 'Summit Sessions',
    isrc: generateISRC(6),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-7',
    title: 'Urban Rhythm',
    artist: 'City Pulse',
    album: 'Metro Sounds',
    isrc: generateISRC(7),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-8',
    title: 'Starlight Symphony',
    artist: 'Celestial Orchestra',
    album: 'Cosmic Harmonies',
    isrc: generateISRC(8),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-9',
    title: 'Desert Wind',
    artist: 'Sahara Nomads',
    album: 'Dune Melodies',
    isrc: generateISRC(9),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-10',
    title: 'Forest Whispers',
    artist: 'Woodland Spirits',
    album: 'Nature\'s Call',
    isrc: generateISRC(10),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-11',
    title: 'Twilight Zone',
    artist: 'Dusk Collective',
    album: 'Evening Shadows',
    isrc: generateISRC(11),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-12',
    title: 'Crystal Rain',
    artist: 'Storm Chasers',
    album: 'Weather Patterns',
    isrc: generateISRC(12),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-13',
    title: 'Golden Hour',
    artist: 'Sunset Society',
    album: 'Amber Skies',
    isrc: generateISRC(13),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-14',
    title: 'Velvet Nights',
    artist: 'Smooth Jazz Quartet',
    album: 'Midnight Sessions',
    isrc: generateISRC(14),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-15',
    title: 'Phoenix Rising',
    artist: 'Rebirth Ensemble',
    album: 'New Beginnings',
    isrc: generateISRC(15),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-16',
    title: 'Frozen Hearts',
    artist: 'Winter\'s Embrace',
    album: 'Ice Palace',
    isrc: generateISRC(16),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-17',
    title: 'Thunder Road',
    artist: 'Lightning Strike',
    album: 'Electric Avenue',
    isrc: generateISRC(17),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-18',
    title: 'Silk Dreams',
    artist: 'Smooth Operators',
    album: 'Luxurious Lounge',
    isrc: generateISRC(18),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-19',
    title: 'Crimson Sunset',
    artist: 'Red Sky Collective',
    album: 'Horizon Views',
    isrc: generateISRC(19),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-20',
    title: 'Sapphire Dreams',
    artist: 'Blue Velvet Band',
    album: 'Precious Gems',
    isrc: generateISRC(20),
    isLiked: true,
    inPlaylist: false,
    playlistNames: []
  },

  // Songs 21-50: Liked AND in playlists (30 songs)
  {
    id: 'mock-21',
    title: 'Dancing in the Moonlight',
    artist: 'Luna Eclipse',
    album: 'Celestial Dance',
    isrc: generateISRC(21),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Chill Vibes', 'Night Driving']
  },
  {
    id: 'mock-22',
    title: 'Summer Breeze',
    artist: 'Tropical Waves',
    album: 'Island Paradise',
    isrc: generateISRC(22),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Summer Hits 2024']
  },
  {
    id: 'mock-23',
    title: 'Rhythm of the Heart',
    artist: 'Soul Connection',
    album: 'Inner Beats',
    isrc: generateISRC(23),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Workout Mix', 'Chill Vibes']
  },
  {
    id: 'mock-24',
    title: 'Cosmic Journey',
    artist: 'Space Travelers',
    album: 'Beyond the Stars',
    isrc: generateISRC(24),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Study Focus']
  },
  {
    id: 'mock-25',
    title: 'Eternal Flame',
    artist: 'Fire and Ice',
    album: 'Elemental Forces',
    isrc: generateISRC(25),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Epic Anthems']
  },
  {
    id: 'mock-26',
    title: 'Whispers in the Wind',
    artist: 'Acoustic Soul',
    album: 'Unplugged Sessions',
    isrc: generateISRC(26),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Acoustic Favorites', 'Chill Vibes']
  },
  {
    id: 'mock-27',
    title: 'Neon Paradise',
    artist: 'Synthwave Riders',
    album: 'Retro Future',
    isrc: generateISRC(27),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Night Driving']
  },
  {
    id: 'mock-28',
    title: 'Mountain Echoes',
    artist: 'Highland Voices',
    album: 'Peaks and Valleys',
    isrc: generateISRC(28),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Study Focus']
  },
  {
    id: 'mock-29',
    title: 'City Lights',
    artist: 'Urban Nights',
    album: 'Metropolis Dreams',
    isrc: generateISRC(29),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Night Driving', 'Workout Mix']
  },
  {
    id: 'mock-30',
    title: 'Ocean Waves',
    artist: 'Seaside Serenity',
    album: 'Tidal Harmonies',
    isrc: generateISRC(30),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Chill Vibes']
  },
  {
    id: 'mock-31',
    title: 'Digital Love',
    artist: 'Electronic Hearts',
    album: 'Binary Romance',
    isrc: generateISRC(31),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Summer Hits 2024']
  },
  {
    id: 'mock-32',
    title: 'Sunset Boulevard',
    artist: 'California Dreamers',
    album: 'West Coast Stories',
    isrc: generateISRC(32),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Night Driving']
  },
  {
    id: 'mock-33',
    title: 'Velvet Underground',
    artist: 'Midnight Society',
    album: 'After Hours',
    isrc: generateISRC(33),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Chill Vibes', 'Study Focus']
  },
  {
    id: 'mock-34',
    title: 'Thunder and Lightning',
    artist: 'Storm Front',
    album: 'Weather the Storm',
    isrc: generateISRC(34),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Epic Anthems', 'Workout Mix']
  },
  {
    id: 'mock-35',
    title: 'Silver Lining',
    artist: 'Hope Springs',
    album: 'Optimistic Outlook',
    isrc: generateISRC(35),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Acoustic Favorites']
  },
  {
    id: 'mock-36',
    title: 'Midnight Runner',
    artist: 'Night Hawks',
    album: 'Urban Pursuit',
    isrc: generateISRC(36),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Workout Mix', 'Night Driving']
  },
  {
    id: 'mock-37',
    title: 'Crystal Waters',
    artist: 'Pure Essence',
    album: 'Clarity',
    isrc: generateISRC(37),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Chill Vibes']
  },
  {
    id: 'mock-38',
    title: 'Golden Age',
    artist: 'Timeless Classics',
    album: 'Retrospective',
    isrc: generateISRC(38),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Study Focus']
  },
  {
    id: 'mock-39',
    title: 'Purple Haze',
    artist: 'Psychedelic Experience',
    album: 'Mind Expansion',
    isrc: generateISRC(39),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Epic Anthems']
  },
  {
    id: 'mock-40',
    title: 'Emerald City',
    artist: 'Green Fields',
    album: 'Nature\'s Wonder',
    isrc: generateISRC(40),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Chill Vibes', 'Acoustic Favorites']
  },
  {
    id: 'mock-41',
    title: 'Frozen in Time',
    artist: 'Eternal Moments',
    album: 'Timeless',
    isrc: generateISRC(41),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Study Focus']
  },
  {
    id: 'mock-42',
    title: 'Wildfire',
    artist: 'Burning Desire',
    album: 'Flames of Passion',
    isrc: generateISRC(42),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Epic Anthems', 'Workout Mix']
  },
  {
    id: 'mock-43',
    title: 'Stardust Memories',
    artist: 'Cosmic Nostalgia',
    album: 'Looking Back',
    isrc: generateISRC(43),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Chill Vibes']
  },
  {
    id: 'mock-44',
    title: 'Lost Highway',
    artist: 'Desert Travelers',
    album: 'Road Stories',
    isrc: generateISRC(44),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Night Driving']
  },
  {
    id: 'mock-45',
    title: 'Blue Horizon',
    artist: 'Sky Gazers',
    album: 'Endless Views',
    isrc: generateISRC(45),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Acoustic Favorites', 'Study Focus']
  },
  {
    id: 'mock-46',
    title: 'Red Alert',
    artist: 'Emergency Response',
    album: 'Code Red',
    isrc: generateISRC(46),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Workout Mix']
  },
  {
    id: 'mock-47',
    title: 'White Noise',
    artist: 'Static Dreams',
    album: 'Signal Lost',
    isrc: generateISRC(47),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Study Focus', 'Chill Vibes']
  },
  {
    id: 'mock-48',
    title: 'Black Velvet',
    artist: 'Noir Ensemble',
    album: 'Dark Elegance',
    isrc: generateISRC(48),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Night Driving']
  },
  {
    id: 'mock-49',
    title: 'Rainbow Connection',
    artist: 'Spectrum Collective',
    album: 'Colors of Sound',
    isrc: generateISRC(49),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Summer Hits 2024']
  },
  {
    id: 'mock-50',
    title: 'Ivory Tower',
    artist: 'Classical Fusion',
    album: 'Modern Classics',
    isrc: generateISRC(50),
    isLiked: true,
    inPlaylist: true,
    playlistNames: ['Study Focus']
  },

  // Songs 51-70: In playlists but NOT liked (20 songs)
  {
    id: 'mock-51',
    title: 'Morning Coffee',
    artist: 'Caffeine Dreams',
    album: 'Wake Up Call',
    isrc: generateISRC(51),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Morning Routine']
  },
  {
    id: 'mock-52',
    title: 'Afternoon Delight',
    artist: 'Sunshine Band',
    album: 'Daytime Vibes',
    isrc: generateISRC(52),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Workout Mix']
  },
  {
    id: 'mock-53',
    title: 'Evening Shadows',
    artist: 'Dusk Till Dawn',
    album: 'Twilight Hours',
    isrc: generateISRC(53),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Chill Vibes']
  },
  {
    id: 'mock-54',
    title: 'Late Night Talk',
    artist: 'Conversation Starters',
    album: 'Deep Discussions',
    isrc: generateISRC(54),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Night Driving']
  },
  {
    id: 'mock-55',
    title: 'Weekend Warrior',
    artist: 'Friday Night Crew',
    album: 'Party Time',
    isrc: generateISRC(55),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Summer Hits 2024']
  },
  {
    id: 'mock-56',
    title: 'Monday Blues',
    artist: 'Week Starters',
    album: 'Back to Work',
    isrc: generateISRC(56),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Morning Routine']
  },
  {
    id: 'mock-57',
    title: 'Tuesday Groove',
    artist: 'Mid-Week Movers',
    album: 'Finding Rhythm',
    isrc: generateISRC(57),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Workout Mix']
  },
  {
    id: 'mock-58',
    title: 'Wednesday Wisdom',
    artist: 'Hump Day Heroes',
    album: 'Halfway There',
    isrc: generateISRC(58),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Study Focus']
  },
  {
    id: 'mock-59',
    title: 'Thursday Thunder',
    artist: 'Almost Weekend',
    album: 'Anticipation',
    isrc: generateISRC(59),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Epic Anthems']
  },
  {
    id: 'mock-60',
    title: 'Saturday Night Fever',
    artist: 'Weekend Warriors',
    album: 'Party Mode',
    isrc: generateISRC(60),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Summer Hits 2024', 'Night Driving']
  },
  {
    id: 'mock-61',
    title: 'Sunday Serenity',
    artist: 'Peaceful Endings',
    album: 'Rest and Relax',
    isrc: generateISRC(61),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Chill Vibes']
  },
  {
    id: 'mock-62',
    title: 'Concrete Jungle',
    artist: 'Urban Legends',
    album: 'City Stories',
    isrc: generateISRC(62),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Workout Mix']
  },
  {
    id: 'mock-63',
    title: 'Country Roads',
    artist: 'Rural Routes',
    album: 'Back Home',
    isrc: generateISRC(63),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Acoustic Favorites']
  },
  {
    id: 'mock-64',
    title: 'Highway to Heaven',
    artist: 'Spiritual Journey',
    album: 'Divine Path',
    isrc: generateISRC(64),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Epic Anthems']
  },
  {
    id: 'mock-65',
    title: 'River Flow',
    artist: 'Water Works',
    album: 'Liquid Motion',
    isrc: generateISRC(65),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Chill Vibes', 'Study Focus']
  },
  {
    id: 'mock-66',
    title: 'Mountain High',
    artist: 'Peak Performers',
    album: 'Summit Success',
    isrc: generateISRC(66),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Workout Mix']
  },
  {
    id: 'mock-67',
    title: 'Valley Low',
    artist: 'Down Below',
    album: 'Underground Sound',
    isrc: generateISRC(67),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Night Driving']
  },
  {
    id: 'mock-68',
    title: 'Sky Above',
    artist: 'Cloud Dancers',
    album: 'Aerial Views',
    isrc: generateISRC(68),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Study Focus']
  },
  {
    id: 'mock-69',
    title: 'Earth Below',
    artist: 'Ground Control',
    album: 'Grounded',
    isrc: generateISRC(69),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Acoustic Favorites']
  },
  {
    id: 'mock-70',
    title: 'Fire Within',
    artist: 'Inner Flame',
    album: 'Burning Bright',
    isrc: generateISRC(70),
    isLiked: false,
    inPlaylist: true,
    playlistNames: ['Epic Anthems', 'Workout Mix']
  },

  // Songs 71-100: Neither liked nor in playlists (30 songs)
  {
    id: 'mock-71',
    title: 'Random Melody',
    artist: 'Unknown Artist',
    album: 'Forgotten Tracks',
    isrc: generateISRC(71),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-72',
    title: 'Background Music',
    artist: 'Generic Sound',
    album: 'Filler Album',
    isrc: generateISRC(72),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-73',
    title: 'Elevator Song',
    artist: 'Muzak Collective',
    album: 'Waiting Room Hits',
    isrc: generateISRC(73),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-74',
    title: 'Hold Music',
    artist: 'Customer Service Band',
    album: 'Please Wait',
    isrc: generateISRC(74),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-75',
    title: 'Store Background',
    artist: 'Retail Sounds',
    album: 'Shopping Ambience',
    isrc: generateISRC(75),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-76',
    title: 'Coffee Shop Tune',
    artist: 'Cafe Musicians',
    album: 'Ambient Noise',
    isrc: generateISRC(76),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-77',
    title: 'Library Whisper',
    artist: 'Quiet Hours',
    album: 'Silence Please',
    isrc: generateISRC(77),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-78',
    title: 'Waiting Time',
    artist: 'Patience Band',
    album: 'Standing By',
    isrc: generateISRC(78),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-79',
    title: 'Passing Through',
    artist: 'Transient Sounds',
    album: 'Here and Gone',
    isrc: generateISRC(79),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-80',
    title: 'Forgotten Track',
    artist: 'Memory Lane',
    album: 'Lost and Found',
    isrc: generateISRC(80),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-81',
    title: 'Unused Song',
    artist: 'Neglected Artists',
    album: 'No Plays',
    isrc: generateISRC(81),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-82',
    title: 'Skipped Beat',
    artist: 'Next Button',
    album: 'Never Heard',
    isrc: generateISRC(82),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-83',
    title: 'Auto-Play Victim',
    artist: 'Algorithm Choice',
    album: 'Not My Selection',
    isrc: generateISRC(83),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-84',
    title: 'Radio Filler',
    artist: 'Station Buffer',
    album: 'Between Songs',
    isrc: generateISRC(84),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-85',
    title: 'Shuffle Surprise',
    artist: 'Random Selection',
    album: 'What Is This',
    isrc: generateISRC(85),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-86',
    title: 'Accidental Play',
    artist: 'Misclick Band',
    album: 'Oops',
    isrc: generateISRC(86),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-87',
    title: 'Browse Result',
    artist: 'Search Casualty',
    album: 'Just Looking',
    isrc: generateISRC(87),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-88',
    title: 'Preview Track',
    artist: 'Sample Sound',
    album: 'Test Listen',
    isrc: generateISRC(88),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-89',
    title: 'Queue Accident',
    artist: 'Wrong Button',
    album: 'Unintended',
    isrc: generateISRC(89),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-90',
    title: 'Discovery Miss',
    artist: 'Failed Recommendation',
    album: 'Not My Taste',
    isrc: generateISRC(90),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-91',
    title: 'Party Playlist Reject',
    artist: 'Someone Else\'s Choice',
    album: 'Not My Vibe',
    isrc: generateISRC(91),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-92',
    title: 'Workout Warmup',
    artist: 'Pre-Exercise',
    album: 'Getting Ready',
    isrc: generateISRC(92),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-93',
    title: 'Study Break',
    artist: 'Distraction Sound',
    album: 'Focus Lost',
    isrc: generateISRC(93),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-94',
    title: 'Commute Companion',
    artist: 'Traffic Jam',
    album: 'Stuck in Car',
    isrc: generateISRC(94),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-95',
    title: 'Cleaning Soundtrack',
    artist: 'Chore Music',
    album: 'Housework',
    isrc: generateISRC(95),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-96',
    title: 'Cooking Background',
    artist: 'Kitchen Beats',
    album: 'Recipe Rhythm',
    isrc: generateISRC(96),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-97',
    title: 'Shower Sing-Along',
    artist: 'Bathroom Acoustics',
    album: 'Morning Ritual',
    isrc: generateISRC(97),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-98',
    title: 'Walking Pace',
    artist: 'Pedestrian Tempo',
    album: 'Foot Traffic',
    isrc: generateISRC(98),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-99',
    title: 'Rainy Day Blues',
    artist: 'Weather Dependent',
    album: 'Mood Music',
    isrc: generateISRC(99),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  },
  {
    id: 'mock-100',
    title: 'End of Queue',
    artist: 'Last Song Standing',
    album: 'Final Track',
    isrc: generateISRC(100),
    isLiked: false,
    inPlaylist: false,
    playlistNames: []
  }
];

// Mock playlists
export const mockSpotifyPlaylists = [
  { id: 'pl-1', name: 'Chill Vibes' },
  { id: 'pl-2', name: 'Workout Mix' },
  { id: 'pl-3', name: 'Study Focus' },
  { id: 'pl-4', name: 'Night Driving' },
  { id: 'pl-5', name: 'Summer Hits 2024' },
  { id: 'pl-6', name: 'Acoustic Favorites' },
  { id: 'pl-7', name: 'Epic Anthems' },
  { id: 'pl-8', name: 'Morning Routine' }
];

// Test credentials
export const MOCK_SPOTIFY_CREDENTIALS = {
  clientId: 'spottestid',
  clientSecret: 'spottestsecret'
};
