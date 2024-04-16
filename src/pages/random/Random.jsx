import './Random.css';
import FloatingCursor from '../common/FloatingCursor';

// -랜덤으로 뽑은 포켓몬은 나의 포켓몬에 저장된다
// -랜덤 포켓몬은 진화되지 않은 포켓몬만 나온다?
// -랜덤 뽑기시 오박사의 오늘의 포켓몬은 뭘까요?처럼 검은색 그림자로 먼저 포켓몬이 나온다
// -뽑기는 티켓을 사용해서 뽑느다
// -티켓은 1분에 하나씩 차오른다
// -티켓의 최대치는 20개이다
// -나의 포켓몬에 저장되어있는 포켓몬이 나오면 이상한사탕으로 변한다
// -랜덤 뽑기시 뮤,뮤츠 같은 종류의 확률은 낮게 설정한다
// -테스트 용으로 티켓 최대치를 채우는 버튼을 숨겨둔다

const Random = () => {
    return (
     <>
      <FloatingCursor imgSrc="/img/random/pokeball.svg" altText="Pokeball" />
      <div className='random_page'>
        <div className="inner">
          랜덤 페이지
        </div>
      </div>
     </>
    );
  };
  
export default Random;