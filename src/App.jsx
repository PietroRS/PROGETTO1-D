import { useState, useEffect, useRef } from "react"


function App() {

  const titleStyle = {
    color: 'red',
    fontSize: '60px',
    fontFamily: ' san-serif'

  }
  const[changeColor, setChangeColor] = useState('#451252')

  const [showBar, setShowBar] = useState(false);
  const [numButtons, setNumButtons] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [centerIndex, setCenterIndex] = useState(0);
  const containerRef = useRef(null);

  const handleGenerate = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num) && num > 0) {
      setNumButtons(num);
      setShowBar(true);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const buttons = container.getElementsByClassName('circle');
      const containerWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;
      const center = containerWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const buttonRect = button.getBoundingClientRect();
        const buttonCenter = buttonRect.left + buttonRect.width / 2;
        const distance = Math.abs(buttonCenter - center);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      setCenterIndex(closestIndex);
    }
  };
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
      return () => {
        containerRef.current.removeEventListener('scroll', handleScroll);
      };
    }
  }, [numButtons]);

  const getClassByIndex = (index) => {
    if(index == centerIndex)
      return 'raised';
    else if(index == centerIndex - 1)
      return 'raisedleft';
    else if(index == centerIndex + 1)
      return 'raisedright';
  };

 const handleClick = () =>{
   const randomColors = '#' + Math.random().toString(16).slice(2,8)
   setChangeColor(randomColors)
 }
  return (
    <div className="conatiner">
      <h1 style={titleStyle}>Digistone</h1>
      <div>
        <fieldset class="grid">
          <input
            name="login"
            placeholder="N-cerchi"
            aria-label="Login"
            value={inputValue}
            onChange={handleInputChange}
            autocomplete="username"
          />
          
          <button style={{backgroundColor:`${changeColor}`}} onClick={handleClick} className='px-10 py-10 text-white text-3xl bg-blu-500 capitalize font-bold rounded-lg'>Cambia il colore</button>
        </fieldset>
      </div>
      <div>
        <button onClick={handleGenerate}>Genera</button>
        
      </div>
      {showBar && (
        <div className="scrollbar-container" ref={containerRef}>
          <div className="scrollbar-content">
            {[...Array(numButtons).keys()].map((num) => (
              <button key={num} className={`circle ${getClassByIndex(num)}`}>
                {num + 1}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* <button className="circle"></button>
      <button className="circle"></button>
      <button className="circle"></button>
      <button className="circle"></button>
      <button className="circle"></button>
      <button className="circle"></button> */}

    </div>
  )
}

export default App


