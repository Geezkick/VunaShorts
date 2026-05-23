import re

with open('src/data/mock-data.js', 'r') as f:
    content = f.read()

# Add import
if 'import { Icons }' not in content:
    content = content.replace('// VUNASHORTS — Mock Data\n// ============================================', '// VUNASHORTS — Mock Data\n// ============================================\nimport { Icons } from \'../components/icons.js\';')

# Creators avatars
content = content.replace("avatar: '🎬'", "avatar: 'AO'")
content = content.replace("avatar: '🎥'", "avatar: 'KA'")
content = content.replace("avatar: '✨'", "avatar: 'ZN'")
content = content.replace("avatar: '🎞️'", "avatar: 'JM'")
content = content.replace("avatar: '💫'", "avatar: 'FH'")
content = content.replace("avatar: '🌟'", "avatar: 'CO'")

# Profile avatar
content = content.replace("name: 'Brian Kimathi',\n  handle: '@briankimathi',\n  avatar: '🎬'", "name: 'Brian Kimathi',\n  handle: '@briankimathi',\n  avatar: 'BK'")

# Countries
content = content.replace("'🇰🇪'", "'KE'")
content = content.replace("'🇳🇬'", "'NG'")
content = content.replace("'🇿🇦'", "'ZA'")
content = content.replace("'🇬🇭'", "'GH'")
content = content.replace("'🇹🇿'", "'TZ'")
content = content.replace("'🇺🇬'", "'UG'")
content = content.replace("'🇬🇧'", "'GB'")
content = content.replace("'🇫🇷'", "'FR'")
content = content.replace("'🇸🇦'", "'SA'")
content = content.replace("'🇧🇷'", "'BR'")

# Genres
content = content.replace("icon: '🎭'", "icon: Icons.Film()")
content = content.replace("icon: '💕'", "icon: Icons.Heart()")
content = content.replace("icon: '🔍'", "icon: Icons.Search()")
content = content.replace("icon: '😂'", "icon: Icons.Sparkles()")
content = content.replace("icon: '🎓'", "icon: Icons.Bookmark()")
content = content.replace("icon: '👨‍👩‍👧‍👦'", "icon: Icons.Users()")
content = content.replace("icon: '⚡'", "icon: Icons.Zap()")
content = content.replace("icon: '🤖'", "icon: Icons.Server()")
content = content.replace("icon: '💰'", "icon: Icons.Coins()")
content = content.replace("icon: '🎵'", "icon: Icons.Play()")
content = content.replace("icon: '🙏'", "icon: Icons.HandHeart()")
content = content.replace("icon: '🔥'", "icon: Icons.Fire()")

# Payment methods
content = content.replace("icon: '📱'", "icon: Icons.Zap()")
content = content.replace("icon: '🦋'", "icon: Icons.Globe()")
content = content.replace("icon: '💳'", "icon: Icons.CreditCard()")

# Brand campaigns
content = content.replace("logo: '📗'", "logo: Icons.Zap()")
content = content.replace("logo: '🏦'", "logo: Icons.Server()")
content = content.replace("logo: '🍺'", "logo: Icons.Heart()")
content = content.replace("logo: '📡'", "logo: Icons.Signal()")

# Flags in languages and currencies to use Globe
content = re.sub(r"flag: '[A-Z]{2}'", "flag: Icons.Globe()", content)

with open('src/data/mock-data.js', 'w') as f:
    f.write(content)
