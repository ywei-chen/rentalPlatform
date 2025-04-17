import axios from 'axios';
import focus from './assets/FocusLogo.png';
import background from './assets/bg6.jpg'
import './App.css';
import { useEffect, useState } from 'react';

//NavBar元件
const NavBar = () => {
  return (<>
    <nav className="navbar navbar-expand-lg bg-body-tertiary" id="navbar">
      <div className="container-fluid">
        <div className="logoFocus">
          <img src={focus} className="img-fluid object-fit-cover" alt="#" />
        </div>
        <a className="navbar-brand" href="#">羽毛球｜擇已所愛</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link" href="https://ywei-chen.github.io/sitefacility.github.io/register.html">登入註冊</a>
            <a className="nav-link" href="#">運動場地</a>
            <a className="nav-link" href="#">關於我們</a>
            <a className="nav-link" href="#">聯絡我們</a>
          </div>
        </div>
      </div>
    </nav>
  </>)
}

//Footer
const Footer = () => {
  return (<>
    <footer className="bg-dark py-4 pt-3 mt-5">
      <div className="footer container d-flex justify-content-center my-3">
        <div className="me-3">©Cpoyright 2024 KaneC. 專題用途</div>
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
const HotRank = ({ img1, img2, img3, img4, img5, img6 }) => {
  return (<>
    <div className='container-lg'>
    <div className='h4 my-2'>TOP專區</div>
      <div className='dGrid'>
        <a className='dIm1 col-sm-12'>
         <img src={img1} className='object-fit-cover rounded-3 w-100 h-100' alt="#" />
        </a>
        <a className='dIm2 col-sm-12'>
         <img src={img2} className='object-fit-cover rounded-3 w-100 h-100' alt="#" />
        </a>
        <a className='dIm3 col-sm-12'>
          <img src={img3} className='object-fit-cover rounded-3 w-100 h-100' alt="#" />
        </a>
        <a className='dIm4 col-sm-12'>
          <img src={img4} className='object-fit-cover rounded-3 w-100 h-100' alt="#" />
        </a>
        <a className='dIm5 col-sm-12'>
          <img src={img5} className='object-fit-cover rounded-3 w-100 h-100' alt="#" />
        </a>
        <a className='dIm6 col-sm-12'>
          <img src={img6} className='object-fit-cover rounded-3 w-100 h-100' alt="#" />
        </a>
      </div>
    </div>
  </>)
}

const BottonGroup = ({ name }) => {
  return (<>
      <button type="button" className="btn btn-outline-secondary me-2 mb-2 ">{name}</button>
  </>)
}

//Carousel
const Carousel =() => {
  return (<>
    <div className='container-lg py-5'>
      <div className='row'>
        <div className='col'>
          <div className='border border-light-subtle rounded-2 h-100'>
            <div className=''>
              <div className='img-right'>
                  <img src="https://media.zenfs.com/ko/setn.com.tw/48d632b1cd98ca8c5e40ec12987dfd93" className='rounded-2 w-100' alt="" />
              </div>
              <div className='newsFrom pb-2'>
                <small>The Central News Agency 中央通訊社</small>
              </div>
              <div className='newsTitle pb-2'>
                <h5>羽球 唯一希望楊博涵、劉廣珩男雙8強落敗 亞錦賽台灣出局</h5>
              </div>
              <div className='newsContent'>
                <small>"台灣2025年羽球亞錦賽最後希望、世界排名22的男雙組合楊博涵／劉廣珩11日晚間在男雙8強戰出戰，面對印尼組合世界排名14的印尼強敵..."</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}


//Render
function App() {
  const RankList = [
    {
      name: 'TOP專區',
      pic1: './src/assets/court-7.jpg',
      pic2: './src/assets/court-8.jpg',
      pic3: './src/assets/court-9.jpg',
      pic4: './src/assets/court-10.jpg',
      pic5: './src/assets/court-11.jpg',
      pic6: './src/assets/court-12.jpg'
    }
  ]

  const TopList = [
    { name: '停車場' },{ name: '優惠中' },{ name: '新開幕' },{ name: '暢打球場' },{ name: '冷氣球館' },
    { name: '免費飲水機' },
  ]

  const [dataAPI, setDataAPI] = useState([]);
  //const [newsAPI, setNewsAPI] = useState([]);
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
      const newsUrl = "https://newsapi.org/v2/everything?q='羽球'";
      try {
        const res = await axios.get(`${newsUrl}&from=2025-04-10&sortBy=relevancy&apiKey=${apiKey}`);
        const { articles } = res.data;
        console.log(articles);
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
  }, [])

  return (
    <>
      <NavBar></NavBar>
      <div style={{ backgroundColor: 'whitesmoke' }} className='mb-5'>
        <div className='img-sec' style={{
          position: 'relative',
          height: '350px',
          width: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(${background})`
        }}>
        </div>
        <div className="container-fluid d-flex justify-content-center align-items-center py-3">
          <select className="form-select me-3" style={{ width: '200px' }}>
            <option style={{ display: 'none' }}>城市區域</option>
            {dataAPI.map((item) => {
              return (<option value={item.name} key={item.id}>{item.name}</option>)
            })}
          </select>
          <select className="form-select me-3" style={{ width: '330px' }}>
            <option style={{ display: 'none' }}>球館名稱</option>
            <option value="1">優勢羽球館</option>
            <option value="2">勁拍羽球館</option>
            <option value="3">超強羽球館</option>
            <option value="4">羽利羽球館</option>
          </select>
          <button type="button" className="btn btn-outline-dark">搜尋</button>
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
        <div className='row'>
          <div className='col'>
            {TopList.map((item) => {
              return (<BottonGroup
                key={item.id}
                name={item.name}>
              </BottonGroup>
              )
            })}
            </div>
          </div>
        </div>
            <Carousel ></Carousel>
      <Footer></Footer>
    </>
  )
}

export default App
