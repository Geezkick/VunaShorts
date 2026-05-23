with open('src/screens/watch-party.js', 'r') as f:
    content = f.read()

# Chat emojis
content = content.replace('No way he just said that! 😱', 'No way he just said that! 😳')
content = content.replace('The tension is too much!! 🔥🔥', 'The tension is too much!!')
content = content.replace('Sent a Golden Lion Gift! 🦁✨', 'Sent a Golden Lion Gift!')
content = content.replace('<div class="avatar avatar-sm" style="border-color:var(--accent-gold);">👑</div>', '<div class="avatar avatar-sm" style="border-color:var(--accent-gold);">KD</div>')

# Wait, the user wants NO emojis. I should remove 😳 as well.
content = content.replace('No way he just said that! 😳', 'No way he just said that!')

# Reaction bubble generation
content = content.replace("bubble.textContent = ['❤️', '🔥', '😂', '😱', '👏'][Math.floor(Math.random() * 5)];", "bubble.innerHTML = [Icons.Heart(), Icons.Fire(), Icons.Star(), Icons.AlertCircle(), Icons.CheckCircle()][Math.floor(Math.random() * 5)];")

with open('src/screens/watch-party.js', 'w') as f:
    f.write(content)
