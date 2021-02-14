class LyricsStorageManager {
  static instance;

  static getInstance = () => {
    if (!LyricsStorageManager.instance)
      LyricsStorageManager.instance = new LyricsStorageManager();
    return LyricsStorageManager.instance;
  };

  saveLyricsInfo = (data) => {
    const savedData = this.getAllLyricsInfo();
    savedData.push(data);
    localStorage.setItem('lyricsData', JSON.stringify(savedData));
  };

  isLyricsInfoPresent = (id) => {
    const savedData = this.getAllLyricsInfo();
    return !!savedData.find((item) => item.id === id);
  };

  deleteLyricsInfo = (id) => {
    const savedData = this.getAllLyricsInfo();
    const filteredData = savedData.filter((item) => item.id !== id);
    localStorage.setItem('lyricsData', JSON.stringify(filteredData));
  };

  getAllLyricsInfo = () => {
    const savedData = localStorage.getItem('lyricsData');
    return !!savedData ? JSON.parse(savedData) : [];
  };
}

export default LyricsStorageManager.getInstance();
