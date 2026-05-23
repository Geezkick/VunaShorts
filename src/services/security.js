export const securityService = {
  sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  },
  
  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  },

  secureStorage: {
    setItem(key, value) {
      const payload = JSON.stringify(value);
      const encoded = btoa(encodeURIComponent(payload));
      localStorage.setItem(`sec_${key}`, encoded);
    },
    getItem(key) {
      const encoded = localStorage.getItem(`sec_${key}`);
      if (!encoded) return null;
      try {
        const decoded = decodeURIComponent(atob(encoded));
        return JSON.parse(decoded);
      } catch (e) {
        return null;
      }
    },
    removeItem(key) {
      localStorage.removeItem(`sec_${key}`);
    }
  }
};
