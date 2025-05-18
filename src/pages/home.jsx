import axios from 'axios';
import "../ui/home.css";
import { useEffect, useState } from 'react';

//Footer
const Footer = () => {
    return (<>
      <footer className="py-4">
        <div className="footer container d-flex justify-content-center my-3">
          <div className="me-3"><small>©Cpoyright 2024 KaneC. 專題用途</small></div>
          <div>
            <a href="#" className="footer ext-decoration-none me-1">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="footer text-decoration-none me-1">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="footer text-decoration-none me-1">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </footer>
    </>)
  }
  
  //HotRank
  const HotRank = ({ img1, img2, img3, img4, img5, img6, key }) => {
    return (<>
      <div className='container-lg'>
        <div className='h4 my-2'>最受歡迎球館</div>
        <div className='dGrid' key={key}>
          <a className='dIm1'>
            <img src={img1} className='object-fit-cover rounded-3 w-100 h-100' alt="#" />
            <div className='textfont rounded-3'>
              <span>松上羽球</span>
            </div>
          </a>
          <a className='dIm2'>
            <img src={img2} className='object-fit-cover rounded-3 w-100 h-100' alt="#" />
            <div className='textfont rounded-3'>
              <span>優勢羽球</span>
            </div>
          </a>
          <a className='dIm3'>
            <img src={img3} className='object-fit-cover rounded-3 w-100 h-100' alt="#" />
            <div className='textfont rounded-3'>
              <span>勁拍羽球</span>
            </div>
          </a>
          <a className='dIm4'>
            <img src={img4} className='object-fit-cover rounded-3 w-100 h-100' alt="#" />
            <div className='textfont rounded-3'>
              <span>超強羽球</span>
            </div>
          </a>
          <a className='dIm5'>
            <img src={img5} className='object-fit-cover rounded-3 w-100 h-100' alt="#" />
            <div className='textfont rounded-3'>
              <span>羽利羽球</span>
            </div>
          </a>
          <a className='dIm6'>
            <img src={img6} className='object-fit-cover rounded-3 w-100 h-100' alt="#" />
            <div className='textfont rounded-3'>
              <span >神農羽球</span>
            </div>
          </a>
        </div>
      </div>
    </>)
  }
  
  ////BottonGroup
  const BottonGroup = ({ name, key }) => {
    return (<>
      <div className='col p-1'>
        <button type="button" className='btn btn-dark mb-2' key={key}>{name}</button>
      </div>
    </>)
  }
  
  //Carousel
  const Carousel = ({ source, title, item, content, forUrl }) => {
    return (<>
      <div className={item === 1 ? `carousel-item active` : `carousel-item`}>
        <div className='rounded-2 border-1  border border-secondary h-100' style={{ backgroundColor: 'white' }}>
          <div className='p-3 h-100'>
            <div className='verflow-hidden text-start' onClick={
              () => {
                window.open(forUrl, '_blank');
              }
            }>
              <div className='newsSource pb-1'>
                <small>{source}</small>
              </div>
              <div className='news pb-1'>
                <h5>{title}</h5>
              </div>
              <div className='news pb-0'>
                <small>{content}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>)
  }

  function Home() {
    const RankList = [
      {
        name: 'TOP專區',
        pic1: 'https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-7.jpg',
        pic2: 'https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-8.jpg',
        pic3: 'https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-9.jpg',
        pic4: 'https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-10.jpg',
        pic5: 'https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-11.jpg',
        pic6: 'https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-12.jpg'
      }
    ]
  
    const TopList = [
      { name: '停車場' }, { name: '優惠中' }, { name: '新開幕' }, { name: '暢打球場' }, { name: '冷氣球館' },
      { name: '免費飲水機' },
    ]
  
    const [dataAPI, setDataAPI] = useState([]);
    const [newsAPI, setNewsAPI] = useState([]);
    useEffect(() => {
      
      //locationAPI
      (async () => {
        try {
          const res = await axios.get('./taiwan-city-data.json');
          setDataAPI(res.data.data);
          dataAPI.forEach((item, i) => {
            item.id = i + 1;
          });
          console.log(dataAPI);
        } catch (error) {
          console.log(error);
        }
      })();
  
      //newsAPI
      (async () => {
        const apiKey = '19cb610cdf2543e1ba62ed2c77363b07';
        const newsUrl = "https://newsapi.org/v2/everything?q='羽毛球'";
        try {
          const res = await axios.get(`${newsUrl}&from=2025-04-20&sortBy=relevancy&apiKey=${apiKey}`);
          const newArr = [...res.data.articles];
          newArr.forEach((item, i) => {
            item.id = i + 1;
          })
          setNewsAPI(newArr.filter((item) => item.id <= 5));
          console.log(newsAPI);
        } catch (error) {
          console.log(error);
        }
      })();
  
      //初始化RanKlist Key值
      RankList.forEach((item, i) => {
        item.id = i + 1;
      })
      console.log(RankList);
  
      //初始化Toplist Key值
      TopList.forEach((item, i) => {
        item.id = i + 1;
      })
      console.log(TopList);
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

return (
    <>
      <div className='mb-5'>
        <div className='img-sec'>
          <div className="container-lg checkContainer">
            <div className='checkBlock'>
              <div className='checkBox-building'>
                <i className="fa-solid fa-building"></i>
                <select id="checkBox" className="checkBox" >
                  <option style={{ display: 'none' }}>城市區域</option>
                  {dataAPI.map((item) => {
                    return (<option value={item.name} key={item.id}>{item.name}</option>)
                  })}
                </select>
              </div>
              <div className='divider'></div>
              <div className='checkBox-house'>
                <i className="fa-solid fa-house"></i>
                <select id="checkBox" className="checkBox">
                  <option style={{ display: 'none' }}>球館名稱</option>
                  <option value="1">優勢羽球</option>
                  <option value="2">勁拍羽球</option>
                  <option value="3">超強羽球</option>
                  <option value="4">羽利羽球</option>
                </select>
              </div>
              <div className='divider'></div>
              <button type="button" className="button">搜尋</button>
            </div>
          </div>
        </div>
      </div>
      <div className='container-lg'>
        <div className='row'>
          <div className='col'>
            <div id="carouselExampleIndicators" className="carousel slide pb-5" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" id='indicat' data-bs-target="#carouselExampleIndicators" className="active" data-bs-slide-to="0" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" id='indicat' data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" id='indicat' data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" id='indicat' data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                <button type="button" id='indicat' data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
              </div>
              <div className="carousel-inner">
                {newsAPI.map((item) => {
                  return (<Carousel
                    source={item.source.name}
                    title={item.title}
                    content={item.description}
                    forUrl={item.url}
                    item={item.id}
                  >
                  </Carousel>)
                })}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {RankList.map((item) => {
        return (<HotRank
          key={item.id}
          name={item.name}
          img1={item.pic1}
          img2={item.pic2}
          img3={item.pic3}
          img4={item.pic4}
          img5={item.pic5}
          img6={item.pic6}>
        </HotRank>)
      })}
    <div className='container-lg'>
      <div className='row row-cols-auto'>
          {TopList.map((item) => {
            return (<BottonGroup
              key={item.id}
              name={item.name}>
            </BottonGroup>)
          })}
      </div>
      </div>
      <div className='container-lg'>
        <div className='wave' />
        <div className='marq-infinite wavedown'>
          <div className='marq-item'>
            <a className='marq-container'>
              <img className='marq-img' src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-1.jpg' alt='' />
            </a>
            <a className='marq-container'>
              <img className='marq-img' src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-2.jpg' alt='' />
            </a>
            <a className='marq-container'>
              <img className='marq-img' src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-3.jpg' alt='' />
            </a>
            <a className='marq-container'>
              <img className='marq-img' src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-4.jpg' alt='' />
            </a>
            <a className='marq-container'>
              <img className='marq-img' src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-5.jpg' alt='' />
            </a>
          </div>
          <div className='marq-item'>
          <a className='marq-container'>
              <img className='marq-img' src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-1.jpg' alt='' />
            </a>
            <a className='marq-container'>
              <img className='marq-img' src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-2.jpg' alt='' />
            </a>
            <a className='marq-container'>
              <img className='marq-img' src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-3.jpg' alt='' />
            </a>
            <a className='marq-container'>
              <img className='marq-img' src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-4.jpg' alt='' />
            </a>
            <a className='marq-container'>
              <img className='marq-img' src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-5.jpg' alt='' />
            </a>
          </div>
        </div>
      </div>
      <div className='container-lg FontDirection'>
        <div className='row my-5'>
          <div className='bigFont'>
            <h4 className='mb-2'>輕鬆使用福克斯平台</h4>
            <h6>簡單三步驟，快速完成場地預訂！</h6>
          </div>
        </div>
        <div className='row my-5'>
        <div className='fontBlock col-12 col-sm-4 d-flex justify-content-start align-items-center'>
            <i className="fa-solid fa-bell fa-2xl me-3"></i>
            <div>
              <h6 className='mb-2'>線上預定場地</h6>
              <small>在網站上尋找合適空間 確認好租用時段 30 秒輕鬆完成預訂。</small>
            </div>
          </div>
          <div className='fontBlock col-12 col-sm-4 d-flex justify-content-start align-items-center'>
            <i className="fa-solid fa-calendar fa-2xl me-3"></i>
            <div>
              <h6 className='mb-2'>專屬密碼進出空間</h6>
              <small>透過訂單顯示的專屬密碼，即可在租用時段內自由進出使用場地。</small>
            </div>
          </div>
          <div className='fontBlock col-12 col-sm-4 d-flex justify-content-start align-items-center'>
            <i className="fa-solid fa-face-smile fa-2xl me-3"></i>
            <div>
              <h6 className='mb-2'>免費修改與取消預訂</h6>
              <small>預訂開始時間的 48 小時前，都能回到網站無條件修改或取消訂單。</small>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid endDirection'>
        <div>
          <div className='endFont'>
            <h5>立刻預訂屬於你的美好時光</h5>
            <small className='mb-3'>在專屬的時間與空間裡，盡情揮灑無限的創造力</small>
          </div>
        </div>
        <button className='button'>前往瀏覽球館</button>
      </div>
      <Footer></Footer>
    </>
  )
}


export default Home