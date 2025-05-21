import "../ui/ownerpage.css";

export default function Ownerpage() {

    return(<>
    <div className='container-fluid'>
        <div className='pictureoutline'>
            <img src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-1.jpg' alt=''></img>
            <img src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-2.jpg' alt=''></img>
            <img src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-3.jpg' alt=''></img>
        </div>
    </div>
        <div className='container-lg'>
            <div className='contextspace'>
                <section className='storename&address'></section>
                <section className='spaceintroduction'></section>
                <section className='hourtime'></section>
                <section className='opentime'></section>
                <div className='split'></div>
                <section className='provideditem'></section>
            </div>
        </div>
    
    </>)
}


