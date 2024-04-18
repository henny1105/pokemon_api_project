import React, { useState, useEffect } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // MusicPlayer가 언마운트될 때 정리(clean-up) 함수
    return () => {
      // 필요한 경우, 음악을 정지하거나 자원을 해제하는 로직 작성
    };
  }, []);

  const toggleMusic = () => {
    setIsPlaying(prevState => !prevState);
  };

  return (
    <div>
      {/* 유튜브 embed 플레이어 */}
      {isPlaying && (
        <iframe
          width="0"
          height="0"
          src="https://www.youtube.com/embed/96KbDuAV4ds?autoplay=1&mute=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      {/* 음악 재생 버튼 */}
      <button onClick={toggleMusic}>
        {isPlaying ? '음악 일시정지' : '음악 재생'}
      </button>
    </div>
  );
};

export default MusicPlayer;
