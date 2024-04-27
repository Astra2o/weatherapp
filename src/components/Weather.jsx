import React,{useState,useEffect} from 'react'
// import apikey from '../apikey';

function Weather() {
        
    const [city, setcity] = useState(null);
    const [search, setsearch] = useState('delhi')
    const [sunriset, setsunriset] = useState('00:00')
    const [sunsett, setsunsett] = useState('00:00')
    const [bgcode, setbgcode] = useState('01n')
    const apiKey='b4b7ee56ba09d5a486ce2e4253eab86a';

    const today = new Date();
  const options = { weekday: 'long' };
  const day = new Intl.DateTimeFormat('en-US', options).format(today);


  function getMonthName(monthNumber) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber];
  }
  const toDate = `${today.getDate()} ${getMonthName(today.getMonth())} ${today.getFullYear()}`;


    useEffect(() => {
        const fetchApi = async () => {
            console.log('hello');
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`;
            
            try {
                const res = await fetch(url);
                
                if (!res.ok) {
                    // Check if response is not okay
                    throw new Error('Network response was not ok');
                }
                
                const resData = await res.json();
                console.log(resData);
                setcity(resData);
            } catch (error) {
                // Handle error
                console.error('Error fetching data:', error.message);
                // You can handle specific error codes here if needed
                if (error.message === 'Network response was not ok') {
                    // Handle 404 error or other specific errors
                }
            }
        };
        
     fetchApi()
    
      
      },[search]
    )
    
    useEffect(() => {
        if (city) {
            const sunriseTimestamp = city.sys.sunrise;
            const sunsetTimestamp = city.sys.sunset;

            const sunriseDate = new Date(sunriseTimestamp * 1000);
            const sunsetDate = new Date(sunsetTimestamp * 1000);

            sunriseDate.setUTCMinutes(sunriseDate.getUTCMinutes() );
            sunsetDate.setUTCMinutes(sunsetDate.getUTCMinutes() );

            const formatTime = (date) => {
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
            };

            setsunriset(formatTime(sunriseDate));
            setsunsett(formatTime(sunsetDate));

            setbgcode(city.weather[0].icon)
        }else{ setbgcode('01d')}
    }, [city]);
    const stylecard='p-4  border border-white rounded-lg';


  return (
    <div className={`main ${bgcode.endsWith('n')?'text-zinc-100':'text-zinc-800'} ` }>
        <div className="bg   "><img className='left-0  fixed w-screen h-screen opacity-80 ' src={`/images/bg/${bgcode}.jpg`} alt="" /></div>
      <div className="wrapper   flex flex-col justify-center text-center  items-center ">
      

        <div className="search flex pt-8">
            <input placeholder='delhi' onChange={(e)=>{setsearch(e.target.value);setcity(null)}} className='w-96 text-xl z-10 p-1 px-3 bg-white border-2 border-black bg-opacity-25 rounded-2xl' type="search" />
        </div>

        {!city ? (<div>no data found</div> ):(
        <div className="data ">
            <div className="location  items-center justify-center  text-xl capitalize font-semibold my-3 gap-3 flex "><img className='' src="/images/location.svg" alt="" />{search}
             </div>
            <div className="tempcontainer  mt-4 flex flex-row justify-center ">
            <div className="left  flex relative w-[50%]">
    {/* <img className='absolute -left-12' src="/images/rain.png" alt="sunny" /> */}
    <img className='absolute drop-sm w-[100%] -left-20 -top-14 transform  scale-[1.8]' src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`} alt="sunny" />
    <h5 className='absolute bottom-10 right-9 text-2xl capitalize font-semibold'>{city.weather[0].description}</h5>
</div>

                <div className="right w-[40%]  mr-5">
                    <div className="day text-2xl text-start">Today</div>
                    <div className="temp flex text-9xl  font-bold"><span>{Math.floor(city.main.temp/10)}</span>
                    <img className= {`w-6 h-6  ${bgcode.endsWith('n')?'png-white':null}   mt-6`} src="/images/Centigrade.png" alt="" />
                    </div>
                    <div className="minmax">
                        <div className="min flex"> Min: {Math.floor(city.main.temp_min)/10} <img className={`w-2 ${bgcode.endsWith('n')?'png-white':null} h-2 mt-`} src="/images/Centigrade.png" alt="" /></div>
                        <div className="max flex ">Max: {Math.floor(city.main.temp_max)/10} <img className={`w-2 h-2 ${bgcode.endsWith('n')?'png-white':null} mt-1`} src="/images/Centigrade.png" alt="" /></div>
                    </div>
                </div>
            </div>
            <div className="datecontainer mb-4">
                <div className="day text-2xl font-semibold ">{day}</div>
                <div className='date font-semibold'> {toDate}</div>
            </div>

            <div className={`details drop-shadow-md m-5  grid grid-cols-3 ${bgcode.endsWith('n')?'bg-black':'bg-white'} bg-white bg-opacity-50 p-5 border border-white  rounded-lg gap-5`}>
                 <div className='card  flex flex-col justify-between  p-4 border border-white  rounded-lg'>
                 <div class="flex justify-center">
        <img  className={bgcode.endsWith('n')?'png-white':null} src="/images/humidity.svg" alt="" />
    </div>
                        <div>{city.main.humidity}</div>
                    <div>Humidity</div>
                 </div>
                 <div className={`${stylecard}`}>
                 <div class="flex  justify-center">
        <img className={bgcode.endsWith('n')?'png-white':null} src="/images/wind.svg" alt="" />
    </div>                                <div>{city.wind.speed}</div>
                    <div>wind speed</div>
                 </div>
                 <div className={`${stylecard}`}>
                 <div class="flex justify-center">
        <img className={bgcode.endsWith('n')?'png-white':null} src="/images/rainicon.svg" alt="" />
    </div>                                  <div> {city.weather[0].main} </div>
                    <div>Conditions</div>
                 </div>
                 <div className={`${stylecard}`}>
                 <div class="flex justify-center">
        <img className={bgcode.endsWith('n')?'png-white':null} src="/images/sunrise.svg" alt="" />
    </div>                                   <div> {sunriset}</div>
                    <div>Sunrise</div>
                 </div>
                 <div className={`${stylecard}`}>
                 <div class="flex justify-center">
        <img className={bgcode.endsWith('n')?'png-white':null} src="/images/sunset.svg" alt="" />
    </div>                                   <div> {sunsett} </div>
                    <div>Sunset</div>
                 </div>
                 <div className={`${stylecard}`}>
                 <div class="flex justify-center">
        <img className={bgcode.endsWith('n')?'png-white':null} src="/images/sea.svg" alt="" />
    </div>                                  <div> {city.main.pressure} </div>
                    <div>Pressure</div>
                 </div>
            </div>
        </div>
)}
       </div>  
    </div>
  )
}

export default Weather